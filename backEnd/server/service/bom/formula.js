/* eslint-disable no-console */
/* eslint-disable no-eval */
const _ = require('lodash')
const log4js = require('../../utils/logger/logger')
const logger = log4js.getLogger('formula')

const tv = require('traverse')
const math = require('mathjs')
const util = require('util')

const valueType = [
  'input',
  'selector',
  'fetch',
  'fetch-hidden',
  'checkBox',
  // 'realtimeFormula',
  'composite',
]

const getkeyByQueryValue = (obj, value) => {
  let findKv = Object.entries(obj).filter(kv => kv[1] == value)
  if (findKv.length == 1) {
    return findKv[0][0]
  } else {
    return null
  }
}

const getObjectByTraverse = (keyName, layoutItems) => {
  let res = []
  if (layoutItems.hasOwnProperty(keyName)) { // 2020/03/10 改在外部預先組好尋結果 參照 groupedLayoutItems
    res = layoutItems[keyName]
  }
  if (res.length > 1) {
    logger.error(`traverse get duplicated key on ${keyName}`)
    return null
  } else if (res.length == 0) {
    logger.error(`can not find scope ${keyName} after traverse`)
    return null
  } else {
    return res[0]
  }
}

const getFormulaVal = (variable, req_input, layout_items) => {
  let res = getObjectByTraverse(variable, layout_items)
  if (res) {
    if (valueType.includes(res.fieldType)) {
      return req_input[variable] || 0
    } else if (res.fieldType === 'realtimeFormula') {
      let param = []
      res.replaceBy.forEach(i => {
        let res = getFormulaVal(i, req_input, layout_items)
        param.push(res)
      })
      return eval(res.func)(...param)
    } else if (res.fieldType === 'mappedValue') {
      let searchObj = {}
      res.mapFrom.forEach(e => {
        searchObj[e] = req_input[e]
      })
      let matchedObj = _.find(res.selectorConfig.values, (o) => {
        return Object.keys(searchObj).every(key => {

          if (searchObj[key] !== null && o[key] !== null && !isNaN(+searchObj[key]) && !isNaN(o[key])) {
            return +searchObj[key] === +o[key]
          }
          return searchObj[key] === o[key]
        })
      })
      if (matchedObj) {
        // logger.debug(
        //   'search condition is',
        //   searchObj,
        //   'matched result',
        //   matchedObj,
        //   'return variable:',
        //   variable
        // )
        return matchedObj[variable]
      } else {
        logger.error(
          'search condition is',
          searchObj,
          'can not find matched result',
          variable
        )
        return null
      }
    } else if (res.fieldType === 'mappedFunc') {
      let param = []
      res.mapFrom.forEach(i => {
        let res = getFormulaVal(i, req_input, layout_items)
        param.push(res)
      })
      return eval(res.func)(...param)
    } else if (res.fieldType === 'variable') {
      return res['default']
    } else {
      logger.warn(`unhandle field type: ${res.fieldType} on ${variable}`)
    }
  } else {
    logger.warn(`can not find variable:"${variable}" on layout`)
  }
}

const getCalOrder = (input, formulas) => {
  let order = []
  let calGroup = {}
  let inputTree = tv(input)
  // console.log('inputinputinput', input)
  // console.log('inputTreeinputTreeinputTree', inputTree.paths())
  inputTree.paths().forEach(path => {
    if (path.length > 0) {
      let pathTail = path.slice(-1)[0]
      let parentGroupId = null
      if (path.length > 1) {
        parentGroupId = path.slice(-2)[0]
      }
      if (formulas.includes(pathTail.split('-')[0])) {
        if (!order.includes(pathTail.split('-')[0])) {
          order.push(pathTail.split('-')[0])
          calGroup = {
            ...calGroup,
            [pathTail.split('-')[0]]: [
              { groupId: pathTail, parentGroupId, ...inputTree.get(path) },
            ],
          }
        } else {
          calGroup[pathTail.split('-')[0]].push({
            groupId: pathTail,
            parentGroupId,
            ...inputTree.get(path),
          })
        }
      }
    }
  })
  order.reverse()
  // logger.info('calculate order:', order)
  // logger.info('calGroupcalGroupcalGroup', calGroup)
  return { order, calGroup }
}

