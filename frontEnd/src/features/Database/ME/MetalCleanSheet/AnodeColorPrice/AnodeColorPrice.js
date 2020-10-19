import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import * as R from 'ramda';
import _set from 'lodash/set';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as MetalCleanSheetActions from '~~features/Database/ME/MetalCleanSheet/MetalCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import getcolumns from './ColumnSetting';
import AddModal from './AddModal';


const AnodeColorPrice = (props) => {
  const {
    location,
    // state
    anodeColorPriceList,
    anodeColorPriceDate,
    activeProductType,
    // actions
    putAnodeColorPriceList,
    getAnodeColorPriceList,
    setProductType,
  } = props;


  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    if (activeProductType) {
      getAnodeColorPriceList();
    }
  }, [JSON.stringify(activeProductType)]);

  // 需要丟給use CSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: anodeColorPriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'item' },
  };
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
    handleResetSearchBar,
    // For add modal
    isAddModalOpen,
    setAddModal,
    // For checkbox
    showArchive,
    setShowArchive,
    checkboxColumn,
    // 流水號
    idColumn,
  } =  useCSDB(extendsCSDBPorps);

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    isEditMode,
    checkboxColumn,
    date: anodeColorPriceDate,
    handleOnEditItem,
    idColumn,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            陽極顏色價目表
          </div>
        </div>
        <div className="content-row">
          <InlineBtns justify="flex-start">
            <SearchBar
              width="25rem"
              placeholder="Enter Item Name"
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
                  onClick={handleSave}
                >Save
                </Button>
              </InlineBtns> :
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
                  disabled={mainTableList.length === 0 || !anodeColorPriceDate.nextId}
                />
                {/* 封存 */}
                {/* <Icon
                  icon={IconName.BtnArchive}
                  size="2rem"
                  onClick={() => handleArchive()}
                  disabled={selectedIdList.length === 0}
                /> */}
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

      {/* Add Modal  */}
      <AddModal
        isOpen={isAddModalOpen}
        setAddModal={setAddModal}
      />
    </InnerContainer>
  );

  function handleSave() {
    handleSetEditMode(false);
    const diff = R.difference(editModeList, mainTableList);
    const list = diff.map(item => {
      return {
        id: item.id,
        price: item.next.price,
        lossRate: item.next.lossRate,
      };
    });

    const data = {
      nextId: anodeColorPriceDate.nextId,
      anodeColorPrice: list,
    };
    putAnodeColorPriceList(data);
  }
};


const mapStateToProps = (state) => {
  return {
    anodeColorPriceList: state.metalCleanSheet.anodeColorPrice.anodeColorPriceList,
    anodeColorPriceDate: state.metalCleanSheet.anodeColorPrice.anodeColorPriceDate,
    activeProductType: state.dataBase.common.activeProductType,
  };
};

const mapDispatchToProps = {
  getAnodeColorPriceList: MetalCleanSheetActions.getAnodeColorPriceList,
  putAnodeColorPriceList: MetalCleanSheetActions.putAnodeColorPriceList,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(AnodeColorPrice);
