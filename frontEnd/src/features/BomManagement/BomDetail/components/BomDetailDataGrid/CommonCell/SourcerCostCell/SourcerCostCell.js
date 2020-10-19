import React from 'react';
import { connect } from 'react-redux';
import * as yup from 'yup';
import { BaseCell, BaseInput } from '~~elements/DataGridCommonCell';
import * as BomDetailActions from '~~features/BomManagement/BomDetail/BomDetailActions';
import { comma } from '~~utils/Math';

function SourcerCostCell(props) {
  const { value, cellInfo, helperInfo, onClick } = props;
  const { key, style } = cellInfo;
  const { isEditMode, row, columnKey } = helperInfo;

  if (isEditMode) {
    return (
      <div className="grid-cell" key={key} style={style}>
        <BaseInput
          value={value}
          onChange={(e) => {
            let inputValue = e.target.value;
             // 如果使用者清空，就記錄null
            if (inputValue === '') {
              // 更新表單為null
              props.updateRowItemValidateError(row.id, columnKey, []);
              props.updateMEBomTableCellById(row.id, columnKey, null);
              return;
            }

            const validationSchema = yup
              .number()
              .transform((convertedValue, originalvalue) => {
                return Number(originalvalue);
              })
              .typeError('請輸入小數5位以下正數')
              .nullable();

            validationSchema.validate(inputValue)
              .then(() => {
                // console.log('>>>>>>>>>>合法', inputValue);
                // 在檢查有沒有符合小數點四位
                let regexp = /^\d+(\.\d{1,5})?$/g;
                if (regexp.test(String(inputValue))) {
                  const resultValue = inputValue.endsWith('0') ? inputValue : Number(inputValue);
                  props.updateRowItemValidateError(row.id, columnKey, []);
                  props.updateMEBomTableCellById(row.id, columnKey, resultValue);
                } else {
                  props.updateRowItemValidateError(row.id, columnKey, ['請輸入小數5位以下正數']);
                  props.updateMEBomTableCellById(row.id, columnKey, inputValue);
                }
              })
              .catch(err => {
                // console.log('>>>>>>>>>>不合法', err.errors);
                props.updateRowItemValidateError(row.id, columnKey, err.errors);
                props.updateMEBomTableCellById(row.id, columnKey, inputValue);
              });
          }}
          errors={props.itemsValidateErrorObj ? props.itemsValidateErrorObj[row.id].errors[columnKey] : []}
        />
      </div>
    );
  }
  return (
    <BaseCell
      onClick={onClick}
      value={comma(value)}
      cellInfo={cellInfo}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    itemsValidateErrorObj: state.bomDetail.itemsValidateErrorObj,
  };
};

const mapDispatchToProps = {
  updateRowItemValidateError: BomDetailActions.updateRowItemValidateError,
  updateMEBomTableCellById: BomDetailActions.updateMEBomTableCellById,
};

export default connect(mapStateToProps, mapDispatchToProps)(SourcerCostCell);

