import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import Button from '~~elements/Button';
import Modal from '~~elements/Modal';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import { NumberInput } from '../../component/Input';


const StyledModal = styled(Modal.Modal)`
  .modal-body {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    div {
      margin: 0 0.25rem;
    }
  }
`;


function CopyPriceModal(props) {
  // === props ===
  const {
    getCopyPrice,
    activeTab,
    isOpenCopy,
    edmVersionID: edmVersionId,
  } = props;
  // === state ===
  /**
   * 週數
   */
  const [weekCount, setWeekCount] = useState(26);
  const [weekError, setWeekError] = useState(null);

  const resetFormState = () => {
    setWeekCount(26);
    setWeekError(null);
  };

  // === click button ===
  const handleClickApply = () => {
    // click apply
    getCopyPrice({
      type: activeTab.type,
      weeks: weekCount,
      edmVersionId,
    });
  };

  const handleClickCancel = () => {
    props.toggleCopyModal(false);
  };

  useEffect(() => {
    if (!isOpenCopy) {
      resetFormState();
    }
  }, [isOpenCopy]);

  return (
    <StyledModal
      isOpen={isOpenCopy}
      moreSpace
    >
      <Modal.ModalHeader tag="div" >
        Copy Price Information
      </Modal.ModalHeader>
      <Modal.ModalBody>
          Copy latest price information from past
        <NumberInput
          needFloat={false}
          min={1}
          max={26}
          onChange={(value, error) => {
            setWeekCount(value);
            setWeekError(error);
          }}
          value={weekCount}
        />
          week(s)
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleClickCancel}>Cancel</Button>
        <Button color="black" disabled={!weekCount || !!weekError} onClick={handleClickApply}>Apply</Button>
      </Modal.ModalFooter>
    </StyledModal>
  );
}


const mapStateToProps = (state) => {
  return {
    isOpenCopy: state.eeBomPersonalReducer.isOpenCopy,
    activeTab: state.eeBom.activeTab,
    edmVersionID: state.eeBom.edmVersionID,
  };
};

const mapDispatchToProps = {
  getCopyPrice: EEBomPersonalActions.getCopyPrice,
  toggleCopyModal: EEBomPersonalActions.toggleCopyModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(CopyPriceModal);
