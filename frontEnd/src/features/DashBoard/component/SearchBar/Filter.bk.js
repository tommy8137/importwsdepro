import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import Icon from '~~elements/Icon';
import * as DashBoardActions from '~~features//DashBoard/DashBoardActions';
import DropdownPanel, { Dropdown } from '../DropdownPanel';

const SearchBarContainer = styled.div`
  display: block;
  width: 30.625rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .function-btn {
    height: 24px;
    width: 3.5rem;
    text-align: center;
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
    height: 100%;
    background-color: #333333;
    border-radius: 0px;
    &.disabled{
      cursor: not-allowed;
    }
  }
  .btn-reset{
    width: 4rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    margin: 0rem 0.8rem;
    &.disabled{
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
`;

const LabelMenu = styled.div`
  display: block;
  padding: 8px 6px;
  > label {
    font-size: 0.9rem;
    margin: 0.2rem 0rem;
    display: block;
    padding: 4px 10px;
    transition: 0.3s ease all;
    cursor: pointer;
    opacity: 0.8;
    &:hover,
    &.active {
      background-color: #f2f2f2;
    }
  }
`;
const NoData = styled.div`
  display: block;
  padding: 12px;
  font-size: 1rem;
  text-align: center;
`;


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
  handleSelectLv1 = (lv1) => {
    this.props.setFilterCondition({ lv1 });
    this.props.getFilterList(lv1);
    this.lv1Menu.current.handleClose();
  }
  handleSelectLv2 = (lv2) => {
    this.props.setFilterCondition({ lv2 });
    this.lv2Menu.current.handleClose();
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
  render() {
    const { searchInfo, filterList, loadingStatus } = this.props;
    const searchBtn = (
      <Button
        className={`${searchInfo.lv2 === '' ? 'function-btn disabled' : 'function-btn'}`}
        onClick={this.handleSearch}
        onKeyDown={null}
        disabled={searchInfo.lv2 === ''}
      >
        <Icon
          className={`${searchInfo.lv2 === '' ? 'icon disabled' : 'icon'}`}
          icon="IcoFilter"
          type="normal"
        />
      </Button>);

    return (
      <SearchBarContainer>
        <DropdownPanel
          functionBtn={searchBtn}
          resetBtn={true}
          onClickReset={this.handleReset}
        >
          <Dropdown
            text={searchInfo.lv1 || 'All Items'}
            ref={this.lv1Menu}
            isloading={loadingStatus.lv1}
          >
            <LabelMenu>
              {
                filterList.lv1.length > 0 ?
                  filterList.lv1.map(item => (
                    <label
                      key={item}
                      onClick={() => this.handleSelectLv1(item)}
                      className={searchInfo.lv1 === item ? 'active' : ''}
                    >
                      {item}
                    </label>
                  )) :
                  <NoData>No Data</NoData>
              }
            </LabelMenu>
          </Dropdown>
          <Dropdown
            text={searchInfo.lv2 || 'by Items'}
            ref={this.lv2Menu}
            disabled={searchInfo.lv1 === ''}
            isloading={loadingStatus.lv2}
          >
            <LabelMenu>
              {
                filterList.lv2.length > 0 ?
                  filterList.lv2.map(item => (
                    <label
                      key={item}
                      onClick={() => this.handleSelectLv2(item)}
                      className={searchInfo.lv2 === item ? 'active' : ''}
                    >
                      {item}
                    </label>
                  )) :
                  <NoData>No Data</NoData>
              }
            </LabelMenu>
          </Dropdown>
        </DropdownPanel>
      </SearchBarContainer >
    );
  }
}
