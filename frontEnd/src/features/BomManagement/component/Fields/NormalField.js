import React, { Component } from 'react';
import styled from 'styled-components';

import * as Mixins from '~~styles/_mixins';

const NormalFieldDiv = styled.div`
  margin-bottom: 1rem;
  .field {
    &--label-zone{
      display: flex;
      flex-direcion: row
    }
    &--label {
      ${Mixins.formLabel};
    }

    &--requiredMark{
      color: red;
      margin-left: 0.5rem;
      font-size: 0.5rem;
    }

    &--input {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #333333;
      width: 100%;
      height: 2.05rem;
      font-size: 0.9rem;
      background: transparent;

      &:focus {
        outline: none;
        border-color: #00a99d;
      }

      &.read-only {
        pointer-events: none;
        border-bottom: 1px solid #bfbdbd;
      }
    }
  }
`;


const NormalField = ({
  field,
  ...props
}) => {
  // console.log('[NormalField]', field);
  // console.log('[NormalField]', props);
  return (
    <NormalFieldDiv className="field">
      <div className="field--label-zone">
        <label className="field--label" htmlFor={field.name}>
          {props.labelTitle}
        </label>
        {props.isRequired ? <div className="field--requiredMark">*</div> : null}
      </div>
      <div>
        <input
          className={props.readOnly ? 'field--input read-only' : 'field--input'}
          id={field.name}
          type="text"
          autoComplete="off"
          {...field}
          {...props}
        />
      </div>
    </NormalFieldDiv>
  );
};


export default NormalField;
