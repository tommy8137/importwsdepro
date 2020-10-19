import React, { useState } from 'react';
import styled from 'styled-components';
import Clickoutside from '~~elements/Clickoutside';
import Button from '~~elements/Button';


const DropdownWrap = styled.div`
  margin-left: 2rem;
  position: relative;
  .btn {
    position: relative;
    padding-right: 1rem;
    > span {
      display: inline-block;
      vertical-align: middle;
    }
    &:after {
      content: '';
      width: 0.5rem;
      height: 0.5rem;
      margin: 0 0.5rem;
      display: inline-block;
      vertical-align: middle;
      border-right: 1px solid white;
      border-bottom: 1px solid white;
      transform: translate(0, 0%) rotate(-135deg);
    }
  }

  &.active {
    .btn {
      &:after {
        transform: translate(0, -50%) rotate(45deg);
      }
    }
    .dropdown {
      visibility: visible;
      opacity: 1;
    }
  }
  .dropdown{
    visibility: hidden;
    opacity: 0;
    transition: 0.3s ease all;
    border: 1px solid #f2f2f2;
    width: 100%;
    position: absolute;
    display: block;
    left: 0;
    top: 100%;
    background-color: white;
    .dropdown-option {
      color: black;
      padding: 0.4rem 1rem;
      text-align: left;
      cursor: pointer;
      &:hover {
        opacity: 0.86;
      }
    }
  }
`;


const DropdownButton = (props) => {
  const { isWithChild, disabled } = props;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Clickoutside handleBlur={() => setIsOpen(false)}>
      <DropdownWrap className={`dropdown-button ${isOpen ? ' active' : ''}`}>
        <Button
          color="black"
          onClick={() => setIsOpen(true)}
          disabled={disabled}
        >
          <span>Save and Add Next</span>
        </Button>
        <div className="dropdown">
          {!isWithChild &&
            <div
              className="dropdown-option"
              onClick={() => {
                if (typeof props.onAddNew === 'function') {
                  setIsOpen(false);
                  props.onAddNew();
                }
              }}
              onKeyDown={() => { }}
            >
              Add New
            </div>
          }
          {
            !isWithChild &&
            <div
              className="dropdown-option"
              onClick={() => {
                if (typeof props.onAddSameLevel === 'function') {
                  setIsOpen(false);
                  props.onAddSameLevel();
                }
              }}
              onKeyDown={() => { }}
            >
              Add Same Level
            </div>
          }
          <div
            className="dropdown-option"
            onClick={() => {
              if (typeof props.onAddSubLevel === 'function') {
                setIsOpen(false);
                props.onAddSubLevel();
              }
            }}
            onKeyDown={() => { }}
          >
            Add Sub-Level
          </div>
        </div>
      </DropdownWrap>
    </Clickoutside>
  );
};

DropdownButton.defaultProps = {
  onAddNew: () => { },
  onAddSameLevel: () => { },
  onAddSubLevel: () => { }
};


export default DropdownButton;
