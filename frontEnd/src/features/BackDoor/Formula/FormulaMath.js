import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';

const inputStyle = {
  width: '200px',
  display: 'inline-block'
};

const textareaStyle = {
  width: '995px',
  height: '65px',
  display: 'inline-block'
};
function FormulaMath({ name, formula, onChange }) {
  function handleChange(key) {
    return (e) => {
      onChange(`formula.${name}.${key}`, e.target.value);
    };
  }

  return (
    <div style={{ display: 'flex' }}>
      label: <Input style={inputStyle} value={formula.label} onChange={handleChange('label')} />
      formula: <Input type="textarea" style={textareaStyle} value={formula.formula} onChange={handleChange('formula')} />
    </div>
  );
}

FormulaMath.defaultProps = {
  // { "type": "MATH", "formula": "finAmount > 0 ?sub3 + const1 + secondary_processing_cost + sub2 + processing_cost + management_cost :0", "label": "單價" }
  formula: {},
};
export default (FormulaMath);
