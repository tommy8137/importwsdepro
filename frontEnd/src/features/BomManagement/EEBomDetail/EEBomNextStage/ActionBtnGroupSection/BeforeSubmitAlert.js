import React from 'react';

import Button from '~~elements/Button';
import Alert from '~~elements/Alert';


function BeforeSubmitAlert(props) {
  const { isOpen, toggleAlert, onSure, onClose, content, closeOnly, } = props;
  return (
    <Alert isOpen={isOpen} type="alarm">
      <div className="row" style={{ textAlign: 'center' }}>
        {content}
      </div>
      {!closeOnly ?
        <div className="row">
          <Button
            className="e2e_alert_cancel_btn"
            color="transparentInModal"
            border={false}
            onClick={toggleAlert}
          >
            取消
          </Button>
          <Button
            className="e2e_alert_ok_btn"
            color="black"
            onClick={onSure}
          >
            確定提交
          </Button>
        </div> :
        <div className="row">
          <Button
            className="e2e_alert_close_btn"
            color="transparentInModal"
            border={false}
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      }
    </Alert>
  );
}

BeforeSubmitAlert.defaultProps = {
  closeOnly: false,
};

export default BeforeSubmitAlert;