class Formula {
  constructor(input, formulas, layout) {
    this.input = input
    this.formulas = formulas
    this.layout = layout
    this.summary = {}
    let { order, calGroup } = getCalOrder(
      this.input.Price,
      Object.keys(formulas)
    )

    this.partItemInfo = this.input.Price.partItemInfo || {}
    this.order = order
    this.calGroup = calGroup
    this.groupId = ''
    this.output = {}
    this.debugInfo = {}
  }

  groupSum(formulaItem, fromKey) {
    let groups = formulaItem.groups
    let result = null
    groups.forEach(group => {
      Object.keys(this.summary).forEach(groupId => {
        if (
          groupId.split('-')[0] === group &&
          this.groupId === this.summary[groupId].parentGroupId
        ) {
          const val = this.summary[groupId][formulaItem.bykey]
          let groupTotal = !val ? 0 : parseFloat(val)

          // console.log('--formulaItem.bykey--', formulaItem.bykey);
          if (result === null ) {
            result = groupTotal
          } else {
            result += groupTotal
          }
        }
      })
    })
    this.setToSummary(fromKey, result, formulaItem.label)
    // logger.info(
    //   `run group sum result: ${util.inspect(result, { depth: null })}`
    // )
    return result
  }

  groupFunc(formulaItem) {
    const { groups = [], func = () => {}, bykey = [] } = formulaItem
    const values = []

    groups.forEach(group => {
      Object.keys(this.summary).forEach(groupId => {
        if (groupId.split('-')[0] !== group || this.groupId !== this.summary[groupId].parentGroupId) return
        const summary = this.summary[groupId]
        values.push(bykey.reduce((acc, itemKey) => ({ ...acc, [itemKey]: summary[itemKey] }), {}))
      })
    })

    const r = eval(func)(values)
    return r
  }

  reCalculatePrice(formulaItem, formularList, variableWithVal, fromKey) {
    // logger.debug('try to calculate formula: ' + fromKey, formulaItem)
    let { type } = formulaItem
    switch (type) {
      case 'GROUPSUM':
        return this.groupSum(
          formulaItem,
          fromKey
        )
      case 'GROUPFUNC':
        return this.groupFunc(
          formulaItem,
          fromKey
        )
      case 'FUNC':
        let params = []
        formulaItem.param.forEach(e => {
          if (e in variableWithVal) {
            params.push(variableWithVal[e])
          } else if (e in formularList) {
            let depFormula = formularList[e]
            // logger.debug(`param: ${e} depend on other formula:`, depFormula)
            variableWithVal[e] = this.reCalculatePrice(
              depFormula,
              formularList,
              variableWithVal,
              e,
            )
            this.setToSummary(e, variableWithVal[e], depFormula.label)
            params.push(variableWithVal[e])
            // logger.debug(`--------> calculate scope:${e} from ${depFormula}`)
          } else {
            params.push(e)
          }
        })
        try {
          // logger.debug('apply', formulaItem.formula) // 'with param:', params)
          let res = eval(formulaItem.formula)(...params)
          return res
        } catch (err) {
          logger.error(
            '[func] can not apply',
            formulaItem.formula,
            'with param:',
            params
          )
          logger.error('err message:', err)
          return null
        }
        break
      case 'MATH':
        let p = null
        try {
          p = math.parse(formulaItem.formula)
        } catch (err) {
          logger.error('can not parse formular:', formulaItem.formula)
          return null
        }

        let scope = []
        tv(p).map(e => {
          if (e && typeof e['name'] != 'undefined') {
            scope.push(e['name'])
          }
        })
        // logger.debug('get scopes on the formula', JSON.stringify(scope))
        scope.forEach(s => {
          if (!(s in variableWithVal)) {
            // logger.debug(`miss scope "$${s}", recursively to get`)
            if (s in formularList) {
              variableWithVal[s] = null
              let subformula = formularList[s]
              variableWithVal[s] = this.reCalculatePrice(
                subformula,
                formularList,
                variableWithVal,
                s,
              )
              this.setToSummary(s, variableWithVal[s], subformula.label)
              // logger.debug(
              //   `--------> calculate scope:${s} from ${subformula.formula}`
              // )
            } else {
              logger.error(`miss scope ${s} on variable`)
              return null
            }
          }
        })
        try {
          // logger.debug('apply', formulaItem.formula) // , 'with variable:', variableWithVal)
          return math.eval(formulaItem.formula, variableWithVal)
        } catch (err) {
          logger.error(
            '[math] can not apply',
            formulaItem.formula,
            'with variable:',
            variableWithVal
          )
          logger.error(
            'can not find key on variables',
            _.difference(scope, Object.keys(variableWithVal))
          )
          scope.forEach(s => {
            if (variableWithVal[s] == null || variableWithVal[s] == undefined) {
              logger.error(
                `can apply for with variables is null or undefined, >>> ${s}: ${
                  variableWithVal[s]
                }`
              )
            }
          })
          logger.error('check if there is a missed variable or loop')
          return null
        }
        break
      default:
        logger.error(`get unknown handling type ${type} on formula`)
        return null
    }
  }

