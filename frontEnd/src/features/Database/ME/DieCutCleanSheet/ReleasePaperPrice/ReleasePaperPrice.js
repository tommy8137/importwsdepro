import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import useCSDB from '~~features/Database/components/useCSDB';
import { InnerContainer, InlineBtns } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import * as DieCutCleanSheetActions from '~~features/Database/ME/DieCutCleanSheet/DieCutCleanSheetActions';
import getColumns from './ColumnSetting';
// import AddModal from './AddModal';

const ReleasePaperPrice = (props) => {
  const {
    date,
    releasePaperPriceList,
    getReleasePaperPrice,
    updateReleasePaperPrice,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    getReleasePaperPrice();
  }, []);

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    date,
    mainTable: releasePaperPriceList,
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
    idColumn,
    // For add modal
    isAddModalOpen,
    setAddModal,
  } = useCSDB(extendsCSDBPorps);


  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    isEditMode,
    date,
    idColumn,
    handleOnEditItem,
  };
  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            離型紙/膜 價目表
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
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
                  disabled={mainTableList.length <= 0 || !date.nextId}
                />
                {/* 封存 */}
                {/* <Icon
                  icon={IconName.BtnArchive}
                  size="2rem"
                  // onClick={() => handleArchive()}
                  // disabled={selectedIdList.length === 0}
                /> */}
              </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          columns={getColumns(extendsColumnPorps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
        />
      </div>

      {/* Add Modal  */}
      {/* <AddModal
        isOpen={isAddModalOpen}
        setAddModal={setAddModal}
      /> */}
    </InnerContainer>
  );

  function handleSave() {
    const data = {
      nextId: _get(date, 'nextId', false),
      releasePaperPrice: differenceList.map(item => ({ id: item.id, next: item.next }))
    };
    setEditMode(false);
    updateReleasePaperPrice(data);
  }
};


const mapStateToProps = (state) => {
  return {
    releasePaperPriceList: state.diecutCleanSheet.releasePaperPrice.releasePaperPriceList,
    date: state.diecutCleanSheet.releasePaperPrice.date,
  };
};

const mapDispatchToProps = {
  getReleasePaperPrice: DieCutCleanSheetActions.getReleasePaperPrice,
  updateReleasePaperPrice: DieCutCleanSheetActions.updateReleasePaperPrice,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ReleasePaperPrice);

