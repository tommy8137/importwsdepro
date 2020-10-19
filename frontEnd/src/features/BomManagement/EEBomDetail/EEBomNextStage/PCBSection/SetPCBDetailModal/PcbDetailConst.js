import React from 'react';
import PCBDetailModal from './PCBDetailModal';
import PCBSpecsModal from './PCBSpecsModal';
import AddPCBModal from './AddPCBModal';


export const PATH = {
  PCB_DETAIL_MODAL: 'PCBDetailModal',
  ADD_PCB_MODAL: 'AddPCBModal',
  PCB_SPECS_MODAL: 'PCBSpecsModal'
};

export const PCB_COMPONENTS = {
  [PATH.PCB_DETAIL_MODAL]: {
    render: (props) => <PCBDetailModal {...props} />
  },
  [PATH.ADD_PCB_MODAL]: {
    render: (props) => (<AddPCBModal {...props} />)
  },
  [PATH.PCB_SPECS_MODAL]: {
    render: (props) => (<PCBSpecsModal {...props} />)
  }
};

export const MODAL_ACTION = {
  ADD: 'Add',
  EDIT: 'Edit',
};

export const BOARD_TYPE = {
  MAIN: 0,
  SMALL: 1,
};

export default {};

