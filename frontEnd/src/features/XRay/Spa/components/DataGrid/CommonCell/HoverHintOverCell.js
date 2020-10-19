import React, { useRef, Fragment, useState, useEffect } from 'react';
import { ContextProvider, useContextValue } from '~~hooks/useContextProvider';
import styled from 'styled-components';
import { EnhanceTooltip } from '~~elements/Tooltip';

const TextDiv = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  span {

  }
  .hide {
    position: absolute;
    z-index: -1;
    left: 0;
    white-space: nowrap;
    opacity: 0;
  }
`;


function HoverHintCell(props) {
  const [isOver, setIsOver] = useState(false);
  const { value, cellInfo, cellInfo: { columnIndex, rowIndex }, helperInfo, tooltipRender, onClick } = props;
  const [contextValue, dispatch] = useContextValue();

  const innerDiv = useRef(null);
  const cellDiv = useRef(null);
  const textDiv = useRef(null);

  useEffect(() => {
    const checkWidth = () => {
      if (innerDiv.current && textDiv.current && innerDiv.current.clientWidth < textDiv.current.clientWidth) {
        setIsOver(true);
      } else {
        setIsOver(false);
      }
    };
    window.addEventListener('resize', checkWidth);
    checkWidth();
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  });

  const onMouseEnter = () => {
    dispatch({ type: 'SET_HOVER_INDEX', hoverIndex: rowIndex });
  };
  const onMouseLeave = () => {
    dispatch({ type: 'SET_HOVER_INDEX', hoverIndex: -1 });
  };


  return (
    <Fragment>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="grid-cell"
        style={{ ...cellInfo.style, cursor: 'pointer' }}
        onClick={onClick}
        ref={cellDiv}
        onKeyUp={() => { }}
      >
        <TextDiv isOver={isOver} innerRef={innerDiv}>
          <span>{value}</span>
          <span className="hide" ref={textDiv}>{value}</span>
        </TextDiv>
      </div>
      {value && isOver && cellDiv.current ?
        (
          <EnhanceTooltip
            placement="top"
            target={cellDiv}
          // isOpen
          >
            {tooltipRender()}
          </EnhanceTooltip>) : null}
    </Fragment>
  );
}

HoverHintCell.defaultProps = {
  onClick: () => { },
};

export default HoverHintCell;
