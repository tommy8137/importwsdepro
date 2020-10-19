
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from '~~elements/Select';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import * as R from 'ramda';
import usePrevious from '~~hooks/usePrevious';
import baseFieldStyles, { baseReactSelect } from './FieldStyles';


const Div = styled.div`
  ${baseReactSelect};
  ${baseFieldStyles};
  /* margin-bottom: 1rem; */
  .field {
    &:focus {
        outline: none;
        border: none
      }
  }
`;

function isUUID(s = '') {
  if (s) return s.match('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$');
  return false;
}


const emptyOption = { labe: '-', value: '' };

const SelectField = (props) => {
  const [selectedOption, setSelectedOption] = useState(emptyOption);
  const { value, onChange, formData, errors, options, field, formValidateErrorObj = {}, setFormValidateErrorObj = () => { } } = props;
  const { key, label, require, selectorConfig, readOnly = false, disabled = false, byIdName } = field;

  const findedOption = options.find(item => item.value === value);

  const isDisabled = options.length === 0 || readOnly || disabled;

  const prevVal = usePrevious(value);

  const firstEnter = prevVal === undefined && value !== undefined;


  // 如果他需要保存舊資料, 就先不清空
  useEffect(() => {
    if (!firstEnter && !findedOption) {
      onChange(key, null);
    }
  }, [JSON.stringify(options)]);


  useEffect(() => {
    if (firstEnter && !isUUID(value)) {
      setSelectedOption({ label: value, value });
    } else {
      setSelectedOption(findedOption || emptyOption);
    }
  }, [value, JSON.stringify(options)]);

  function handleChange(newSelectedOption) {
    const val = _get(newSelectedOption, ['value']);
    onChange(key, val);
  }

  return (
    <Div>
      <div className="duck-field--label-zone">
        <label className="duck-field--label-zone--label" htmlFor={key}>
          {label}
        </label>
        {require ? <div className="duck-field--label-zone--requiredMark">*</div> : null}
      </div>
      <Select
        options={options}
        onChange={handleChange}
        value={selectedOption}
        disabled={isDisabled}
        isInvalid={!!errors}
        placeholder=""
      />
      <div className="duck-field--error-hint-section">
        {errors}
      </div>
    </Div>
  );
};


SelectField.defaultProps = {
  emptyOption: {},
  options: [],
};


function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
  // return true;
}

export default React.memo(SelectField, areEqual);


// export default SelectField;
