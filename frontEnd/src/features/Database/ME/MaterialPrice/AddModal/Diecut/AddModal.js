import React, { Fragment, useState } from 'react';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Select from '~~elements/Select';
import Field from '~~elements/Field';

const initialFormData = {
  partCategory2Id: null,
  remark: '',
  itemName: '',
};

const LeftAddModal = (props) => {
  const { setAddModal, onAdd, isSaveBtnInvalid, dieCutType2List } = props;
  const [formData, setFormData] = useState(initialFormData);
  const { partCategory2Id, itemName, remark } = formData;
  const partCate2Options = dieCutType2List.map(obj => ({ label: obj.partCategory2Name, value: obj.partCategory2Id }));
  const validBtn = {
    validOne: partCategory2Id,
    validTwo: itemName,
  };
  function handleChange(key, val) {
    const newForm = { ...formData, [key]: val };
    setFormData(newForm);
  }

  function handleChangeType2(opt) {
    const { value: val } = opt;
    handleChange('partCategory2Id', val);
  }
  return (
    <Fragment>
      <Modal.ModalHeader>
        Add Material Spec
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <Field.Row>
          <Field.Field width="50%">
            <Field.Label title="Material Spec Name" isRequired />
            <Field.ConvertInput
              maxLength={200}
              onChange={(val) => handleChange('itemName', val)}
              value={itemName}
              dataType="string"
            />
          </Field.Field>
          <Field.Field width="50%">
            <Field.Label title="Parts Category II" isRequired />
            <Select
              options={partCate2Options}
              value={partCate2Options.find(obj => obj.value === partCategory2Id)}
              onChange={handleChangeType2}
            />
          </Field.Field>
          <Field.Field width="100%">
            <Field.Label title="Remark" />
            <Field.ConvertInput
              maxLength={400}
              onChange={(val) => handleChange('remark', val)}
              value={remark}
              dataType="string"
            />
          </Field.Field>
        </Field.Row>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={() => onAdd(formData)} disabled={isSaveBtnInvalid(validBtn)}>Save</Button>
      </Modal.ModalFooter>
    </Fragment>
  );
};

export default LeftAddModal;
