import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import Select, { TARGET } from '~~elements/Select';
import useCSDB from '~~features/Database/components/useCSDB';
import AddModal from './AddModal';
import ColumnSetting from './ColumnSetting';


const LossRate = (props) => {
  const {
    location,
    // props
    list,
    date,
    // action
    getMaterialLossRate,
    putMaterialLossRate,
    setProductType,
  } = props;

  // 勾起來的list
  const [showArchive, setShowArchive] = useState(false);

  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: list,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'item', keyword: '', },
    initialDropdownInfo: { dataIndex: 'productTypeId' }
  };

  const csdb = useCSDB(extendsCSDBPorps);


  useEffect(() => {
    getMaterialLossRate();
  }, []);

  // 需要丟給ColumnSetting的props
  const extendsPorps = {
    ...props,
    date,
    checkboxColumn: csdb.checkboxColumn,
    isEditMode: csdb.isEditMode,
    handleOnEditItem: csdb.handleOnEditItem,
    dropdownColumns: csdb.dropdownColumns,
    idColumn: csdb.idColumn
  };

  /**
  * 當按下封存時
  */
  function handleArchive() {
    console.log('handleArchive >>>', csdb.checkedList);
  }
  /**
   * 更新table的api
   */
  function handleSave() {
    // TODO ONSAVE
    const diffence = csdb.getDropdownDifference('productTypes');
    const data = {
      nextId: date.nextId,
      materialLossRate: diffence
    };
    putMaterialLossRate(data);
    csdb.setEditMode(false);
  }

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            材料Loss Rate維護表
            <div className="description">Unit: %</div>
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="30rem"
              placeholder="Enter Item name"
              value={csdb.keyword}
              onInputChange={csdb.setKeyword}
              onSearch={csdb.handleSearch}
              onReset={csdb.handleResetSearchBar}
              disabled={csdb.isEditMode}
            />
            {/* <ArchiveSwitch
              isChecked={showArchive}
              onChange={() => setShowArchive(!showArchive)}
              disabled={true}
            /> */}
            <div className="select-container">
              <Select
                options={csdb.dropdownlist}
                value={csdb.dropdownValue}
                target={TARGET.BOX}
                isMulti
                onClose={csdb.setDropdownValue}
              />
            </div>
          </InlineBtns>
          {csdb.isEditMode ?
            /* 編輯狀態的Btns */
            <InlineBtns>
              <Button
                round
                color="black"
                onClick={() => csdb.handleSetEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                round
                color="green"
                onClick={handleSave}
              >
                Save
              </Button>
            </InlineBtns> :
            /* 非編輯狀態的Btns */
            <InlineBtns>
              {/* 新增 */}
              {/* <Icon
                icon={IconName.BtnAddGroup}
                size="2rem"
                onClick={() => csdb.setAddModal(true)}
                disabled
              /> */}
              {/* 修改 */}
              <Icon
                icon={IconName.BtnEditGroup}
                size="2rem"
                onClick={() => csdb.handleSetEditMode(true)}
                disabled={csdb.mainTableList.length === 0 || !date.nextId}
              />
              {/* 封存 */}
              {/* <Icon
                icon={IconName.BtnArchive}
                size="2rem"
                onClick={() => handleArchive()}
                // disabled={selectedIdList.length === 0}
                disabled={true}
              /> */}
            </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          hoverColor="blue"
          columns={ColumnSetting(extendsPorps)}
          dataSource={csdb.isEditMode ? csdb.editModeList : csdb.mainTableList}
          pagination={false}
          onChange={csdb.handleTableChange}
          scroll={{ y: 500, x: '100%' }}
        />
      </div>

      {/* Modal  */}
      <AddModal
        isOpen={csdb.isAddModalOpen}
        setAddModal={csdb.setAddModal}
        handleAddItem={() => { }}
      />
    </InnerContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    date: state.plasticCleanSheet.materialLossRate.date,
    list: state.plasticCleanSheet.materialLossRate.list,
  };
};

const mapDispatchToProps = {
  getMaterialLossRate: PlasticCleanSheetActions.getMaterialLossRate,
  putMaterialLossRate: PlasticCleanSheetActions.putMaterialLossRate,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LossRate);

