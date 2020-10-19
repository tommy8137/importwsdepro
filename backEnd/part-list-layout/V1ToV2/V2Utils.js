const traverse = require('traverse')
const util = require('util')
const R = require('ramda')
const _fpSet = require('lodash/fp/set')
const _fpGet = require('lodash/fp/get')
const uuid = require('uuid')
// const csv = require('./prd')
const pcbFormulaService = require('../../server/service/bom/pcbFormula')
const partListService = require('../../server/service/bom/partList.js')
const partListModal = require('../../server/model/bom/bomPartList')
const { asyncForEach } = require('../../server/helpers/utils')

const UuidUtils = require('./UuidUtils')

// 根據layout整理出multiple, children, level的資訊
function convertLayoutWithMultipleInfo(data, level, parent) {
  let res = data.map(i => {
    return {
      level,
      key: i.key,
      parent: level > 1 ? parent : null,
      multiple: i.multiple || false,
      switchable: i.switchable || false,
      isMultiSelect: i.fieldType === 'multiSelector' || false,
      children: i.items ? convertLayoutWithMultipleInfo(i.items, level + 1, i.key) : null,
    }
  })
  return res
}

// 整理新舊格式的path
/*
output格式：
前面是V1的path，後面是V2的path
 [
   [ [ 'partname' ], [ 'cwTab', 'CWItems', 'partname' ] ],
   [ [ 'partnumber' ], [ 'cwTab', 'CWItems', 'partnumber' ] ],
 ]
*/
function versionsPathInfo(data) {
  let finalRes = []
  function genPath(dList, v1Parent, v2Parent) {
    dList.forEach(x => {
      // v1要判斷有沒有multiple
      let v1Path = x.multiple ? [...v1Parent, x.key] : [...v1Parent]
      // v2 不用判斷multiple
      let v2Path = [...v2Parent, x.key]

      if (x.children) {
        genPath(x.children, v1Path, v2Path)
      } else {
        // 到最底了，把資料組回去
        finalRes = [
          ...finalRes,
          [[...v1Parent, x.key], v2Path]
        ]
      }
    })
  }
  genPath(data, [], [])
  return finalRes
}


/*
format:
{
  cwTab: false,
  CWGroup: '新增線材群組',
}
*/
function getMultipleMapping(format) {
  let final = {}
  function nestedFindItems(data) {
    if (Object.prototype.hasOwnProperty.call(final, data.key)) {
      console.error('[getMultipleMapping]key 有重複', data.key)
    }
    let keyList = Object.keys(data)
    if (keyList.includes('multiple')) {
      final[data.key] = data.multiple
    } else {
      final[data.key] = false
    }
    if (keyList.includes('children') && data.children) {
      // 再往下繼續找
      data.children.forEach(x => nestedFindItems(x))
    }
  }

  if (Array.isArray(format)) {
    format.forEach(x => nestedFindItems(x))
  } else {
    return nestedFindItems(format)
  }
  return final
}

/*
format:
{
  CWSubMertial: '有使用輔料',
  CWSubMertialLabel: false,
}
*/
function getSwitchMapping(format) {
  let final = {}
  function nestedFindItems(data) {
    if (Object.prototype.hasOwnProperty.call(final, data.key)) {
      console.error('[getSwitchMapping]key 有重複', data.key)
    }
    let keyList = Object.keys(data)
    if (keyList.includes('switchable')) {
      final[data.key] = data.switchable
    } else {
      final[data.key] = false
    }
    if (keyList.includes('children') && data.children) {
      // 再往下繼續找
      data.children.forEach(x => nestedFindItems(x))
    }
  }

  if (Array.isArray(format)) {
    format.forEach(x => nestedFindItems(x))
  } else {
    return nestedFindItems(format)
  }
  return final
}

