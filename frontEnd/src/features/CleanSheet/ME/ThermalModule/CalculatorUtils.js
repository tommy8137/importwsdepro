
import * as R from 'ramda';
import * as Yup from 'yup';
import stringFormat from 'string-format';
import * as d3 from 'd3';

const checkCanCalc = (formulaRelatedFieldList, formData) => {
  const typeCheck = {
    string: (value) => R.is(String, value),
    number: (value) => R.is(Number, value),
  };
  const valiateRes = formulaRelatedFieldList.map(i => {
    return typeCheck[i.typeof](formData[i.key]);
  });
  let canCalc = R.all(R.equals(true))(valiateRes);
  return canCalc;
};


const checkAllIsNumber = (dataList) => {
  let allIsNumber = R.all(R.is(Number))(dataList);
  return allIsNumber;
};

const checkDecimal = (num, decimal = 4) => {
  return Math.round(num * (10 ** decimal)) / (10 ** decimal);
};


const calculatorList = [
  { label: 'Fin', value: 'Fin' },
  { label: 'Fan', value: 'Fan' },
  { label: 'Screw', value: 'Screw' },
  { label: 'Thermal Plate', value: 'ThermalPlate' },
  { label: 'Thermal Pad', value: 'ThermalPad' },
  { label: 'Thermal Block', value: 'ThermalBlock' },
  { label: 'Pipe', value: 'Pipe' },
  { label: 'Sponge', value: 'Sponge' },
  { label: 'Grease', value: 'Grease' },
  { label: 'Spring', value: 'Spring' },
  { label: 'O-Ring', value: 'ORing' },
  { label: 'Label', value: 'Label' },
  { label: 'Clip', value: 'Clip' },
  { label: 'Push Pin', value: 'PushPin' },
];


const intValidateConfig = (min = 0, max = 100000) => Yup
  .number()
  .integer()
  .min(min, `至少要${min}`)
  .max(max, `最大是${max}`)
  .typeError('需要一個數字');

const floatValidateConfig = (min = 0.0001, max = 100000) => Yup
  .number()
  .min(min, `至少要${min}`)
  .max(max, `最大是${max}`)
  .typeError('需要一個數字');


/* 格式
  // const neededFormItems = ['length', 'width', 'thickness', 'materialCost'];
  // const formulaString = '{0} * {1} * {2} / 1000 * {3} / 1000';
*/
const calcNumberFomulaBase = (d) => (formulaConfig, formData) => {
  const {
    neededFormItems,
    formulaString,
  } = formulaConfig;

  return {
    stringFn: () => {
      const labelList = R.pipe(
        R.map(x => R.find(R.propEq('key', x))(d.fields)),
        R.map(R.prop('label')),
      )(neededFormItems);
      return stringFormat(formulaString, ...labelList);
    },
    calcFn: () => {
      let dataList = neededFormItems.map(i => {
        return formData[i];
      });
      let canCalc = checkAllIsNumber(dataList);
      if (canCalc) {
        /* eslint no-eval: off */
        const rawRes = eval(stringFormat(formulaString, ...dataList));
        return {
          canCalc,
          calcResult: checkDecimal(rawRes)
        };
      }
      return {
        canCalc,
        calcResult: null
      };
    },
  };
};


const getNeededFormItemsWithType = (neededFormItems, fields) => {
  return neededFormItems.map(item => {
    const res = fields.find(ii => ii.key === item);
    return {
      key: item,
      typeof: res.typeof || 'number'
    };
  });
};


/*
neededTableItems: table的欄位使用的 uniq key
neededFormItems: form的欄位使用的 uniq key
formulaString: 公式的template
neededTableName: table的uniq名稱
formulaRelatedTable: {object} table 資料
formData: 使用者填的表單
*/
const searchOneLevelTable = (d) => (formulaConfig, formData) => {
  const {
    neededTableItems,
    neededFormItems,
    neededTableName,
    formulaString,
  } = formulaConfig;
  const { header, data } = d.store[neededTableName];
  return {
    stringFn: () => {
      const labelList = R.pipe(
        // 找到key是x的obj
        R.map(x => R.find(R.propEq('key', x))(header)),
        // 取得此obj的name
        R.map(R.prop('name')),
        // 如果是undefined 就以空字串顯示
        R.map(x => (x === undefined ? '' : x))
      )(neededTableItems);
      return stringFormat(formulaString, neededTableName, ...labelList);
    },
    calcFn: () => {
      const neededFormItemsWithType = getNeededFormItemsWithType(neededFormItems, d.fields);
      let canCalc = checkCanCalc(neededFormItemsWithType, formData);
      let result;
      if (canCalc) {
        result = R.pipe(
          R.find(R.propEq(neededTableItems[0], formData[neededFormItems[0]])),
          R.prop(neededTableItems[1])
        )(data);
      }
      return {
        canCalc,
        calcResult: result
      };
    },
  };
};


