

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { baseReactSelect } from '~~elements/PartListForm/Fields/FieldStyles';

const FieldTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const Div = styled.div`
  ${baseReactSelect};
  .field {
    &:focus {
      outline: none;
      border: none;
    }
  }
  /*diable style*/
  .duck-field--select__control--is-disabled {
    border-color: #c3c3c3;
    .duck-field--select__dropdown-indicator{
      color: #c3c3c3
    }
  }
  .duck-field--select__single-value--is-disabled{
    color: rgba(0,0,0,0.5);
  }
  /*diable style*/
`;


const SelectField = (props) => {
  const {
    value,
    labelTitle,
    name,
    options: values = [],
    onChange,
    onInputChange
  } = props;

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const opts = values
      .map(v => ({ label: v, value: v }));
    setOptions(opts);
  }, [JSON.stringify(values)]);

  const handleOnChange = option => {
    onChange(name, option.value);
  };

  const handleOnInputChange = keyword => {
    onInputChange(name, keyword);
  };

  return (
    <Div className="duck-field">
      <FieldTitle>
        <label className="duck-field--label-zone--label" htmlFor={name}>
          {labelTitle}
        </label>
        <div className="duck-field--label-zone--requiredMark">*</div>
      </FieldTitle>
      <Select
        className="field"
        classNamePrefix="duck-field--select"
        id={name}
        options={options}
        value={{ label: value, value }}
        isSearchable={true}
        onChange={handleOnChange}
        onInputChange={handleOnInputChange}
        isDisabled={props.disabled}
      />
    </Div>
  );
};


export default SelectField;
