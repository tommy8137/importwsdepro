import React, { useState, useRef, useEffect } from 'react';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';


function LeaveAlert(props) {
  const {
    isOpen,
    toggleAlert,
    onSure,
  } = props;
  return (
    <Alert isOpen={isOpen} type="alarm">
      <div className="row">您尚未完成上傳流程，是否仍要離開？</div>
      <div className="row">
        <Button
          color="transparentInModal"
          border={false}
          onClick={(e) => {
            e.stopPropagation();
            toggleAlert(false);
            onSure();
          }}
        >
          離開
        </Button>
        <Button
          color="black"
          onClick={(e) => {
            e.stopPropagation();
            toggleAlert(false);
          }}
        >
          取消
        </Button>
      </div>
    </Alert>
  );
}


export default LeaveAlert;
