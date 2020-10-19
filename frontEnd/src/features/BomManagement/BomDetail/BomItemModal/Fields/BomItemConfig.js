import * as yup from 'yup';
import * as R from 'ramda';
import _ from 'lodash';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _toString from 'lodash/toString';

function stringRequire(fieldLabel) {
  return yup
    .string()
    // .required(`[${fieldLabel}] 為必填欄位`)
    .nullable();
}

function numberRequire(fieldLabel, isRequired = false, validDecimal = true) {
  let validator;
  if (isRequired) {
    validator = yup
      .number()
      .transform((value, originalvalue) => {
        if (originalvalue === '' || R.isNil(originalvalue)) {
          return null;
        } else if (validDecimal && /^\d+(\.\d{1,5})?$/g.test(String(_.toNumber(originalvalue)))) {
          return _.toNumber(originalvalue);
        } else if (!validDecimal) {
          return _.toNumber(originalvalue);
        }
        return NaN; // 不符合的全部強制變成wrong type
      })
      .typeError(`[${fieldLabel}] 請輸入小數5位以下正數`)
      .nullable()
      .required(`[${fieldLabel}] 為必填欄位`);
  } else {
    validator = yup
      .number()
      .transform((value, originalvalue) => {
        if (originalvalue === '' || R.isNil(originalvalue)) {
          return null;
        } else if (validDecimal && /^\d+(\.\d{1,5})?$/g.test(String(_.toNumber(originalvalue)))) {
          return _.toNumber(originalvalue);
        } else if (!validDecimal) {
          return _.toNumber(originalvalue);
        }
        return NaN; // 不符合的全部強制變成wrong type
      })
      .typeError(`[${fieldLabel}] 請輸入小數5位以下正數`)
      .nullable();
  }
  return validator;
}

const FIELD_TYPE_CONFIGS = {
  string: {
    validator: stringRequire,
  },
  input: {
    fieldType: 'input',
    validator: numberRequire,
  },
  selector: {
    fieldType: 'selector',
    dataType: 'string',
    selectorConfig: {
      depends: []
    },
    validator: stringRequire,
  },
  textarea: {
    fieldType: 'textarea',
  },
  checkBox: {
    fieldType: 'checkBox',
    dataType: 'boolean',
  }
};

