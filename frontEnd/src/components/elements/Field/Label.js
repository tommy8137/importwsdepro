import React from 'react';
import styled from 'styled-components';
import * as Mixins from '~~styles/_mixins';

const FieldLabel = styled.div`
  .duck-field {
    &--label-zone {
      display: flex;
      flex-direction: row;
      &--label {
        ${Mixins.formLabel};
        display: flex;
        align-items: center;
      }
      &--requiredMark {
        color: red;
        margin-left: 0.2rem;
        font-size: 0.5rem;
      }
      &--description {
        color: red;
        margin-left: 0.2rem;
        font-size: 0.6rem
      }
    }
  }
  display: flex;
  flex-direction: row;
`;


const Label = (props) => {
  return (
    <FieldLabel>
      <label className="duck-field--label-zone--label">
        {props.children || props.title}
      </label>
      {
        props.isRequired && (
          <div className="duck-field--label-zone--requiredMark">*</div>
        )
      }
    </FieldLabel>
  );
};

Label.defaultProps = {
  isRequired: false,
  title: ''
};

export default Label;
