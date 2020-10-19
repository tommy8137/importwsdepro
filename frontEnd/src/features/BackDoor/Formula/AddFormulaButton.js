import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import Button from '~~elements/Button';

import FormulaTypeSelect from './FormulaTypeSelect';

const inputStyle = {
  width: '100px',
  display: 'inline-block'
};

const input2Style = {
  width: '500px',
  display: 'inline-block'
};


function AddFormulaButton({ onAdd }) {
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [formula, setFormula] = useState('');
  const [type, setType] = useState('');

  function handleAdd() {
    setName('');
    setType('');
    setLabel('');
    setFormula('');
    onAdd(name, type.value, label, formula);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeType(option) {
    setType(option);
  }
  function handleChangeLabel(e) {
    setLabel(e.target.value);
  }
  function handleChangeFormula(e) {
    setFormula(e.target.value);
  }

  return (
    <span>
      Const: <Input style={inputStyle} value={name} onChange={handleChangeName} />
      Type: <FormulaTypeSelect name={name} onChange={handleChangeType} value={type} />
      Label: <Input style={inputStyle} value={label} onChange={handleChangeLabel} />
      Formula: <Input style={input2Style} value={formula} onChange={handleChangeFormula} />
      <Button color="black" onClick={handleAdd} disabled={!name || !label || !formula}>Add Formula</Button>
    </span>
  );
}

AddFormulaButton.defaultProps = {
};
export default (AddFormulaButton);
