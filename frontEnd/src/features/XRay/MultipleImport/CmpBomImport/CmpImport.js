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

import ImportModal from '../ImportModal';


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

const BottomWrap = styled.div`
  padding-top: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 0.5rem;
  margin-bottom: 1rem;
`;


const initialImportData = {
  mrp: false,
  cmp: {
    Y: false,
    N: true
  },
  obs: false,
  exp: false,
};

const MultipleImport = (props) => {
  const [importData, setImportData] = useState(initialImportData);

  const {
    cmp: { Y: cmpY, N: cmpN },
    mrp,
    cmp,
    obs,
    exp,
  } = importData;

  /**
   * 當按下read file按鈕的時候，檢查excel格式
   */
  async function handleAnalysis() {
    const data = {
      mrp,
      exp,
      obs,
      cmp,
    };
    dispatchLoading(true);
    try {
      const res = await Resource.XrayResource.postCmpAnalysis(data);
      downloadFile(res);
    } catch (error) {
      dispatchNotification({ error });
    }
    dispatchLoading(false);
  }

  function handleChangeMrp() {
    setImportData({
      ...importData,
      mrp: !mrp
    });
  }

  function handleChangeObs() {
    setImportData({
      ...importData,
      obs: !obs
    });
  }

  function handleChangeExp() {
    setImportData({
      ...importData,
      exp: !exp
    });
  }

  function handleChangeCmp(cmpType) {
    const value = cmp[cmpType];
    const newCmp = {
      ...cmp,
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

  return (
    <React.Fragment>
      <Field.GreyTitle>Step2: Check and Analysis File</Field.GreyTitle>
      <Field.Row>
        <Field.Field width="50%">
          <div className="inline-checkbox">
            {/* mrp */}
            <Field.Checkbox
              onChange={handleChangeMrp}
              checked={mrp}
            >
              No Demand
            </Field.Checkbox>
            {/* obs */}
            <Field.Checkbox
              onChange={handleChangeObs}
              checked={obs}
            >
              OBS
            </Field.Checkbox>
            <Field.Checkbox
              onChange={handleChangeExp}
              checked={exp}
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
              checked={cmpY}
            >
              CMP = Y
            </Field.Checkbox>
            <Field.Checkbox
              onChange={() => handleChangeCmp('N')}
              checked={cmpN}
            >
              CMP = N
            </Field.Checkbox>
          </div>
        </Field.Field>
      </Field.Row>

      <BottomWrap>
        <Button
          className="analysis-btn"
          color="black"
          onClick={handleAnalysis}
        >
          <span>ANALYSIS</span>
          <Icon icon={IconName.IcoArrow} />
        </Button>
      </BottomWrap>
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
