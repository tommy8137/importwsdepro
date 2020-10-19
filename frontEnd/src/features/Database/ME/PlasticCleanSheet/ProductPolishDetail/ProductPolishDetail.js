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
// import AddModal from './AddModal';
import ColumnSetting from './ColumnSetting';


const ProductPolishDetail = (props) => {
  const {
    location,
    // props
    list,
    date,
    activeProductType,
    // action
    getGrindingPriceList,
    putGrindingPriceList,
    setProductType,
  } = props;

  // 勾起來的list
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => {
    if (activeProductType) {
      getGrindingPriceList();
    }
  }, [JSON.stringify(activeProductType)]);

  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: list,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'item', keyword: '', },
  };
  const csdb = useCSDB(extendsCSDBPorps);

  // 需要丟給ColumnSetting的props
  const extendsPorps = {
    ...props,
    date,
    checkboxColumn: csdb.checkboxColumn,
    isEditMode: csdb.isEditMode,
    handleOnEditItem: csdb.handleOnEditItem,
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
    const data = {
      nextId: date.nextId,
      grindingPriceList: csdb.differenceList
    };
    putGrindingPriceList(data);
    csdb.setEditMode(false);
  }

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            成品打磨費用明細
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
              {/* 修改 */}
              <Icon
                icon={IconName.BtnEditGroup}
                size="2rem"
                onClick={() => csdb.handleSetEditMode(true)}
                disabled={csdb.mainTableList.length === 0 || !date.nextId}
              />
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
    </InnerContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    date: state.plasticCleanSheet.grindingPrice.date,
    list: state.plasticCleanSheet.grindingPrice.list,
    activeProductType: state.dataBase.common.activeProductType,
  };
};

const mapDispatchToProps = {
  getGrindingPriceList: PlasticCleanSheetActions.getGrindingPriceList,
  putGrindingPriceList: PlasticCleanSheetActions.putGrindingPriceList,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ProductPolishDetail);

