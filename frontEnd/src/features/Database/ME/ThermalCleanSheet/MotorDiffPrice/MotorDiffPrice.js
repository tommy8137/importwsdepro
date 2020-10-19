import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import * as ThermalCleanSheetActions from '~~features/Database/ME/ThermalCleanSheet/ThermalCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import { InnerContainer, InlineBtns } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import RouterMenu from '~~features/Database/components/RouterMenu';
import getColumns from './ColumnSetting';

const MotorDiffPrice = (props) => {
  const {
    date,
    motorDiffPriceList,
    getMotorDiffPrice,
    updateMotorDiffPrice,
  } = props;

  // 一開始進來先拿到product type list
  useEffect(() => {
    getMotorDiffPrice();
  }, []);

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    mainTable: motorDiffPriceList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'fanSize', keyword: '', },
    initialDropdownInfo: { dataIndex: 'motorId' }
  };

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
    differenceList,
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar,
    // For dropdown
    dropdownlist,
    // For router menu
    isMenuOpen,
    setMenu
  } = useCSDB(extendsCSDBPorps);

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    isEditMode,
    handleOnEditItem,
    dropdownColumns,
    date,
  };

  // 路徑設定
  const routerList = [
    { name: 'Fan Baseline 價目表', routerName: '/g/database/thermal/FanBaselinePrice' },
    { name: 'Fan 馬達差異 清單', routerName: '/g/database/thermal/MotorDiff' },
  ];

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">Fan 馬達差異 價目表</div>
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
              placeholder="Enter Fan Size"
              value={keyword}
              onInputChange={setKeyword}
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
          scroll={{ y: 500, x: 800 }}
        />
      </div>
    </InnerContainer>
  );

  function handleSave() {
    const list = differenceList.map(obj => ({
      id: obj.id,
      items: dropdownlist.map(drop => {
        const { motorId, next } = obj[drop.label];
        return ({ motorId, next });
      }),
    }));
    const data = {
      nextId: _get(date, 'nextId', false),
      motorDiffPriceList: list
    };
    updateMotorDiffPrice(data);
    setEditMode(false);
  }
};

const mapStateToProps = (state) => {
  return {
    date: state.thermalCleanSheet.motorDiffPrice.date,
    motorDiffPriceList: state.thermalCleanSheet.motorDiffPrice.motorDiffPriceList,
  };
};

const mapDispatchToProps = {
  getMotorDiffPrice: ThermalCleanSheetActions.getMotorDiffPrice,
  updateMotorDiffPrice: ThermalCleanSheetActions.updateMotorDiffPrice,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MotorDiffPrice);
