import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Select from '~~elements/Select';
import Icon, { IconName } from '~~elements/Icon';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import RouterMenu from '~~features/Database/components/RouterMenu';
import PaintFormulaPriceModal from './PaintFormulaPriceModal';
import getColumns from './ColumnSetting';

const PaintTypePrice = (props) => {
  const {
    location,
    // state
    paintTypeOptions,
    selectedPaintType,
    paintTypePriceList,
    date,
    // action
    getPaintTypeOptions,
    updateSelectedPaintType,
    getPaintTypePriceList,
    updatePaintTypePrice,
    setProductType,
    openPaintFormulaPriceModal,
  } = props;

  // 一開始進來的時候call api 取得Paint Type下拉選單
  useEffect(() => {
    getPaintTypeOptions();
  }, []);

  // 當selectedPaintType改變時, 取得Paint Type Price List
  useEffect(() => {
    const { value: paintBottomTopId } = selectedPaintType;
    if (paintBottomTopId) {
      getPaintTypePriceList(paintBottomTopId);
    }
  }, [selectedPaintType.value]);

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: paintTypePriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: ['name', 'colorName'] },
    initialDropdownInfo: { dataIndex: 'vendorId' }
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
    // For dropdown
    dropdownlist,
    dropdownValue,
    setDropdownValue,
    // For router menu
    isMenuOpen,
    setMenu
  } = csdb;

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    openPaintFormulaPriceModal,
    isEditMode,
    handleOnEditItem,
    dropdownColumns,
    date,
  };

  // 路徑設定
  const routerList = [
    { name: '塗料廠商清單', routerName: '/g/database/plastic/PaintVendorList' },
    { name: '噴漆組合清單', routerName: '/g/database/plastic/PaintGroupList' },
  ];

  return (
    <InnerContainer>
      <PaintFormulaPriceModal />
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            噴漆類型價目表
          </div>
          <RouterMenu
            isMenuOpen={isMenuOpen}
            setMenu={setMenu}
            routerList={routerList}
          />
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="25rem"
              placeholder="Enter Name or Color"
              value={keyword}
              onInputChange={setKeyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
            <p>View By:</p>
            <div className="select-container">
              <Select
                target="box"
                placeholder=""
                options={paintTypeOptions}
                value={selectedPaintType}
                onChange={updateSelectedPaintType}
                onClose={() => { }}
                disabled={isEditMode}
              />
            </div>
          </InlineBtns>
        </div>
        <div className="content-row">
          <InlineBtns>
            <div className="select-container">
              <Select
                isMulti
                target="box"
                placeholder="Vendor"
                options={dropdownlist}
                value={dropdownValue}
                onChange={setDropdownValue}
                onClose={() => { }}
                disabled={isEditMode}
              />
            </div>
          </InlineBtns>
        </div>
        <Table
          headerColor="blue"
          columns={getColumns(extendsColumnPorps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500, x: 1000 }}
        />
      </div>
    </InnerContainer>
  );

  function handleSave() {
    const diff = R.difference(editModeList, mainTableList);
    const list = diff.map(obj => ({
      id: obj.id,
      vendorList: dropdownlist.map(drop => {
        const { vendorId, next } = obj[drop.label];
        return ({ vendorId, next });
      }),
    }));
    const data = {
      nextId: date.nextId,
      paintTypePriceList: list,
    };
    updatePaintTypePrice(data);
    setEditMode(false);
  }
};


const mapStateToProps = (state) => {
  return {
    paintTypeOptions: state.plasticCleanSheet.paintTypePrice.paintTypeOptions,
    selectedPaintType: state.plasticCleanSheet.paintTypePrice.selectedPaintType,
    paintTypePriceList: state.plasticCleanSheet.paintTypePrice.paintTypePriceList,
    date: state.plasticCleanSheet.paintTypePrice.date,
    paintFormulaPriceModalOpen: state.plasticCleanSheet.paintTypePrice.paintFormulaPriceModalOpen,
    paintFormulaPriceData: state.plasticCleanSheet.paintTypePrice.paintFormulaPriceData,
  };
};

const mapDispatchToProps = {
  getPaintTypeOptions: PlasticCleanSheetActions.getPaintTypeOptions,
  updateSelectedPaintType: PlasticCleanSheetActions.updateSelectedPaintType,
  getPaintTypePriceList: PlasticCleanSheetActions.getPaintTypePriceList,
  updatePaintTypePrice: PlasticCleanSheetActions.updatePaintTypePrice,
  setProductType: DatabaseActions.setProductType,
  openPaintFormulaPriceModal: PlasticCleanSheetActions.openPaintFormulaPriceModal,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PaintTypePrice);
