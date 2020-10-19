import React, { Component } from 'react';
import styled from 'styled-components';

import * as Mixins from '~~styles/_mixins';

const NormalFieldDiv = styled.div`
  margin-bottom: 1rem;
  .field {

    &--label {
      ${Mixins.formLabel};
    }

    &--input {
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #333333;
      width: 100%;
      height: 2.375rem;

      &:focus {
        outline: none;
        border-color: #00a99d;
      }

      &.read-only {
        pointer-events: none;
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
      <label
        className="field--label"
        htmlFor={field.name}
      >
        {props.labelTitle}
      </label>
      <div>
        <input
          className={props.readOnly ? 'field--input read-only' : 'field--input'}
          id={field.name}
          type="text"
          {...field}
          {...props}
        />
      </div>
    </NormalFieldDiv>
  );
};


export default NormalField;