export const bomItemFormConfig = (props = {}) => {
  const {
    levelOptions = [],
    parentLevelOptions = [],
    ownerOptions = []
  } = props;

  return [
    {
      key: 'sku0',
      label: 'SKU 0(QTY)',
      fieldType: 'inputWithLimit',
      dataType: 'int',
      require: true,
      default: 0,
      displayConfig: {
        grids: '1splash2',
        display: true
      },
      validator: numberRequire('SKU 0', true)
    },
    {
      key: 'sku1',
      label: 'SKU 1(QTY)',
      fieldType: 'inputWithLimit',
      dataType: 'int',
      require: true,
      default: null,
      displayConfig: {
        grids: '1splash2',
        display: true
      },
      validator: numberRequire('SKU 1', true)
    },
    {
      key: 'sku2',
      label: 'SKU 2(QTY)',
      fieldType: 'inputWithLimit',
      dataType: 'int',
      require: true,
      default: 0,
      displayConfig: {
        grids: '1splash2',
        display: true
      },
      validator: numberRequire('SKU 2', true)
    },
    {
      key: 'sku3',
      label: 'SKU 3(QTY)',
      fieldType: 'inputWithLimit',
      dataType: 'int',
      require: true,
      default: 0,
      displayConfig: {
        grids: '1splash2',
        display: true
      },
      validator: numberRequire('SKU 3', true)
    },
    {
      key: 'sku4',
      label: 'SKU 4(QTY)',
      fieldType: 'inputWithLimit',
      dataType: 'int',
      require: true,
      default: 0,
      displayConfig: {
        grids: '1splash2',
        display: true
      },
      validator: numberRequire('SKU 4', true)
    },
    {
      key: 'sku5',
      label: 'SKU 5(QTY)',
      fieldType: 'inputWithLimit',
      dataType: 'int',
      require: true,
      default: 0,
      displayConfig: {
        grids: '1splash2',
        display: true
      },
      validator: numberRequire('SKU 5', true)
    },
    {
      key: 'level',
      label: 'Level',
      fieldType: 'selector',
      dataType: 'string',
      require: true,
      default: '2',
      displayConfig: {
        grids: '1splash2',
        display: true
      },
      selectorConfig: {
        depends: []
      },
      validator: stringRequire('Level'),
      options: levelOptions,
    },
    {
      key: 'parent_level',
      label: 'Parent Item\'s Part Name',
      fieldType: 'selector',
      dataType: 'string',
      require: _get(props, ['formData', 'level']) !== '2',
      displayConfig: {
        grids: '2',
        display: true
      },
      selectorConfig: {
        depends: []
      },
      options: parentLevelOptions,
    },
    {
      key: 'has_child',
      label: 'With Child',
      fieldType: 'checkBox',
      dataType: 'boolean',
      require: false,
      displayConfig: {
        grids: '1splash2',
        display: true
      },
      default: false
    },
    {
      key: 'ref_part_num',
      label: 'Leverage CMP/Reference P/N',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
    },
    {
      // TODO new 可能是這個RFQ P/N
      key: 'part_number',
      label: 'Part Number',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
    },
    {
      key: 'part_name',
      label: 'Part Name',
      fieldType: 'input',
      dataType: 'string',
      require: true,
      displayConfig: {
        grids: '3',
        display: true
      },
      validator: stringRequire('Part Name')
    },
    {
      // TODO new
      key: 'initaddmodidel',
      label: 'Initial/Add/Modify/Delete',
      fieldType: 'selector',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
      selectorConfig: {
        depends: []
      }
    },
    {
      // TODO new
      key: 'odm_oem',
      label: 'ODM/OEM',
      fieldType: 'selector',
      dataType: 'string',
      require: true,
      displayConfig: {
        grids: '1',
        display: true
      },
      selectorConfig: {
        depends: []
      },
      validator: stringRequire('ODM/OEM')
    },
    {
      key: 'owner',
      label: 'Owner',
      fieldType: 'selector',
      dataType: 'string',
      require: true,
      displayConfig: {
        grids: '1',
        display: true
      },
      selectorConfig: {
        depends: []
      },
      validator: stringRequire('Owner'),
      options: ownerOptions
    },
    {
      key: 'gb_assy_ctgy',
      label: 'Assy Category',
      fieldType: 'selector',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
      selectorConfig: {
        depends: []
      },
    },
    {
      key: 'func_ctgy',
      label: 'Function Category',
      fieldType: 'selector',
      dataType: 'string',
      require: true,
      displayConfig: {
        grids: '1',
        display: true
      },
      selectorConfig: {
        depends: []
      },
      validator: stringRequire('Function Category')
    },
    {
      key: 'parts_ctgy_1',
      label: 'Parts Category I',
      fieldType: 'selector',
      dataType: 'string',
      require: true,
      displayConfig: {
        grids: '1',
        display: true
      },
      selectorConfig: {
        depends: []
      },
      validator: stringRequire('Parts Category I')
    },
    {
      key: 'parts_ctgy_2',
      label: 'Parts Category II',
      fieldType: 'selector',
      dataType: 'string',
      require: true,
      displayConfig: {
        grids: '1',
        display: true
      },
      selectorConfig: {
        depends: ['parts_ctgy_1']
      },
      validator: stringRequire('Parts Category II')
    },
    {
      key: 'material_spec',
      label: 'Material Spec.',
      fieldType: 'selector',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
      selectorConfig: {
        depends: ['parts_ctgy_1', 'parts_ctgy_2']
      },
      // validator: stringRequire('Material Spec.')
    },
    {
      key: 'material',
      label: 'Material',
      fieldType: 'selector',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
      selectorConfig: {
        depends: ['parts_ctgy_1', 'parts_ctgy_2', 'material_spec']
      },
      // validator: stringRequire('Material')
    },
    {
      colKey: 'parts_ctgy_2',
      key: 'part_size_l',
      label: 'L(mm)',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '3splash4',
        display: true
      },
      validator: numberRequire('L(mm)')
    },
    {
      colKey: 'parts_ctgy_2',
      key: 'part_size_w',
      label: 'W(mm)',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '3splash4',
        display: true
      },
      validator: numberRequire('W(mm)')
    },
    {
      colKey: 'parts_ctgy_2',
      key: 'part_size_h',
      label: 'H(mm)',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '3splash4',
        display: true
      },
      validator: numberRequire('H(mm)')
    },
    {
      colKey: 'parts_ctgy_2',
      key: 'thickness',
      label: 'Thickness',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '3splash4',
        display: true
      },
      validator: numberRequire('Thickness')
    },
    {
      colKey: 'parts_ctgy_2',
      key: 'part_size_ef',
      label: 'φ(mm)',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
      validator: numberRequire('φ(mm)')
    },
    {
      colKey: 'parts_ctgy_2',
      key: 'part_size_m',
      label: 'M(mm)',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
      validator: numberRequire('M(mm)')
    },
    {
      colKey: 'parts_ctgy_2',
      key: 'part_weight',
      label: 'Weight(g)',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
      validator: numberRequire('Weight(g)')
    },
    {
      colKey: 'parts_ctgy_2',
      key: 'part_size_l2',
      label: 'L2(成品展開)(mm)',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
      validator: numberRequire('L2(成品展開)(mm)')
    },
    {
      colKey: 'parts_ctgy_2',
      key: 'part_size_w2',
      label: 'W2(成品展開)(mm)',
      fieldType: 'input',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
      validator: numberRequire('W2(成品展開)(mm)')
    },
    {
      key: 'need_tooling',
      label: 'Need Tooling',
      fieldType: 'checkBox',
      dataType: 'boolean',
      require: false,
      displayConfig: {
        grids: '1',
        display: true
      },
      default: false
    },
    {
      key: 'image_id',
      label: 'Image(檔案大小限制為1M)',
      fieldType: 'uploadImage',
      dataType: 'string',
      require: false,
      displayConfig: {
        grids: '2',
        display: true
      },
    },
    {
      key: 'remark',
      label: 'Remark',
      fieldType: 'textarea',
      dataType: 'string',
      require: false,
      maxLength: 500,
      displayConfig: {
        grids: '2',
        display: true
      },
      validator: yup.string().nullable().max(500, '此欄位最多500字元'),
    },
  ];
};


