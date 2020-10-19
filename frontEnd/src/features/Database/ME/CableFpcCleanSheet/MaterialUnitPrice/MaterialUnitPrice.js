import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import * as R from 'ramda';
import useCSDB from '~~features/Database/components/useCSDB';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as CableFpcCleanSheetActions from '~~features/Database/ME/CableFpcCleanSheet/CableFpcCleanSheetRedux';
import getColumns from './ColumnSetting';

const MaterialUnitPrice = props => {
  const { getCableFpcMaterialUnitPrice, putCableFpcMaterialUnitPrice, date, materialUnitPriceList } = props;

  useEffect(() => {
    getCableFpcMaterialUnitPrice();
  }, []);

  const extendsCSDBPorps = {
    mainTable: materialUnitPriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'name' },
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
  } = useCSDB(extendsCSDBPorps);

  const handleSave = () => {
    const data = {
      nextId: _get(date, 'nextId', false),
      items: differenceList.map(item => ({ id: item.id, next: item.next })),
    };
    setEditMode(false);
    putCableFpcMaterialUnitPrice(data);
  };

  const extendsColumnPorps = {
    ...props,
    isEditMode,
    date,
    checkboxColumn,
    handleOnEditItem,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">材料單價Price m² 價目表</div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Item Name"
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
              <Button color="black" border={false} round onClick={() => handleSetEditMode(false)}>
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
              <Icon icon={IconName.BtnEditGroup} size="2rem" onClick={() => handleSetEditMode(true)} disabled={mainTableList.length === 0 || !date.nextId} />
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
        <Table rowKey="id" headerColor="blue" columns={getColumns(extendsColumnPorps)} dataSource={isEditMode ? editModeList : mainTableList} pagination={false} onChange={handleTableChange} scroll={{ y: 500 }} />
      </div>
    </InnerContainer>
  );
};

const mapStateToProps = state => {
  return {
    materialUnitPriceList: state.cablefpcCleanSheet.materialUnitPrice.materialUnitPrice,
    date: state.cablefpcCleanSheet.materialUnitPrice.date,
  };
};

const mapDispatchToProps = {
  getCableFpcMaterialUnitPrice: CableFpcCleanSheetActions.getCableFpcMaterialUnitPrice,
  putCableFpcMaterialUnitPrice: CableFpcCleanSheetActions.putCableFpcMaterialUnitPrice,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MaterialUnitPrice);
