import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import useCSDB from '~~features/Database/components/useCSDB';
import * as ThermalGraphiteCleanSheetActions from '~~features/Database/ME/ThermalGraphiteCleanSheet/ThermalGraphiteCleanSheetRedux';
import getColumns from './ColumnSetting';

const GraphitePrice = (props) => {
  const {
    date,
    graphitePriceList,
    getGraphitePrice,
    updateGraphitePrice,
  } = props;

  useEffect(() => {
    getGraphitePrice();
  }, []);

  const extendsCSDBPorps = {
    mainTable: graphitePriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: ['type', 'thickness'] },
  };

  const {
    // For table
    isEditMode,
    setEditMode,
    mainTableList,
    editModeList,
    handleTableChange,
    handleSetEditMode,
    handleOnEditItem,
    differenceList,
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar,
    // For checkbox
    showArchive,
    setShowArchive,
    checkboxColumn,
    // For add modal
    isAddModalOpen,
    setAddModal,
    // 流水號
    idColumn,
  } = useCSDB(extendsCSDBPorps);

  const handleSave = () => {
    const data = {
      nextId: _get(date, 'nextId', false),
      items: differenceList.map(item => ({
        id: item.id,
        next: item.next,
      })),
    };
    setEditMode(false);
    updateGraphitePrice(data);
  };

  const extendsColumnPorps = {
    ...props,
    isEditMode,
    date,
    checkboxColumn,
    handleOnEditItem,
    idColumn,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            石墨層 價目表
            <div className="description">Unit: USD</div>
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Enter Type or Thickness"
              onInputChange={setKeyword}
              value={keyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
            {/* <ArchiveSwitch
              isChecked={showArchive}
              onChange={() => setShowArchive(!showArchive)}
            /> */}
          </InlineBtns>
          {isEditMode ? (
            <InlineBtns>
              <Button
                color="black"
                border={false}
                round
                onClick={() => handleSetEditMode(false)}
              >
                Cancel
              </Button>
              <Button color="green" border={false} round onClick={handleSave}>
                Save
              </Button>
            </InlineBtns>
          ) : (
            <InlineBtns>
              {/* 新增 */}
              {/* <Icon
                  icon={IconName.BtnAddGroup}
                  size="2rem"
                  onClick={() => setAddModal(true)}
                /> */}
              {/* 修改 */}
              <Icon
                icon={IconName.BtnEditGroup}
                size="2rem"
                onClick={() => handleSetEditMode(true)}
                disabled={mainTableList.length === 0 || !date.nextId}
              />
              {/* 封存 */}
              {/* <Icon
                  icon={IconName.BtnArchive}
                  size="2rem"
                  // onClick={() => handleArchive()}
                  // disabled={selectedIdList.length === 0}
                /> */}
            </InlineBtns>
          )}
        </div>
        <Table
          headerColor="blue"
          columns={getColumns(extendsColumnPorps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
          rowKey="id"
        />
      </div>
    </InnerContainer>
  );
};


const mapStateToProps = state => {
  return {
    graphitePriceList: state.thermalGraphiteCleanSheet.graphitePrice.graphitePriceList,
    date: state.thermalGraphiteCleanSheet.graphitePrice.date,
  };
};

const mapDispatchToProps = {
  getGraphitePrice: ThermalGraphiteCleanSheetActions.getGraphitePrice,
  updateGraphitePrice: ThermalGraphiteCleanSheetActions.updateGraphitePrice,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(GraphitePrice);
