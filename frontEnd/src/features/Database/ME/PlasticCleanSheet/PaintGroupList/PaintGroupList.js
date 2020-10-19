import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import RouterMenu from '~~features/Database/components/RouterMenu';
import getColumns from './ColumnSetting';
import AddModal from './AddModal';


const PaintGroupList = (props) => {
  const {
    location,
    // state
    paintGroupList,
    // action
    getPaintGroupList,
    setProductType,
  } = props;

  useEffect(() => {
    getPaintGroupList();
  }, []);

  const checkBoxDataIndex = 'rowId';

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: paintGroupList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: ['paintType', 'color'] },
    checkBoxDataIndex
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
    // For router menu
    isMenuOpen,
    setMenu,
    // 流水號
    idColumn,
  } = csdb;

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    checkboxColumn,
    idColumn,
  };

  // 路徑設定
  const routerList = [
    { name: '噴漆顏色及類型清單', routerName: '/g/database/plastic/PaintTypeList' },
  ];

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            噴漆組合清單
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
    paintGroupList: state.plasticCleanSheet.paintGroup.paintGroupList,
  };
};

const mapDispatchToProps = {
  getPaintGroupList: PlasticCleanSheetActions.getPaintGroupList,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PaintGroupList);
