import React, { Component, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

import _ from 'lodash';
import { compose } from 'recompose';
import checkingRbac from '~~hoc/CheckingRbac';
import * as XrayActions from '~~features/XRay/XrayActions';
import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import { EnhanceTooltip } from '~~elements/Tooltip';

const InfoTooltipContent = styled.div`
  padding: 0 0.8rem;
  p {
    font-size: 0.8rem;
    color: #333;
    margin: 0;
    text-align: left;
    &.tit {
      color: #333;
      margin-bottom: 0.2rem;
    }
  }
`;


const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  .button {
    margin-right: 1rem;
  }
`;

const ExportBtns = (props) => {
  const {
    getRbacPath,
    spaForm,
    spaData: {
      materialList = [] }
  } = props;
  // 是否可以export的權限
  // 是否可以export的權限
  const canExport = getRbacPath(['Export', 'allow', 'xray.ee']) || getRbacPath(['Export', 'allow', 'xray.me']);
  // 如果資料筆數大於０才可以export
  const showExport = canExport && materialList.length > 0;
  const InfoIconEl = useRef(null);

  /**
   * export spa
   */
  const handleExportExcel = () => {
    props.postSpaExportAction(spaForm);
  };

  return (
    <BtnContainer>
      {
        showExport &&
        <Button
          round
          color="transparent"
          className="export-btn"
          onClick={handleExportExcel}
        >
          <Icon icon={IconName.IcoExport} size="1rem" />
          <span>Export</span>
        </Button>
      }
      <div ref={InfoIconEl}>
        <Icon icon={IconName.BtnInstruction} size="2rem" />
      </div>
      {/* 問號Icon的tooltip */}
      <EnhanceTooltip target={InfoIconEl} placement="bottom-end">
        <InfoTooltipContent>
          <p className="tit">查看 SPEC 名稱</p>
          <p>游標懸浮於 SPEC 上可查看 SPEC 名稱</p>
        </InfoTooltipContent>
      </EnhanceTooltip>
    </BtnContainer>
  );
};

ExportBtns.defaultProps = {};

const mapStateToProps = (state) => {
  return {
    spaForm: state.xray.analysisForm.spaForm,
    spaData: state.xray.spaData,
    maxPriceDiff: state.xray.maxPriceDiff,
    allSupplyType: state.xray.allSupplyType,
    spaFilter: state.xray.spaFilter,
  };
};

const mapDispatchToProps = {
  postSpaExportAction: XrayActions.postSpaExport,
  setSpaFilterAction: XrayActions.setSpaFilter,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  checkingRbac()
)(ExportBtns);
