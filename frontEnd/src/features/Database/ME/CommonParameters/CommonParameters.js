import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import moment from 'moment';
import _get from 'lodash/get';
import Icon, { IconName } from '~~elements/Icon';
import Button, { BTN_COLOR } from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import useCSDB from '~~features/Database/components/useCSDB';
import ScheduleModal from '~~features/Database/components/ScheduleModal';
import Columns from './ColumnSetting';


const CommonParameterComponent = (props) => {
  const {
    // state
    parameterList,
    schedule,
    date,

    // actions
    getCommonParameters,
    setCommonParameters,
    setCommonParameterSchedule,

  } = props;

  const extendsCSDBPorps = {
    mainTable: parameterList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'item', keyword: '', },
    mainTableUpdater: setCommonParameters,
    scheduleUpdater: setCommonParameterSchedule,
  };

  const csdb = useCSDB(extendsCSDBPorps);

  useEffect(() => {
    getCommonParameters();
  }, []);

  const getButtons = () => (
    csdb.isEditMode ?
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
          onClick={() => csdb.handleSave('items', { nextId: date.nextId })}
        >
          Save
        </Button>
      </InlineBtns> :
      /* 非編輯狀態的Btns */
      <InlineBtns>
        <Icon
          icon={IconName.BtnEditGroup}
          size="2rem"
          onClick={() => csdb.handleSetEditMode(true)}
          disabled={csdb.mainTableList.length === 0 || !date.nextId}
        />
      </InlineBtns>
  );

  return (
    <InnerContainer isEditMode={csdb.isEditMode}>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">Common Parameters</div>
          <Button
            round
            color={BTN_COLOR.BLACK}
            disabled={csdb.isEditMode}
            onClick={e => csdb.setOpenSchedule(true)}
          >
            <Icon icon={IconName.IcoAddWhite} size="0.75rem" />
            Schedule New
          </Button>
        </div>
        <div className="content-row">
          <SearchBar
            placeholder="Search..."
            value={csdb.keyword}
            onInputChange={csdb.setKeyword}
            onSearch={csdb.handleSearch}
            onReset={csdb.handleResetSearchBar}
            disabled={csdb.isEditMode}
          />
          {_get(date, 'next', false) ? getButtons() : null}
        </div>
        <Table
          headerColor="blue"
          columns={Columns(csdb.isEditMode, csdb.handleOnEditItem, date)}
          dataSource={csdb.isEditMode ? csdb.editModeList : csdb.mainTableList}
          pagination={false}
          onChange={csdb.handleTableChange}
        />
      </div>
      <ScheduleModal
        isOpen={csdb.openSchedule}
        defaultValue={schedule || moment().add(1, 'days').format('YYYY/MM/DD')}
        onSave={csdb.handleSaveSchedule}
        onCancel={() => csdb.setOpenSchedule(false)}
      />
    </InnerContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    parameterList: state.dataBase.parameters.parameterList,
    schedule: state.dataBase.parameters.schedule,
    date: state.dataBase.parameters.date,
  };
};

const mapDispatchToProps = {
  getCommonParameters: DatabaseActions.getCommonParameters,
  setCommonParameters: DatabaseActions.setCommonParameters,
  setCommonParameterSchedule: DatabaseActions.setCommonParameterSchedule,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(CommonParameterComponent);

