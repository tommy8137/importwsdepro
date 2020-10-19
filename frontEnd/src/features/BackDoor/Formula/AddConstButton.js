import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Button from '~~elements/Button';

const inputStyle = {
  width: '100px',
  display: 'inline-block'
};

function AddConstButton({ onAdd }) {
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [val, setVal] = useState('');

  function handleAdd() {
    setName('');
    setLabel('');
    setVal('');
    onAdd(name, label, val);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLabel(e) {
    setLabel(e.target.value);
  }
  function handleChangeVal(e) {
    setVal(e.target.value);
  }

  return (
    <span>
      Const: <Input style={inputStyle} value={name} onChange={handleChangeName} />
      Label: <Input style={inputStyle} value={label} onChange={handleChangeLabel} />
      Value: <Input style={inputStyle} value={val} onChange={handleChangeVal} />
      <Button color="black" onClick={handleAdd} disabled={!name || !label || !val}>Add Const</Button>
    </span>
  );
}

AddConstButton.defaultProps = {
};
export default (AddConstButton);