// Step. 把v1的initial data 拿來轉成v2看得懂的格式(把multiple:false 砍掉的key補齊)
function convertFullPathInitialData(v1InitialDataObj, zipConverter) {
  /* ********************************** 特殊規則處理-switchable ********************************** */
  zipConverter = [
    ...zipConverter,
    [['CWGroup', 'CWSubMertial'], ['cwTab', 'CWGroup', 'CWSubMertialSwitch']],
    [['usingSubMaterial'], ['dieCutTab', 'usingSubMaterialSwitch']]
  ]
  /* ********************************** 特殊規則處理-switchable END ********************************** */
  let res = Object.keys(v1InitialDataObj).reduce((prev, curr) => {
    let splitResult = R.split('_', curr)
    // 去掉uuid的部分
    let splitResultWithoutUuid = splitResult.map(x => UuidUtils.splitUuid(x))
    /* ********************************** 特殊規則處理 ********************************** */
    // ['Fan', 'fanAppearanceProcess2', 'fanAppearanceProcess2']
    if (R.equals(splitResultWithoutUuid, ['Fan', 'fanAppearanceProcess2', 'fanAppearanceProcess2'])) {
      splitResult = R.dropLast(1, splitResult)
      splitResultWithoutUuid = R.dropLast(1, splitResultWithoutUuid)
    }

    // [ [ 'CWGroup', 'CWSubMertial', 'CWSubMertialLabel' ], [ 'cwTab', 'CWGroup', 'CWSubMertial', 'CWSubMertialLabel' ] ],
    if (R.equals(splitResultWithoutUuid, ['CWGroup', 'CWSubMertial', 'CWSubMertialLabel', 'CWSubMertialLabel'])) {
      // console.log('special3')
      splitResult = R.dropLast(1, splitResult)
      splitResultWithoutUuid = R.dropLast(1, splitResultWithoutUuid)
    }
    /* ********************************** 特殊規則處理 END ********************************** */
    /* ********************************** PCB特殊規則處理 START ********************************** */

    if (R.equals(splitResultWithoutUuid, ['pcbStageNo'])) {
      // console.log('special3')
      splitResult = ['PcbStageNo']
      splitResultWithoutUuid = ['PcbStageNo']
    }
    /* ********************************** PCB特殊規則處理 END ********************************** */
    let target = zipConverter.find(item => {
      return R.equals(item[0], splitResultWithoutUuid)
    })
    if (target) {
      const [oldFormat, newFormat] = target
      let restore = newFormat.map(item => {
        let indexInOldFormat = oldFormat.indexOf(item)
        if (indexInOldFormat >= 0) {
          // 把有uuid的版本放回去
          return splitResult[indexInOldFormat]
        }
        return item
      })
      return {
        ...prev,
        [restore.join('_')]: v1InitialDataObj[curr]
      }
    }
    console.error('v1轉v2出錯了: ', splitResultWithoutUuid)
    return prev
  }, {})
  return res
}


function convertFullPathInitialDataToObj(data) {
  let group = Object.keys(data).reduce((prev, curr) => {
    let splitResult = R.split('_', curr)
    return R.assocPath(splitResult, data[curr], prev)
  }, {})
  return group
}


function getFinalV2Data(dataObj, layoutInfo) {
  let flattenMultipleInfoObj = getMultipleMapping(layoutInfo)
  let keyList = Object.keys(dataObj)
  return keyList.reduce((prev, currKey) => {
    // 去掉uuid的key
    let originalKeyName = UuidUtils.splitUuid(currKey)
    // 找出multiple 為true or false
    let multiple = flattenMultipleInfoObj[originalKeyName]
    let dataValue = dataObj[currKey]

    if (['SPEC17', 'SPEC18', 'SPEC19', 'SPEC20'].includes(currKey)) {
      return {
        ...prev,
        [originalKeyName]: dataValue,
      }
    }

    // multiple: true 時，需要把資料變成array型態
    /*
    keyList
    ex:
    keyList = [class, class-d9017e02-059d-4d5a-97e9-f72ebcff2308]
    找到第一個class的multiple為true，就把資料變成array型態。然後直接return，因為只要處理一次就可以(class處理過，class-d9017e02-059d-4d5a-97e9-f72ebcff2308就不需要處理了)
    舊格式：{
      class: { name: 'a' },
      class-d9017e02-059d-4d5a-97e9-f72ebcff2308: { name: 'b' },
    }
    整理完變成：
    {
      class: [
        { uuid: 'd82b3cc4-907a-4ea5-b8a4-a5a2c08363ed', name: 'a' },
        { uuid: 'd9017e02-059d-4d5a-97e9-f72ebcff2308', name: 'b' },
      ]
    }
    */
    if (multiple) {
      const groupData = keyList
        .filter(k => {
          return UuidUtils.splitUuid(k) === originalKeyName
        })
        .map(k => {
          let tmpuuid = UuidUtils.findUuid(k)
          return {
            uuid: tmpuuid || uuid.v4(),
            ...dataObj[k],
          }
        })
      // console.log('currKey', currKey)
      // console.log('keyList', keyList)
      // console.log('groupData', groupData)
      // console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
      return {
        ...prev,
        [originalKeyName]: groupData.map(d => getFinalV2Data(d, layoutInfo))
      }
    }
    /* ***************************** multiple為false的狀態 ***************************** */
    // value還是object，還要再往下判斷
    if (R.is(Object, dataValue)) {
      return {
        ...prev,
        [originalKeyName]: getFinalV2Data(dataValue, layoutInfo)
      }
    }
    // 不是Object, 已經到底了，直接回傳資料
    return {
      ...prev,
      [originalKeyName]: dataValue,
    }
    /* ***************************** multiple為false的狀態 END ***************************** */
  }, {})
}

