

import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import * as R from 'ramda';

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


const convertToSelectorOptions = (keyName, options) => {
  const keyLens = R.lensProp(keyName);
  return R.pipe(
    R.map(R.view(keyLens)), //   R.map(R.path([keyName])),
    R.uniq,
    R.map(x => ({ label: x, value: x })),
  )(options);
};

const SelectField = ({ field, form, ...props }) => {
  // if (field.name === 'projectName') {
  //   console.log('[SelectField]', field);
  //   console.log('[SelectField]props', props);
  //   console.log('[SelectField]form', form);
  // }
  const { label, require, selectorConfig } = props.filedConfig;
  return (
    <Div className="duck-field">
      <div className="duck-field--label-zone">
        <label className="duck-field--label-zone--label" htmlFor={field.name}>
          {label}
        </label>
        {require ? <div className="duck-field--label-zone--requiredMark">*</div> : null}
      </div>
      <Select
        className="field"
        classNamePrefix="duck-field--select"
        id={field.name}
        options={convertToSelectorOptions(field.name, selectorConfig.values)}
        onChange={(value) => {
          props.onChange(field.name, value);
          form.setFieldValue(field.name, value);
        }}
        onBlur={() => form.setFieldTouched(field.name, true)}
        value={field.value}
        isSearchable={true}
      // onInputChange={(keyword) => props.onInputChange(field.name, keyword)}
      />
    </Div>
  );
};


export default SelectField;
