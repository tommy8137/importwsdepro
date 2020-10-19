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
import * as ThermalCleanSheetActions from '~~features/Database/ME/ThermalCleanSheet/ThermalCleanSheetActions';
import getColumns from './ColumnSetting';

const ThermalPadPrice = (props) => {
  const {
    date,
    thermalPadPriceList,
    getThermalPadPrice,
    updateThermalPad,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    getThermalPadPrice();
  }, []);

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    mainTable: thermalPadPriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: ['heatTransfer', 'hardness', 'thickness'] },
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
  } =  useCSDB(extendsCSDBPorps);


  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    isEditMode,
    date,
    handleOnEditItem,
  };
  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">Thermal Pad 價目表</div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Search ..."
              onInputChange={setKeyword}
              value={keyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
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
                {/* 修改 */}
                <Icon
                  icon={IconName.BtnEditGroup}
                  size="2rem"
                  onClick={() => handleSetEditMode(true)}
                  disabled={mainTableList.length === 0 || !date.nextId}
                />
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
    </InnerContainer>
  );

  function handleSave() {
    const data = {
      nextId: _get(date, 'nextId', false),
      thermalPadList: differenceList.map(item => ({ id: item.id,  next: item.next }))
    };
    setEditMode(false);
    updateThermalPad(data);
  }
};


const mapStateToProps = (state) => {
  return {
    thermalPadPriceList: state.thermalCleanSheet.thermalPadPrice.thermalPadPriceList,
    date: state.thermalCleanSheet.thermalPadPrice.date,
  };
};

const mapDispatchToProps = {
  getThermalPadPrice: ThermalCleanSheetActions.getThermalPadPrice,
  updateThermalPad: ThermalCleanSheetActions.updateThermalPad,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ThermalPadPrice);
