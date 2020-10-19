import React from 'react';
import styled from 'styled-components';
import Clickoutside from '~~elements/Clickoutside';


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

// dropdown 下拉的區塊
const DropdownMenu = (props) => {
  const {
    isOpen,
    onClickOutside
  } = props;

  return (
    <Clickoutside handleBlur={onClickOutside}>
      <Menu
        onClick={e => e.stopPropagation()}
        active={isOpen}
      >
        {props.children}
      </Menu>
    </Clickoutside>
  );
};

DropdownMenu.defaultProps = {
  isOpen: false,
  onClickOutside: () => { }
};


export default DropdownMenu;
