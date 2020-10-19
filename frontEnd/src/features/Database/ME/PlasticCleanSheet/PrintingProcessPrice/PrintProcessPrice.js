import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import SearchBar from '~~features/Database/components/SearchBar';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import getcolumns from './ColumnSetting';

const PrintProcessPrice = (props) => {
  const {
    location,
    // state
    date,
    list,
    activeProductType,
    // action
    getPrintProcessPrice,
    updatePrintProcessPrice,
    setProductType,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    if (activeProductType) {
      getPrintProcessPrice();
    }
  }, [JSON.stringify(activeProductType)]);

  // 需要丟給use CSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: list,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'name' },
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
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar,
    // 流水號
    idColumn,
  } = csdb;

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    date,
    isEditMode,
    handleOnEditItem,
    idColumn,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            Printing製程價目表
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="25rem"
              placeholder="Enter Item"
              value={keyword}
              onInputChange={setKeyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
          </InlineBtns>
          {isEditMode ?
            /* 編輯狀態的Btns */
            <InlineBtns>
              <Button
                round
                color="black"
                onClick={() => handleSetEditMode(false)}
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
                onClick={() => handleSetEditMode(true)}
                disabled={mainTableList.length === 0 || !date.next}
              />
            </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          columns={getcolumns(extendsColumnPorps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500 }}
        />
      </div>
    </InnerContainer>
  );

  function handleSave() {
    handleSetEditMode(false);
    const diff = R.difference(editModeList, mainTableList);
    const printingProcessPriceList = diff.map(({ id, next }) => ({ id, next }));

    const data = {
      nextId: date.nextId,
      printingProcessPriceList,
    };
    updatePrintProcessPrice(data);
  }
};

const mapStateToProps = (state) => {
  return {
    list: state.plasticCleanSheet.printProcessPrice.list,
    date: state.plasticCleanSheet.printProcessPrice.date,
    activeProductType: state.dataBase.common.activeProductType,
  };
};

const mapDispatchToProps = {
  getPrintProcessPrice: PlasticCleanSheetActions.getPrintProcessPrice,
  updatePrintProcessPrice: PlasticCleanSheetActions.updatePrintProcessPrice,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PrintProcessPrice);
