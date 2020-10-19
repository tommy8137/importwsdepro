import * as R from 'ramda';


/**
組出error格式
let itemsValidateError = {
  x123: {
    errors: {
      name: [],
      email: ['not email']
    },
  },
  x224: {
    errors: {
      name: [],
      email: []
    },
  },
}
 */
function genItemsValidateErrorObj(data) {
  return data.reduce((prev, curr) => {
    let errors = Object.keys(curr).reduce((iprev, icurr) => {
      return {
        ...iprev,
        [icurr]: []
      };
    }, {});
    return {
      ...prev,
      [curr.id]: {
        errors
      }
    };
  }, {});
}


/*
計算有幾個錯誤
itemsValidateError的格式如下
{
  x1: {
    errors: {
      name: [],
      email: ['not email']
    },
    id: 'x1'
  },
  x2: {
    errors: {
      name: [],
      email: []
    },
    id: 'x2'
  },
}

*/
function getErrorCounts(itemsValidateError) {
  if (!itemsValidateError) {
    return 0;
  }
  let errorCount = R.pipe(
    // 取出errors的value { id: [], email: ['not email']}
    R.map(R.view(R.lensProp('errors'))), //   R.map(R.path([errors])),
    // 把error的message list 取出來
    R.map(x => Object.values(x)),
    // 把陣列攤平
    R.flatten,
    // 計算錯誤的個數
    R.length
  )(Object.values(itemsValidateError));
  return errorCount;
}


/**
 * 比較tableData和server的originalTableData，看有修改幾筆
 */
function getModifiedItems(tableData, originalTableData) {
  const modifiedItems = tableData.filter(item => {
    const comparedItem = R.find(R.propEq('id', item.id))(originalTableData);
    return R.not(R.equals(item, comparedItem));
  });
  return modifiedItems;
}

/**
 * 比較tableData和server的originalTableData，看有修改幾筆&修改哪些欄位
 */
function getModifiedFields(tableData, originalTableData) {
  // 有修改的項目完整資料
  const modifiedItems = tableData.filter(item => {
    const comparedItem = R.find(R.propEq('id', item.id))(originalTableData);
    return R.not(R.equals(item, comparedItem));
  });

  // 只列出有修改的欄位
  const reuslt = modifiedItems.map((item) => {
    const comparedItem = R.find(R.propEq('id', item.id))(originalTableData);
    let diffFields = {
      id: item.id,
    };
    Object.keys(item).forEach(key => {
      if (R.not(R.equals(item[key], comparedItem[key]))) {
        diffFields[key] = item[key];
      }
    });

    return diffFields;
  });


  return reuslt;
}


/*
把已經有修改的資料覆寫回去
tableData: api 取回的table list
tmpEditData: 修改過的資料
*/
function restoreEditData(tableData, tmpEditData) {
  // 已tableData的順序為主，比對如果資料有在修改的暫存裡面，就把暫存的資料覆寫回去
  const tmpFilteredTableData = tableData.map(item => {
    let tmpITem = tmpEditData.find(i => i.id === item.id);
    if (tmpITem) {
      return tmpITem;
    }
    return item;
  });
  return tmpFilteredTableData;
}

/*
tableData：頁面顯示的table
currentErrorObj: 目前的錯誤，格式如下：
  {
    uuid-0001: { errors: { ce_cost: [] }},
    uuid-0002: { errors: { supply_type: ['不得為空'] }}
  }

如果currentErrorObj的id已經不存在tableData裡面，那就把這個error清掉
*/
function cleanErrorObj(tableData, currentErrorObj) {
  let newItemsValidateError = { ...currentErrorObj };
  let tableDataIdList = tableData.map(x => x.id);
  Object.keys(newItemsValidateError).forEach(errorItemId => {
    // 新的table已經找不到此id，可以從ErrorObj中刪除
    if (!tableDataIdList.includes(errorItemId)) {
      delete newItemsValidateError[errorItemId];
    }
  });
  return newItemsValidateError;
}

export default {
  genItemsValidateErrorObj,
  getErrorCounts,
  getModifiedItems,
  restoreEditData,
  cleanErrorObj,
  getModifiedFields,
};
