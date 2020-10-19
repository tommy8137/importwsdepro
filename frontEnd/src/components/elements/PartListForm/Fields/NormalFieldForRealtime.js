import React, {
  useEffect,
} from 'react';
import Field from '~~elements/Field';
import _isNil from 'lodash/isNil';
import safeEval from 'safe-exec-eval';
import LabelField from './LabelField';


// 前端即時運算
const NormalFieldForRealtime = props => {
  const { isShown, name, value, fieldConfig = {}, dependsValuesData = {}, onChange = () => { } } = props;
  const { readOnly, func = '', key, replaceBy, default: defaultValue, } = fieldConfig;
  const { replaceByValues = {} } = dependsValuesData;

  const mappedParams = replaceBy.map(k => replaceByValues[k]);

  useEffect(
    () => {
      const result = safeEval(func)(...mappedParams);
      const newValue = !_isNil(result) ? result : defaultValue;
      onChange(newValue);
    }, [...mappedParams]);

  return (
    isShown ? (
      <React.Fragment>
        <LabelField name={name} fieldConfig={fieldConfig} />
        <Field.Input
          disabled
          type="text"
          name={props.name}
          readOnly={readOnly}
          value={(value !== null && value !== undefined) ? value : ''}
          className={`e2e-realtime-input---${key}`}
        />
      </React.Fragment>
    ) : null
  );
};

NormalFieldForRealtime.defaultProps = {
  formData: {},
  name: '',
};

export default NormalFieldForRealtime;
