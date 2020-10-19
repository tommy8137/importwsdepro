import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import * as R from 'ramda';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Select, { TARGET } from '~~elements/Select';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import ArchiveSwitch from '~~features/Database/components/ArchiveSwitch';
import useCSDB from '~~features/Database/components/useCSDB';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as MetalCleanSheetActions from '~~features/Database/ME/MetalCleanSheet/MetalCleanSheetActions';
import getColumns from './ColumnSetting';


function reGenDatalist(datalist) {
  if (datalist.length === 0) {
    return datalist;
  }
  let hmToolingStageDieCostList = [];
  let hmToolingProgressiveDieCostList = [];
  datalist.forEach((item) => {
    if (item.pressTypeName === '工程模') {
      hmToolingStageDieCostList = [
        ...hmToolingStageDieCostList,
        item
      ];
    }
    if (item.pressTypeName === '連續模') {
      hmToolingProgressiveDieCostList = [
        ...hmToolingProgressiveDieCostList,
        item
      ];
    }
  });

  let tablelist = [];
  // 為了呈現colspan，做一筆假資料
  tablelist = [
    { ...datalist[0], note: 'FORCPLSPAN', id: 'FORCPLSPAN_1' },
    ...hmToolingStageDieCostList,
    { ...datalist[0], note: 'FORCPLSPAN', id: 'FORCPLSPAN_2' },
    ...hmToolingProgressiveDieCostList
  ];
  return {
    tablelist,
    hmToolingStageDieCostLength: hmToolingStageDieCostList.length,
    hmToolingProgressiveDieCost: hmToolingProgressiveDieCostList.length
  };
}

const MachineTonnagePrice = (props) => {
  const {
    location,
    // state
    datalist,
    date,
    // actions
    getMachineTonnagePrice,
    putMachineTonnagePrice,
    setProductType,
  } = props;


  // 一開始進來的時候call api 取得Paint Type下拉選單
  useEffect(() => {
    getMachineTonnagePrice();
  }, []);

  const uniqueIdNameForIndex = 'uniqueId';

  // 需要丟給useCSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: datalist,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: ['ton', 'bloster', 'remark'] },
    initialDropdownInfo: { dataIndex: 'moduleMetalId' },
    checkBoxDataIndex: uniqueIdNameForIndex
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
    getDropdownDifference,
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar,
    // For dropdown
    dropdownlist,
    dropdownValue,
    setDropdownValue,
    // For checkbox
    showArchive,
    setShowArchive,
  } = useCSDB(extendsCSDBPorps);


  // 為了區分工程模和連續模重新整理資料
  const { tablelist: updatedDatalist, hmToolingStageDieCostLength } = reGenDatalist(mainTableList);
  const { tablelist: updatedEditModeList } = reGenDatalist(editModeList);
  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    isEditMode,
    handleOnEditItem,
    dropdownColumns,
    date,
    // idColumn,
    hmToolingStageDieCostLength,
    uniqueIdNameForIndex,
    // view mode的table資料
    updatedDatalist,
    getOriginValueByUniquIdAndPath: (uniqueId, pathArray) => {
      const record = updatedDatalist.find(item => item[uniqueIdNameForIndex] === uniqueId);
      return R.path(pathArray, record);
    }
  };

  const getButtons = () => (isEditMode ?
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
      <Icon
        icon={IconName.BtnEditGroup}
        size="2rem"
        onClick={() => handleSetEditMode(true)}
      />
    </InlineBtns>);
  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">機台噸數價目表</div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="25rem"
              placeholder="Search..."
              value={keyword}
              onInputChange={setKeyword}
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
                isMulti
                target={TARGET.BOX}
                options={dropdownlist}
                value={dropdownValue}
                onChange={setDropdownValue}
                onClose={() => { }}
                disabled={isEditMode}
              />
            </div>
          </InlineBtns>
          {_get(date, 'nextId', false) ? getButtons() : null}
        </div>
        <Table
          headerColor="blue"
          columns={getColumns(extendsColumnPorps)}
          // 有colspan的特殊情狀，用updatedDatalist取代mainTableList；updatedEditModeList取代editModeList
          dataSource={isEditMode ? updatedEditModeList : updatedDatalist}
          pagination={false}
          onChange={handleTableChange}
          scroll={{ y: 500, x: '100%' }}
        />
      </div>
    </InnerContainer>
  );

  function handleSave() {
    const difference = getDropdownDifference('modules');
    const data = {
      nextId: date.nextId,
      machineTonnesList: difference
    };
    putMachineTonnagePrice(data);
    setEditMode(false);
  }
};


const mapStateToProps = (state) => {
  return {
    datalist: state.metalCleanSheet.machineTonnagePrice.datalist,
    date: state.metalCleanSheet.machineTonnagePrice.date,
  };
};

const mapDispatchToProps = {
  getMachineTonnagePrice: MetalCleanSheetActions.getMachineTonnagePrice,
  putMachineTonnagePrice: MetalCleanSheetActions.putMachineTonnagePrice,
  // setCommonParameterSchedule: MetalCleanSheetActions.setCommonParameterSchedule,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MachineTonnagePrice);

