import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';

const ModalWrap = styled(Modal.Modal)`
  .body-wrap {
    padding: 0 4rem;
  }
`;


const initialPriceData = {
  NB: 10,
  DT: 10,
  Others: 10
};
const AddModal = (props) => {
  const { isOpen, setAddModal, handleAddItem } = props;
  const [itemName, setItemName] = useState('');
  const [remark, setRemark] = useState('');
  const [priceData, setPriceData] = useState(initialPriceData);

  useEffect(() => {
    if (isOpen) {
      setItemName('');
      setRemark('');
      setPriceData(initialPriceData);
    }
  }, [isOpen]);


  return (
    <ModalWrap isOpen={isOpen}>
      <Modal.ModalHeader>
        Add 噴漆類型
      </Modal.ModalHeader>
      <Modal.ModalBody>

        <Field.Row>
          <Field.Field width="100%">
            <Field.Label title="Item" isRequired />
            <Field.Input
              onChange={e => setItemName(e.target.value)}
              value={itemName}
            />
          </Field.Field>
        </Field.Row>
        <Field.Row>
          <Field.Field width="100%">
            <Field.Label title="Remark" isRequired />
            <Field.Input
              onChange={e => setRemark(e.target.value)}
              value={remark}
            />
          </Field.Field>
        </Field.Row>
        <Field.Row>
          <Field.Field width="100%">
            <Field.Label title="Price" isRequired />
          </Field.Field>
        </Field.Row>
        <Field.Row>
          {
            Object.keys(priceData).map(key => {
              return (

                <Field.Field width="100%">
                  <Field.Label title={key} isRequired />
                  <Field.Input
                    onChange={e => setPriceData({ ...priceData, [key]: e.target.value })}
                    value={priceData[key]}
                  />
                </Field.Field >

              );
            })
          }
        </Field.Row>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => handleAddItem()}>Save</Button>
      </Modal.ModalFooter>
    </ModalWrap>
  );
};

export default AddModal;
