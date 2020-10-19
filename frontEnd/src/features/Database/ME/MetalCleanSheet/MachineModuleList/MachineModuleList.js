import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import * as R from 'ramda';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Select from '~~elements/Select';
import Icon, { IconName } from '~~elements/Icon';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as MetalCleanSheetActions from '~~features/Database/ME/MetalCleanSheet/MetalCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import getColumns from './ColumnSetting';
import AddModal from './AddModal';


const MachineModuleList = (props) => {
  const {
    location,
    // state
    machineModuleList = [],
    metalTypeOptions = [],
    productTypeOptions,
    // actions
    getMachineModuleList,
    setProductType,
    filteredMachineModuleList,
    selectedProductTypeList,
    updateMachineModuleList,
    updateProductTypeList,
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
    initialDropdownInfo: { dataIndex: 'productTypeId' },
    checkBoxDataIndex,
    mainTableUpdater: updateMachineModuleList,
  };

  const {
    // For table
    setEditMode,
    isEditMode,
    mainTable,
    mainTableList,
    editModeList,
    setEditModeList,

    handleTableChange,
    handleSetEditMode,
    handleOnEditItem,

    // For search bar
    keyword,
    setKeyword,
    filterInfo,
    setFilterInfo,

    handleSearch,
    handleResetSearchBar,
    // For checkbox
    showArchive,
    setShowArchive,
    checkboxColumn,
    dropdownlist,
    dropdownValue,
    dropdownColumns,
    setDropdownValue,
    // For add modal
    isAddModalOpen,
    setAddModal,
    // 流水號
    idColumn,
  } = useCSDB(extendsCSDBPorps);

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    isEditMode,
    checkboxColumn,
    handleOnEditItem,
    dropdownColumns,
    metalTypeOptions,
    checkBoxDataIndex,
    editModeList,
    setEditModeList,
    handleSelectChange,
    idColumn,
  };

  const columns = getColumns(extendsColumnPorps);
  const scrollX = columns.reduce((acc, val) => {
    const width = +(val.width);

    if (!Number.isNaN(width)) {
      acc += width;
    }
    return acc;
  }, 50);

  function handleOnChangeEditMode() {
    // 當開起編輯模式時， 把dropdown全開, 也把search清空
    setDropdownValue(dropdownlist);
    setKeyword('');
    setFilterInfo({ ...filterInfo, keyword: '' });
    setEditModeList(mainTable);
    setEditMode(true);
  }

  function handleSave() {
    const list = editModeList.map(obj => ({
      moduleId: obj.moduleId,
      remark: obj.remark,
      items: dropdownlist.map(drop => {
        const { productTypeId, metalTypeId = null, metalTypeName = '' } = obj[drop.label];
        return {
          productTypeId,
          metalTypeId,
          // metalTypeName
        };
      }),
    }));
    const data = {
      machineModule: list,
    };
    updateMachineModuleList(data);
    setEditMode(false);
  }

  function handleSelectChange(option, record, column) {
    const { path } = column;
    const newEditModeList = editModeList.map(row => {
      let newValue;
      if (_get(row, checkBoxDataIndex, false) === _get(record, checkBoxDataIndex, false)) {
        // 橫列：判斷是不是同一行, 同一行只能選一個
        const newRow = dropdownColumns.reduce((prev, curr) => {
          const { path: currPath } = curr;
          const item = _get(record, currPath, {});
          // 如果path一樣的話就把下拉所選的值填進去
          if (currPath === column.path) {
            newValue = {
              ...item,
              metalTypeName: option.label,
              metalTypeId: option.value
            };
          } else {
            // 如果path不一樣就把欄位清空
            newValue = {
              ...item,
              metalTypeName: '',
              metalTypeId: null
            };
          }
          // 產生新的row
          const newRowItem = R.set(R.lensPath(currPath.split('.')), newValue, prev);
          return newRowItem;
        }, row);
        return newRow;
      }
      if (_get(row, [path, 'metalTypeId'], false) === option.value) {
        // 直列：判斷其他行,  其他行的選項不能重複
        const item = _get(row, path, {});
        newValue = {
          ...item,
          metalTypeName: '',
          metalTypeId: null
        };
        const newRow = R.set(R.lensPath(path.split('.')), newValue, row);
        return newRow;
      }
      return row;
    });
    setEditModeList(newEditModeList);
  }

  // 檢查是不是每一行都有選下拉
  const isAllMetalTypeSelected = editModeList.every(item => {
    return dropdownColumns.some(column => {
      return _get(item, [column.path, 'metalTypeId'], false);
    });
  });


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
              onInputChange={setKeyword}
              value={keyword}
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
                  disabled={!isAllMetalTypeSelected}
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
                  onClick={handleOnChangeEditMode}
                  disabled={mainTableList.length === 0}
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
        productTypeOptions={productTypeOptions}
      />
    </InnerContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    machineModuleList: state.metalCleanSheet.machineModuleList.machineModuleList,
    metalTypeOptions: state.metalCleanSheet.machineModuleList.metalTypeOptions,
  };
};

const mapDispatchToProps = {
  getMachineModuleList: MetalCleanSheetActions.getMachineModuleList,
  setProductType: DatabaseActions.setProductType,
  updateMachineModuleList: MetalCleanSheetActions.updateMachineModuleList,
  updateProductTypeList: MetalCleanSheetActions.updateProductTypeList,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MachineModuleList);
