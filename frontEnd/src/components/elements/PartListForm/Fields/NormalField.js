import React, { useEffect } from 'react';
import safeEval from 'safe-exec-eval';
import _differenceWith from 'lodash/differenceWith';
import _isNil from 'lodash/isNil';
import Field from '~~elements/Field';
import usePrevious from '~~hooks/usePrevious';
import LabelField from './LabelField';


function NormalField(props) {
  const { name, isShown, fieldConfig, disabled, value, onChange = () => { }, dependsValuesData } = props;
  const { maxLength, dataType, func = '', placeholder, key, replaceBy = [], default: defaultValue } = fieldConfig;
  const { replaceByValues = {} } = dependsValuesData;

  const mappedParams = replaceBy.map((k => replaceByValues[k]));
  const prevMappedParams = usePrevious(mappedParams);

  // 處理可以自動帶, 又可以自己輸入的欄位
  // 當只有depend的欄位變動時(變動前後有是有值的狀態, 避免初始化的時候被觸發), 才會觸發
  useEffect(() => {
    if (func && replaceBy && replaceBy.length && Array.isArray(prevMappedParams) && Array.isArray(mappedParams)) {
      const diff = _differenceWith(prevMappedParams, mappedParams);
      // 避免一開始進來就被當成變化, 必須要都有值才可以
      const isDependsValuesChanges = diff.every(obj => !_isNil(obj));
      if (isDependsValuesChanges) {
        const result = safeEval(func)(...mappedParams);
        const newValue = !_isNil(result) ? result : defaultValue;
        onChange(newValue);
      }
    }
  }, [JSON.stringify(mappedParams)]);


  function handleInputChange(val) {
    onChange(val);
  }

  return (
    isShown ? (
      <React.Fragment>
        <LabelField fieldConfig={fieldConfig} disabled={disabled} />
        <Field.ConvertInput
          dataType={dataType}
          disabled={disabled}
          type="text"
          name={name}
          onChange={handleInputChange}
          value={(value !== null && value !== undefined) ? value : ''}
          autoComplete="off"
          placeholder={placeholder}
          className={`e2e-input---${key}`}
          maxLength={maxLength}
        />
      </React.Fragment>
    ) : null
  );
}

export default NormalField;
