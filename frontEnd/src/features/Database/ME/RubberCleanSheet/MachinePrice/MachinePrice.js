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
import Select, { TARGET } from '~~elements/Select';
import * as RubberCleanSheetActions from '~~features/Database/ME/RubberCleanSheet/RubberCleanSheetRedux';
import getColumns from './ColumnSetting';

const MachinePrice = props => {
  const { getRubberMachinePrice, putRubberMachinePrice, date, machinePriceList } = props;

  useEffect(() => {
    getRubberMachinePrice();
  }, []);

  const extendsCSDBPorps = {
    mainTable: machinePriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'ton' },
    initialDropdownInfo: { dataIndex: 'productTypeId' }
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

    // for dropdown
    dropdownColumns,
    idColumn,
    dropdownlist,
    dropdownValue,
    setDropdownValue,
    getDropdownDifference,
  } = useCSDB(extendsCSDBPorps);

  const handleSave = () => {
    const difference = getDropdownDifference('productTypes');
    const data = {
      nextId: date.nextId,
      machinePrice: difference
    };
    setEditMode(false);
    putRubberMachinePrice(data);
  };

  const extendsColumnPorps = {
    ...props,
    isEditMode,
    date,
    checkboxColumn,
    handleOnEditItem,
    dropdownColumns,
    idColumn,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            機台費用 價目表
            <div className="description">Unit: USD</div>
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Ton"
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
            <div className="select-container">
              <Select
                options={dropdownlist}
                value={dropdownValue}
                target={TARGET.BOX}
                isMulti
                onClose={setDropdownValue}
              />
            </div>
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
        <Table
          rowKey="id"
          headerColor="blue"
          columns={getColumns(extendsColumnPorps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
        />
      </div>
    </InnerContainer>
  );
};

const mapStateToProps = state => {
  return {
    machinePriceList: state.rubberCleanSheet.machinePrice.machinePrice,
    date: state.rubberCleanSheet.machinePrice.date,
  };
};

const mapDispatchToProps = {
  getRubberMachinePrice: RubberCleanSheetActions.getRubberMachinePrice,
  putRubberMachinePrice: RubberCleanSheetActions.putRubberMachinePrice,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MachinePrice);
