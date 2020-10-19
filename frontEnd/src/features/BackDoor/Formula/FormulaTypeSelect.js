import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Select from 'react-select';

const Options = [
  { label: 'MATH', value: 'MATH' },
  { label: 'FUNC', value: 'FUNC' },
];

function FormulaTypeSelect({ value, onChange }) {
  function handleChange(option) {
    onChange(option);
  }

  return (
    <div style={{ width: '130px', display: 'inline-block' }}>
      <Select options={Options} value={value} onChange={handleChange} />
    </div>
  );
}

FormulaTypeSelect.defaultProps = {
};
export default (FormulaTypeSelect);
