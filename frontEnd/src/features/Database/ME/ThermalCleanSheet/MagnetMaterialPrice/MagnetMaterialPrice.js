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
import * as ThermalCleanSheetActions from '~~features/Database/ME/ThermalCleanSheet/ThermalCleanSheetActions';
import RouterMenu from '~~features/Database/components/RouterMenu';
import getColumns from './ColumnSetting';
import AddModal from './AddModal';

const MagnetMaterialPrice = (props) => {
  const {
    date,
    magnetMaterialPriceList,
    getMagnetMaterialPrice,
    updateMagnetMaterialPrice,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    getMagnetMaterialPrice();
  }, []);

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    mainTable: magnetMaterialPriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'fanSize' },
    initialDropdownInfo: { dataIndex: 'magnetId' }
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
    dropdownColumns,
    getDropdownDifference,
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
    // Router menu
    isMenuOpen,
    setMenu,
  } = useCSDB(extendsCSDBPorps);

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    dropdownColumns,
    isEditMode,
    date,
    checkboxColumn,
    handleOnEditItem,
  };

  function handleSave() {
    const list = getDropdownDifference('items');
    const data = {
      nextId: _get(date, 'nextId', false),
      magnetMaterialPriceList: list
    };
    setEditMode(false);
    updateMagnetMaterialPrice(data);
  }

  const routerList = [
    { name: 'Fan Baseline 價目表', routerName: '/g/database/thermal/FanBaselinePrice' },
    { name: 'Fan 磁石材料清單', routerName: '/g/database/thermal/MagnetMaterial' },
  ];

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            Fan 磁石材料 價目表
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
              width="28rem"
              placeholder="Enter Fan Size"
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
    magnetMaterialPriceList: state.thermalCleanSheet.magnetMaterialPrice.magnetMaterialPriceList,
    date: state.thermalCleanSheet.magnetMaterialPrice.date,
  };
};

const mapDispatchToProps = {
  getMagnetMaterialPrice: ThermalCleanSheetActions.getMagnetMaterialPrice,
  updateMagnetMaterialPrice: ThermalCleanSheetActions.updateMagnetMaterialPrice,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MagnetMaterialPrice);

