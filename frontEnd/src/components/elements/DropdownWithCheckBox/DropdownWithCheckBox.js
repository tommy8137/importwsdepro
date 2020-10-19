import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import _find from 'lodash/find';
import LoadingIcon from '~~elements/LoadingIcon';
import Checkbox from '~~elements/Checkbox';
import Clickoutside from '~~elements/Clickoutside';

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
    &--placeholder{
      color: #c0c0c0;
    }
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

const Menu = styled.div`
  z-index:9;
  overflow: hidden;
  overflow-y: auto;
  height: auto;
  color: #333;
  max-height: 300px;
  border: solid 0.5px #cccccc;
  background-color: #ffffff;
  border-radius: .2rem;
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  transition: 0.12s ease all;
  transform-origin: center top;
  visibility: ${props => (props.active ? 'visible' : 'hidden')};
  transform: ${props => (props.active ? 'translate(0%, 0%) scaleY(1)' : 'translate(0%, 0%) scaleY(0)')};
  opacity: ${props => (props.active ? '1' : '0')};
  p {
    margin: 0;
  }
  > div {
    display: block;
    width: 100%;
    label {
      width: 100%;
    }
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

const LabelMenu = styled.div`
  display: block;
  padding: 8px 6px;
  > label {
    font-size: 0.9rem;
    margin: 0.2rem 0rem;
    display: block;
    padding: 4px 10px;
    transition: 0.3s ease all;
    cursor: pointer;
    opacity: 0.8;
    &:hover,
    &.active {
      background-color: #f2f2f2;
    }
  }
`;
const NoData = styled.div`
  display: block;
  padding: 12px;
  font-size: 1rem;
  text-align: center;
`;

const DropdownWithCheckBox = (props) => {
  const [toggleList, setToggleList] = useState(false);
  const [text, setText] = useState('');
  const [optionsWithCheckBox, setOptions] = useState([]);
  const isSelectAll = optionsWithCheckBox.every(opt => opt.isChecked);
  const {
    title,
    label,
    value = [],
    disabled,
    isLoading,
    options = [],
    onChange,
    multi,
    hasSelectAll,
    placeholder
  } = props;

  useEffect(() => {
    const textList = label || value.join(', ');
    setText(textList);
    const opts = options.map(o => ({
      ...o,
      id: uuidv4(),
      isChecked: !!_find(value, val => val === o['value']),
    }));
    setOptions(opts);
  }, [value, options]);


  function handleClickOutside() {
    setToggleList(false);
    props.onClose();
  }

  function handleToggleList(e) {
    setToggleList(!toggleList);
    if (!toggleList) {
      props.onOpen();
    }
  }

  function onCheckboxChange(e, option) {
    if (multi) {
      const tempSelect = optionsWithCheckBox.filter(opt => (option.value === opt.value ? !option.isChecked : opt.isChecked)).map(opt => opt.value);
      onChange(tempSelect);
    } else {
      onChange([option.value]);
    }
  }

  function handleSelectAll() {
    const tempSelected = isSelectAll ? [] : optionsWithCheckBox.map(item => item.value);
    onChange(tempSelected);
  }

  return (
    <DropdownBox
      disabled={disabled}
      className="dropdown"
      onClick={!disabled && handleToggleList}
      innerRef={props.innerRef}
    >
      <div className="left">
        {title &&
          <div className="top-row">
            <div className="title">{title}</div>
          </div>}
        {text ?
          <div className="bottom-row">{text}</div> :
          <div className="bottom-row--placeholder">{placeholder}</div>
        }
      </div>
      <div className="right">
        <StyledArrow onClick={!disabled && handleToggleList} isOpen={toggleList} />
      </div>
      {isLoading && <LoadingIcon className="loadingIcon" />}
      <Clickoutside handleBlur={handleClickOutside}>
        <Menu
          onClick={e => e.stopPropagation()}
          active={toggleList && !disabled}
        >

          <LabelMenu>
            {
              hasSelectAll && multi &&
              <label>
                <Checkbox
                  checked={value.length > 0}
                  indeterminate={!isSelectAll}
                  onChange={handleSelectAll}
                />
                <span>Select All</span>
                <hr />
              </label>
            }
            {
              optionsWithCheckBox.length > 0 ?
                optionsWithCheckBox.map(o => (
                  <label
                    key={o.id}
                    className={value === o.value ? 'active' : ''}
                  >
                    <Checkbox
                      checked={o.isChecked}
                      onChange={(e) => onCheckboxChange(e, o)}
                    />
                    {o.label}
                  </label>
                )) :
                <NoData>No Data</NoData>
            }
          </LabelMenu>
        </Menu>
      </Clickoutside>
    </DropdownBox>

  );
};

DropdownWithCheckBox.defaultProps = {
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
  /** 是否需要Loading Icon */
  isLoading: false,
  /** 是否可以多選 */
  multi: false,
  /** 是否可以一次全選 */
  hasSelectAll: false,
  /** 下拉的function */
  onClose: () => { },
  onOpen: () => { },
  onChange: () => { },
  placeholder: '－',
};


export default DropdownWithCheckBox;
