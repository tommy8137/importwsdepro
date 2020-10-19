import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import * as R from 'ramda';
import useCSDB from '~~features/Database/components/useCSDB';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as TurningCleanSheetActions from '~~features/Database/ME/TurningCleanSheet/TurningCleanSheetRedux';
import getColumns from './ColumnSetting';

const ToothPath = props => {
  const { getToothPath, putToothPath, date, toothPathList } = props;

  useEffect(() => {
    getToothPath();
  }, []);

  const extendsCSDBPorps = {
    mainTable: toothPathList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'outterDiameter' },
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
    showArchive,
    setShowArchive,
    checkboxColumn,
    // For add modal
    isAddModalOpen,
    setAddModal,
    idColumn,
  } = useCSDB(extendsCSDBPorps);

  const handleSave = () => {
    const data = {
      items: differenceList.map(item => ({ id: item.id, innerDiameter: item.innerDiameter })),
    };
    setEditMode(false);
    putToothPath(data);
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
          <div className="title">牙徑 清單</div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="28rem"
              placeholder="牙徑"
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
          ) : (
            <InlineBtns>
              {/* 新增 */}
              {/* <Icon
                icon={IconName.BtnAddGroup}
                size="2rem"
                onClick={() => setAddModal(true)}
              /> */}
              {/* 修改 */}
              <Icon icon={IconName.BtnEditGroup} size="2rem" onClick={() => handleSetEditMode(true)} disabled={mainTableList.length === 0} />
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
    toothPathList: state.turningCleanSheet.toothPath.items,
  };
};

const mapDispatchToProps = {
  getToothPath: TurningCleanSheetActions.getToothPath,
  putToothPath: TurningCleanSheetActions.putToothPath,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ToothPath);
