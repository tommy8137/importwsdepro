import React, { useState, useEffect, Fragment } from 'react';
import { usePopper } from 'react-popper';
import styled, { injectGlobal } from 'styled-components';
import _get from 'lodash/get';
import Portal from '~~elements/Portal';

const PropperContainer = styled.div.attrs({
  style: props => props.style,
})`
  &[data-popper-reference-hidden="true"] {
    visibility: hidden;
    pointer-events: none;
    opacity: 0;
  }
`;


const checkContains = (node1, node2) => {
  try {
    return node1.contains(node2);
  } catch (e) {
    return false;
  }
};

function useSwitcherProps(defaultValue, propsValue, propsOnChange) {
  const [temp, setTemp] = useState(defaultValue);

  useEffect(() => {
    if (propsOnChange !== undefined && propsValue !== undefined) {
      setTemp(propsValue);
    }
  }, [JSON.stringify(propsValue)]);

  const onChange = propsOnChange || setTemp;
  const value = temp;
  return [
    value, onChange
  ];
}

// 需要監聽scroll 的 element
function Popper(props) {
  const {
    target = () => <div />,
    isOpen: propsIsOpen = undefined,
    onClose = () => { },
    // toggleOpen = () => { },
    disabled = false,
    minWidth = 0,
    children,
    placement = 'bottom-start',
    width = 'target',
  } = props;

  const [isOpen, toggleOpen] = useSwitcherProps(false, props.isOpen, props.toggleOpen);
  const [isOutside, setIsOutside] = useState(false);
  const [stateIsOpen, setStateIsOpen] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [
      { name: 'hide', }, // 超出parent範圍時自動隱藏
    ],
    placement
  });

  // 綁定檢查使否點到外面去
  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [referenceElement, popperElement]);

  useEffect(() => {
    if (isOutside) {
      handleClose();
    }
  }, [isOutside]);

  // 檢查使否點到外面去
  function handleClickOutside(e) {
    if (isOpen) {
      const clickedNode = _get(e, ['target'], null);
      const isClickOutside = !(checkContains(referenceElement, clickedNode) || checkContains(popperElement, clickedNode));
      if (isClickOutside) {
        setIsOutside(true);
      } else {
        setIsOutside(false);
      }
    } else {
      setIsOutside(false);
    }
  }


  function handleClose() {
    if (disabled) { return; }
    toggleOpen(false);
  }

  function handleToggle() {
    if (disabled) { return; }
    toggleOpen(!isOpen);
  }

  // 根據target component的寬度決定popper的寬度
  const targetWidth = referenceElement ? referenceElement.clientWidth : 0;

  const popperStyle = {
    ...styles.popper,
    width: width === 'target' ? targetWidth : width,
    minWidth,
    zIndex: 10000,
    overflow: 'hidden'
  };

  const referenceProps = {
    // className: 'popper-target',
    ref: setReferenceElement,
    innerRef: setReferenceElement,
    setReferenceElement,
    onClick: handleToggle,
    isOpen,
  };

  const targetComponents = target(referenceProps);

  return (
    <Fragment>
      {targetComponents}
      <Portal id="popper-debug-block">
        {isOpen &&
          <PropperContainer
            className="popper-container"
            innerRef={setPopperElement}
            style={popperStyle}
            {...attributes.popper}
          >
            {children}
          </PropperContainer>}
      </Portal>
    </Fragment>
  );
}

export default Popper;
