import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Button from '~~elements/Button';

const inputStyle = {
  width: '200px',
  display: 'inline-block'
};

function Scope({ scope, onChange, onRemove }) {
  function handleChange(key) {
    return (e) => {
      onChange(`scope.${key}`, e.target.value);
    };
  }


  return (
    <div style={{}}>
      {Object.keys(scope).map((key) => (
        <div key={key}>
          <span>{key}</span> : <Input style={inputStyle} value={scope[key]} onChange={handleChange(key)} />
          <Button color="black" onClick={onRemove('scope', key)}>Remove</Button>
        </div>
      ))}
    </div>
  );
}

Scope.defaultProps = {
  // {"clipAmount": "clipAmount"}
  scope: {},
};
export default (Scope);