  calPartlistPrice() {
    const vars = {
      partItemInfo: this.partItemInfo,
    }
    let layoutItems = []
    this.layout.forEach(tab => {
      layoutItems = layoutItems.concat(tab.items)
    })
    // 先將所有key找出
    let groupedLayoutItems = {}
    tv(layoutItems).map(e => {
      if (e && e.hasOwnProperty('key')) {
        if (!groupedLayoutItems.hasOwnProperty(e['key'])) { // 檢查 key 是否已存在
          groupedLayoutItems[e['key']] = []// 建立存放key 對應 vlaue 的陣列
        }
        groupedLayoutItems[e['key']].push(e) // 儲存找到的key
      }
    })
    // 收集所有yaml 的 scope, constants
    this.order.forEach(form => {
      // logger.info(`-----------------cal form ${form}--------------------------`)
      let { scope = {}, formula, constant = [], output } = this.formulas[form]
      // console.log('scopescopescope', scope)
      // console.log('this.calGroupthis.calGroup', this.calGroup)
      this.output = { ...output }
      this.calGroup[form].forEach(data => {
        // logger.info('data', data)
        this.groupId = data.groupId
        // logger.info(
        //   '=============================================================================='
        // )
        // logger.info(
        //   `=============================> calcuate: ${
        //     this.groupId
        //   } <====================`
        // )
        // logger.info(
        //   '=============================================================================='
        // )
        this.summary = {
          ...this.summary,
          [this.groupId]: { parentGroupId: data.parentGroupId },
        }
        this.debugInfo = { ...this.debugInfo, [this.groupId]: {} }
        let variableWithVal = {}

        // replace const to object
        if (constant) {
          Object.keys(constant).forEach(c => {
            variableWithVal[c] = constant[c].value
            this.setToSummary(c, constant[c].value)
          })
        }

        // collect scope to object
        if (scope) {

          Object.keys(scope).forEach(e => {
            let val = getFormulaVal(scope[e], { ...data, ...this.partItemInfo, ...variableWithVal }, groupedLayoutItems)
            if (typeof val == 'undefined') {
              logger.error(`can not assign scope: ${scope[e]}`)
            }
            // logger.debug(`variable: "${scope[e]}", get result val: ${val}`)
            variableWithVal[e] = val
            // let outputKey = getkeyByQueryValue(this.output, e)
            this.setToSummary(e, val)
          })
          //        logger.debug(`assign varibale to scope is done. ${JSON.stringify(variableWithVal)}`)
        }
        vars[this.groupId] = variableWithVal
      })
    })

    // console.log('-----varsvars-----', vars)
    // 處理 _開頭的scope, 並計算 formulas
    this.order.forEach(form => {
      // logger.info(`-----------------cal form ${form}--------------------------`)
      let { formula, output, global = {} } = this.formulas[form]

      this.output = { ...output }
      this.calGroup[form].forEach(data => {
        this.groupId = data.groupId
        const variableWithVal = vars[this.groupId]

        Object.keys(global).forEach(globalKey => {
          const globalObj = global[globalKey]
          switch(globalObj.type) {
            case 'GROUPSUM':{
              const sumTargetkey = globalObj.groups[0]
              const sumTargetValue = globalObj.bykey
              const o = _.pickBy(vars, (v, k) => k.startsWith(sumTargetkey))
              const result = Object.keys(o).reduce((sum, k) => o[k][sumTargetValue] + sum, 0)
              variableWithVal[globalKey] = result
              this.setToSummary(globalKey, result)
              break
            }
            case 'GROUPFUNC': {
              const groupFunc = globalObj.func
              const targetGroups = globalObj.groups
              const allGroups = _.pickBy(vars, (v, k) => targetGroups.some(groupKey => k.startsWith(groupKey)))
              const list = Object.keys(allGroups).map(k => allGroups[k])
              try {
                const result = eval(groupFunc)(list)
                variableWithVal[globalKey] = result
                this.setToSummary(globalKey, result)
              } catch (e) {
                this.setToSummary(globalKey, null)
              }
              break
            }
            case 'VARIABLE': {
              const key = `${globalObj.groups[0]}.${globalObj.bykey}`
              const parentKey = `${data.parentGroupId}.${globalObj.bykey}`
              // 找出 vars 中的變數
              const varFromOtherScope = _.get(vars, key)
              const varFromOtherParentScope = _.get(vars, parentKey)
              // 比對 事不是自己的
              // const mappingParentGroupIdKey = key.split('.').map(k => key.startsWith(k) ? data.parentGroupId : k ).join('.')
              // const varFromOtherScopeByParent = _.get(vars, mappingParentGroupIdKey)

              variableWithVal[globalKey] = varFromOtherScope || varFromOtherParentScope
              this.setToSummary(globalKey, varFromOtherScope || varFromOtherParentScope)

              break
            }
            default:
              break
          }
        })
        // calculate price by formula
        let formulaList = formula
        Object.keys(this.output).forEach(key => {
          if (this.output[key] in variableWithVal) return

          try {
            let price = this.reCalculatePrice(
              formulaList[this.output[key]],
              formulaList,
              variableWithVal,
              this.output[key],
            )

            this.setToSummary(this.output[key], price)
            // logger.debug(
            //   `calculate request: ${this.groupId}, get price`,
            //   this.summary[this.groupId][this.output[key]]
            // )
          } catch (err) {
            logger.warn(
              'can not apply',
              variableWithVal,
              'to total formular:',
              formula.total
            )
            logger.error(`calculate ${this.groupId} error: ${err}`)
            this.summary[this.groupId][this.output[key]] = null
          }
        })
      })
    })
    logger.debug('calculate order:', this.order)
    logger.debug('all result for debug:', this.debugInfo)
    logger.debug('calculate price result', this.summary)
    return {
      totalPrices: this.summary[this.order.slice(-1)[0]].total,
      prices: this.summary,
      forDebug: {
        order: this.order,
        debugInfo: this.debugInfo,
        summary: this.summary,
      },
    }
  }

  setToSummary(fromKey, fromValue, fromLabel = '') {
    // logger.info('fromKeyfromKey:' + fromKey, fromValue)
    let outputKey = getkeyByQueryValue(this.output, fromKey)
    if (outputKey !== null) {
      this.summary[this.groupId] = {
        ...this.summary[this.groupId],
        [outputKey]: fromValue,
      }
    }
    this.debugInfo[this.groupId][fromKey] = {
      ...this.debugInfo[this.groupId][fromKey],
      label: fromLabel,
      value: fromValue,
    }
  }
}

module.exports = {
  Formula,
}
