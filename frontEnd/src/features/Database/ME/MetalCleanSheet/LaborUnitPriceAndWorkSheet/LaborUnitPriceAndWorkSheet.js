import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as MetalCleanSheetActions from '~~features/Database/ME/MetalCleanSheet/MetalCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import getcolumns from './ColumnSetting';

const LaborUnitPriceAndWorkSheet = (props) => {
  const {
    location,
    // state
    date,
    laborUnitPriceAndWorkSheetList,
    // action
    getLaborUnitPriceAndWorkSheetList,
    updateLaborUnitPriceAndWorkSheetList,
    setProductType,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    getLaborUnitPriceAndWorkSheetList();
  }, []);

  // 需要丟給use CSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: laborUnitPriceAndWorkSheetList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'name' },
  };
  const csdb = useCSDB(extendsCSDBPorps);
  const {
    // For table
    isEditMode,
    mainTableList,
    editModeList,
    handleTableChange,
    handleSetEditMode,
    handleOnEditItem,
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar
  } = csdb;

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    date,
    isEditMode,
    handleOnEditItem,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
          噴塗人工單價及工時表
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="25rem"
              placeholder="Enter Item"
              value={keyword}
              onInputChange={setKeyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
          </InlineBtns>
          {isEditMode ?
            /* 編輯狀態的Btns */
            <InlineBtns>
              <Button
                round
                color="black"
                onClick={() => handleSetEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                round
                color="green"
                onClick={handleSave}
              >
                Save
              </Button>
            </InlineBtns> :
            /* 非編輯狀態的Btns */
            <InlineBtns>
              {/* 修改 */}
              <Icon
                icon={IconName.BtnEditGroup}
                size="2rem"
                onClick={() => handleSetEditMode(true)}
                disabled={mainTableList.length === 0 || !date.next}
              />
            </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          columns={getcolumns(extendsColumnPorps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
        />
      </div>
    </InnerContainer>
  );

  function handleSave() {
    handleSetEditMode(false);
    const diff = R.difference(editModeList, mainTableList);
    const list = diff.map(item => {
      return {
        id: item.id,
        price: item.next.price,
        manHour: item.next.manHour,
      };
    });

    const data = {
      nextId: date.nextId,
      paintManPowerHourList: list,
    };
    updateLaborUnitPriceAndWorkSheetList(data);
  }
};

const mapStateToProps = (state) => {
  return {
    laborUnitPriceAndWorkSheetList: state.metalCleanSheet.laborUnitPriceAndWorkSheet.laborUnitPriceAndWorkSheetList,
    date: state.metalCleanSheet.laborUnitPriceAndWorkSheet.date,
  };
};

const mapDispatchToProps = {
  getLaborUnitPriceAndWorkSheetList: MetalCleanSheetActions.getLaborUnitPriceAndWorkSheetList,
  updateLaborUnitPriceAndWorkSheetList: MetalCleanSheetActions.updateLaborUnitPriceAndWorkSheetList,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LaborUnitPriceAndWorkSheet);
