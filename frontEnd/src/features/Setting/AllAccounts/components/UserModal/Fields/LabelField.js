

import React from 'react';
import styled from 'styled-components';
import { baseReactSelect } from '~~elements/PartListForm/Fields/FieldStyles';

const FieldTitle = styled.div`
  display: flex;
  flex-direction: row;
`;

const Div = styled.div`
  ${baseReactSelect};
  p {
    min-height: 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #333;
  }
`;


const SelectField = (props) => {
  const {
    value,
    labelTitle,
    name,
  } = props;


  return (
    <Div className="duck-field">
      <FieldTitle>
        <label className="duck-field--label-zone--label" htmlFor={name}>
          {labelTitle}
        </label>
        <div className="duck-field--label-zone--requiredMark">*</div>
      </FieldTitle>
      <p>{value}</p>
    </Div>
  );
};


export default SelectField;
