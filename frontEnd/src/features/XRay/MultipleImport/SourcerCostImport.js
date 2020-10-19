import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _find from 'lodash/find';
import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import Field from '~~elements/Field';
import Select from '~~elements/Select';
import Resource from '~~apis/resource';
import { dispatchNotification, dispatchLoading, downloadFile } from '~~utils/CommonUtils';

import {
  XRAY_ROLES,
  XRAY_TYPES,
  XRAY_SEARCHBY_CONFIG
} from '~~features/XRay/XrayConst';

import ImportModal from './ImportModal';


const GroupContainer = styled.div`
  display: block;
  margin: 0 auto;
  background-color: white;
  margin-bottom: 6rem;
  padding: 1rem;
  width: 60rem;
  max-width: 100%;
  .analysis-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
  }
  .inline-checkbox {
    >.checkbox {
      margin-right: 1.5rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const RightBtns = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0.5rem;
`;

const Step2Container = styled.div`
  opacity: ${props => { return (props.disabled ? 0.6 : 1); }};
  pointer-events: ${props => { return (props.disabled ? 'none' : ''); }};
`;

const BottomWrap = styled.div`
  padding-top: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0.5rem;
  margin-bottom: 1rem;
`;


const initialImportData = {
  failCount: 0,
  failMessage: [],
  passCount: '',
  uploadId: '',
  mrp: false,
  cmp: {
    Y: true,
    N: true
  },
  demand: false,
  obs: false,
  exp: false,
};

const MultipleImport = (props) => {
  const { searchBy } = props;
  const [importData, setImportData] = useState(initialImportData);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const disabledAnalysis = !uploadFile;
  const { mrp, exp, obs, cmp, uploadId } = importData;

  // 當切換search by的時候把importData清空為預設值
  useEffect(() => {
    setUploadFile(null);
    setImportData(initialImportData);
  }, [searchBy]);

  // 關閉modal時清空暫存
  useEffect(() => {
    if (!isImportModalOpen && uploadId) {
      handleDelMultipleImportCancel();
    }
  }, [isImportModalOpen, uploadFile]);

  /**
   * 上傳成功
   * @param {*} res callback resut
   */
  function onUploadSucess(res) {
    const { failCount, failMessage, passCount, uploadId: id } = res.data;
    const data = {
      ...importData,
      failCount,
      failMessage,
      passCount,
      uploadId: id,
    };
    setImportData(data);
    setIsImportModalOpen(true);
  }


  /**
   * 刪除暫存檔案
   * @param {*} uploadId file upload id
   */
  async function handleDelMultipleImportCancel() {
    if (uploadId) {
      try {
        const data = { uploadId };
        const res = await Resource.XrayResource.delMultipleImportCancel(data);
        setImportData({ ...importData, uploadId: '' });
      } catch (error) {
        dispatchNotification({ error });
      }
    }
  }

  /**
   * 當按下read file按鈕的時候，檢查excel格式
   */
  async function handleReadFile() {
    if (uploadFile) {
      const data = new FormData();
      data.append('file', uploadFile);
      dispatchLoading(true);
      try {
        const res = await Resource.XrayResource.postReadFileAndCheck(data);
        onUploadSucess(res);
      } catch (error) {
        console.log('error >>>>', error);
        dispatchNotification({ error });
      }
      dispatchLoading(false);
    }
  }

  /**
   * 改變input file的時候
   * @param {*} file file object
   */
  async function handleFileChange(file) {
    setUploadFile(file);
  }

  /**
   * 下載template
   */
  async function handleDownloadTemplate() {
    dispatchLoading(true);
    try {
      const res = await Resource.XrayResource.getImportTemplate();
      downloadFile(res);
    } catch (error) {
      dispatchNotification({ error });
    }
    dispatchLoading(false);
  }

  function handleChangeMrp() {
    setImportData({
      ...importData,
      mrp: !importData.mrp
    });
  }

  function handleChangeObs() {
    setImportData({
      ...importData,
      obs: !importData.obs
    });
  }

  function handleChangeExp() {
    setImportData({
      ...importData,
      exp: !importData.exp
    });
  }

  function handleChangeCmp(cmpType) {
    const value = importData.cmp[cmpType];
    const newCmp = {
      ...importData.cmp,
      [cmpType]: !value
    };
    const isEmpty = Object.keys(newCmp).every(k => newCmp[k] === false);
    // 兩種一定cmpㄧ定要選一個, 如果都沒選就return掉
    if (isEmpty) {
      return;
    }
    setImportData({
      ...importData,
      cmp: newCmp
    });
  }

  async function handleOnDownload() {
    const data = {
      mrp,
      exp,
      obs,
      cmp,
      uploadId
    };
    dispatchLoading(true);
    try {
      const res = await Resource.XrayResource.postMultipleImportDownload(data);
      downloadFile(res);
    } catch (error) {
      dispatchNotification({ error });
    }
    dispatchLoading(false);
  }

  return (
    <React.Fragment>
      <GroupContainer>
        <RightBtns>
          <Button
            color="transparent"
            round
            disabled={false}
            onClick={handleDownloadTemplate}
          >
            <Icon icon="IcoDownload" size="12px" />
            Template
          </Button>
        </RightBtns>
        <Field.GreyTitle>Step1: Upload File to Analyze Multiple P/N</Field.GreyTitle>
        <Field.Row>
          <Field.Field width="50%">
            <Field.Label
              title="File Name"
            />
            <Field.UploadField
              title="File Name"
              value={uploadFile}
              onChange={handleFileChange}
            />
          </Field.Field>
        </Field.Row>
        <Step2Container disabled={!uploadFile}>
          <Field.GreyTitle>Step2: Check and Read File</Field.GreyTitle>
          <Field.Row>
            <Field.Field width="50%">
              <div className="inline-checkbox">
                {/* mrp */}
                <Field.Checkbox
                  onChange={handleChangeMrp}
                  checked={importData.mrp}
                >
                  No Demand
                </Field.Checkbox>
                {/* obs */}
                <Field.Checkbox
                  onChange={handleChangeObs}
                  checked={importData.obs}
                >
                  OBS
                </Field.Checkbox>
                <Field.Checkbox
                  onChange={handleChangeExp}
                  checked={importData.exp}
                >
                  EXP/EOL
                </Field.Checkbox>
              </div>
            </Field.Field>
          </Field.Row>
          <Field.Row>
            <Field.Field width="50%">
              <div className="inline-checkbox">
                <Field.Checkbox
                  onChange={() => handleChangeCmp('Y')}
                  checked={importData.cmp.Y}
                >
                  CMP = Y
                </Field.Checkbox>
                <Field.Checkbox
                  onChange={() => handleChangeCmp('N')}
                  checked={importData.cmp.N}
                >
                  CMP = N
                </Field.Checkbox>
              </div>
            </Field.Field>
          </Field.Row>
        </Step2Container>
        <BottomWrap>
          <Button
            className="analysis-btn"
            color="black"
            onClick={handleReadFile}
            disabled={disabledAnalysis}
          >
            <span>Read File</span>
            <Icon icon={IconName.IcoArrow} />
          </Button>
        </BottomWrap>
      </GroupContainer>
      <ImportModal
        importData={importData}
        isOpen={isImportModalOpen}
        setIsOpen={setIsImportModalOpen}
        onDownload={handleOnDownload}
      />
    </React.Fragment>
  );
};


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
)(MultipleImport);
