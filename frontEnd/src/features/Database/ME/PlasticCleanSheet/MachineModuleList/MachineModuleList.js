import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Select from '~~elements/Select';
import Icon, { IconName } from '~~elements/Icon';
import * as R from 'ramda';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import getColumns from './ColumnSetting';
import AddModal from './AddModal';


const MachineModuleList = (props) => {
  const {
    location,
    // state
    machineModuleList,
    category2List,
    isUpdateSuccessed,
    // action
    getMachineModuleList,
    updateMachineModuleList,
    setProductType,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    getMachineModuleList();
  }, []);

  // checkbox val的keyName
  const checkBoxDataIndex = 'moduleId';

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: machineModuleList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'moduleName' },
    checkBoxDataIndex,
    initialDropdownInfo: { dataIndex: 'productTypeId' }
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
    dropdownColumns,
    setEditMode,
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
    // For dropdown
    dropdownlist,
    dropdownValue,
    setDropdownValue,
    // 流水號
    idColumn,
  } = csdb;

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    checkBoxDataIndex,
    isEditMode,
    checkboxColumn,
    handleOnEditItem,
    category2List,
    dropdownColumns,
    idColumn,
  };

  // 更新成功才關閉編輯模式
  useEffect(() => {
    if (isUpdateSuccessed === true) {
      setEditMode(false);
    }
  }, [isUpdateSuccessed]);

  const columns = getColumns(extendsColumnPorps);
  const scrollX = columns.reduce((acc, val) => {
    const width = +(val.width);

    if (!Number.isNaN(width)) {
      acc += width;
    }
    return acc;
  }, 50);

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            機台 Module 清單
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="25rem"
              placeholder="Enter Module Name"
              value={keyword}
              onInputChange={setKeyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
            <div className="select-container">
              <Select
                isMulti
                target="box"
                placeholder="Product Type"
                options={dropdownlist}
                value={dropdownValue}
                onChange={setDropdownValue}
                onClose={() => { }}
                disabled={isEditMode}
              />
            </div>
            {/* <ArchiveSwitch
              isChecked={showArchive}
              onChange={() => setShowArchive(!showArchive)}
              disabled={true}
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
                  disabled={true}
                /> */}
                {/* 修改 */}
                <Icon
                  icon={IconName.BtnEditGroup}
                  size="2rem"
                  onClick={() => handleSetEditMode(true)}
                  disabled={mainTableList.length === 0}
                />
                {/* 封存 */}
                {/* <Icon
                icon={IconName.BtnArchive}
                size="2rem"
                // onClick={() => handleArchive()}
                // disabled={selectedIdList.length === 0}
                disabled={true}
              /> */}
              </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          columns={columns}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ x: scrollX, y: 500 }}
        />
      </div>

      {/* Add Modal  */}
      <AddModal
        isOpen={isAddModalOpen}
        setAddModal={setAddModal}
        productTypeList={dropdownlist}
        category2List={category2List}
      />
    </InnerContainer>
  );

  function handleSave() {
    const list = editModeList.map(obj => ({
      moduleId: obj.moduleId,
      remark: obj.remark,
      items: dropdownlist.map(drop => {
        const { productTypeId, category2List: idList } = obj[drop.label];
        return ({
          productTypeId,
          category2List: idList.map(i => i.id)
        });
      }),
    }));
    const data = {
      machineModule: list,
    };
    updateMachineModuleList(data);
  }
};


const mapStateToProps = (state) => {
  return {
    machineModuleList: state.plasticCleanSheet.machineModule.machineModuleList,
    category2List: state.plasticCleanSheet.machineModule.category2List,
    isUpdateSuccessed: state.plasticCleanSheet.machineModule.isUpdateSuccessed,
  };
};

const mapDispatchToProps = {
  getMachineModuleList: PlasticCleanSheetActions.getMachineModuleList,
  updateMachineModuleList: PlasticCleanSheetActions.updateMachineModuleList,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MachineModuleList);
