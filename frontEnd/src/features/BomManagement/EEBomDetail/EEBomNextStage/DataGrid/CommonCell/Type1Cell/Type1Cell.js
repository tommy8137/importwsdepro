import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import Select from '~~elements/Select';


function Type1Cell(props) {
  const { originalTableData, typesList = [], value, cellInfo, helperInfo, onClick, isEditMode } = props;
  const { columnIndex, key, rowIndex, style } = cellInfo;
  const { row: { id: rowId, type1 }, columnKey } = helperInfo;


  // 原始資料的type1: 先找originTableData是不是null, 如果是才讓他可以選type1type2
  const oriType1Value =
    _.chain(originalTableData)
      .find(item => item.id === rowId)
      .get('type1', '')
      .value();

  // 得到type1 options下拉選項
  const type1Options =
    _.chain(typesList)
      .orderBy(['type1'], ['asc'])
      .map(item => ({
        label: item.type1, value: item.type1
      }))

      .value();

  // 目前的type1 menu
  const type1Value = { label: value, value };

  /**
   * hande on type1 Change
   * @param {} option 選擇的type1
   */
  function handleOnChnage(option) {
    props.updatePersonalTableRowItemById(rowId, columnKey, option.value);
    // type1如果有變動，就清空type2
    props.updatePersonalTableRowItemById(rowId, 'type2', null);
  }

  // 編輯模式 而且 type1是null才可以選下拉
  const isType1Null = !oriType1Value || oriType1Value === '<NULL>';
  const canSelectTypes = isEditMode && isType1Null;


  return (
    <div
      className="grid-cell"
      key={key}
      style={style}
    >
      {
        canSelectTypes ?
          <Select
            target="box"
            options={type1Options}
            value={type1Value}
            onChange={handleOnChnage}
          />
          :
          value
      }

      {/* 原本的下拉在virtualize會有問題 */}
      {/* <Select
        target="box"
        options={type1Options}
        value={type1Value}
        onChange={handleOnChnage}
      /> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    typesList: state.eeBom.typesList,
    originalTableData: state.eeBomPersonalReducer.originalTableData,
  };
};

const mapDispatchToProps = {
  updatePersonalTableRowItemById: EEBomPersonalActions.updatePersonalTableRowItemById,
  updateItemValidateError: EEBomPersonalActions.updateItemValidateError,
};


export default connect(mapStateToProps, mapDispatchToProps)(Type1Cell);

