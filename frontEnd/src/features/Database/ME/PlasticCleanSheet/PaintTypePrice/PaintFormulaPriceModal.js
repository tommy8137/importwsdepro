import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import _get from 'lodash/get';
import Button from '~~elements/Button';
import Field from '~~elements/Field';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';

const EditBomModal = styled(Modal.Modal)`
  .modal-content{
    min-height: 43rem
  }
`;


function PaintFormulaPriceModal(props) {
  const [errors, setErrors] = useState({});
  const [fields, setFields] = useState([]);

  const {
    date = {},
    paintFormulaPriceData = {},
    togglePaintFormulaPriceModal = () => { },
    putPaintFormulaPrice = () => { },
    paintFormulaPriceModalOpen = false,
    paintFormulaPriceModalReadOnly = false,
  } = props;


  useEffect(() => {
    const newFields = _get(paintFormulaPriceData, 'paintFormulaPirce', []);
    setFields(newFields);
  }, [JSON.stringify(paintFormulaPriceData), paintFormulaPriceModalReadOnly]);

  useEffect(() => {
    if (paintFormulaPriceModalReadOnly) {
      setErrors({});
    } else {
      const newErrors = fields.reduce((prev, curr) => {
        const { value, key } = curr;
        const isValueNull = value === null || value === '';
        if (isValueNull) {
          return { ...prev, [key]: '此欄位為必填' };
        }
        return prev;
      }, {});
      setErrors(newErrors);
    }
  }, [JSON.stringify(fields), paintFormulaPriceModalReadOnly]);

  function handleCancel() {
    const newFields = _get(paintFormulaPriceData, 'paintFormulaPirce', []);
    setFields(newFields);
    togglePaintFormulaPriceModal(false);
  }

  function handleChange(key, value) {
    const newFields = fields.reduce((prev, curr) => {
      return [
        ...prev,
        {
          ...curr,
          value: curr.key === key ? value : curr.value
        }
      ];
    }, []);
    setFields(newFields);
  }

  function handleSave() {
    const newPaintFormulaPrice = fields.map(obj => {
      return {
        key: obj.key,
        value: obj.value,
      };
    });
    const data = {
      ...paintFormulaPriceData,
      nextId: date.nextId,
      paintFormulaPirce: newPaintFormulaPrice
    };
    // console.log('data >>>', data);
    putPaintFormulaPrice(data);
  }

  const hasError = Object.keys(errors).length > 0;

  return (
    <EditBomModal isOpen={paintFormulaPriceModalOpen}>
      <Modal.ModalHeader>
        混合漆
      </Modal.ModalHeader>
      <Modal.ModalBody>
        {/* 表單內容 */}
        <div className="form-box">
          <Field.Row>
            {
              fields.map(field => {
                const {
                  key,
                  label,
                  dataType,
                } = field;

                const value = _get(field, 'value', '');
                const errorMessage = paintFormulaPriceModalReadOnly ? '' : _get(errors, key, '');
                return (
                  <Field.Field width="50%" key={key}>
                    <Field.Label
                      isRequired
                      title={label}
                    />
                    <Field.ConvertInput
                      onChange={val => handleChange(key, val)}
                      value={value}
                      dataType={dataType}
                      disabled={paintFormulaPriceModalReadOnly}
                    />
                    {errorMessage && <Field.FieldError errorMessage={errorMessage} />}
                  </Field.Field>
                );
              })
            }
          </Field.Row>
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleCancel}>
          Close
        </Button>
        {!paintFormulaPriceModalReadOnly &&
          <Button color="black" onClick={handleSave} disabled={hasError}>
            Save
          </Button>}
      </Modal.ModalFooter>
    </EditBomModal>
  );
}


const mapStateToProps = (state) => {
  return {
    date: state.plasticCleanSheet.paintTypePrice.date,
    paintFormulaPriceModalOpen: state.plasticCleanSheet.paintTypePrice.paintFormulaPriceModalOpen,
    paintFormulaPriceModalReadOnly: state.plasticCleanSheet.paintTypePrice.paintFormulaPriceModalReadOnly,
    paintFormulaPriceData: state.plasticCleanSheet.paintTypePrice.paintFormulaPriceData,
  };
};
const mapDispatchToProps = {
  togglePaintFormulaPriceModal: PlasticCleanSheetActions.togglePaintFormulaPriceModal,
  putPaintFormulaPrice: PlasticCleanSheetActions.putPaintFormulaPrice,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PaintFormulaPriceModal);
