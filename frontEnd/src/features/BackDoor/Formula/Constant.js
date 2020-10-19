import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Button from '~~elements/Button';

const inputStyle = {
  width: '200px',
  display: 'inline-block'
};

function Constant({ constant, onChange, onRemove }) {
  function handleChange(key, key2) {
    return (e) => {
      onChange(`constant.${key2}.${key}`, e.target.value);
    };
  }

  return (
    <div style={{}}>
      {Object.keys(constant).map((key, idx) => (
        <div key={key}>
          <span>{key}</span> :
          label: <Input style={inputStyle} value={constant[key].label} onChange={handleChange('label', key)} />{' '}
          value: <Input style={inputStyle} value={constant[key].value} onChange={handleChange('value', key)} />
          <Button color="black" onClick={onRemove('constant', key)}>Remove</Button>
        </div>
      ))}
    </div>
  );
}

Constant.defaultProps = {
  // {"const1":{"label":"單價","value":0.15},"const2":{"label":"loss rate","value":1.015},"const3":{"label":"工時費","value":0.045}}
  constant: {},
};
export default (Constant);
