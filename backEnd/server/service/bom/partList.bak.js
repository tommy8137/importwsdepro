// const calPartlistPrice = (input, fomulas, layout) => {

//   let totalPrice = 0
//   let partPrice = {}
//   Object.keys(input).forEach(mt => {
//     let categoryStr = mt.split('-')[0]
//     logger.debug(`handle item: ${mt} on ctgy: ${categoryStr}`)
//     if (categoryStr in fomulas) {
//       logger.debug('using calculation info', fomulas[categoryStr])
//       let layoutItems = []
//       layout.forEach(tab => { layoutItems = layoutItems.concat(tab.items) })

//       let layoutDef = _.find(layoutItems, { key: categoryStr })
//       if (layoutDef) {
//         let { items } = layoutDef
//         let { scope, formula, constant } = fomulas[categoryStr]

//         // collect all variable for formula
//         let variableWithVal = {}
//         // replace const to object
//         if (constant) {
//           Object.keys(constant).forEach(c => {
//             variableWithVal[c] = constant[c].value
//           })
//         }
//         // replace varibale with real value
//         Object.keys(scope).forEach(e => {
//           let val = getFormulaVal(scope[e], input[mt], items)
//           if (typeof (val) == 'undefined') {
//             logger.error(`can not assign scope: ${scope[e]}`)
//           }
//           logger.debug(`variable: "${scope[e]}", get result val: ${val}`)
//           variableWithVal[e] = val
//         })
//         logger.debug(`assign varibale to scope is done. ${JSON.stringify(variableWithVal)}`)

//         try {
//           let formulaList = formula
//           let price = reCalculatePrice(formulaList.total.formula, formulaList, variableWithVal)
//           partPrice[mt] = price ? price.toFixed(10) : null
//           logger.debug(`calculate request: ${mt}, get price`, partPrice[mt])
//         } catch (err) {
//           logger.warn('can not apply', variableWithVal, 'to formular:', formula)
//           partPrice[mt] = null
//         }
//       } else {
//         logger.error(`can not get ${categoryStr} layout on yaml, please define`)
//       }
//     } else {
//       logger.error(`can not find ${categoryStr} formula on yaml, please define`)
//     }
//   })
//   logger.debug('calculate price result', partPrice)
//   Object.keys(partPrice).map(e => {
//     if (!isNaN(partPrice[e])) {
//       totalPrice += parseFloat(partPrice[e])
//     }
//   })
//   return { 'totalPrices': totalPrice, 'prices': partPrice }
// }




// const getFormulaVal = (variable, req_input, layout_items) => {
//   let res = findKeyElement(variable, layout_items)

//   if (res) {
//     let { element, key } = res

//     if (element.fieldType === 'input' || element.fieldType === 'selector') {
//       return req_input[key]

//     } else if (element.fieldType === 'mappedValue') {
//       let searchObj = {}
//       element.mapFrom.forEach(e => { searchObj[e] = req_input[e] })
//       let matchedObj = _.find(element.selectorConfig.values, searchObj)
//       logger.debug('search condition is', searchObj, 'matched result', matchedObj, 'return key:', key)
//       return matchedObj ? matchedObj[key] : null

//     } else if (element.fieldType === 'mappedFunc') {
//       let param = []
//       element.mapFrom.forEach(i => {
//         let res = getFormulaVal(i, req_input, layout_items)
//         param.push(res)
//       })
//       return eval(element.func)(...param)

//     } else {
//       logger.warn(`unhandle field type: ${element.fieldType} on ${key}`)
//     }
//   } else {
//     logger.warn(`can not find key:"${variable}" on layout`)
//   }
// }




// const findKeyElement = (variable, layout_items) => {

//   let lv = 0
//   let element = null
//   let varibales = variable.split('.')
//   let keyName = null
//   while (lv < varibales.length) {
//     keyName = varibales[lv]
//     element = _.find(layout_items, { key: keyName })
//     if (typeof (element) == 'undefined') {
//       return null
//     }
//     layout_items = element.items
//     lv++
//   }
//   return { element, key: keyName }
// }