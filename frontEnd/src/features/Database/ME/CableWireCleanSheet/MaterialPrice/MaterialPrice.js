import React, { Fragment, useState, useEffect } from 'react';
import _get from 'lodash/get';
import * as R from 'ramda';
import useCSDB from '~~features/Database/components/useCSDB';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import useResource from '~~hooks/useResource';
import CableWireCleanSheetResource from '~~apis/resource/DatabaseResources/CableWireCleanSheetResource';
import DatabaseResource from '~~apis/resource/DatabaseResources/DatabaseResource';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import getColumns from './ColumnSetting';

const MaterialPrice = props => {
  // useResource(resource, defaultResponse, successMsg, errorMsg);
  const queryGetMaterialPrice = useResource(
    CableWireCleanSheetResource.getMaterialPrice,
    { materialPrice: [], date: {} },
    null,
    { message: '取得列表有誤，請稍後再試', level: 'error' }
  );

  const queryPutMaterialPrice = useResource(
    DatabaseResource.updateCleanSheetNextPrice,
    {},
    { message: '更新成功', level: 'success' },
    { message: '取得列表有誤，請稍後再試', level: 'error' }
  );

  // console.log(queryMaterialPrice);
  const { date, materialPrice } = queryGetMaterialPrice.response;

  useEffect(() => {
    queryGetMaterialPrice.exec();
  }, []);

  const extendsCSDBPorps = {
    mainTable: materialPrice,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: ['item', 'gauge'] },
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

  const handleSave = async () => {
    const data = {
      nextId: _get(date, 'nextId', false),
      items: differenceList.map(item => ({
        id: item.id,
        next: item.next,
      })),
    };
    setEditMode(false);
    await queryPutMaterialPrice.exec(data);
    queryGetMaterialPrice.exec();
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
          <div className="title">Cable Material Price</div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="item name"
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

export default MaterialPrice;
