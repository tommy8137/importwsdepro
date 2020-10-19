import React, { Component, useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';

import _ from 'lodash';
import Icon from '~~elements/Icon';
import Checkbox from '~~elements/Checkbox';
import { EnhanceTooltip } from '~~elements/Tooltip';
import DropdownWithCheckBox from '~~elements/DropdownWithCheckBox';
import DropdownRange from '~~elements/DropdownRange';
import DropdownInterval from '~~elements/DropdownInterval';
import FilterBarPanel, { FilterBarGroup } from '~~elements/FilterBarPanel';
import Button from '~~elements/Button';
import CheckingRbac from '~~hoc/CheckingRbac';
import * as XrayActions from '~~features/XRay/XrayActions';


const FilterBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info-icon {
    width: 1.74rem;
    cursor: pointer;
  }
`;

const RightBtnContainer = styled.div`
  display: flex;
  .button {
    margin-right: 0.5rem;
  }
`;

const defaultFilter = {
  supplyTypeList: [],
  minPrice: 0,
  maxPrice: 0,
  intervalEnable: false,
  rangeEnable: false,
  interval: {
    min: 0,
    max: 0
  },
  range: {
    min: 0,
    max: 0
  },
};

const Filter = (props) => {
  const {
    getRbacPath,
    spaForm,
    maxPriceDiff,
    spaData: {
      minUnitPrice, maxUnitPrice,
      supplyTypeList: supplyTypeOptions = [],
      materialList = [] },
    spaFilter } = props;


  // 按下filterbar的放大鏡才會套用filter，所以state會先存一份
  const [filter, setFilter] = useState(defaultFilter);

  useEffect(() => {
    setFilter(spaFilter);
  }, [spaFilter]);

  /**
   * 按下filter bar的分析按鈕
   */
  const handleSubmit = () => {
    props.setSpaFilterAction(filter);
  };
  /**
   * 按下filter bar的reset按鈕
   */
  const handleReset = () => {
    props.setSpaFilterAction();
  };
  const handleExportExcel = () => {
    props.postSpaExportAction(spaForm);
  };

  /**
   * 按下範圍％區間的套用時，更新redux的filter
   */
  const handleRangeChange = (range) => {
    const tempFilter = { ...filter, range };
    // setFilter(tempFilter);
    props.setSpaFilterAction(tempFilter);
  };

  /**
   * 按下價格區間的套用時，更新redux的filter
   */
  const handleIntervalChange = (interval) => {
    const tempFilter = { ...filter, interval };
    // setFilter(tempFilter);
    props.setSpaFilterAction(tempFilter);
  };


  /**
   * 當高於最低單價％打開時，把單價區間關掉
   */
  const handleRangeEnableChange = () => {
    const { rangeEnable } = filter;
    setFilter({ ...filter, intervalEnable: false, rangeEnable: !rangeEnable });
  };

  /**
   * 當單價區間打開時，把高於最低單價％關掉
   */
  const handleIntervalEnableChange = () => {
    const { intervalEnable } = filter;
    setFilter({ ...filter, rangeEnable: false, intervalEnable: !intervalEnable });
  };

  /**
   * 當變動 Supplytype時，不會更新redux, 按下filterbar的分析後才會更新
   */
  const handleSupplyTypeChange = (supplyTypeList) => {
    setFilter({ ...filter, supplyTypeList });
  };
  // 是否能export excel


  const { supplyTypeList, range, interval, intervalEnable, rangeEnable } = filter;
  // 是否可以export的權限
  const canExport = getRbacPath(['Export', 'allow', 'xray.ee']) || getRbacPath(['Export', 'allow', 'xray.me']);
  // 如果資料筆數大於０才可以export
  const showExport = canExport && materialList.length > 0;

  const InfoIconEl = useRef(null);

  return (
    <FilterBarContainer>
      <FilterBarPanel
        width="50%"
        height="4rem"
        onReset={handleReset}
        onFilter={handleSubmit}
      >
        <FilterBarGroup icon={<Icon icon="IcoFilterBarFilter" />}>
          {/* 單價區間 */}
          <DropdownInterval
            title={<div id="e2e_interval_checkbox"><Checkbox checked={intervalEnable} onChange={handleIntervalEnableChange} />單價區間</div>}
            value={interval}
            onChange={handleIntervalChange}
            inputMax={maxUnitPrice}
            inputMin={minUnitPrice}
            disabled={!intervalEnable}
          />
          {/* 範圍比例區間 */}
          <DropdownRange
            title={<div id="e2e_range_checkbox"><Checkbox checked={rangeEnable} onChange={handleRangeEnableChange} />高於最低單價</div>}
            value={range}
            onChange={handleRangeChange}
            // 最大價差百分比
            inputMax={maxPriceDiff}
            inputMin={0}
            disabled={!rangeEnable}
          />
          {/* SUPPLY TYPE  */}
          <DropdownWithCheckBox
            title="Supply Type"
            value={supplyTypeList}
            options={supplyTypeOptions.map(opt => ({ label: opt, value: opt }))}
            onChange={handleSupplyTypeChange}
            hasSelectAll
            multi
          />
        </FilterBarGroup>
      </FilterBarPanel >
    </FilterBarContainer>
  );
};

Filter.defaultProps = {

};

export default CheckingRbac()(connect(
  (state) => {
    return {
      spaForm: state.xray.analysisForm.spaForm,
      spaData: state.xray.spaData,
      maxPriceDiff: state.xray.maxPriceDiff,
      allSupplyType: state.xray.allSupplyType,
      spaFilter: state.xray.spaFilter,
    };
  },
  {
    postSpaExportAction: XrayActions.postSpaExport,
    setSpaFilterAction: XrayActions.setSpaFilter,
  }
)(Filter));
