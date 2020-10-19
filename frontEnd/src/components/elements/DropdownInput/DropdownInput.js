import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _find from 'lodash/find';

const DropdownBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: stretch;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.2 : 1)};

.left {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  margin-left: 1rem;
  justify-content: center;
  .top-row {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    height: 15px;
    .title {
      font-size: 10px;
      opacity: .4;
      text-indent: .15rem;
    }
  }
  .bottom-row {
    text-indent: .15rem;
    font-style: normal;
    font-stretch: normal;
    height: 45%;
    overflow: hidden;
  }
}

.loadingIcon{
    position: absolute;
    right: 1rem;
  }
`;

const Input = styled.input`
  display: block;
  height: 100%;
  width: 90%;
  border: none;
  box-shadow: none;
  border-bottom: 1px solid #333333;
  &:focus {
    outline: none;
    border-bottom: 1px solid rgb(0, 150, 136);
  }
`;

const DropdownInput = (props) => {
  const {
    title,
    value,
    disabled,
    onChange,
  } = props;


  return (
    <DropdownBox
      disabled={disabled}
      className="dropdown e2e_dropdown_input"
      innerRef={props.innerRef}
    >
      <div className="left">
        {title &&
          <div className="top-row">
            <div className="title">{title}</div>
          </div>}
        <div className="bottom-row">
          <Input value={value} onChange={e => onChange(e.target.value)} />
        </div>
      </div>
    </DropdownBox>

  );
};

DropdownInput.defaultProps = {
  /** 可以放icon或checkbox */
  icon: null,
  /** 欄位名稱 */
  title: '',
  /** 自訂顯示內容 */
  label: '',
  /** 下拉內容 */
  options: [],
  /** 欄位的值 */
  value: [],
  /** 是否disable */
  disabled: false,
};


export default DropdownInput;
