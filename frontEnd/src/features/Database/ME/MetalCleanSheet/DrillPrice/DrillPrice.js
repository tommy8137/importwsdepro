import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as MetalCleanSheetActions from '~~features/Database/ME/MetalCleanSheet/MetalCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import getColumns from './ColumnSetting';
import AddModal from './AddModal';


const DrillPrice = (props) => {
  const {
    location,
    // state
    drillPrice,
    date,
    activeProductType,
    // actions
    getDrillPriceList,
    updateDrillPriceList,
    setProductType,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    if (activeProductType) {
      getDrillPriceList();
    }
  }, [JSON.stringify(activeProductType)]);

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: drillPrice,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'name' },
    mainTableUpdater: updateDrillPriceList,
  };
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
  } =  useCSDB(extendsCSDBPorps);


  // 需要丟給ColumnSetting的props
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
            鑽切(高光)清單
            <div className="description">Unit: USD</div>
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Enter discription"
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
                  onClick={() => handleSave('items', { nextId: date.nextId })}
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
      <AddModal
        isOpen={isAddModalOpen}
        setAddModal={setAddModal}
      />
    </InnerContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    drillPrice: state.metalCleanSheet.drillPrice.drillPrice,
    date: state.metalCleanSheet.drillPrice.date,
    activeProductType: state.dataBase.common.activeProductType,
  };
};

const mapDispatchToProps = {
  getDrillPriceList: MetalCleanSheetActions.getDrillPriceList,
  updateDrillPriceList: MetalCleanSheetActions.updateDrillPriceList,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(DrillPrice);