export const emdmBomItemFormConfig = props => bomItemFormConfig(props).filter(obj => obj.key !== 'owner');


function getFields({ fieldsConfig, ruleName = null, dropdownData = [], formData = {} }) {
  return fieldsConfig.map(field => {
    let newField = { ...field };
    const { key: fieldKey, label, require = false } = field;

    if (ruleName) {
      // 處理會被置換的欄位, metal 厚度
      const { requiredField = [], disableField = [] } = ruleName;
      const fieldTypeChangingInfo = _get(ruleName, ['fieldTypeChangingInfo', fieldKey], {});

      // 檢查是否條件符合
      const isRuleIncludes =
        requiredField.includes(fieldKey) ||
        disableField.includes(fieldKey) ||
        Object.keys(fieldTypeChangingInfo).includes(fieldKey) ||
        field.colKey === ruleName.colKey;

      if (isRuleIncludes) {
        const { fieldType, byIdName } = fieldTypeChangingInfo;
        const filedTypeConfig = _get(FIELD_TYPE_CONFIGS, fieldType, {});
        const isRequired = require || !!requiredField.includes(fieldKey);
        const isDisabled = !!disableField.includes(fieldKey);
        const hasOwnOptions = _get(fieldTypeChangingInfo, 'hasOwnOptions', {});
        const validator = filedTypeConfig.validator ?
          filedTypeConfig.validator(label, isRequired) : field.validator;

        newField = {
          ...newField,
          // ...fieldTypeChangingInfo,
          ...filedTypeConfig,
          byIdName,
          hasOwnOptions,
          require: isRequired,
          disabled: isDisabled,
          validator,
        };
      }
    }

    const options = getOptions(newField, formData, dropdownData);

    if (options.length) {
      newField = {
        ...newField,
        options,
      };
    }
    return newField;
  });
}
// /**
//  * 重組該欄位的field config
//  * @param {*} fieldKey 需要被重組config的欄位的key
//  * @param {*} ruleName 驗證的規則
//  */
// function getFieldConfig(item, ruleName) {
//   const { key: fieldKey, label } = item;
//   const { requiredField = [], disableField = [] } = ruleName;

