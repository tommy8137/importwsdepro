import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Field from '~~elements/Field';
import Select, { TARGET } from '~~elements/Select';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

const ModalWrap = styled(Modal.Modal)`
  .body-wrap {
    padding: 0 4rem;
  }
  .modal-body {
    height: 15rem;
    padding: 2rem 10rem;
  }
`;


const AddModal = (props) => {
  const {
    isOpen,
    dropdown = [],
    setAddModal,
  } = props;
  const [selected, setSelected] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelected([]);
    }
  }, [isOpen]);

  const handleAddItem = (e) => {
    console.log(selected);
    // TODO: 呼叫Add API，記得討論驗証要怎麼做。
    setAddModal(false);
  };


  // 全部的site
  const allSiteList = (list) => list.map(({ id: value, site_name: label }) => ({ value, label }));

  return (
    <ModalWrap isOpen={isOpen}>
      <Modal.ModalHeader>
        Add Site Group
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <Field.Row>
          <Field.Field width="100%">
            <Field.Label title="Item" isRequired />
            <Select
              options={allSiteList(dropdown)}
              value={selected}
              target={TARGET.BOX}
              isMulti
              onClose={setSelected}
            />
          </Field.Field>
        </Field.Row>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={() => setAddModal(false)}>Cancel</Button>
        <Button color="black" onClick={handleAddItem}>Save</Button>
      </Modal.ModalFooter>
    </ModalWrap>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.plasticCleanSheet.emiSputteringSite.list,
    dropdown: state.plasticCleanSheet.emiSputteringSite.dropdown,
  };
};

const mapDispatchToProps = {
  getEmiSputteringSite: PlasticCleanSheetActions.getEmiSputteringSite,
  updateEmiSputteringSite: PlasticCleanSheetActions.updateEmiSputteringSite,
  pushNotification: NotificationSystemActions.pushNotification,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(AddModal);
