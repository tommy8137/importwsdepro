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
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import AddModalWrap from '~~features/Database/ME/MaterialPrice/AddModal/AddModalWrap';
import { TABLE_NAME, API_KEY_NAME } from '~~features/Database/ME/MaterialPrice/MaterialConst';
import getColumns from './ColumnSetting';

const Turning = props => {
  const {
    materialPriceList,
    materialPriceDate: date,
    setMaterialPriceIsEditMode,
    putMaterialPriceCommonParameter,
    selectedPartCate: { value: partCate },
    addNewMaterialPriceItem,
    putMaterialPriceNutType,
    archiveMaterialPriceItem,
    getMaterialPriceTurningDropdown,
    nutTypeList = [],
    partCate2List = [],
    materialMappingList = [],
    unArchiveMaterialPriceItem,
  } = props;


  const tempMaterialPriceList = materialPriceList.map(obj =>
    ({ ...obj, checkId: `${obj.id}_${obj.partCategory2Id}` }));

  const extendsCSDBPorps = {
    checkBoxDataIndex: 'checkId',
    selectedDataIndex: 'checkId',
    mainTable: tempMaterialPriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: ['item', 'density'] },
    onUnArchive: handleUnArchive,
  };

  // console.log('materialPriceList >>', materialPriceList);

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
    isSaveBtnInvalid,
    // For Archicve
    checkedList,
    unArchiveColumn,
  } = useCSDB(extendsCSDBPorps);

  useEffect(() => {
    getMaterialPriceTurningDropdown();
  }, [JSON.stringify(materialPriceList)]);

  useEffect(() => {
    setMaterialPriceIsEditMode(isEditMode);
  }, [isEditMode]);

  // getMaterialPriceList(partCate);


  /* 編輯 ----------------------------------------------------------------------------------------------------------*/
  const handleSave = () => {
    const data = {
      nextId: _get(date, 'nextId', false),
      items: differenceList.map(item => ({ id: item.id, next: item.next })),
    };
    // console.log('on turning material price save', data);
    setEditMode(false);
    putMaterialPriceCommonParameter(partCate, data);
    // putNylokUnitPrice(data);
  };

  /* 新增 -----------------------------------------------------------------------------------------------------------*/
  function handleAddNewItem(data) {
    setAddModal(false);
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL,
      data
    };
    addNewMaterialPriceItem(info);
  }

  /* 封存 -----------------------------------------------------------------------------------------------------------*/
  function handleArchive() {
    const data = checkedList.map(obj => {
      const [materialId, partCategory2Id] = obj.split('_');
      return { materialId, partCategory2Id };
    });
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL,
      data
    };
    archiveMaterialPriceItem(info);
  }

  function handleUnArchive(unArchiveList) {
    const data = unArchiveList.map(obj => {
      const [materialId, partCategory2Id] = obj.split('_');
      return { materialId, partCategory2Id };
    });
    const info = {
      partCate,
      tableName: TABLE_NAME.MATERIAL,
      data
    };
    unArchiveMaterialPriceItem(info);
  }


  function handleChangeNutType(data) {
    setEditMode(false);
    putMaterialPriceNutType(partCate, data);
  }

  const extendsColumnPorps = {
    ...props,
    isEditMode,
    date,
    unArchiveColumn,
    checkboxColumn,
    showArchive,
    handleOnEditItem,
    handleChangeNutType,
    nutTypeList,
  };

  const columns = getColumns(extendsColumnPorps);

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Enter Material or Density"
              onInputChange={setKeyword}
              value={keyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
            <ArchiveSwitch
              isChecked={showArchive}
              onChange={() => setShowArchive(!showArchive)}
              disabled={isEditMode}
            />
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
          ) :
            (
              <InlineBtns>
                {/* 新增 */}
                <Icon
                  icon={IconName.BtnAddGroup}
                  size="2rem"
                  onClick={() => setAddModal(true)}
                />
                {/* 修改 */}
                <Icon
                  icon={IconName.BtnEditGroup}
                  size="2rem"
                  onClick={() => handleSetEditMode(true)}
                  disabled={mainTableList.length === 0}
                />
                {/* 封存 */}
                <Icon
                  icon={IconName.BtnArchive}
                  size="2rem"
                  onClick={handleArchive}
                  disabled={checkedList.length === 0}
                />
              </InlineBtns>
            )}
        </div>
        <Table
          rowKey="checkId"
          headerColor="blue"
          columns={columns}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
        />
      </div>
      {/* Modal  */}
      <AddModalWrap
        mainTableList={mainTableList}
        isOpen={isAddModalOpen}
        addModalPath={[partCate]}
        setAddModal={setAddModal}
        onAdd={handleAddNewItem}
        isSaveBtnInvalid={isSaveBtnInvalid}
        nutTypeList={nutTypeList}
        partCate2List={partCate2List}
        materialMappingList={materialMappingList}
      />
    </InnerContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedPartCate: state.dataBase.materialPrice.selectedPartCate,
    materialPriceList: state.dataBase.materialPrice.materialPriceList,
    materialPriceDate: state.dataBase.materialPrice.materialPriceDate,
    nutTypeList: state.dataBase.materialPrice.turning.nutTypeList,
    partCate2List: state.dataBase.materialPrice.turning.partCate2List,
    materialMappingList: state.dataBase.materialPrice.turning.materialMappingList,
  };
};

const mapDispatchToProps = {
  getMaterialPriceTurningDropdown: DatabaseActions.getMaterialPriceTurningDropdown,
  putMaterialPriceNutType: DatabaseActions.putMaterialPriceNutType,
  putMaterialPriceCommonParameter: DatabaseActions.putMaterialPriceCommonParameter,
  setMaterialPriceIsEditMode: DatabaseActions.setMaterialPriceIsEditMode,
  addNewMaterialPriceItem: DatabaseActions.addNewMaterialPriceItem,
  archiveMaterialPriceItem: DatabaseActions.archiveMaterialPriceItem,
  unArchiveMaterialPriceItem: DatabaseActions.unArchiveMaterialPriceItem,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Turning);
