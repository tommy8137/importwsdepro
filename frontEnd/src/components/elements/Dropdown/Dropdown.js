import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _find from 'lodash/find';
import Clickoutside from '~~elements/Clickoutside';
import LoadingIcon from '~~elements/LoadingIcon';

// FIXME: handleBlur不能連續點多個checkbox後才收合的bug
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
    &--placeholder{
      color: #c0c0c0;
    }
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


const Dropdown = (props) => {
  const [toggleList, setToggleList] = useState(false);
  const [text, setText] = useState('');
  const { title, value, placeholder, disabled, isLoading, options, onChange } = props;

  useEffect(() => {
    const obj = value && _find(options, (o) => o.value === value);
    setText(obj.label);
  }, [value]);

  function handleClickOutside() {
    setToggleList(false);
  }

  function handleToggleList(e) {
    setToggleList(!toggleList);
  }

  function handleChange(val) {
    onChange(val);
    setToggleList(false);
  }

  const extendsProps = {
    onClick: handleToggleList
  };

  if (disabled) {
    extendsProps.onClick = () => { };
  }

  return (
    <DropdownBox
      disabled={disabled}
      className="dropdown"
      {...extendsProps}
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
        <StyledArrow
          isOpen={toggleList}
          {...extendsProps}
        />
      </div>
      {isLoading && <LoadingIcon className="loadingIcon" />}
      <Clickoutside handleBlur={handleClickOutside}>
        <Menu
          onClick={e => e.stopPropagation()}
          active={toggleList && !disabled}
        >

          <LabelMenu>
            {
              options.length > 0 ?
                options.map(o => (
                  <label
                    key={o.value}
                    onClick={() => handleChange(o.value)}
                    className={value === o.value ? 'active' : ''}
                  >
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

Dropdown.defaultProps = {
  /** 欄位名稱 */
  title: '',
  /** 下拉內容 */
  options: [],
  /** 欄位的值 */
  value: '',
  /** 欄位的placeholder */
  placeholder: '－',
  /** 是否disable */
  disabled: false,
  /** 是否需要Loading Icon */
  isLoading: false,
  /** 下拉的function */
  onChange: () => { },
  /** onClose */
  onClose: () => { }
};


export default Dropdown;
