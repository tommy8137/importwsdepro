import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import { InnerContainer, InlineBtns } from '~~features/Database/DatabaseStyles';
import * as ThermalCleanSheetActions from '~~features/Database/ME/ThermalCleanSheet/ThermalCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import getColumns from './ColumnSetting';
import AddModal from './AddModal';

const MotorDiff = (props) => {
  const {
    motorDiffList,
    getMotorDiff,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    getMotorDiff();
  }, []);

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    mainTable: motorDiffList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'item' },
    checkBoxDataIndex: 'motorId'
  };
  const {
    // For table
    mainTableList,
    handleTableChange,
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
    checkboxColumn,
    idColumn,
  };
  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">Fan 馬達差異 清單</div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Enter Item"
              onInputChange={setKeyword}
              value={keyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
            />
            {/* <ArchiveSwitch
              isChecked={showArchive}
              onChange={() => setShowArchive(!showArchive)}
            /> */}
          </InlineBtns>
          <InlineBtns>
            {/* 新增 */}
            {/* <Icon
                  icon={IconName.BtnAddGroup}
                  size="2rem"
                  onClick={() => setAddModal(true)}
                /> */}
            {/* 封存 */}
            {/* <Icon
                  icon={IconName.BtnArchive}
                  size="2rem"
                  // onClick={() => handleArchive()}
                  // disabled={selectedIdList.length === 0}
                /> */}
          </InlineBtns>
        </div>
        <Table
          headerColor="blue"
          columns={getColumns(extendsColumnPorps)}
          dataSource={mainTableList}
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
    motorDiffList: state.thermalCleanSheet.motorDiff.motorDiffList,
  };
};

const mapDispatchToProps = {
  getMotorDiff: ThermalCleanSheetActions.getMotorDiff,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MotorDiff);
