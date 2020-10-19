import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import _find from 'lodash/find';
import _get from 'lodash/get';
import Icon from '~~elements/Icon';
import Select from '~~elements/Select';
import FilterBarPanel, { FilterBarGroup, FilterBarBox } from '~~elements/FilterBarPanel';
import Field from '~~elements/Field';
import { BOM_MANAGMENT_SORTER, BOM_MANAGMENT_TABLE_TYPES } from '~~features/BomManagement/BomManagementConst';
import * as BomManagementActions from '../BomManagementActions';

const FilterBar = (props) => {
  const {
    table = '',
    history,
    location,
    match,
    // props
    // table,
    getBomList,
    // state
    searchValue,
    updateSearchKeyword,
    filterType,
    filterValue,
    filterTypeList,
    filterValueList,
    getFilterType,
    getFilterValue,
    updateFilterType,
    updateFilterValue,
  } = props;


  // console.log('table >>>>', table);
  // 一開始進來，先取得第一個下拉
  useEffect(() => {
    getFilterType(table);
  }, []);


  // 第一個列表有更動時，取得第二個下拉
  useEffect(() => {
    if (filterType) {
      getFilterValue({
        role: table,
        type: filterType,
      });
    }
  }, [filterType]);

  // 當選擇ITEM時
  function onFilterTypeChange(opt) {
    const { value: val } = opt;
    updateFilterType(val);
    updateFilterValue('');
  }
  // 當選擇BY ITEM時
  function onFilterTypeValue(value) {
    const { value: val } = value;
    updateFilterValue(val);
  }

  // 輸入關鍵字時
  function handleInputChange(e) {
    const { target: { value: val } } = e;
    updateSearchKeyword(val);
  }

  function handleReset() {
    props.handleOnFilter({
      filterType: '',
      filterValue: '',
      searchValue: '',
    });
    props.handleReset();
  }

  /**
   * 檢查search是否要disabled
   */
  function checkDisableSearch() {
    if (!(filterValue || searchValue)) return true;
    if (filterType && !filterValue) return true;
    return false;
  }

  // 按下搜尋按鈕時
  function handleClickFilter() {
    props.handleOnFilter({
      filterType,
      filterValue,
      searchValue,
    });
  }

  function handleKeyPress(e) {
    if (e.key.toUpperCase() === 'ENTER') {
      handleClickFilter();
    }
  }

  return (
    <FilterBarPanel
      width="50rem"
      onReset={handleReset}
      filterDisabled={checkDisableSearch()}
      onFilter={handleClickFilter}
    >
      <FilterBarGroup icon={<Icon icon="IcoFilterBarFilter" />}>
        <FilterBarBox className="e2e_filterbar_select_1">
          <Select
            placeholder="All Items"
            value={_find(filterTypeList, (o) => o.value === filterType)}
            options={filterTypeList}
            onChange={onFilterTypeChange}
            target="box"
            border={false}
          />
        </FilterBarBox>
        <FilterBarBox className="e2e_filterbar_select_2">
          <Select
            placeholder="By Items"
            value={_find(filterValueList, (o) => o.value === filterValue)}
            options={filterValueList}
            onChange={onFilterTypeValue}
            disabled={!filterType}
            target="box"
            border={false}
          />
        </FilterBarBox>
      </FilterBarGroup>
      <FilterBarGroup width="65%" icon={<Icon icon="IcoFilterBarSearch" />}>
        <Field.Input
          className="e2e_filterbar_input"
          styledType="filterBar"
          placeholder="請輸入Project Name or Code"
          value={searchValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
      </FilterBarGroup>
    </FilterBarPanel>
  );
};

const mapStateToProps = (state) => {
  return {
    table: state.bomManagement.table,
    filterType: state.bomManagement.filterType,
    filterValue: state.bomManagement.filterValue,
    filterTypeList: state.bomManagement.filterTypeList,
    filterValueList: state.bomManagement.filterValueList,
    searchValue: state.bomManagement.searchValue,
  };
};

const mapDispatchToProps = {
  getBomList: BomManagementActions.getBomList,
  getFilterType: BomManagementActions.getFilterType,
  getFilterValue: BomManagementActions.getFilterValue,
  updateFilterType: BomManagementActions.updateFilterType,
  updateFilterValue: BomManagementActions.updateFilterValue,
  updateSearchKeyword: BomManagementActions.updateSearchKeyword,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  // CheckingRbac(allowList)
)(FilterBar);
