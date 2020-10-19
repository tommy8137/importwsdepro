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

const GluePrice = (props) => {
  const {
    date,
    gluePriceList,
    getGluePrice,
    updateGluePrice,
  } = props;

  useEffect(() => {
    getGluePrice();
  }, []);

  const extendsCSDBPorps = {
    mainTable: gluePriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'thickness' },
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
    updateGluePrice(data);
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
            Glue 價目表
            <div className="description">Unit: USD</div>
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Enter Thickness"
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
    gluePriceList: state.thermalGraphiteCleanSheet.gluePrice.gluePriceList,
    date: state.thermalGraphiteCleanSheet.gluePrice.date,
  };
};

const mapDispatchToProps = {
  getGluePrice: ThermalGraphiteCleanSheetActions.getGluePrice,
  updateGluePrice: ThermalGraphiteCleanSheetActions.updateGluePrice,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(GluePrice);