//   if (requiredField.includes(fieldKey) || disableField.includes(fieldKey) || item.colKey === ruleName.colKey) {
//     const newConfig = _get(ruleName, ['fieldTypeChangingInfo', fieldKey], item);
//     const { fieldType } = newConfig;
//     const filedTypeConfig = _get(FIELD_TYPE_CONFIGS, fieldType, {});
//     const isRequired = !!requiredField.includes(fieldKey);
//     const isDisabled = !!disableField.includes(fieldKey);
//     const validator = filedTypeConfig.validator ?
//       filedTypeConfig.validator(label, isRequired) : item.validator;


//     const newField = {
//       ...item,
//       ...newConfig,
//       ...filedTypeConfig,
//       require: isRequired,
//       disabled: isDisabled,
//       validator,
//     };

//     return newField;
//   }
//   return item;
// }

// /**
//  * 1. 如果有rule name就表示這個Parts Category2有驗證規則
//  * 2. 看他的colKey是否為Parts Category2，是的話就對該欄位進行是否為必選欄位的判斷
//  * @param {*} ruleName Parts Category2的規則
//  */
// function getBomItemFormConfig(ruleName, projectSource) {
//   const formConfig = projectSource === 'EMDM' ? emdmBomItemFormConfig : bomItemFormConfig;
//   if (ruleName) {
//     const fields = formConfig.map(item => {
//       return getFieldConfig(item, ruleName);
//     });
//     return fields;
//   }
//   return formConfig;
// }

/**
 * 取得所有的欄位
 * @param {*} value Parts Category2的id
 * @param {*} dropdownData 所有的下拉選單
 * @param {*} validRule 驗證規則
 */
export function getBomFields(props) {
  const { formData = {}, dropdownData = [], validRule = [], projectSource = '' } = props;
  const ruleName = getValidName(dropdownData, validRule, formData);
  const fieldsConfig = projectSource === 'EMDM' ?
    emdmBomItemFormConfig(props) :
    bomItemFormConfig(props);
  const fields = getFields({ fieldsConfig, ruleName, dropdownData, formData });
  return fields;
}


/**
 * 用來找到現在應該要套用哪個驗證規則
 * @param {*} dropdownData dropdownData array
 * @param {*} validRule validRule 列表
 * @param {*} formData  整個formData object
 */
export function getValidName(dropdownData = [], validRule = [], formData = {}) {
  if (!validRule) return null;
  const reulst = validRule.reduce((prev, validConfig) => {
    const { colKey = '', item = '' } = validConfig;
    const formDataKeyVal = _get(formData, [colKey]);
    const options = _get(dropdownData, [colKey], []);
    const findedDropdownObj = _find(options, obj => obj.id === formDataKeyVal); // 由於 formdata裡面存的是uuid, 要用dropwdown對回來
    const itemName = _get(findedDropdownObj, ['item_name']);

    // 如果填寫的值符合驗證規則的值,就使用這項規則(後蓋前)
    if (itemName && itemName === item) {
      return validConfig;
    }
    return prev;
  }, null);
  return reulst;
}

