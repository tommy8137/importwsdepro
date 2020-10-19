import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '~~elements/Button';
import RoundButton from '~~elements/RoundButton';
import { Input } from 'reactstrap';
import Icon from '~~elements/Icon';
import Alert from '~~elements/Alert';
import * as XraySpecTitleActions from './XraySpecTitleActions';


const Div = styled.div`
/* textarea  */
  .form-control{
    border: 1px solid rgba(0,0,0,0.8);
    font-size: 0.8rem;
    letter-spacing: 1px;
    &:focus{
      outline: none;
      box-shadow: none;
    }
  }

  .errorMsg{
    line-height: 1.5rem;
    color: red;
    .icon {
      width: 0.8rem;
      padding-bottom: 0.2rem;
    }
  }
`;

const BtnArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 10%;
  margin-right: 1rem;
  .editMode{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 1rem;
  }
  button{
    font-size: 0.6rem;
    padding: 0 0.6rem;
    letter-spacing: 1px;
    height: 1.7rem;
  }
`;

const TableBodyRow = (props) => {
  /* title的值 */
  const [title, setTitle] = useState('');
  /* 是否為編輯模式 */
  const [isEditMode, setEditMode] = useState(false);
  /* 是否可以Save */
  const [isSaveDisabled, setSaveDisabled] = useState(true);
  /* 是否有編輯過 */
  const [hasChanged, setHasChanged] = useState(false);
  /* 是否超過字數限制 */
  const [isTooLong, setTooLong] = useState(false);
  /* 是否顯示alert dialog */
  const [isAlertOpen, setAlert] = useState(false);
  const {
    // props
    row,
    // state
    filterInfo,
    isEditable,
    isAllEditClose,
    // action
    disableAllEdit,
    updateSpecTitle
  } = props;

  useEffect(() => {
    setTitle(row.title ? row.title : null);

    disableAllEdit(false);
    setEditMode(false);
  }, [JSON.stringify(row)]);

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
    handleChange做的事:
    1. 若輸入的字數超過60字:
       1) 顯示Too Long 警告
       2) 把Save改成disable
    2. 若輸入的字數符合限制:
       1) 取消disable Save
       2) 設成有編輯過
       3) 取消Too Long 警告
       4) 更改title的值
   */
  function handleChange(e) {
    const { target: { value } } = e;
    if (value.length > 60) {
      setTooLong(true);
      setSaveDisabled(true);
    } else {
      setSaveDisabled(false);
      setHasChanged(true);
      setTooLong(false);
      setTitle(value === '' ? null : value);
    }
  }

  /**
    * @param {number} specNo 序號
    handleSave做的事:
    1. 更新pic和proxy到後端
    2. 取消disable其他row的Edit
    3. 取消編輯模式
   */
  function handleSave(specNo) {
    const { productType, typeI, typeII } = filterInfo;
    const data = {
      type1: typeI,
      type2: typeII,
      spec1: productType,
      spec_no: specNo,
      title,
    };
    // const data = {
    //   spec1: encodeURIComponent(productType),
    //   type1: encodeURIComponent(typeI),
    //   type2: encodeURIComponent(typeII),
    //   spec_no: specNo,
    //   title,
    // };
    // post api
    updateSpecTitle(data);
    disableAllEdit(false);
    setEditMode(false);
    setTitle(null);
  }

  /**
    * @param {boolean} status
    handleAlertModal做的事: 更改isAlertOpen的狀態
   */
  function handleAlertModal(status) {
    setAlert(status);
  }

  return (
    <Div
      className="table-tr"
      style={{ cursor: 'auto' }}
    >
      <div className="table-td spec_no">
        {row.spec_no || '－'}
      </div>
      { isEditMode ?
        <div className="table-td title">
          <Input
            id="title"
            type="textarea"
            defaultValue={title}
            onChange={(e) => handleChange(e)}
          />
          {isTooLong &&
            <div className="errorMsg">
              字數限制為60個字 <Icon icon="IcoAlarmRed" />
            </div>}
        </div> :
        <div className="table-td title">
          {row.title || '－'}
        </div>
        }
      <div className="table-td edit_by">
        {row.edit_by || '－'}
      </div>
      <div className="table-td edit_time">
        {row.edit_time || '－'}
      </div>
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
                onClick={() => handleSave(row.spec_no)}
                disabled={isSaveDisabled}
              >
                Save
              </RoundButton.GreenButton>
            </div> :
            <div>
              <RoundButton.BlackButton
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
                e.stopPropagation();
                handleSave(row.spec_no);
                handleAlertModal(false);
              }}
            disabled={isSaveDisabled}
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
      isEditable: state.xraySpecTitle.isEditable,
      filterInfo: state.xraySpecTitle.filterInfo,
      isAllEditClose: state.xraySpecTitle.isAllEditClose
    };
  },
  {
    updateSpecTitle: XraySpecTitleActions.updateSpecTitle,
    disableAllEdit: XraySpecTitleActions.disableAllEdit
  }
)(TableBodyRow);
