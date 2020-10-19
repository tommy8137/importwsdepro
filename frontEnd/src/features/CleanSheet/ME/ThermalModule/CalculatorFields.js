import React, { Component } from 'react';

import AppConfig from '~~config';
import styles from './CalculatorFieldsStyles';
import CalculatorField from './CalculatorField';


const defaultOptionalConfig = {
  // 從同到尾都只能讀不能改
  readOnly: false,
  isHidden: false,
  // 在某些條件下可以填寫
  isDisabled: false
};


const CalculatorFields = ({ field, tabData, onChangeFieldData, onChangeSelectorOption, fieldOnBlur }) => {
  const { key, label, optionalConfig } = field;
  const { formData, errors, selectorObjByKey, uuid } = tabData;
  let mergedConfig = defaultOptionalConfig;
  if (optionalConfig) {
    mergedConfig = {
      ...mergedConfig,
      ...optionalConfig
    };
  }

  const { isHidden } = mergedConfig;
  let hiddenField = isHidden;
  if (AppConfig.costCalculatorDebug) {
    hiddenField = false;
  }
  // 隱藏欄位
  if (hiddenField) {
    return null;
  }

  return (
    <styles.FieldWrapper>
      <CalculatorField
        mergedConfig={mergedConfig}
        selectorObjByKey={selectorObjByKey}
        formData={formData}
        onChangeFieldData={onChangeFieldData}
        onChangeSelectorOption={onChangeSelectorOption}
        fieldOnBlur={fieldOnBlur}
        tabUuid={uuid}
        field={field}
      />
      <label className="content-label" htmlFor={key}>
        {label}
      </label>
      {errors && errors[key] && <p className="field-errors">{errors[key].join(',')}</p>}
    </styles.FieldWrapper>
  );
};


export default CalculatorFields;
