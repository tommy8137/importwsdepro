import React from 'react';
import Field from '~~elements/Field';

const FieldTitle = props => {
  const {
    icon,
    fieldConfig: { require, label, description },
    disabled
  } = props;
  return (
    <Field.Label isRequired={require && !disabled}>
      { label }
      { description && <span className="duck-field--label-zone--description">{description}</span> }
      { icon }
    </Field.Label>
  );
};

FieldTitle.defaultProps = {
  name: '',
  icon: null,
  fieldConfig: {
    label: '',
    description: '',
    require: false
  },
  disabled: false
};

export default FieldTitle;
