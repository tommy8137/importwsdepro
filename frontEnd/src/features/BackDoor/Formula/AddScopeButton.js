import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Button from '~~elements/Button';

const inputStyle = {
  width: '100px',
  display: 'inline-block'
};

function AddScopeButton({ onAdd }) {
  const [name, setName] = useState('');
  const [variable, setVariable] = useState('');

  function handleAdd() {
    setName('');
    setVariable('');
    onAdd(name, variable);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeVariable(e) {
    setVariable(e.target.value);
  }

  return (
    <span>
      const: <Input style={inputStyle} value={name} onChange={handleChangeName} />
      var: <Input style={inputStyle} value={variable} onChange={handleChangeVariable} />
      <Button color="black" onClick={handleAdd} disabled={!name || !variable}>Add Scope</Button>
    </span>
  );
}

AddScopeButton.defaultProps = {
};
export default (AddScopeButton);
