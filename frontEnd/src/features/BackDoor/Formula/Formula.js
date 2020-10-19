import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _set from 'lodash/set';
import _omit from 'lodash/omit';
import BackDoorResource from '~~apis/resource/BackDoorResource';
import Button from '~~elements/Button';
import { Input, Alert } from 'reactstrap';

import Constant from './Constant';
import Scope from './Scope';
import FormulaMath from './FormulaMath';
import FormulaFunc from './FormulaFunc';
import AddFormulaButton from './AddFormulaButton';
import AddScopeButton from './AddScopeButton';
import AddConstButton from './AddConstButton';

const VariableDiv = styled.div`
  width: 100%;
  display: flex;

  .scope,
  .constant {
    width: 50%;
  }
`;

const initFormula = {
  formula: {
    total: {
      type: 'MATH',
      formula: 'Start_new_formula_here__please_change_it',
      label: '計算結果'
    },
  },
  scope: {
  },
  constant: {
  }
};
function Formula() {
  const [formulas, setFormulas] = useState([]);
  const [selectedFormula, setSelectedFormula] = useState({});
  const [status, setStatus] = useState('');
  const [newFormulaName, setNewFormulaName] = useState('');

  const {
    content: formula = { formula: {}, scope: {}, constant: {} }
  } = selectedFormula;

  async function initData(defaultConfingName = '') {
    const result = await BackDoorResource.getFormauls();
    setFormulas(result.data);
    if (result.data.length) {
      const findFormula = result.data.find(i => i.name === defaultConfingName);
      if (!findFormula) {
        setSelectedFormula(result.data[0]);
      } else {
        setSelectedFormula(findFormula);
      }
    }
  }
  useEffect(() => {
    initData();
  }, []);

  function handleSelect(formulaItem) {
    return () => {
      setSelectedFormula(formulaItem);
      setStatus('');
    };
  }

  function handleChange(path, value) {
    setStatus('');
    setSelectedFormula({
      ...selectedFormula,
      content: _set(formula, path, value)
    });
  }

  async function handleSave() {
    try {
      await BackDoorResource.saveFormula(selectedFormula.name, formula);
      setStatus('Saved!!!');
    } catch (err) {
      setStatus('Save failed');
    }
  }

  function handleAddFormula(name, type, label, val) {
    setStatus('');
    setSelectedFormula({
      ...selectedFormula,
      content: _set(formula, `formula.${name}`, {
        type,
        label,
        formula: val
      })
    });
  }

  function handleAddScope(name, value) {
    setStatus('');
    setSelectedFormula({
      ...selectedFormula,
      content: _set(formula, `scope.${name}`, value)
    });
  }

  function handleAddConst(name, label, value) {
    setStatus('');
    setSelectedFormula({
      ...selectedFormula,
      content: _set(formula, `constant.${name}`, {
        label,
        value
      })
    });
  }

  function handleRemove(name, key) {
    return () => {
      setStatus('');
      setSelectedFormula({
        ...selectedFormula,
        content: {
          ...formula,
          [name]: _omit(formula[name], [key])
        }
      });
    };
  }

  async function handleAddNewFormula() {
    try {
      await BackDoorResource.saveFormula(newFormulaName, initFormula);
      await initData(newFormulaName);
    } catch (err) {
      console.error(err);
    }
  }
  async function handlenewFormulaNameChange(e) {
    setNewFormulaName(e.target.value);
  }

  const { total = {}, ...restFormula } = formula.formula;

  return (
    <div style={{ padding: '20px' }}>
      <Alert color="danger">免責說明：此功能目前僅供在 開發環境(development) 時使用，在正式環境使用後果需自行負責，感謝！</Alert>
      <h4>
        All Formulas
        <Input style={{ width: '300px', display: 'inline' }} value={newFormulaName} onChange={handlenewFormulaNameChange} />
        <Button color="white" onClick={handleAddNewFormula} disbaled={!newFormulaName}>
          Add Fomula
        </Button>
      </h4>

      {formulas.map(item => (
        <Button
          key={item.name}
          color={selectedFormula.name === item.name ? 'black' : 'white'}
          onClick={handleSelect(item)}
        >
          {item.name}
        </Button>
      ))}
      <hr />
      <Button color="white" onClick={handleSave}>
        Save
      </Button>
      <span>{status}</span>
      <hr />
      <div>
        <h4>formula</h4>
        <AddFormulaButton onAdd={handleAddFormula} />
        <h5 color="primary">total</h5>{' '}
        <FormulaMath name="total" formula={total} onChange={handleChange} />
        {Object.keys(restFormula).map(key => (
          <div>
            <h5 color="primary">
              {key}{' '}
              <Button color="black" onClick={handleRemove('formula', key)}>
                Remove
              </Button>
            </h5>
            {restFormula[key].type === 'MATH' ? (
              <FormulaMath
                name={key}
                formula={restFormula[key]}
                onChange={handleChange}
              />
            ) : (
              <FormulaFunc
                name={key}
                formula={restFormula[key]}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
      </div>
      <hr />
      <VariableDiv>
        <div className="scope">
          <h4>scope</h4>
          <AddScopeButton onAdd={handleAddScope} />
          <Scope
            scope={formula.scope}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        </div>
        <hr />
        <div className="constant">
          <h4>constant</h4>
          <AddConstButton onAdd={handleAddConst} />
          <Constant
            constant={formula.constant}
            onChange={handleChange}
            onRemove={handleRemove}
          />
        </div>
      </VariableDiv>
    </div>
  );
}

export default Formula;
