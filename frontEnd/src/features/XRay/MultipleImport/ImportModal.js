import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Modal from '~~elements/Modal';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from '~~elements/Button';
import ImportErrorList from '~~elements/ImportErrorList';
import Resource from '~~apis/resource';
import Alert from '~~elements/Alert';
import FileSaver from 'file-saver';
import moment from 'moment';
import { dispatchNotification, dispatchLoading, downloadFile } from '~~utils/CommonUtils';

const AnalyzeButton = styled(Button)`
  white-space: nowrap;
`;

function ImportModal(props) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const {
    roleType,
    importData,
    importData: {
      failCount = 0,
      failMessage = [],
      passCount = 0,
      // for export
      mrp,
      obs,
      exp,
      cmp,
      uploadId
    },
    isOpen,
    setIsOpen,
    onDownload = () => { }
  } = props;

  /**
   * 當按下分析時
   */
  async function handleOnAnalyzeAndDownload() {
    onDownload();
  }

  // 匯出錯誤清單
  const errorTxtFileName = `XRAY_Sourcer_Cost_Analysis_Import_Error_${moment().format('YYYYMMDDHHMM')}`;

  return (
    <React.Fragment>
      <Modal.Modal
        isOpen={isOpen}
        // moreSpace
        widthType="small"
      >
        <Modal.ModalHeader hasBack onClickBack={() => setIsOpen(false)}>
          Read Data
        </Modal.ModalHeader>
        <Modal.ModalBody>
          <ImportErrorList
            passCount={passCount}
            failCount={failCount}
            failRows={failMessage}
            errorTxtFileName={errorTxtFileName}
          />
        </Modal.ModalBody>
        <Modal.ModalFooter>
          <Button
            color="white"
            onClick={() => setIsAlertOpen(true)}
          >
            Cancel
          </Button>
          <AnalyzeButton
            color="black"
            onClick={handleOnAnalyzeAndDownload}
          >
            Analyze and Download
          </AnalyzeButton>
        </Modal.ModalFooter>
      </Modal.Modal>
      <Alert isOpen={isAlertOpen} type="alarm">
        <div className="row">You haven&apos;t finished the import process.<br />Are you sure you want to leave?</div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={(e) => {
              e.stopPropagation();
              setIsAlertOpen(false);
              setIsOpen(false);
            }}
          >
            Leave
          </Button>
          <Button
            color="black"
            onClick={(e) => {
              e.stopPropagation();
              setIsAlertOpen(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Alert>
    </React.Fragment >
  );
}

const mapStateToProps = state => {
  return {
    roleType: state.xray.roleType,
    searchBy: state.xray.searchBy,
  };
};

const mapDispatchToProps = {};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ImportModal);
