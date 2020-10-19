import React, { useState } from 'react';

/*
Usage:
<BaseCell
  value={rows[rowIndex][Columns[columnIndex]['key']]}
  cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
/>

*/
function BaseHoverCell(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    value,
    onClick
  } = props;
  return (
    <div
      className="grid-cell"
      key={key}
      style={style}
      onClick={onClick}
      onKeyUp={() => { }}
      onMouseEnter={() => props.onMouseEnter(rowIndex)}
      onMouseLeave={() => props.onMouseLeave(rowIndex)}
    >
      {value}
    </div>
  );
}

BaseHoverCell.defaultProps = {
  onClick: () => { },
  onMouseEnter: () => { },
  onMouseLeave: () => { }
};

export default BaseHoverCell;
