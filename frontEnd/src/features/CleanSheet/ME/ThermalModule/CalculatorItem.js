import React, { Component } from 'react';
import styled from 'styled-components';
import { compose, withHandlers, withState, lifecycle, withReducer } from 'recompose';
import uuid from 'uuid';
import * as R from 'ramda';

import { comma } from '~~utils/Math';
import AppConfig from '~~config';
import Icon from '~~elements/Icon';
import CalculatorFields from './CalculatorFields';
import styles from './CalculatorItemStyles';
import CalculatorUtils from './CalculatorUtils';
import CalculatorPreview from './CalculatorPreview';


const mergeNewTabsData = (tabUuid, newTabData, currentTabsData) => {
  return R.map(
    R.when(R.propEq('uuid', tabUuid), () => { return newTabData; }),
    currentTabsData);
};

// 整理selector的options
const getSelectorData = (data, selectedKey, header) => {
  const parent = R.pipe(
    R.groupBy(R.prop(selectedKey)),
  )(data);

  // 使用物件(parent)順序會跑掉，這裡用陣列(data)來組合選項
  const { typeof: typeofParam } = header.find(item => item.key === selectedKey);
  let useData = data;
  // 如果是數字，就按照小到大排
  if (typeofParam === 'number') {
    const byMath = R.ascend(R.prop([selectedKey]));
    const dataInAcs = R.sort(byMath, data);
    useData = dataInAcs;
  }
  const options = R.pipe(
    R.map(R.path([selectedKey])),
    R.uniq,
    R.map(x => ({ label: x, value: parent[x][0][selectedKey] })),
  )(useData);

  return {
    parent,
    options,
  };
};

// 整理這個計算機會用到的所有的selector
const handleSelector = (fields, store) => {
  return fields
    .filter(i => i.fieldType === 'selector')
    .map(i => {
      const { level, tableKey, levelRelated } = i.selectorConfig;
      if (level === 0) {
        const { parent, options } = getSelectorData(store[tableKey].data, levelRelated[level], store[tableKey].header);
        return {
          key: i.key,
          name: i.label,
          ...i.selectorConfig,
          parent,
          options
        };
      }
      // 子層的options是根據父層來的，所以一開始為空
      return {
        key: i.key,
        name: i.label,
        ...i.selectorConfig,
        options: []
      };
    });
};

// 整理這個計算機會用到的所有的formula
const handleFormula = (fields) => {
  return fields
    .filter(i => {
      return Object.prototype.hasOwnProperty.call(i, 'formulaConfig');
    })
    .map(i => {
      return {
        key: i.key,
        label: i.label,
        ...i.formulaConfig,
      };
    });
};

// 整理dependency 見Pipe, Screw
const handleDependencyCondition = (fields) => {
  const dependencyCondition = R.pipe(
    R.map(R.path(['optionalConfig', 'dependencyCondition'])),
    R.filter(R.compose(R.not, R.isNil)),
    R.flatten
  )(fields);
  return dependencyCondition;
};

// 整理這個計算機的initial form
const getInitFormData = (fields) => {
  return fields.reduce((prev, curr) => {
    let value = curr.defaultValue;
    if (curr.typeof !== 'string') {
      value = R.is(Number, curr.defaultValue) ? curr.defaultValue : null;
    }
    // 有default用default
    return {
      ...prev,
      [curr.key]: value
    };
  }, {});
};

const checkValidResult = async (inputValue, validateConfig) => {
  let validataError;
  let isValid = true;
  const schema = validateConfig.validationSchema;
  try {
    await schema.validateSync(inputValue);
    isValid = true;
  } catch (error) {
    isValid = false;
    validataError = error.errors;
  }

  // console.log('驗證結果', isValid, validataError);
  return {
    isValid,
    validataError
  };
};

