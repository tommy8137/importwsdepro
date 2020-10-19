

import React, { Component } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

import * as Mixins from '~~styles/_mixins';


const Div = styled.div`
  /* react-select 的style */

  .formik-select--select {
    &:focus {
      outline: none;
    }

    &__value-container {
      height: 2rem;
      padding: 0px;
      &:focus {
        outline: none;
      }
    }
    &__single-value {
      font-size: 0.9rem;
      font-weight: 200;
      letter-spacing: 1px;
      bottom: 0.2rem;
      overflow: visible;
      &:focus {
        outline: none;
      }
    }
    &__placeholder {
      display: none;
    }
    &__indicator {
      padding: 5px;
      color: #333333;
      // display: none;
      &:focus {
        outline: none;
      // display: none;
      }
      &:hover {
        color: #333333;
      }
    }
    &__control {
      // width: 15rem;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #333333;
      background: transparent;
      &:focus {
        outline: none;
      }
      &:hover {
        border-color: #00a99d;
      }
    }

    &__indicator-separator {
      display: none;
    }
  }
  /* react-select 的style end */

  margin-bottom: 1rem;
  .field {
    &:focus {
        outline: none;
        border: none
      }
  }
  .formik-select {
    margin-bottom: 1rem;
    &--label-zone{
      display: flex;
      flex-direcion: row
    }
    &--label {
    color: #939393;
    font-size: 0.5rem;
    font-weight: 100;
    margin-bottom: 0.2rem;
    &--requiredMark{
      color: red;
      margin-left: 0.5rem;
      font-size: 0.5rem;
      }
    }
  }
`;


const SelectField = ({ field, form, ...props }) => {
  // if (field.name === 'projectName') {
  //   console.log('[SelectField]', field);
  //   console.log('[SelectField]props', props);
  //   console.log('[SelectField]form', form);
  // }
  // console.log('Select Field props >>>', props);
  return (
    <Div className="formik-select">
      <div className="formik-select--label-zone">
        <label className="formik-select--label" htmlFor="projectName">
          {props.labelTitle}
        </label>
        {props.isRequired ? <div className="formik-select--label--requiredMark">*</div> : null}
      </div>
      <Select
        className="field"
        classNamePrefix="formik-select--select"
        id={field.name}
        options={props.options}
        onChange={(value) => {
          props.onChange(field.name, value);
          form.setFieldValue(field.name, value);
        }}
        onBlur={() => form.setFieldTouched(field.name, true)}
        value={field.value}
        isSearchable={true}
        onInputChange={(keyword) => props.onInputChange(field.name, keyword)}
      />
    </Div>
  );
};


export default SelectField;
