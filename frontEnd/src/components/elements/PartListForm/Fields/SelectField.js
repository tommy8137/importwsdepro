import React, { useEffect, useState } from 'react';
import _isNil from 'lodash/isNil';
import _toString from 'lodash/toString';
import _pick from 'lodash/pick';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import Select from '~~elements/Select';
import usePrevious from '~~hooks/usePrevious';
import LabelField from './LabelField';


const checkIsChange = (a, b) => (a || b) && !_isEqual(a, b);

/**
 * 用來判斷使否下拉需要清空
 * @param {*} prevValues 前一個dependsValues
 * @param {*} values dependsValues
 */
const checkSelectorChange = (prevValues, values) => {
  if (!prevValues || !values || !Object.keys(values).length) return false;

  const result = Object.keys(values).some(k => {
    const prevVal = prevValues[k];
    const val = values[k];
    return checkIsChange(prevVal, val);
  });
  return result;
};

const SelectField = props => {
  const [dependsValues, setDependsValues] = useState({});
  const {
    name,
    value,
    formDataPaths,
    fieldConfig,
    fieldConfig: {
      key,
      selectorConfig: {
        depends = [],
        needSetDependsValue,
      } },
    isShown,
    disabled,
    onChange = () => { },
    options = [],
    // fieldErrorMessage = '',
    dependsValuesData = {}
  } = props;

  const prevDependsValues = usePrevious(dependsValues);

  useEffect(() => {
    const selectorValues = _get(dependsValuesData, ['selectorValues'], {});
    const newDependsValues = _pick(selectorValues, depends);
    setDependsValues(newDependsValues);
  }, [JSON.stringify(dependsValuesData)]);

  useEffect(() => {
    const needCheckSelector = checkSelectorChange(prevDependsValues, dependsValues);
    if (needCheckSelector) {
      const findedOption = !!options.find(opt => !_isNil(opt.value) && _toString(opt.value) === _toString(value));
      if (!findedOption) {
        onChange(null);
      }
    }
  }, [value, JSON.stringify(options)]);

  const handleOnChange = option => {
    if (typeof props.onChange !== 'function') return;
    if (option.value === value) return;

    onChange(option.value, formDataPaths);

    // needSetValue為true時, 需要自動設定第一筆下拉選單
    if (needSetDependsValue && option.allValue) {
      Object.keys(option.allValue).forEach((k) => {
        if (depends.includes(k)) return;
        const val = option.allValue[k];
        let paths = [...formDataPaths];
        paths[paths.length - 1] = k;
        onChange(val, paths);
      });
    }
  };

  return isShown ? (
    <React.Fragment>
      <LabelField name={name} fieldConfig={fieldConfig} disabled={props.disabled} />
      <Select
        options={options || []}
        onChange={handleOnChange}
        value={{ label: value, value }}
        disabled={disabled}
        placeholder=""
        resetable
        className={`e2e-dropdown---${key}`}
      // isInvalid={isInvalid}
      />
    </React.Fragment>
  ) : null;
};

SelectField.defaultProps = {
  name: '',
  value: '',
  onChange: () => { },
  fieldConfig: {
    label: '',
    require: false,
    selectorConfig: { values: [], options: [], depends: [] }
  }
};

export default SelectField;
