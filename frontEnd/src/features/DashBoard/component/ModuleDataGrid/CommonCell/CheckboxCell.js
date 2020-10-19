import React from 'react';
import Icon, { IconName } from '~~elements/Icon';

function CheckboxCell(props) {
  const {
    cellInfo: { key, style },
    value,
    ...restProps
  } = props;

  return (
    <div className="grid-cell" key={key} style={style} {...restProps}>
      <Icon icon={value ? IconName.Checked : IconName.Empty} />
    </div>
  );
}

export default CheckboxCell;
