import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Icon from '~~elements/Icon';
import Dropdown from '~~elements/Dropdown';
import Select from '~~elements/Select';
import FilterBarPanel, { FilterBarGroup, FilterBarBox } from '~~elements/FilterBarPanel';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';

function FilterBar(props) {
  const {
    twoLevelFilterInfo,
    twoLevelFilterInfo: {
      level1Multi,
      level2Multi,
      level3Multi,
      level1OptionsList,
      level2OptionsList,
      level3OptionsList,
      level1SelectedOption,
      level2SelectedOption,
      level3SelectedOption,
      level1Display,
      level2Display,
      level3Display,
      level1Placeholder,
      level2Placeholder,
      level3Placeholder
    },
  } = props;

  function handleChangeLevel1(option) {
    const newTwoLevelFilterInfo = {
      ...twoLevelFilterInfo,
      level1SelectedOption: option,
      level2SelectedOption: null,
      level3SelectedOption: null,

    };
    props.setTwoLevelFilterInfo(newTwoLevelFilterInfo);
  }

  function handleChangeLevel2(option) {
    const newTwoLevelFilterInfo = {
      ...twoLevelFilterInfo,
      level2SelectedOption: option,
      level3SelectedOption: null,
    };
    props.setTwoLevelFilterInfo(newTwoLevelFilterInfo);
  }

  function handleChangeLevel3(option) {
    const newTwoLevelFilterInfo = {
      ...twoLevelFilterInfo,
      level3SelectedOption: option
    };
    props.setTwoLevelFilterInfo(newTwoLevelFilterInfo);
  }

  /**
   * reset時候清空下拉選擇
   */
  function handleReset() {
    props.resetTwoLevelFilterInfo();
  }

  /**
   * 當按下filter按鈕的時候
   */
  function handleClickFilter() {
    props.filterTableData();
  }

  const filterBarWidth = level3Display ? '50rem' : '33rem';

  return (
    <FilterBarPanel
      width={filterBarWidth}
      onReset={handleReset}
      filterDisabled={!level2SelectedOption}
      onFilter={handleClickFilter}
    >
      <FilterBarGroup icon={<Icon icon="IcoFilterBarFilter" />}>
        <FilterBarBox>
          <Select
            placeholder={level1Placeholder}
            value={level1SelectedOption}
            options={level1OptionsList}
            onChange={handleChangeLevel1}
            border={false}
            target="box"
          // disabled={!level1IsDisabeld}
          />
        </FilterBarBox>
        {
          level2Display &&
          <FilterBarBox>
            <Select
              placeholder={level2Placeholder}
              value={level2SelectedOption}
              options={level2OptionsList}
              onChange={handleChangeLevel2}
              border={false}
              target="box"
              isMulti={level2Multi}
              disabled={!level1SelectedOption}
            />
          </FilterBarBox>
        }
        {
          level3Display &&
          <FilterBarBox>
            <Select
              placeholder={level3Placeholder}
              value={level3SelectedOption}
              options={level3OptionsList}
              onChange={handleChangeLevel3}
              border={false}
              target="box"
              isMulti={level3Multi}
            // disabled={!level2IsDisabeld}
            />
          </FilterBarBox>
        }
      </FilterBarGroup>
    </FilterBarPanel>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar);

