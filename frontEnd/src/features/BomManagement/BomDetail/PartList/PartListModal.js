import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Modal from '~~elements/Modal';
import * as R from 'ramda';
import Button from '~~elements/Button';
import traverse from 'traverse';

import { PartListForm, PartListMenu, PartlistFormContext } from '~~elements/PartListForm';
import * as PartlistActions from './PartlistActions';


const ModalContainer = styled(Modal.Modal)`
  .debug-select {
    position: absolute;
    top: 0;
    left: 0;
  }

  .modal-left-block {
    >.side-menu {
      width: 14rem;
    }
  }

  .modal-right-block {
    width: 100%;
    flex: 0 100%;
    min-width: 0;
    overflow: hidden;
  }

  .modal-body {
    display: flex;
    flex-wrap: nowrap;
    padding: 0rem
  }
`;

const PartlistModal = (props) => {
  const {
    isOpen,
    toggleModal,
    partlistName,
    partItemInfo,
    partItemValues,
    partItemPrice,
    partItemLayout,
    canEditWhenNPointSeven,
    historyMode,
    productType,
    site,
    denyViewSystemCost,
    projectSource,
    bomVersion,
    version,
  } = props;

  const { handleSubmit, clearErrors, validation, contextValues } = useContext(PartlistFormContext);
  const { needCePolicy } = contextValues;

  useEffect(() => {
    if (!isOpen) {
      clearErrors();
    }
  }, [isOpen]);

  const handleCancel = () => {
    toggleModal(false);
  };

  const handleSave = async (error, data) => {
    if (error) console.error('Error:', error);

    // console.log('>>> SAVE FORMAT', data);
    props.updatePartItemDetail(partItemInfo.bom_id, partlistName, data);
  };

  function checkIsDisplay() {
    if (projectSource === 'EMDM') {
      // version X.0 就disabled
      let versionRegex = /^V\d+\.0$/g;
      let nPointZero = versionRegex.test(version);
      return !historyMode && needCePolicy && !nPointZero;
    }
    return !historyMode && canEditWhenNPointSeven;
  }

  const buttonConfig = {
    cancel: {
      display: true,
      color: 'white',
      onClick: handleCancel,
      children: historyMode ? 'Close' : 'Cancel',
    },
    save: {
      display: checkIsDisplay(),
      color: 'black',
      onClick: handleSubmit,
      disabled: !validation(),
      children: 'Save',
    },
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      toggleModal={toggleModal}
      widthType={partItemLayout.showMenu === false ? 'middle' : 'large'}
    >
      <Modal.ModalHeader>
        {`${partItemInfo.type1} ${partItemInfo.type2} - Partlist`}
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <div className="modal-left-block">
          {partItemLayout.showMenu === false ? (null) : <PartListMenu />}
        </div>
        <div className="modal-right-block">
          <PartListForm
            validateWithAllErrorMsg
            denyViewSystemCost={denyViewSystemCost}
            partItemLayout={partItemLayout}
            partItemInfo={{ ...partItemInfo, productType, site, version: bomVersion }}
            initialData={R.path(['partlist_value', 'formData'], partItemValues)}
            partItemPrice={R.path(['partlist_price', 'forDebug', 'debugInfo'], partItemPrice)}
            onSubmit={handleSave}
            isViewMode={!checkIsDisplay()}
          />
        </div>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        {buttonConfig.cancel.display && <Button {...buttonConfig.cancel} />}
        {buttonConfig.save.display && <Button {...buttonConfig.save} />}
      </Modal.ModalFooter>
    </ModalContainer>
  );
};

export default connect(
  (state) => {
    return {
      partItemInfo: state.partlist.partItemInfo,
      partItemLayout: state.partlist.partItemLayout,
      partItemValues: state.partlist.partItemValues,
      partItemPrice: state.partlist.partItemPrice,
      partlistName: state.partlist.partlistName,
      canEditWhenNPointSeven: state.bomDetail.canEditWhenNPointSeven,
      historyMode: state.bomDetail.historyMode,
      productType: state.bomDetail.bomData.productType,
      site: state.bomDetail.bomData.site,
      projectSource: state.bomDetail.bomData.projectSource,
      bomVersion: state.bomDetail.currentVersion.value || 'CURRENT',
      version: state.bomDetail.bomData.version,
    };
  },
  {
    updatePartItemDetail: PartlistActions.updatePartItemDetail
  }
)(PartlistModal);