// 建立驗證的規則
const getDynamicValidationSchema = (validateConfig, fieldType, options) => {
  let result = {};
  const { store, tabData } = options;
  const { validateRule, validateOptions } = validateConfig;
  // pipe
  if (validateRule === 'int') {
    return { validationSchema: CalculatorUtils.floatValidateConfig(validateOptions.range[0], validateOptions.range[1]) };
  }
  // pipe
  if (validateRule === 'float') {
    return { validationSchema: CalculatorUtils.floatValidateConfig(validateOptions.range[0], validateOptions.range[1]) };
  }
  // pipe
  if (validateRule === 'dynamic') {
    if (validateOptions.validateRuleName === 'dynamic_1') {
      let rangeList = store[validateOptions.refTable].data.filter(item => item.outerDiameter === tabData.formData.outerDiameter).map(i => i.math);
      if (fieldType === 'float') {
        if (rangeList.length > 0) {
          return { validationSchema: CalculatorUtils.floatValidateConfig(Math.min(...rangeList), Math.max(...rangeList)) };
        }
      }
    }
  }

  return result;
};

/*
組織ValidateConfig
格式template:
validateConfig: {
  validationSchema: CalcUtils.floatValidateConfig(0.0001, 100000)
},
*/
const getMergedValidateConfig = (fieldType, validateConfig, options) => {
  const base = {
    int: CalculatorUtils.intValidateConfig(0, 100000),
    float: CalculatorUtils.floatValidateConfig(0.0001, 100000),
  };
  let mergedValidateConfig = { validationSchema: base[fieldType] };
  if (validateConfig) {
    mergedValidateConfig = {
      ...mergedValidateConfig,
      ...validateConfig,
      ...getDynamicValidationSchema(validateConfig, fieldType, options)
    };
  }
  return mergedValidateConfig;
};

/*
檢查看看是否有欄位可以計算了
*/
const checkAllFormula = (formData, configData) => {
  const { fields, formulaObjByKey, store } = configData;
  const updatedFormData = Object.values(formulaObjByKey).reduce((prevFormData, formulaConfig) => {
    const { calcMethodName } = formulaConfig;
    const { calcResult } = CalculatorUtils.calcStart(calcMethodName, formulaConfig, { fields, store }, prevFormData);
    return {
      ...prevFormData,
      [formulaConfig.key]: calcResult
    };
  }, formData);

  return updatedFormData;
};


// 父層的資料會影響到子層，當父層改變，子層要清空
const resetdependencyData = (configData, fieldKey) => {
  const { dependencyConditionByKey } = configData;
  if (!dependencyConditionByKey) {
    return null;
  }
  let resetData;
  if (Object.prototype.hasOwnProperty.call(dependencyConditionByKey, fieldKey)) {
    resetData = dependencyConditionByKey[fieldKey].influencesField.reduce((prev, curr) => {
      return {
        ...prev,
        [curr]: null
      };
    }, {});
  }
  return resetData;
};

