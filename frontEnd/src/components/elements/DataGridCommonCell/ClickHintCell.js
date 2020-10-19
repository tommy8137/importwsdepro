import React, { Fragment, useState, useEffect, useRef } from 'react';
import { EnhancePopover } from '~~elements/Popover';

function ClickHintCell(props) {
  const [isOpen, setIsOpen] = useState(false);
  const cellEl = useRef(null);
  const { value, cellInfo, tooltipRender } = props;


  useEffect(() => {
    /** 當scoll的時候(cell的高度改變時) 把popover關掉 */
    setIsOpen(false);
  }, [cellInfo.style.top]);


  return (
    <Fragment>
      <div ref={cellEl} className="grid-cell" style={{ ...cellInfo.style, cursor: 'pointer' }}>
        {value}
      </div>
      {value && cellEl ?
        (
          <EnhancePopover
            placement="bottom"
            target={cellEl}
            closeBtn
            onClickClose={() => setIsOpen(false)}
            onClickOutside={() => setIsOpen(false)}
            toggle={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
          >
            {tooltipRender()}
          </EnhancePopover>) : null}
    </Fragment>
  );
}

ClickHintCell.defaultProps = {
  onClick: () => { },
};

export default ClickHintCell;
