import React, { useState, useEffect } from 'react';

import Button from '~~elements/Button';
import Alert from '~~elements/Alert';


function CancelEditAlert(props) {
  const { isOpen, onCancel, onSure, disabled } = props;
  return (
    <Alert isOpen={isOpen} type="alarm">
      <div className="row">你是否要在離開前儲存變更?</div>
      <div className="row">
        <Button
          color="transparentInModal"
          border={false}
          onClick={onCancel}
        >
          取消
        </Button>
        <Button
          color="black"
          onClick={onSure}
          disabled={disabled}
        >
          儲存變更
        </Button>
      </div>
    </Alert>
  );
}


export default CancelEditAlert;
