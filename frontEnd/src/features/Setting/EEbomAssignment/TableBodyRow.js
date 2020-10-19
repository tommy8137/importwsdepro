import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Select from 'react-select';
import Button from '~~elements/Button';
import RoundButton from '~~elements/RoundButton';
import Icon from '~~elements/Icon';
import Clickoutside from '~~elements/Clickoutside';
import Alert from '~~elements/Alert';
import debounce from 'lodash/debounce';
import * as EEbomAssignmentActions from './EEbomAssignmentActions';
import { USER_OPTIONS, USER_VALUE } from './EEbomAssignmentConst';


const Div = styled.div`
position: relative;
  input {
    border: 1px solid rgba(0,0,0,0.8);
    outline: none;
    display: block;
    padding: 0rem 0.5rem;
    border-radius: 4px;
    height: 85%;
    letter-spacing: 1px;
  }

  .type2Div{
    position: absolute;
    background: white;
    border-radius: 2px;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.16);
    width: 18rem;
    z-index: 10;
    white-space: normal;
    padding: 0.8rem 0rem 0.5rem;
   &:hover{
    text-decoration: none;
    cursor: auto
   }
   .icon{
    width: 1rem;
    position: absolute;
    right: 1rem;
    top: 1.05rem;
    cursor: pointer;
   }
   &--label{
    padding: 0rem 1rem;
    line-height: 1.5rem;
   }
   &--content{
    line-height: 2rem;
    padding: 0rem 1rem;
    opacity: 0.7;
    word-break: break-word;
   }
  }
  .btn-remove{
    width: 1rem;
    position: absolute;
    cursor: pointer;
    right: 2rem;
    &.hidden {
      display: none;
    }
  }
`;

const BtnArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 10%;
  margin-right: 0.5rem;
  .editMode{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 0.5rem;
  }
  button{
    font-size: 0.6rem;
    padding: 0 0.6rem;
    letter-spacing: 1px;
    height: 1.7rem;
  }
`;

/* react-select 的style */
const SelectField = styled(Select)`
  width:100%;

  .react-select--select {
    &:focus {
      outline: none;
    }
    &__indicator {
      display: none
    }
    &__control {
      border: 1px solid rgba(0,0,0,0.8);
      border-radius: 4px;
      border-bottom: 1px solid #333333;
      line-height: 1rem;
      &:focus {
        outline: none;
      }
      &:hover{
        border: 1px solid rgba(0,0,0,0.8);
      }
    }
    &__value-container {
      padding: 0rem 0.5rem;
      padding-right: 1.8rem;
      &:focus {
        outline: none;
      }
    }

    &__indicator-separator {
      display: none;
    }

    &__single-value {
      padding-right: 1.5rem;
    }
  }

  /* react-select 的style end */
  .field {
    &:focus {
        outline: none;
      }
  }
