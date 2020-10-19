import React from 'react';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css'; // datetime picker CSS

import Icon from '~~elements/Icon';
import Field from '~~elements/Field';
import LabelField from './LabelField';

function DateField(props) {
  const {
    dateFormat = 'YYYY-MM-DD',
    timeFormat = false,
    defaultValue = null,
    name = '',
    value = null,
    fieldConfig,
    onChange = () => { },
    isShown = true,
    disabled = false,
    ...rest
  } = props;


  function handleOnChange(dateValue) {
    onChange(dateValue);
  }

  return (
    isShown ? (
      <React.Fragment>
        <LabelField
          name={name}
          icon={<Icon icon="IcoCalendarFrom" size="16px" />}
          fieldConfig={fieldConfig}
          disabled={disabled}
        />
        <Field.DatePicker
          dateFormat={dateFormat}
          timeFormat={timeFormat}
          onChange={handleOnChange}
          closeOnSelect={true}
          defaultValue={defaultValue}
          inputProps={{ name, readOnly: true }}
          {...rest}
          value={value}
          className={`e2e-date-picker---${fieldConfig.key}`}
          disabled={disabled}
        />
      </React.Fragment>
    ) : null
  );
}

export default DateField;
