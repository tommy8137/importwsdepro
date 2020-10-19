import React from 'react';
import Modal from '~~elements/Modal';
import * as R from 'ramda';
import { ADD_MODAL } from '~~features/Database/ME/MaterialPrice/MaterialConst';


const AddModalWrap = (props) => {
  const {
    // props
    isOpen,
    addModalPath = [],
  } = props;
  const component = R.path(addModalPath, ADD_MODAL);
  const render = component.render ? component.render(props) : (null);

  return (
    <Modal.Modal
      isOpen={isOpen}
    >
      {render}
    </Modal.Modal>
  );
};

export default AddModalWrap;
