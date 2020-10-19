import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import _ from 'lodash';
import styled from 'styled-components';
import Icon from '~~elements/Icon';
import Checkbox from '~~elements/Checkbox';
import Button from '~~elements/Button';
import { EnhanceTooltip } from '~~elements/Tooltip';
import * as XrayActions from '~~features/XRay/XrayActions';


const ControlContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  position: relative;
  display: flex;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #cccccc;
  overflow: hidden;
  .box {
    border-right: 1px solid #cccccc;
    padding: 1.2rem 1.5rem;
    height: 100%;
    align-items: center;
    display: flex;
    &:last-child {
      border-right: none;
    }
  }
  .left {
    display: flex;
    flex: 0 100%;
    align-items: center;
  }
  .right {
    display: flex;
    flex: 0 auto;
    align-items: center;
  }
  .analysis-button {
    border-radius: 0px;
    min-width: 10rem;
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 1rem;
    align-items: center;
    justify-content: center;
    border-radius: 0px !important;
    outline: 0;
    border: 0;
    .icon {
      margin-left: 1rem;
    }
  }
`;

const BottomControl = props => {
  const { referencePN = null, specItem, specItem: { specGroup }, selected: { productType, type1, type2, sourcer } } = props;

  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

  const [dateRange, setDateRange] = useState(false);
  const [block, setBlock] = useState(false);
  const [mrp, setMrp] = useState(false);
  const [exp, setExp] = useState(false);

  const selectCount = _.sumBy(_.keys(specItem.specGroup), (val) => specItem.specGroup[val].filter(s => s.value).length);
  const isEmpty = selectCount <= 0;
  const analysisValid = !isEmpty;

  const onAnalysis = e => {
    const spec = _.mapValues(specGroup, sp => sp.filter(o => o.value).map(o => o.item_name));
    const specData = {
      productType,
      type1: type1[0],
      type2: type2[0],
      sourcer,
      spec,
    };
    const spaForm = {
      dateFrom: null,
      dateTo: null,
      mrp,
      block,
      exp,
      referencePN,
      ...specData
    };

    props.setAnalysisForm({ spaForm });
    props.goToRouter('/g/xRay/analysis/spa');
  };


  const mrpEl = useRef(null);
  const blockEl = useRef(null);
  const expEl = useRef(null);

  return (
    <ControlContainer>
      <div className="left">
        <div className="box" ref={mrpEl}>
          <Checkbox
            checked={mrp}
            onChange={() => setMrp(!mrp)}
          > No-Demand
          </Checkbox>
        </div>
        <EnhanceTooltip
          textColor="white"
          color="black"
          target={mrpEl}
          placement="top"
        >
          顯示No Demand P/N
        </EnhanceTooltip>
        <div className="box" ref={expEl}>
          <Checkbox
            checked={exp}
            onChange={() => setExp(!exp)}
          >
            EXP/EOL
          </Checkbox>
        </div>
        <EnhanceTooltip
          textColor="white"
          color="black"
          target={expEl}
          placement="top"
        >
          顯示EXP/EOL P/N
        </EnhanceTooltip>
        <div className="box" ref={blockEl}>
          <Checkbox
            checked={block}
            onChange={() => setBlock(!block)}
          >
            OBS
          </Checkbox>
        </div>
        <EnhanceTooltip
          textColor="white"
          color="black"
          target={blockEl}
          placement="top"
        >
          顯示 PLM OBS P/N
        </EnhanceTooltip>
      </div>
      <div className="right">
        <Button
          className="analysis-button"
          color="black"
          disabled={!analysisValid}
          onClick={e => onAnalysis(e)}
        >
          <span>ANALYSIS</span>
          <Icon
            icon="IcoArrow"
            size="2rem"
          />
        </Button>
      </div>
    </ControlContainer>
  );
};

export default connect(
  (state) => {
    return {
      referencePN: state.xray.referencePN,
      selected: state.xray.selected,
      specItem: state.xray.specItem,
      spec: state.xray.spec,
      spaData: state.xray.spaData,
      lppData: state.xray.lppData
    };
  },
  {
    setAnalysisForm: XrayActions.setAnalysisForm,
    goToRouter: push
  }
)(BottomControl);
