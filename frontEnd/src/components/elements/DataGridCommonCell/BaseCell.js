import React, { useState } from 'react';

/*
Usage:
<BaseCell
  value={rows[rowIndex][Columns[columnIndex]['key']]}
  cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
/>

*/
function BaseCell(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    value,
    onClick
  } = props;
  return (
    <div className="grid-cell" key={key} style={style} onClick={onClick} onKeyUp={() => { }}>
      {value == null ? '' : value}
    </div>
  );
}

BaseCell.defaultProps = {
  onClick: () => { },
};

export default BaseCell;