const enhance = compose(
  lifecycle({
    // 沒有改變就不要重劃
    shouldComponentUpdate(nextProps, nextState) {
      return !R.equals(this.props, nextProps);
    }
  }),
  withState('configData', 'updateCalcConfig', null),
  // 因為要計算total, 把tabs的資料存到reducer
  // withState('tabs', 'updateTab', []),
  withState('activeTab', 'updateActiveTab', null),
  withHandlers({
    onAddTab: props => () => {
      const { label, uniqKey } = props.calculatorConfig;
      const { fields, selectorObjByKey } = props.configData;
      const tabUuid = uuid.v4();
      props.updateThermalCalculatorTabsByName(
        uniqKey,
        [
          ...props.tabs,
          { label, uuid: tabUuid, formData: getInitFormData(fields), errors: {}, selectorObjByKey },
        ]
      );
      props.updateActiveTab(tabUuid);
    },
    onRemoveTab: props => uniqId => {
      const tmpTabs = [...props.tabs];
      const needRemoveTabIndex = R.findIndex(R.propEq('uuid', uniqId))(tmpTabs);
      tmpTabs.splice(needRemoveTabIndex, 1);
      const { uniqKey } = props.calculatorConfig;
      props.updateThermalCalculatorTabsByName(
        uniqKey,
        tmpTabs
      );

      if (props.activeTab === uniqId) {
        // 刪掉了一個activeTab，要再生一個出來
        if (needRemoveTabIndex >= 1) {
          props.updateActiveTab(props.tabs[needRemoveTabIndex - 1].uuid);
        } else {
          props.updateActiveTab(props.tabs[1].uuid);
        }
      }
    },
    onChangeActiveTab: props => uniqId => {
      props.updateActiveTab(uniqId);
    },
    // 離開欄位的時候，如果錯誤消失，就更新tabs
    fieldOnBlur: props => async (e, field, tabUuid) => {
      const { value: inputValue } = e.target;
      if (R.isNil(inputValue) || inputValue === '') {
        return;
      }
      const { validateConfig, key, fieldType } = field;
      const res = await checkValidResult(
        inputValue,
        getMergedValidateConfig(fieldType, validateConfig,
          { store: props.configData.store, tabData: props.tabs.find(tab => tab.uuid === tabUuid) })
      );

      // 處理錯誤的部分
      const tabData = props.tabs.find(tab => tab.uuid === tabUuid);
      let newTabData = { ...tabData };
      if (res.isValid) {
        delete newTabData.errors[key];
      } else {
        newTabData = {
          ...newTabData,
          errors: {
            ...newTabData.errors,
            [key]: res.validataError
          }
        };
      }

      props.updateThermalCalculatorTabsByName(
        props.calculatorConfig.uniqKey,
        mergeNewTabsData(tabUuid, newTabData, props.tabs)
      );
    },
    onChangeFieldData: props => async (e, field, tabUuid) => {
      // 如果輸入特殊字元(ex: e,E,+,-)會進來這裏
      if (e.target.validity.valid === false) {
        e.target.value = null;
        return false;
      }
      const { value: inputValue } = e.target;
      const { validateConfig, key, fieldType } = field;
      const tabData = props.tabs.find(tab => tab.uuid === tabUuid);
      const { formData, errors } = tabData;
      if (R.isNil(inputValue) || inputValue === '') {
        // 更新formData
        let tmpFormData = {
          ...formData,
          [key]: null
        };
        // 重新計算一次結果
        const afterCalcFormData = checkAllFormula(tmpFormData, props.configData);
        let newTab = {
          ...tabData,
          formData: afterCalcFormData
        };

        // console.log('整理出新的tabs', mergeNewTabsData(tabUuid, newTab, props.tabs));
        // 更新redux
        props.updateThermalCalculatorTabsByName(
          props.calculatorConfig.uniqKey,
          mergeNewTabsData(tabUuid, newTab, props.tabs)
        );
      } else {
        // 驗證此欄位是否合法
        const res = await checkValidResult(
          inputValue,
          getMergedValidateConfig(fieldType, validateConfig,
            { store: props.configData.store, tabData: props.tabs.find(tab => tab.uuid === tabUuid) })
        );


        // 處理錯誤的部分
        let newTabData = { ...tabData };
        if (res.isValid) {
          delete newTabData.errors[key];
        } else {
          newTabData = {
            ...newTabData,
            errors: {
              ...newTabData.errors,
              [key]: res.validataError
            }
          };
        }

        // 處理form
        if (res.isValid) {
          newTabData = {
            ...newTabData,
            formData: {
              ...newTabData.formData,
              // TODO input 輸入的直會是字串，這裡用Number轉不知道好不好
              [key]: fieldType === 'int' || fieldType === 'float' ? Number(inputValue) : inputValue
            }
          };
        }

        // 檢查有沒有dependency的欄位，如果小孩有dependency，要清空
        let resetData = resetdependencyData(props.configData, field.key);
        if (resetData) {
          newTabData = {
            ...newTabData,
            formData: {
              ...newTabData.formData,
              ...resetData
            }
          };
        }


        // 如果是合法的資料，計算一下
        if (res.isValid) {
          const afterCalcFormData = checkAllFormula(newTabData.formData, props.configData);
          newTabData = {
            ...newTabData,
            formData: afterCalcFormData
          };
        }

        // console.log('[onChangeFieldData]最後的結果是', mergeNewTabsData(tabUuid, newTabData, props.tabs));
        // 更新redux
        props.updateThermalCalculatorTabsByName(
          props.calculatorConfig.uniqKey,
          mergeNewTabsData(tabUuid, newTabData, props.tabs)
        );
      }
      return true;
    },
    onChangeSelectorOption: props => (field, option, tabUuid) => {
      const selectedTab = props.tabs.find(t => t.uuid === tabUuid);
      // formData 更新目前選到的值
      let newFormData = {
        ...selectedTab.formData,
        [field.key]: option.value,
      };
      // 更新目前選到的項目
      let newSelectorObjByKey = {
        ...selectedTab.selectorObjByKey,
        [field.key]: {
          ...selectedTab.selectorObjByKey[field.key],
          value: option
        },
      };

      // 如果有小孩，要重新計算小孩的選項。
      const selectedItem = selectedTab.selectorObjByKey[field.key];
      if (selectedItem.child) {
        const { parent, options } = getSelectorData(
          selectedItem.parent[option.label],
          selectedItem.levelRelated[selectedItem.level + 1],
          props.configData.store[selectedItem.tableKey].header
        );
        // child 可以選的項目是
        newSelectorObjByKey = {
          ...newSelectorObjByKey,
          [selectedItem.child]: {
            ...newSelectorObjByKey[selectedItem.child],
            parent,
            options,
            // 清空小孩的選項
            value: null
          }
        };
        // 清空小孩的選項
        newFormData = {
          ...newFormData,
          [selectedItem.child]: null
        };
      }

      // 檢查有沒有dependency的欄位，如果小孩有dependency，要清空
      let resetData = resetdependencyData(props.configData, field.key);
      if (resetData) {
        newFormData = {
          ...newFormData,
          ...resetData
        };
      }

      // 檢查有沒有算出新東西
      const afterCalcFormData = checkAllFormula(newFormData, props.configData);
      let newSelectedTab = {
        ...selectedTab,
        formData: afterCalcFormData,
        selectorObjByKey: newSelectorObjByKey
      };

      // 更新redux
      props.updateThermalCalculatorTabsByName(
        props.calculatorConfig.uniqKey,
        mergeNewTabsData(tabUuid, newSelectedTab, props.tabs)
      );
    }
  }),
  lifecycle({
    componentDidMount() {
      const { label, config, uniqKey } = this.props.calculatorConfig;
      const { fields, store } = config;
      // 整理這個計算機會用到的所有的selector
      const selector = handleSelector(fields, store);
      // 整理這個計算機會用到的所有的formula
      const formula = handleFormula(fields);
      // 整理這個計算機會用到的所有的dependencyCondition
      const dependencyCondition = handleDependencyCondition(fields);
      const selectorObjByKey = R.indexBy(R.prop('key'), selector);

      const configData = {
        fields,
        store,
        selectorObjByKey,
        formulaObjByKey: R.indexBy(R.prop('key'), formula),
        dependencyConditionByKey: R.indexBy(R.prop('rootField'), dependencyCondition),
      };
      this.props.updateCalcConfig(configData);

      const uniqId = uuid.v4();
      // init 空的form object
      const initFormData = getInitFormData(fields);
      // 有些欄位已經可以計算，先算一遍 ex: 管銷費
      const afterCalcFormData = checkAllFormula(initFormData, configData);
      // 更新tab資料
      this.props.updateThermalCalculatorTabsByName(
        uniqKey,
        [
          ...this.props.tabs,
          { label, uuid: uniqId, formData: afterCalcFormData, errors: {}, selectorObjByKey },
        ]
      );
      // 目前active的tab Id是uniqId
      this.props.updateActiveTab(uniqId);
    }
  }),
);


