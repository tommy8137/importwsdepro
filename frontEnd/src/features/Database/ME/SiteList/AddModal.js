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

const AddModal = (props) => {
  const { isOpen, setAddModal, handleAddItem } = props;
  const [siteName, setSiteName] = useState('');
  const [remark, setRemark] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSiteName('');
      setRemark('');
    }
  }, [isOpen]);

  return (
    <ModalWrap isOpen={isOpen}>
      <Modal.ModalHeader>
        Add Site
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <div className="body-wrap">
          <Field.Row>
            <Field.Field width="80%">
              <Field.Label title="Site Name" isRequired />
              <Field.Input
                onChange={e => setSiteName(e.target.value)}
                value={siteName}
              />
            </Field.Field>
          </Field.Row>
          <Field.Row>
            <Field.Field width="100%">
              <Field.Label title="Remark" />
              <Field.Textarea
                onChange={e => setRemark(e.target.value)}
                value={remark}
              />
            </Field.Field>
          </Field.Row>
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => handleAddItem(siteName, remark)} disabled={!siteName}>Save</Button>
      </Modal.ModalFooter>
    </ModalWrap>
  );
};

export default AddModal;
