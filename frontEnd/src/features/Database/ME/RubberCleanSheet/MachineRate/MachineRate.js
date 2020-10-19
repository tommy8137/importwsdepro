import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import useCSDB from '~~features/Database/components/useCSDB';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as RubberCleanSheetActions from '~~features/Database/ME/RubberCleanSheet/RubberCleanSheetRedux';
import getColumns from './ColumnSetting';

const PrintingPrice = props => {
  const { getRubberMachineRate, putRubberMachineRate, date, machineRateList } = props;

  useEffect(() => {
    getRubberMachineRate();
  }, []);

  const extendsCSDBPorps = {
    mainTable: machineRateList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'item' },
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
    checkboxColumn,
    // For add modal
    idColumn,
  } = useCSDB(extendsCSDBPorps);

  const handleSave = () => {
    const data = {
      nextId: _get(date, 'nextId', false),
      machineRate: differenceList.map(item => ({
        id: item.id,
        l: item.next.l,
        w: item.next.w,
        cost: item.next.cost,
      })),
    };
    setEditMode(false);
    putRubberMachineRate(data);
  };

  const extendsColumnPorps = {
    ...props,
    isEditMode,
    date,
    checkboxColumn,
    handleOnEditItem,
    idColumn,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">Machine Rate / 穴數計算維護表</div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="Enter Item Name"
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
          ) :
            (
              <InlineBtns>
                {/* 新增 */}
                {/* <Icon
                  icon={IconName.BtnAddGroup}
                  size="2rem"
                  onClick={() => setAddModal(true)}
                /> */}
                {/* 修改 */}
                {/* <Icon icon={IconName.BtnEditGroup} size="2rem" onClick={() => handleSetEditMode(true)} disabled={mainTableList.length === 0 || !date.nextId} /> */}
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
    machineRateList: state.rubberCleanSheet.machineRate.machineRate,
    date: state.rubberCleanSheet.machineRate.date,
  };
};

const mapDispatchToProps = {
  getRubberMachineRate: RubberCleanSheetActions.getRubberMachineRate,
  putRubberMachineRate: RubberCleanSheetActions.putRubberMachineRate,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(PrintingPrice);
