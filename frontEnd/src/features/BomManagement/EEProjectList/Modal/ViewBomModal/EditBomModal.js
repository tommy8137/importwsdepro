import React, { useState, useEffect, useRef, Fragment } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import _get from 'lodash/get';

import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import Switch from '~~elements/Switch';
import ProjectForm from './ProjectForm';

const HeaderFunction = styled.span`
  position: absolute;
  right: 0px;
  top: 5px;
  font-size: 0.875rem;
  font-weight: normal;
`;

function EditBomModal(props) {
  const {
    edmVersionID,
    eeBomProjectId,
    isOpen = false,
    onClickSave,
    onClickCancel,
    bomData,
    showAvl,
    disabledAvl,
  } = props;

  const [viewMode, setViewMode] = useState(true);
  const [formData, setFormData] = useState(null);
  const [alertMsg, setAlertMsg] = useState('');
  const [avl, setAvl] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setFormData(bomData);
      setAvl(_get(bomData, 'avl', false));
      setViewMode(true);
    }
  }, [isOpen]);

  function handleSwitchMode() {
    setViewMode(false);
  }

  function handleClickCancel() {
    onClickCancel();
    setViewMode(true);
  }

  function handleClickSave(e) {
    onClickSave(formData);
  }

  function handleOnChange(newFormData) {
    setFormData({
      ...formData,
      ...newFormData
    });
  }

  function handleToggleAvl(e) {
    setAvl(e.target.checked);
    handleOnChange({ avl: e.target.checked });
    const msg = _get(formData, 'avl', false) ? '是否確定取消套用AVL？' : '是否確定要套用AVL？';
    setAlertMsg(msg);
  }

  function handleSureChangeAVL(e) {
    setAlertMsg('');
    onClickSave(formData);
  }

  function handleCancelChangeAVL(e) {
    setFormData(bomData);
    setAvl(_get(bomData, 'avl', false));
    setAlertMsg('');
  }

  const plantCode = _get(formData, 'plant_code', []);
  // 計算plant選了幾個
  const plantSelectCount = plantCode.reduce((prev, curr) => {
    const { plants = [] } = curr;
    const count = plants.filter(p => p.value === true).length;
    return prev + count;
  }, 0);

  // plantㄧ定要至少選一個
  const plantIsInvalid = plantSelectCount <= 0;

  function getHeaderButtons() {
    if (showAvl) {
      return (
        <Fragment>
          <Switch
            disabled={disabledAvl}
            checked={avl}
            onChange={handleToggleAvl}
          />
            AVL
        </Fragment>);
    }

    if (onClickSave && viewMode && showAvl === undefined) {
      return (
        <Button
          color="transparent"
          round
          mini
          onClick={handleSwitchMode}
        >Edit BOM Info
        </Button>);
    }

    return null;
  }

  return (
    <Modal.Modal isOpen={isOpen}>
      <Modal.ModalHeader>
        {viewMode ? 'BOM Information' : 'Edit BOM Information'}
        <HeaderFunction>
          {getHeaderButtons()}
        </HeaderFunction>
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <ProjectForm
          edmVersionID={edmVersionID}
          eeBomProjectId={eeBomProjectId}
          viewMode={viewMode}
          onChange={handleOnChange}
        />
        <Alert isOpen={alertMsg} type="alarm">
          <div className="row">{alertMsg}</div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={handleSureChangeAVL}
            >
              確定
            </Button>
            <Button
              color="transparentInModal"
              border={false}
              onClick={handleCancelChangeAVL}
            >
              取消
            </Button>
          </div>
        </Alert>
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleClickCancel}>Cancel</Button>
        {!viewMode &&
          <Button
            color="black"
            onClick={handleClickSave}
            disabled={plantIsInvalid}
          >
            Save
          </Button>
        }
      </Modal.ModalFooter>
    </Modal.Modal>);
}

export default EditBomModal;
