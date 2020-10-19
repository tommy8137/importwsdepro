import React, { Fragment, useState, useEffect, useRef } from 'react';
import { ContextProvider, useContextValue } from '~~hooks/useContextProvider';
import { EnhanceTooltip } from '~~elements/Tooltip';


function HoverHintCell(props) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const { value, cellInfo, cellInfo: { columnIndex, rowIndex }, helperInfo, tooltipRender, onClick } = props;
  const [contextValue, dispatch] = useContextValue();
  const cellEl = useRef(null);


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
        ref={cellEl}
        onClick={onClick}
        onKeyUp={() => { }}
      >
        {value}
      </div>
      {value && cellEl.current ?
        (
          <EnhanceTooltip
            placement="bottom"
            target={cellEl}
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