/*
舊版有，新版沒有的欄位
Customer P/N(customer_pn)
qty
Reference P/N(ref_part_num)
Supply type(supply_type)


call api需要的欄位
// bomDesigneeID: null, bom_id: null,
*/

// 原本想單純拿 key+加_id 去找, 發現key有點不一樣(part少了s)
const COMPARE_KEYS_ID_LIST = {
  parts_ctgy_1: 'part_ctgy1_id',
  parts_ctgy_2: 'part_ctgy2_id',
  material_spec: 'material_spec_id',
  material: 'material_id',
};


/**
 * 處理下拉連動關係
 * @param {Array} dependsList 有關聯的key名稱，需要去判斷這些key在formdata裡面的value是否符合
 * @param {Object} formData formData
 * @param {Array} dropdownData 所有欄位的dropdown
 * @param {String} fieldkey 這個欄位的key名稱
 */
// if (!R.has(field.key)(dropdownData) && R.has('hasOwnOptions')(field)) {

// }

export function getOptions(field = {}, formData = {}, dropdownData = []) {
  // 取得這個fieldkey的所有下拉
  const { key: fieldkey, byIdName, options: fieldOptions = null } = field;

  if (fieldOptions && Array.isArray(fieldOptions)) { return fieldOptions; }

  const fieldDropdownList = _get(dropdownData, [fieldkey], []);
  const depends = _get(field, ['selectorConfig', 'depends'], []);
  const hasOwnOptions = _get(field, ['hasOwnOptions'], false);

  let dropdownList = fieldDropdownList;

  if (hasOwnOptions) {
    const valueOfField = _get(formData, byIdName, false);
    const hasOptions = R.has(valueOfField)(hasOwnOptions);
    const ownDropdownList = hasOptions ? _get(hasOwnOptions, valueOfField, []) : [];

    dropdownList = ownDropdownList.map(obj => ({ item_name: obj.id, id: obj.value }));
  } else if (depends.length) {
    // ====== 取得合法的下拉 ========
    const validDropdownList = fieldDropdownList.filter(itemObj => {
      // 檢查dependsList是不是都合法：要判斷是不是合法，要拿items裡面的key_id去對照到formData比較是否都符合條件
      const isValid = depends.every(dependKey => {
        // 需要拿item裡面那個key來比較
        const compareKey = COMPARE_KEYS_ID_LIST[dependKey];
        // const compareKey = `${dependKey}_id`;
        // item裡面的value是多少
        const compareKeyValue = _get(itemObj, compareKey, false);
        const formKeyValue = _get(formData, dependKey, false);
        if (compareKeyValue && formKeyValue && compareKeyValue === formKeyValue) {
          return true;
        }
        return false;
      });
      return isValid;
    });
    dropdownList = validDropdownList;
  }


  const options = dropdownList.map(obj => {
    const { item_name: label, id: value } = obj;
    return {
      label,
      value: _toString(value)
    };
  });

  return [{ info: null, label: '--', value: null }, ...options];
}

export function checkNeedValidRules(noDependencyCombinations, formData) {
  if (!noDependencyCombinations) return false;
  const data = {
    parts_ctgy_1: formData['parts_ctgy_1'],
    parts_ctgy_2: formData['parts_ctgy_2'],
    material_spec: formData['material_spec'],
    material: formData['material'],
  };
  const OdmOemData = { odm_oem: formData['odm_oem'] };
  const { noDependencyRule, noDependencyOemOdmRule } = noDependencyCombinations;
  const isDataMatch = noDependencyRule.some(item => R.equals(item, data));
  const isOdmOemDataMatch = noDependencyOemOdmRule.some(item => R.equals(item, OdmOemData));
  const isWithChild = formData['has_child'];
  const hasRefPartNum = !!formData['ref_part_num'];

  const isCancel = isDataMatch || isOdmOemDataMatch || isWithChild || hasRefPartNum;
  return !isCancel;
}
