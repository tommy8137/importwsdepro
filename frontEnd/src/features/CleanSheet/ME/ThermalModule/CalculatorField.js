import React, { Component } from 'react';
import Select from 'react-select';
import * as R from 'ramda';


const getInputStep = (type, customInputRule) => {
  if (customInputRule) {
    return customInputRule;
  }
  const base = {
    int: {
      type: 'number',
      step: 0
    },
    float: {
      type: 'number',
      step: 0.0001
    }
  };
  return base[type] || {};
};

export default class CalculatorField extends Component {
  state = {
    value: null
  }
  render() {
    const { field, mergedConfig,
      formData, selectorObjByKey,
      onChangeFieldData, onChangeSelectorOption,
      tabUuid, fieldOnBlur } = this.props;
    const { readOnly, isDisabled: tmpIsDisabled,
      isNotDisabledCondition, customInputRule } = mergedConfig;
    let isDisabled = tmpIsDisabled;
    if (isNotDisabledCondition) {
      const doubleCheck = isNotDisabledCondition.every(item => {
        // 沒有checkValue就表示只要formData[item.baseOnField]有值就可以input
        if (item.checkValue === null) {
          return R.compose(R.not, R.isNil)(formData[item.baseOnField]);
        }
        return formData[item.baseOnField] === item.checkValue;
      });
      if (doubleCheck) {
        isDisabled = false;
      }
    }
    const { key, fieldType } = field;
    let contentValueClassName = 'content-value';
    contentValueClassName = isDisabled ? `${contentValueClassName} disabled` : contentValueClassName;
    contentValueClassName = readOnly ? `${contentValueClassName} readonly` : contentValueClassName;
    if (fieldType === 'float' || fieldType === 'int') {
      return (
        <input
          className={contentValueClassName}
          id={key}
          onInput={(e) => onChangeFieldData(e, field, tabUuid)}
          onBlur={(e) => fieldOnBlur(e, field, tabUuid)}
          disabled={isDisabled || readOnly}
          // WatchOut 當下拉選單重新選擇時，有些欄位會變成undefined，這時候input不會清空，一定要用空字串讓他清空
          value={R.is(Number, formData[key]) ? formData[key] : ''}
          {...getInputStep(fieldType, customInputRule)}
        />
      );
    }
    if (fieldType === 'selector') {
      return (<Select
        classNamePrefix="content-value-selector"
        className="content-value"
        onChange={(option) => onChangeSelectorOption(field, option, tabUuid)}
        placeholder={null}
        value={selectorObjByKey && selectorObjByKey[key]['value']}
        options={selectorObjByKey && selectorObjByKey[key]['options']}
        isSearchable={false}
      />);
    }
    return null;
  }
}
