import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '~~elements/Icon';
import * as DashBoardActions from '~~features//DashBoard/DashBoardActions';
import Select from '~~elements/Select';
import FilterBarPanel, { FilterBarGroup, FilterBarBox } from '~~elements/FilterBarPanel';
import Field from '~~elements/Field';

@connect(
  (state) => {
    return {
      filterList: state.dashBoard.filterList,
      loadingStatus: state.dashBoard.loadingStatus,
      searchInfo: state.dashBoard.searchInfo,
    };
  },
  {
    getFilterList: DashBoardActions.getFilterList,
    setFilterCondition: DashBoardActions.setFilterCondition,
    resetFilter: DashBoardActions.resetFilter,
    getProjectList: DashBoardActions.getProjectList,

  }
)

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.lv1Menu = React.createRef();
    this.lv2Menu = React.createRef();
  }
  // 選擇第一個下拉選項
  handleSelectLv1 = (value) => {
    const { value: lv1 } = value;
    this.props.setFilterCondition({ lv1 });
    this.props.getFilterList(lv1);
  }
  handleSelectLv2 = (value) => {
    const { value: lv2 } = value;
    this.props.setFilterCondition({ lv2 });
  }

  // 按下搜尋按鈕時
  handleSearch = (e) => {
    this.props.getProjectList(true);
    this.props.onFilter({ isFilter: true }); // 為了要顯示為搜尋狀態
  }

  handleReset = (e) => {
    this.props.resetFilter();
    this.props.getProjectList(true);
    this.props.onFilter({ isFilter: false }); // 為了要顯示為搜尋狀態
  }
  handleKeywordChange = (e) => {
    const { target: { value: keyword } } = e;
    this.props.setFilterCondition({ keyword });
  }


  handleKeyPress = (e) => {
    if (e.key.toUpperCase() === 'ENTER') {
      this.handleSearch(e);
    }
  }

  render() {
    const {
      searchInfo: { keyword = '', lv1, lv2 },
      filterList: { lv1: lv1List = [], lv2: lv2List = [] } } = this.props;
    const lv1Options = lv1List.map(obj => ({ label: obj, value: obj }));
    const lv2Options = lv2List.map(obj => ({ label: obj, value: obj }));

    return (
      <FilterBarPanel
        width="50rem"
        onReset={this.handleReset}
        onFilter={this.handleSearch}
      >
        <FilterBarGroup icon={<Icon icon="IcoFilterBarFilter" />}>
          <FilterBarBox>
            <Select
              placeholder="All Items"
              value={{ label: lv1, value: lv1 }}
              options={lv1Options}
              onChange={this.handleSelectLv1}
              target="box"
              border={false}
            />
          </FilterBarBox>
          <FilterBarBox>
            <Select
              placeholder="By Items"
              value={{ label: lv2, value: lv2 }}
              options={lv2Options}
              onChange={this.handleSelectLv2}
              disabled={lv1 === ''}
              target="box"
              border={false}
            />
          </FilterBarBox>
        </FilterBarGroup>
        <FilterBarGroup width="65%" icon={<Icon icon="IcoFilterBarSearch" />}>
          <Field.Input
            styledType="filterBar"
            type="text"
            placeholder="請輸入Project Name or Code"
            onChange={this.handleKeywordChange}
            onKeyPress={this.handleKeyPress}
            value={keyword}
          />
        </FilterBarGroup>
      </FilterBarPanel>
    );
  }
}