function v1ToV2(v1Initial, v2Layout) {
  // 整理tree info (multiple, switchable, children)
  let multipleInfo = convertLayoutWithMultipleInfo(v2Layout, 1)

  // V1和V2的path差異
  let versionsCompare = versionsPathInfo(multipleInfo)

  // // Step. 把v1的initial data 拿來轉成v2看得懂的格式(把multiple:false 砍掉的key補齊)
  // v2的格式
  let fullPathInitialData = convertFullPathInitialData(v1Initial, versionsCompare)
  // v2格式轉成Nested Object
  let v2NestedObjData = convertFullPathInitialDataToObj(fullPathInitialData)

  // 判斷Nested Object哪些要放到array裡面，哪些要維持object
  let v2Data = getFinalV2Data(v2NestedObjData, multipleInfo)
  return v2Data
}

function getPriceData(formData, layout) {
  const treeGroup = traverse(layout).reduce(function r(acc, item) {
    if (this.isLeaf || !item.key || !item.group) return acc
    return { ...acc, [item.key]: item }
  }, {})
  return traverse(formData).reduce(function r(acc, item) {
    if (!this.isLeaf || this.key === 'uuid') return acc
    const groupPath = this.path.reduce((groupPathConfig, path, index) => {
      const fieldConfig = treeGroup[path]
      if (!fieldConfig) return groupPathConfig
      const uuid = fieldConfig.multiple ? _fpGet(this.path.slice(0, index + 2))(formData).uuid : null
      if (uuid) {
        const tempPath = groupPathConfig.parentUUID ? `${treeGroup[path].group}-${groupPathConfig.parentUUID}-${uuid}` : `${treeGroup[path].group}-${uuid}`
        return {
          pathArr: groupPathConfig.pathArr.concat(tempPath),
          parentUUID: uuid,
        }
      }
      const tempPath = groupPathConfig.parentUUID ? `${treeGroup[path].group}-${groupPathConfig.parentUUID}` : treeGroup[path].group
      return {
        ...groupPathConfig,
        pathArr: groupPathConfig.pathArr.concat(tempPath),
      }
    }, { pathArr: [], parentUUID: null })

    if (typeof this.key === 'string' && this.key.endsWith('Switch')) {
      return _fpSet(groupPath.pathArr.concat(this.key.split('Switch')[0]), item)(acc)
    }

    return _fpSet(groupPath.pathArr.concat(this.key), item)(acc)
  }, {})
}

/**
SELECT partlist_value->>'initialValue' as initialValue, partlist_price->>'totalPrices' as price, formate, bom_item_id
FROM wiprocurement.bom_partlist_value
WHERE partlist_value->>'version' is null and partlist_value->>'initialValue' is not null and partlist_price->>'totalPrices' is not null

item[0] => initialvalue
item[1] => price
item[2] => formate
item[3] => bom_item_id

*/
async function transferV1ToV2Partlist(ctx) {
  const data = await partListModal.getV1PartlistData() || []
  const resultData = []
  const errorData = []
  await asyncForEach(data, async (item) => {
    try {
      const layout = await partListService.getPartListLayout(item.formate)
      const result = v1ToV2(JSON.parse(item.initialvalue), layout.layout)
      const priceObj = { Price: getPriceData(result, layout.layout) }
      const priceResult = await partListService.calPartlistPrice(priceObj, layout.formulas, layout.layout)
      resultData.push(item)
      await partListModal.setV2PartlistData(item.bomitemid, {
        Images: Array.isArray(item.images) ? item.images : [],
        formData: result,
        version: 2,
        Price: priceObj,
      }, priceResult)
    } catch(err) {
      console.log('--err--', err.message)
      errorData.push(item)
    }
  })

  ctx.body = { resultData: resultData, errorData: errorData }
  ctx.status = 200
}

async function transferV1ToV2PCB(ctx) {
  const data = await partListModal.getV1PCBData() || []
  const resultData = []
  const errorData = []
  await asyncForEach(data.slice(), async (item) => {
    try {
      const layout = await partListService.getPartListLayout('pcbEdit')
      const result = v1ToV2(item.content, layout.layout)
      const priceObj = getPriceData(result, layout.layout)
      // const priceResult = await pcbFormulaService.calculateFormula(priceObj.pcb)
      resultData.push(item)
      await partListModal.setV2PCBData({
        // fromData: result,
        formData: item.content.formData,
        Price: priceObj.pcb,
      }, item.id)
    } catch(err) {
      console.log('--err--', err.message)
      errorData.push(item)
    }
  })

  ctx.body = { resultData: resultData, errorData: errorData }
  ctx.status = 200
}


module.exports = {
  convertLayoutWithMultipleInfo,
  versionsPathInfo,
  convertFullPathInitialData,
  convertFullPathInitialDataToObj,
  getFinalV2Data,
  getMultipleMapping,
  getSwitchMapping,
  v1ToV2,
  transferV1ToV2Partlist,
  transferV1ToV2PCB,
}
