import React, { useState } from 'react';

function BaseHeaderCell(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    value
  } = props;
  return (
    <div className="grid-cell is-header" key={key} style={style}>
      {value}
    </div>
  );
}

export default BaseHeaderCell;
