import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '~~elements/Modal';
import { PartlistContextProvider } from '~~elements/PartListForm';
import * as R from 'ramda';
import { PATH, PCB_COMPONENTS } from './PcbDetailConst';


const ModalWrap = styled(Modal.Modal)`
 .box {
    margin-bottom: 1rem;
  }
  .sub-title {
    padding: 0 1rem;
    line-height: 40px;
    background-color: #e4e4e4;
    justify-content: space-between;
    display: flex;
    align-items: center;
  }
`;

const SetPCBDetailModal = (props) => {
  const {
    // state
    pcbModalInfo: { path },
    // props
    isOpen
  } = props;
  const component = R.path([path], PCB_COMPONENTS);
  const render = component.render(props) || (null);

  function getWidthType() {
    let type;
    switch (path) {
      case PATH.PCB_DETAIL_MODAL:
        type = 'large';
        break;
      case PATH.PCB_SPECS_MODAL:
        type = 'middle';
        break;
      case PATH.ADD_PCB_MODAL:
        type = 'small';
        break;
      default:
        type = 'large';
    }
    return type;
  }
  return (
    <PartlistContextProvider>
      <ModalWrap
        isOpen={isOpen}
        widthType={getWidthType()}
        // moreSpace={path === PATH.ADD_PCB_MODAL}
      >
        {render}
      </ModalWrap>
    </PartlistContextProvider>
  );
};

export default connect(
  (state) => {
    return {
      pcbModalInfo: state.pcbDetail.pcbModalInfo,
    };
  },
  {
  }
)(SetPCBDetailModal);

