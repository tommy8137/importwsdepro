import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _find from 'lodash/find';
import _toNumber from 'lodash/fp/toNumber';
import Button from '~~elements/Button';
import { round } from '~~utils/Math';
import LoadingIcon from '~~elements/LoadingIcon';
import DropdownMenu from '~~elements/DropdownMenu';

const RangeDiv = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  hr {
    margin: 0.5rem 0 0.5rem 0;
  }
  p{
    font-size: 0.8rem;
    margin-bottom: 6px;
  }
  .input-group {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    span {
      white-space: nowrap;
      flex: 0 auto;
      font-size: 0.6rem;
    }
    input {
      text-align: center;
      font-size: 0.8rem;
      flex: 0 100%;
      border: none;
      border-bottom: 1px solid #333;
      margin: 0 2%;
      width: 100%;
    }
  }
  .submit {
    margin-top: 1rem;
    justify-self: flex-end;
    align-self: flex-end;
    width: auto;
    padding: 0 1rem;
  }
`;

const DropdownBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: stretch;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  min-width: 0;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.2 : 1)};
  &:not(:last-child)::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 70%;
    border: 0.5px solid #ccc;
    position: absolute;
    right: 0px;
  }

.left {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  margin-left: 1rem;
  justify-content: center;
  min-width: 0;
  .top-row {
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    height: 15px;
    .title {
      font-size: 10px;
      /* opacity: .4; */
      /* text-indent: .15rem; */
      color: #333333;
    }
  }
  .bottom-row {
    font-style: normal;
    font-stretch: normal;
    /* height: 45%; */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 3rem;
  }
}

.right {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-right: 1rem;
}

.loadingIcon{
    position: absolute;
    right: 1rem;
  }
`;

const StyledArrow = styled.div`
  z-index: 2;
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translate(0, -50%);
  &:after {
    content:'';
    display: block;
    border-right: 1px solid black;
    border-top: 1px solid black;
    width: 0.5rem;
    height: 0.5rem;
    transition: 0.3s ease all;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg)' : 'rotate(135deg)')};
  }
`;

const defaultRange = { min: 0, max: 10 };

const DropdownRange = (props) => {
  const [toggleList, setToggleList] = useState(false);
  const [range, setRange] = useState(defaultRange);
  const { min = 0, max = 0 } = range;

  const {
    title,
    label,
    disabled,
    isLoading,
    value,
    onChange,
    // 所能輸入的最大值
    inputMax = 0,
    // 所能輸入的最小值
    inputMin = 0
  } = props;


  useEffect(() => {
    setRange(value);
  }, [value]);


  // 檢查最小值是否合法
  const checkMin = val => val < max && val >= 0 && val <= inputMax;
  // 檢查最大值是否合法
  const checkMax = val => val > min && val >= inputMin && val <= inputMax;


  // 當點出去menu時
  const handleClickOutside = () => {
    if (toggleList) {
      props.onClose();
      setToggleList(false);
    }
  };


  const handleToggleList = (e) => {
    setToggleList(!toggleList);
  };

  // 當更改最小值時
  const handleChangeMin = (e) => {
    const val = _toNumber(e.target.value);
    const roundVal = round(val);
    setRange({ min: roundVal, max });
  };
  // 當更改最大值時
  const handleChangeMax = (e) => {
    const val = _toNumber(e.target.value);
    const roundVal = round(val);
    const valid = checkMax(roundVal);
    setRange({ max: roundVal, min });
  };


  // 當blur 最小值的input時
  const handleBlurMin = (e) => {
    const val = _toNumber(e.target.value);
    const valid = checkMin(val);
    const roundVal = round(val);
    // 檢查最小值是否合法
    if (valid) {
      setRange({ min: roundVal, max });
    } else {
      // 如果不合法，就變回最小值
      setRange({ min: inputMin, max });
    }
  };

  // 當blur 最大值的input時
  const handleBlurMax = (e) => {
    const val = _toNumber(e.target.value);
    const valid = checkMax(val);
    const roundVal = round(val);
    // 檢查最大值是否合法
    if (valid) {
      setRange({ min, max: roundVal });
    } else {
      // 如果不合法，就變回最大值
      setRange({ min, max: inputMax });
    }
  };

  // 當按下套用時
  const onSubmit = () => {
    setToggleList(false);
    if (typeof (props.onChange) === 'function') {
      props.onChange(range);
    }
  };


  return (
    <DropdownBox
      disabled={disabled}
      className="dropdown e2e_dropdown_range"
      onClick={!disabled && handleToggleList}
      innerRef={props.innerRef}
    >
      <div className="left">
        {title &&
          <div className="top-row">
            <div className="title">{title}</div>
          </div>}
        <div className="bottom-row">{`${value.min}% ~ ${value.max}%`}</div>
      </div>
      <div className="right">
        <StyledArrow onClick={!disabled && handleToggleList} isOpen={toggleList} />
      </div>
      {isLoading && <LoadingIcon className="loadingIcon" />}

      <DropdownMenu
        onClickOutside={handleClickOutside}
        onClick={e => e.stopPropagation()}
        isOpen={toggleList && !disabled}
      >
        <RangeDiv>
          <p>最大價差百分比</p>
          <p>{inputMax}%</p>
          <hr />
          <p>篩選範圍</p>
          <div className="input-group">
            <input
              id="e2e_range_input_from"
              type="number"
              step="0.0001"
              // maxLength="9"
              value={min}
              onChange={handleChangeMin}
              onBlur={handleBlurMin}
              onFocus={e => e.target.select()}
            />
            <span>%到</span>
            <input
              id="e2e_range_input_to"
              type="number"
              step="0.0001"
              // maxLength="9"
              value={max}
              onChange={handleChangeMax}
              onBlur={handleBlurMax}
              onFocus={e => e.target.select()}
            />
            <span>%</span>
          </div>
          <Button color="black" border={false} className="submit e2e_range_submit" onClick={onSubmit}>套用</Button>
        </RangeDiv>
      </DropdownMenu>
    </DropdownBox>

  );
};

DropdownRange.defaultProps = {
  /** 欄位名稱 */
  title: '',
  /** 自訂顯示內容 */
  label: '',
  /** 欄位的值 */
  value: [],
  /** 是否disable */
  disabled: false,
  /** 是否需要Loading Icon */
  isLoading: false,
  /** 下拉的function */
  onChange: () => { },
  /** onClose */
  onClose: () => { },
  inputMin: 0,
  inputMax: 0
};


export default DropdownRange;
