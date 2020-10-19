import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CommonUtils from '~~utils/CommonUtils';
import TwoLevelFilterBar from '../../component/TwoLevelFilterBar';
import * as EEBomPersonalActions from '../Personal/EEBomPersonalActions';

import Wrapper from './FilterSectionStyles';


function FilterSection(props) {
  const {
    originalTableData,
    twoLevelFilterInfo,
  } = props;

  return (
    <Wrapper>
      <div className="filter-container">
        <div className="filter-container__title">Filter by&nbsp;&nbsp;&nbsp;</div>
        <TwoLevelFilterBar />
      </div>
    </Wrapper>
  );
}


// export default PersonalPageDemo;


const mapStateToProps = (state) => {
  return {
    twoLevelFilterInfo: state.eeBomPersonalReducer.twoLevelFilterInfo,
    originalTableData: state.eeBomPersonalReducer.originalTableData,
  };
};

const mapDispatchToProps = {
  cleanFilterTableData: EEBomPersonalActions.cleanFilterTableData,
  filterTableData: EEBomPersonalActions.filterTableData,
  setTwoLevelFilterInfo: EEBomPersonalActions.setTwoLevelFilterInfo,
  resetTwoLevelFilterInfo: EEBomPersonalActions.resetTwoLevelFilterInfo,
  setSelectedInfo: EEBomPersonalActions.setSelectedInfo,
  resetSelectedInfo: EEBomPersonalActions.resetSelectedInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterSection);
