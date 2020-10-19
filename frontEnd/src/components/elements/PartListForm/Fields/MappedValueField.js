import React, {
  useEffect,
} from 'react';

import Field from '~~elements/Field';
import LabelField from './LabelField';

// 前端即時運算
const MappedValueField = props => {
  const { dependsValuesData, fieldConfig = {}, isShown, name, value } = props;
  const { readOnly, key, mapFrom, selectorConfig } = props.fieldConfig;
  const { mapFromValues = {} } = dependsValuesData;

  const mappedParams = mapFrom.map(k => mapFromValues[k]);

  useEffect(() => {
    if (!Object.keys(mapFromValues).length) return;
    const result = selectorConfig.values.find(item => mapFrom.every(mapKey => mapFromValues[mapKey] === item[mapKey]));
    if (!result) {
      props.onChange(null);
      return;
    }
    props.onChange(result[key]);
  }, [...mappedParams, value]);

  return (
    isShown ? (
      <div>
        <LabelField name={name} fieldConfig={fieldConfig} />
        <Field.Input
          disabled
          type="text"
          name={props.name}
          readOnly={readOnly}
          value={(value !== null && value !== undefined) ? value : ''}
        />
      </div>
    ) : <div />
  );
};

MappedValueField.defaultProps = {
  formData: {},
  name: '',
};

export default MappedValueField;
