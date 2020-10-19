import React from 'react';
import _get from 'lodash/get';
import { ClickHintCell } from '~~elements/DataGridCommonCell';


function SPACell(props) {
  const { value, cellInfo, helperInfo, showEXPSpa } = props;
  const tooltip = showEXPSpa ? helperInfo.row['exp_other_manufacture_info'] : helperInfo.row['other_manufacture_info'];
  const manufacturerList = JSON.parse(_get(tooltip, 'spa_manufacturer', '[]'));
  const partNumber = _get(tooltip, 'spa_partnumber', '');


  return (
    <ClickHintCell
      value={value}
      cellInfo={cellInfo}
      helperInfo={helperInfo}
      tooltipRender={() => (
        <div className="content">
          <div className="item" style={{ display: 'flex' }}>
            <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#9f9f9f' }}>Part Number: </div>
            <div className="content">{partNumber}</div>
          </div>
          <div className="item" style={{ display: 'flex' }}>
            <div className="title" style={{ width: '6rem', textAlign: 'left', color: '#9f9f9f' }}>Manufacturer: </div>
            <div className="content">{manufacturerList.map(mf => <p style={{ marginBottom: '0rem' }}>{mf}</p>)}</div>
          </div>
        </div>
      )}
    />
  );
}


export default SPACell;
