import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { InnerContainer, InlineBtns } from '~~features/Database/DatabaseStyles';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import * as R from 'ramda';
import Icon, { IconName } from '~~elements/Icon';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import getcolumns from './ColumnSetting';


const PaintVendorList = (props) => {
  const {
    location,
    // state
    paintVendorList,
    // action
    getPaintVendorList,
    updatePaintVendorList,
    setProductType,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    getPaintVendorList();
  }, []);

  // 需要丟給use CSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: paintVendorList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'name' },
    mainTableUpdater: updatePaintVendorList,
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
    handleSave,
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar
  } = csdb;

  // 需要丟給ColumnSetting的props
  const extendsColumnProps = {
    ...props,
    isEditMode,
    handleOnEditItem,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            塗料廠商
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Enter Vendor Name"
              onInputChange={setKeyword}
              value={keyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
          </InlineBtns>
          {
            isEditMode ?
              <InlineBtns>
                <Button
                  color="black"
                  border={false}
                  round
                  onClick={() => handleSetEditMode(false)}
                >Cancel
                </Button>
                <Button
                  color="green"
                  border={false}
                  round
                  onClick={() => handleSave('paintVendor')}
                >Save
                </Button>
              </InlineBtns> :
              <InlineBtns>
                {/* 修改 */}
                <Icon
                  icon={IconName.BtnEditGroup}
                  size="2rem"
                  onClick={() => handleSetEditMode(true)}
                  disabled={mainTableList.length === 0}
                />
              </InlineBtns>
            }
        </div>
        <Table
          headerColor="blue"
          columns={getcolumns(extendsColumnProps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
        />
      </div>
    </InnerContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    paintVendorList: state.plasticCleanSheet.paintVendorList.paintVendor,
  };
};

const mapDispatchToProps = {
  getPaintVendorList: PlasticCleanSheetActions.getPaintVendorList,
  updatePaintVendorList: PlasticCleanSheetActions.updatePaintVendorList,
  setProductType: DatabaseActions.setProductType,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PaintVendorList);
