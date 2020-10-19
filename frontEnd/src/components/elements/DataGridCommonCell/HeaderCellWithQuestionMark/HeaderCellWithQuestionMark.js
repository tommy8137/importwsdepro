import React, { useRef } from 'react';
import { EnhanceTooltip } from '~~elements/Tooltip';
import IconCircle from './IconCircle';

function HeaderCellWithQuestionMark(props) {
  const iconEl = useRef(null);
  const {
    value, tooltip
  } = props;
  return (
    <div>
      {value}&nbsp;&nbsp;
      <IconCircle innerRef={iconEl}>&#63;</IconCircle>
      <EnhanceTooltip
        target={iconEl}
        placement="bottom"
      >
        {tooltip}
      </EnhanceTooltip>
    </div>
  );
}

export default HeaderCellWithQuestionMark;