const CalculatorItemContent = ({ tabData, configData, onChangeFieldData, onChangeSelectorOption, fieldOnBlur }) => {
  if (configData) {
    const { fields } = configData;
    return fields.map(field => {
      return (
        <CalculatorFields
          key={`${tabData.uuid}_${field.key}`}
          field={field}
          tabData={tabData}
          onChangeFieldData={onChangeFieldData}
          onChangeSelectorOption={onChangeSelectorOption}
          fieldOnBlur={fieldOnBlur}
        />);
    });
  }
  return <div />;
};

const CalculatorItemFooter = ({ tabData }) => {
  if (!tabData) {
    return null;
  }
  let price = '$0.0';
  if (tabData.formData.finalPrice) {
    price = `$${comma(tabData.formData.finalPrice)}`;
  }
  return (
    <styles.CalculatorItemFooterDiv>
      <div className="title">{tabData.label}</div>
      <div>{price}</div>
    </styles.CalculatorItemFooterDiv>
  );
};

const CalculatorItem = (props) => {
  const tabData = props.tabs.find(item => item.uuid === props.activeTab);
  return (
    <styles.Div className="calculator-item">
      <div className="calculator-item-header">
        <div className="calculator-item-header--tabs">
          {
            props.tabs.map((item, index) => {
              const isTabActive = props.activeTab === item.uuid;
              if (isTabActive) {
                return (
                  <div
                    key={item.uuid}
                    className="calculator-item-header--tabs-tab active"
                    onKeyUp={() => { }}
                    onClick={() => props.onChangeActiveTab(item.uuid)}
                  >
                    {
                      props.tabs.length > 1 && isTabActive ?
                        <div>
                          <Icon
                            icon="BtnDelete"
                            onClick={(e) => {
                              e.stopPropagation();
                              props.onRemoveTab(item.uuid);
                            }}
                            className="calculator-item-header--tabs-tab-close-btn"
                          />
                          <span className="calculator-item-header--tabs-tab-label">
                            {index + 1}
                          </span>
                        </div>
                        :
                        <span>
                          {index + 1}
                        </span>
                    }
                  </div>
                );
              }
              return (
                <div
                  key={item.uuid}
                  className="calculator-item-header--tabs-tab"
                  onKeyUp={() => { }}
                  onClick={() => props.onChangeActiveTab(item.uuid)}
                >
                  <span>
                    {index + 1}
                  </span>
                </div>
              );
            })
          }
          {props.tabs.length < 10 ?
            <styles.PlusIcon onClick={props.onAddTab} />
            : <div />
          }
        </div>
      </div>
      <div className="calculator-item-content">
        <CalculatorItemContent
          tabData={tabData}
          configData={props.configData}
          onChangeFieldData={props.onChangeFieldData}
          onChangeSelectorOption={props.onChangeSelectorOption}
          fieldOnBlur={props.fieldOnBlur}
        />
      </div>
      <div className="calculator-item-footer">
        <CalculatorItemFooter
          tabData={props.tabs.find(item => item.uuid === props.activeTab)}
        />
      </div>
      {AppConfig.costCalculatorDebug ?
        <div>
          <div>
            <CalculatorPreview
              configData={props.configData}
            />
          </div>
        </div> : null
      }
    </styles.Div>
  );
};


export default enhance(CalculatorItem);


/*
calculatorConfig: { config: [name, fields, store], label }
configData: [ fileds, formulaObjByKey, selectorObjByKey, store ]
tabs: [ errors, formdata, label, selectorObjByKey, uuid ]

selectorConfig: {
  level: 0,
  tableKey: 'materialTable',
  father: null,
  child: 'materialThickness',
  levelRelated: ['material', 'materialThickness']
}

*/
