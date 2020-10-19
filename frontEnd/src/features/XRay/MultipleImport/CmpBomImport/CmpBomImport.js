import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _find from 'lodash/find';
import _get from 'lodash/get';

import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import Field from '~~elements/Field';
import Select from '~~elements/Select';
import Radio from '~~elements/Radio';
import Resource from '~~apis/resource';
import { dispatchNotification, dispatchLoading, downloadFile } from '~~utils/CommonUtils';

import {
  XRAY_ANALYSIS_TYPE,
} from '~~features/XRay/XrayConst';

import BomImport from './BomImport';
import CmpImport from './CmpImport';

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
    >.checkbox, 
    >.radio {
      vertical-align: bottom;
      display: inline-block;
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


const CmpBomImport = (props) => {
  const [analysisType, setAnalysisType] = useState(XRAY_ANALYSIS_TYPE.CMP);

  /**
   * 下載template
   */
  async function handleDownloadTemplate() {
    dispatchLoading(true);
    try {
      const res = await Resource.XrayResource.getBomImportTemplate();
      downloadFile(res);
    } catch (error) {
      dispatchNotification({ error });
    }
    dispatchLoading(false);
  }

  /**
   * 當改變AnalysisType時
   * @param {*} type analysisType
   */
  function handleChangeAnalysisType(type) {
    setAnalysisType(type);
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
        <Field.GreyTitle>Step1: Choose Analysis Type</Field.GreyTitle>
        <Field.Row>
          <Field.Field width="50%">
            <div className="inline-checkbox">
              <Radio
                onChange={() => handleChangeAnalysisType(XRAY_ANALYSIS_TYPE.CMP)}
                checked={analysisType === XRAY_ANALYSIS_TYPE.CMP}
              >
                CMP
              </Radio>
              <Radio
                onChange={() => handleChangeAnalysisType(XRAY_ANALYSIS_TYPE.BOM)}
                checked={analysisType === XRAY_ANALYSIS_TYPE.BOM}
              >
                BOM
              </Radio>
            </div>
          </Field.Field>
        </Field.Row>
        {
          analysisType === XRAY_ANALYSIS_TYPE.BOM ?
            <BomImport /> :
            <CmpImport />
        }
      </GroupContainer>
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
)(CmpBomImport);
