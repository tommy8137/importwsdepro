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
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import getColumns from './ColumnSetting';
import AddModal from './AddModal';


const EmiSputteringBaseList = (props) => {
  const {
    location,
    // state
    emiSputteringBaseList,
    activeProductType,
    // action
    getEmiSputteringBaseList,
    setProductType,
  } = props;

  useEffect(() => {
    if (activeProductType) {
      getEmiSputteringBaseList();
    }
  }, [JSON.stringify(activeProductType)]);


  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: emiSputteringBaseList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'name' }
  };
  const csdb = useCSDB(extendsCSDBPorps);
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
  } = csdb;

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    checkboxColumn,
    idColumn,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            EMI Sputtering Base 本體材質清單
          </div>
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
            />
            {/* <ArchiveSwitch
              isChecked={showArchive}
              onChange={() => setShowArchive(!showArchive)}
              disabled={true}
            /> */}
          </InlineBtns>
          <InlineBtns>
            {/* 新增 */}
            {/* <Icon
              icon={IconName.BtnAddGroup}
              size="2rem"
              onClick={() => setAddModal(true)}
              disabled={true}
            /> */}
            {/* 封存 */}
            {/* <Icon
              icon={IconName.BtnArchive}
              size="2rem"
              // onClick={() => handleArchive()}
              // disabled={selectedIdList.length === 0}
              disabled={true}
            /> */}
          </InlineBtns>
        </div>
        <Table
          headerColor="blue"
          columns={getColumns(extendsColumnPorps)}
          dataSource={mainTableList}
          pagination={false}
          onChange={handleTableChange}
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
    emiSputteringBaseList: state.plasticCleanSheet.emiSputteringBase.emiSputteringBaseList,
    activeProductType: state.dataBase.common.activeProductType,
  };
};

const mapDispatchToProps = {
  getEmiSputteringBaseList: PlasticCleanSheetActions.getEmiSputteringBaseList,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EmiSputteringBaseList);