/*
neededTableItems: table的欄位使用的 uniq key
neededFormItems: form的欄位使用的 uniq key
formulaString: 公式的template
neededTableName: table的uniq名稱
formulaRelatedTable: {object} table 資料
formData: 使用者填的表單
*/
const searchTwoLevelTable = (d) => (formulaConfig, formData) => {
  const {
    neededTableItems,
    neededFormItems,
    neededTableName,
    formulaString,
  } = formulaConfig;
  const { header, data } = d.store[neededTableName];
  return {
    stringFn: () => {
      const labelList = R.pipe(
        // 找到key是x的obj
        R.map(x => R.find(R.propEq('key', x))(header)),
        // 取得此obj的name
        R.map(R.prop('name')),
        // 如果是undefined 就以空字串顯示
        R.map(x => (x === undefined ? '' : x))
      )(neededTableItems);
      return stringFormat(formulaString, neededTableName, ...labelList);
    },
    calcFn: () => {
      const neededFormItemsWithType = getNeededFormItemsWithType(neededFormItems, d.fields);
      let canCalc = checkCanCalc(neededFormItemsWithType, formData);
      let result;
      if (canCalc) {
        result = R.pipe(
          R.find(
            R.allPass([
              R.propEq(neededTableItems[0], formData[neededFormItems[0]]),
              R.propEq(neededTableItems[1], formData[neededFormItems[1]]),
            ])
          ),
          R.prop(neededTableItems[2])
        )(data);
      }
      return {
        canCalc,
        calcResult: result
      };
    },
  };
};

/*
neededTableItems: table的欄位使用的 uniq key
neededFormItems: form的欄位使用的 uniq key
formulaString: 公式的template
neededTableName: table的uniq名稱
formulaRelatedTable: {object} table 資料
formData: 使用者填的表單

計算長度範圍對應到的成本
*/
const customSearchTwoLevelTable = (d) => (formulaConfig, formData) => {
  const {
    neededFormItems,
    neededTableName,
  } = formulaConfig;
  const { data } = d.store[neededTableName];
  const searchTwoLevelTableResult = searchTwoLevelTable(d)(
    formulaConfig,
    formData
  );
  // stringFn跟searchTwoLevelTable一樣，calcFn做custom處理
  return {
    stringFn: searchTwoLevelTableResult.stringFn,
    calcFn: () => {
      const neededFormItemsWithType = getNeededFormItemsWithType(neededFormItems, d.fields);
      let canCalc = checkCanCalc(neededFormItemsWithType, formData);
      let result;
      if (canCalc) {
        const findedItem = data
          .filter(item => {
            return item.outerDiameter === formData[neededFormItems[0]];
          });
        if (findedItem) {
          const byMath = R.ascend(R.prop('math'));
          const dataInAcs = R.sort(byMath, findedItem);
          const numbers = R.pipe(
            R.map(R.prop('math')),
          )(dataInAcs);
          let bisectRightIndex = d3.bisectRight(numbers, formData[neededFormItems[1]]);
          try {
            // 輸入的數字比table的最小值還要小，就以table最小值為主
            if (bisectRightIndex === 0) {
              result = dataInAcs[0]['cost'];
            } else {
              result = dataInAcs[bisectRightIndex - 1]['cost'];
            }
          } catch (err) {
            console.log('err', err);
          }
        }
      }
      return {
        canCalc,
        calcResult: result
      };
    },
  };
};


const calcStart = (calcMethodName, formulaConfig, config, formData) => {
  let result;
  if (calcMethodName === 'searchOneLevelTable') {
    result = searchOneLevelTable(config)(
      formulaConfig,
      formData
    ).calcFn();
  }
  if (calcMethodName === 'searchTwoLevelTable') {
    result = searchTwoLevelTable(config)(
      formulaConfig,
      formData
    ).calcFn();
  }
  if (calcMethodName === 'customSearchTwoLevelTable') {
    result = customSearchTwoLevelTable(config)(
      formulaConfig,
      formData
    ).calcFn();
  }
  if (calcMethodName === 'calcNumberFomulaBase') {
    result = calcNumberFomulaBase(config)(
      formulaConfig,
      formData
    ).calcFn();
  }
  return result;
};


const getfomularTemplate = (calcMethodName, formulaConfig, config, formData) => {
  let result;
  if (calcMethodName === 'searchOneLevelTable') {
    result = searchOneLevelTable(config)(
      formulaConfig,
      formData
    ).stringFn();
  }
  if (calcMethodName === 'searchTwoLevelTable') {
    result = searchTwoLevelTable(config)(
      formulaConfig,
      formData
    ).stringFn();
  }
  if (calcMethodName === 'customSearchTwoLevelTable') {
    result = customSearchTwoLevelTable(config)(
      formulaConfig,
      formData
    ).stringFn();
  }
  if (calcMethodName === 'calcNumberFomulaBase') {
    result = calcNumberFomulaBase(config)(
      formulaConfig,
      formData
    ).stringFn();
  }
  return result;
};

const inRange = (low, high) => R.allPass([
  x => x >= low,
  x => x < high
]);


export default {
  checkCanCalc,
  checkAllIsNumber,
  checkDecimal,
  calculatorList,
  intValidateConfig,
  floatValidateConfig,
  calcStart,
  getfomularTemplate
};
