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

const textarea2Style = {
  width: '300px',
  height: '65px',
  display: 'inline-block'
};
function FormulaFunc({ name, formula, onChange }) {
  function handleChange(key) {
    return (e) => {
      onChange(`formula.${name}.${key}`, e.target.value);
    };
  }

  function handleParam(e) {
    onChange(`formula.${name}.param`, e.target.value.split(';'));
  }

  return (
    <div style={{ display: 'flex' }}>
      label: <Input style={inputStyle} value={formula.label} onChange={handleChange('label')} />
      formula: <Input type="textarea" style={textareaStyle} value={formula.formula} onChange={handleChange('formula')} />
      param: <Input type="textarea" style={textarea2Style} value={(formula.param || []).join(';')} onChange={handleParam} />
    </div>
  );
}

FormulaFunc.defaultProps = {
  // { "type": "MATH", "formula": "finAmount > 0 ?sub3 + const1 + secondary_processing_cost + sub2 + processing_cost + management_cost :0", "label": "單價" }
  formula: {},
};
export default (FormulaFunc);
