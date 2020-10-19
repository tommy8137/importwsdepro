import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import Select from '~~elements/Select';

function Type1Cell(props) {
  const { originalTableData, typesList = [], value, cellInfo, helperInfo, onClick, isEditMode } = props;
  const { columnIndex, key, rowIndex, style } = cellInfo;
  const { row: { id: rowId, type1, type2 }, columnKey } = helperInfo;

  // 原始資料的type1
  const oriType1Value =
    _.chain(originalTableData)
      .find(item => item.id === rowId)
      .get('type1', '')
      .value();

  // 利用type1取得新的type2列表
  const type2Options =
    _.chain(typesList)
      .find(item => item.type1 === type1)
      .get(columnKey, [])
      .orderBy([], ['asc'])
      .map(item => ({ label: item, value: item }))
      .value();

  // 如果沒有type1,或是type1等於<NULL>
  const isType1Empty = !type1 || type1 === '<NULL>';
  const type2value = { label: type2, value: type2 };


  useEffect(() => {
    // 如果有選type1卻沒選type2, 預設幫她選第一個
    if (!isType1Empty && !type2 && type2Options.length) {
      props.updatePersonalTableRowItemById(rowId, columnKey, type2Options[0].value);
    }
  }, [type1]);

  /**
   * 當選擇了type2之後
   * @param {} option select的option
   */
  function handleOnChnage(option) {
    // 更新row data
    props.updatePersonalTableRowItemById(rowId, columnKey, option.value);
  }

  // 編輯模式 並且 type1 等於 null時才可以選
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
            options={type2Options}
            value={type2value}
            onChange={handleOnChnage}
            disabled={isType1Empty}
          /> :
          value
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    itemsValidateError: state.eeBomPersonalReducer.itemsValidateError,
    typesList: state.eeBom.typesList,
    originalTableData: state.eeBomPersonalReducer.originalTableData,
  };
};

const mapDispatchToProps = {
  updatePersonalTableRowItemById: EEBomPersonalActions.updatePersonalTableRowItemById,
};


export default connect(mapStateToProps, mapDispatchToProps)(Type1Cell);