`;

const TableBodyRow = (props) => {
  /* pic和proxy的值 */
  const [value, setValue] = useState({});
  /* 是否為編輯模式 */
  const [isEditMode, setEditMode] = useState(false);
  /* 是否可以Save */
  const [isSaveDisabled, setSaveDisabled] = useState(true);
  /* 是否顯示type2 tooltip */
  const [isShowType2Detail, setShowType2Detail] = useState(false);
  /* 是否有編輯過 */
  const [hasChanged, setHasChanged] = useState(false);
  /* 是否顯示alert dialog */
  const [isAlertOpen, setAlert] = useState(false);
  const {
    // props
    row,
    // state
    isEditable,
    options,
    isAllEditClose,
    // action
    disableAllEdit,
    searchUsers,
    updateUsers,
    resetOptions
  } = props;

  const picOptions = options[USER_OPTIONS.PIC];
  const proxyOptions = options[USER_OPTIONS.PROXY];

  useEffect(() => {
    setValue({
      [USER_VALUE.PIC]: row.pic ? { label: row.pic, value: row.pic_emplid } : null,
      [USER_VALUE.PROXY]: row.proxy ? { label: row.proxy, value: row.proxy_emplid } : null,
    });

    disableAllEdit(false);
    setEditMode(false);
  }, [JSON.stringify(row)]);

  /**
    * @param {string} field 欄位的名字
    handleRemove做的事:
    1. 取消disable Save
    2. 設成有編輯過
    3. 把被remove的欄位值設成null
   */
  function handleRemove(field) {
    setSaveDisabled(false);
    setHasChanged(true);
    setValue({
      ...value,
      [field]: null,
    });
  }

  /**
    handleEdit做的事:
    1. disable其他row的Edit
    2. 進入編輯模式
    3. 重置Save成disable
    4. 重置成沒有編輯過
   */
  function handleEdit() {
    disableAllEdit(true);
    setEditMode(true);
    setSaveDisabled(true);
    setHasChanged(false);
  }

  /**
    handleCancel做的事:
    1. 取消disable其他row的Edit
    2. 取消編輯模式
   */
  function handleCancel() {
    disableAllEdit(false);
    setEditMode(false);
  }

  /**
    * @param {string} field 欄位的名字
    * @param {object} val 欄位的值。label是姓名，value是工號。
    handleChange做的事:
    1. 取消disable Save
    2. 設成有編輯過
    3. 把被編輯的欄位值設成對應的值
   */
  function handleChange(field, val) {
    setSaveDisabled(false);
    setHasChanged(true);
    setValue({
      ...value,
      [field]: val,
    });
  }

  /**
    * @param {string} type1 type1的值
    handleSave做的事:
    1. 更新pic和proxy到後端
    2. 取消disable其他row的Edit
    3. 取消編輯模式
   */
  function handleSave(type1) {
    const picValue = value[USER_VALUE.PIC];
    const proxyValue = value[USER_VALUE.PROXY];
    const data = {
      type1,
      pic: picValue ? picValue.label : null,
      proxy: proxyValue ? proxyValue.label : null,
      pic_emplid: picValue ? picValue.value : null,
      proxy_emplid: proxyValue ? proxyValue.value : null,
    };
    updateUsers(data);
    disableAllEdit(false);
    setEditMode(false);
  }

  /**
    * @param {boolean} status
    handleType2Detail做的事: 更改isShowType2Detail的狀態
   */
  function handleType2Detail(status) {
    setShowType2Detail(status);
  }

  /**
    * @param {boolean} status
    handleAlertModal做的事: 更改isAlertOpen的狀態
   */
  function handleAlertModal(status) {
    setAlert(status);
  }

  /**
    * @param {boolean} status
    handleInputChange做的事: 一邊input一邊搜尋下拉選單
   */
  const handleInputChange = debounce((field, keyword) => {
    if (keyword) {
      searchUsers(field, keyword);
    }
  }, 1000);

  return (
    <Div
      className="table-tr"
      style={{ cursor: 'auto' }}
    >
      <div className="table-td type1">
        {row.type1}
      </div>
      <div
        className="table-td type2"
        onClick={() => handleType2Detail(true)}
        onKeyUp={() => {}}
      >
        {row.type2}
        <Clickoutside handleBlur={() => handleType2Detail(false)}>
          {isShowType2Detail ?
            <div className="type2Div">
              <Icon
                icon="BtnReset2"
                onClick={(e) => {
                   e.stopPropagation();
                   handleType2Detail(false);
                }}
              />
              <div className="type2Div--label">Type II</div>
              <div className="type2Div--content">{row.type2}</div>
            </div> :
          null}
        </Clickoutside>
      </div>
      {isEditMode ?
        <div className="table-td pic">
          <SelectField
            e2e={`${row.type1}_pic_select`}
            id="pic"
            className="field"
            classNamePrefix="react-select--select"
            value={value[USER_VALUE.PIC]}
            onChange={(val) => handleChange(USER_VALUE.PIC, val)}
            options={picOptions}
            onInputChange={(keyword) => handleInputChange(USER_OPTIONS.PIC, keyword)}
            onFocus={() => resetOptions(USER_OPTIONS.PIC)}
            isSearchable={true}
            placeholder="請輸入姓名或工號"
          />
          <Icon
            icon="BtnReset2"
            onClick={() => handleRemove(USER_VALUE.PIC)}
            className={value.pic ? 'btn-remove' : 'btn-remove hidden'}
          />
        </div>
        :
        <div className="table-td pic">
          {row.pic || '－'}
        </div>
          }
      {isEditMode ?
        <div className="table-td proxy">
          <SelectField
            e2e={`${row.type1}_proxy_select`}
            id="proxy"
            className="field"
            classNamePrefix="react-select--select"
            value={value[USER_VALUE.PROXY]}
            onChange={(val) => handleChange(USER_VALUE.PROXY, val)}
            options={proxyOptions}
            onInputChange={(keyword) => handleInputChange(USER_OPTIONS.PROXY, keyword)}
            onFocus={() => resetOptions(USER_OPTIONS.PROXY)}
            isSearchable={true}
            placeholder="請輸入姓名或工號"
          />
          <Icon
            icon="BtnReset2"
            onClick={() => handleRemove(USER_VALUE.PROXY)}
            className={value.proxy ? 'btn-remove' : 'btn-remove hidden'}
          />
        </div>
        :
        <div className="table-td proxy">
          {row.proxy || '－'}
        </div>
          }
      {isEditable ?
        <BtnArea>
          {isEditMode  ?
            <div className="editMode">
              <RoundButton.WhiteButton
                onClick={() => (hasChanged ? handleAlertModal(true) : handleCancel())}
              >
                Cancel
              </RoundButton.WhiteButton>
              <RoundButton.GreenButton
                e2e={`${row.type1}_save`}
                onClick={() => handleSave(row.type1)}
                disabled={isSaveDisabled}
              >
                Save
              </RoundButton.GreenButton>
            </div> :
            <div>
              <RoundButton.BlackButton
                e2e={`${row.type1}_edit`}
                onClick={handleEdit}
                disabled={isAllEditClose}
              >
                Edit
              </RoundButton.BlackButton>
            </div>
        }
        </BtnArea>
        : null}
      <Alert isOpen={isAlertOpen} type="alarm">
        <div className="row">您是否要在離開前儲存變更?</div>
        <div className="row">
          <Button
            color="transparentInModal"
            border={false}
            onClick={() => handleAlertModal(false)}
          >
          取消
          </Button>
          <Button
            color="black"
            onClick={(e) => {
              handleSave(row.type1);
              handleAlertModal(false);
            }}
          >
          儲存變更
          </Button>
        </div>
      </Alert>
    </Div>
  );
};

export default connect(
  (state) => {
    return {
      isEditable: state.eebomAssignment.isEditable,
      options: state.eebomAssignment.options,
      isAllEditClose: state.eebomAssignment.isAllEditClose
    };
  },
  {
    searchUsers: EEbomAssignmentActions.searchUsers,
    updateUsers: EEbomAssignmentActions.updateUsers,
    resetOptions: EEbomAssignmentActions.resetOptions,
    disableAllEdit: EEbomAssignmentActions.disableAllEdit,
  }
)(TableBodyRow);
