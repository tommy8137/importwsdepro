import React from 'react';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css';
import IconCircle from '~~features/BomManagement/EEBomDetail/component/IconCircle';

function IconHeaderCell(props) {
  const {
    value, tooltip
  } = props;
  return (
    <div>
      {value}&nbsp;&nbsp;
      <Tooltip
        overlay={<p>{tooltip}</p>}
        placement="top"
        arrowContent={<div className="rc-tooltip-arrow-inner" />}
      >
        <IconCircle>&#63;</IconCircle>
      </Tooltip>
    </div>
  );
}

export default IconHeaderCell;
