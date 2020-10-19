import React from 'react';
import Button, { BTN_COLOR } from '~~elements/Button';
import Icon from '~~elements/Icon';

function ExportButton(props) {
  return (
    <Button
      color={BTN_COLOR.TRANSPARENT}
      width="5.375rem"
      round
      onClick={props.onClick}
    >
      <Icon className="icon" icon="IcoExport" size="0.93125rem" />
      Export
    </Button>
  );
}

export default ExportButton;
