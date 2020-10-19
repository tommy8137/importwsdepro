import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Switch from '~~elements/Switch';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';

import TableGridWrapper from './TableSectionStyles';
import ActionBtnGroupSection from '../ActionBtnGroupSection/ActionBtnGroupSection';
import ApproverActionBtnGroupSection from '../ActionBtnGroupSection/ApproverActionBtnGroupSection';
import PersonalDataGrid from '../DataGrid/PersonalDataGrid';
import ApproverDataGrid from '../DataGrid/ApproverDataGrid';
import FilterSection from '../FilterSection/FilterSection';


function TableSection(props) {
  const {
    // state
    showEXPSpa,
    showPriceDiff,
    // actions
    setShowPriceDiff,
    setShowEXPSpa
  } = props;


  return (
    <TableGridWrapper className="tabel-grid-wrapper">
      <div className="tabel-grid-helper">
        <div className="filter">
          <FilterSection />
          <div className="exp-filter">
            <span>Show EXP </span>
            <Switch
              checked={showEXPSpa}
              onChange={e => setShowEXPSpa(e.target.checked)}
            />
          </div>
          <div className="exp-filter">
            <span>Show Diff Price</span>
            <Switch
              checked={showPriceDiff}
              onChange={e => setShowPriceDiff(e.target.checked)}
            />
          </div>
        </div>
        {/* 如果沒有 isEditMode 的權限， 這邊的按妞就都不顯示 */}
        <div className="action-btn-group">
          {props.activeTab && props.activeTab.type === 'approver' ? <ApproverActionBtnGroupSection /> : <ActionBtnGroupSection />}
        </div>
      </div>
      <div className="tabel-grid-table">
        {props.activeTab && props.activeTab.type === 'approver' ? <ApproverDataGrid showEXPSpa={showEXPSpa} /> : <PersonalDataGrid showEXPSpa={showEXPSpa} />}
      </div>
    </TableGridWrapper>
  );
}


const mapStateToProps = (state) => {
  return {
    activeTab: state.eeBom.activeTab,
    showPriceDiff: state.eeBomPersonalReducer.showPriceDiff,
    showEXPSpa: state.eeBomPersonalReducer.showEXPSpa,
  };
};

const mapDispatchToProps = {
  setShowPriceDiff: EEBomPersonalActions.setShowPriceDiff,
  setShowEXPSpa: EEBomPersonalActions.setShowEXPSpa,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableSection);
