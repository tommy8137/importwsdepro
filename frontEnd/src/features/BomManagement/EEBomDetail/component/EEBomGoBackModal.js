import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowIcon, GoBackModalWrapper } from '~~styles/goBackModalStyles';

function EEBomGoBackModal(props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'initial';
    };
  }, []);
  return (
    <GoBackModalWrapper>
      <div className="go-back-modal-header">
        <div onKeyUp={() => { }} className="go-back-modal-backZone" onClick={props.goBack}>
          <ArrowIcon />
          <span>返回</span>
        </div>
        <div className="go-back-modal-menu">
          {props.tabsComponent}
        </div>
      </div>
      <div className="go-back-modal-main">
        {props.contentComponent}
      </div>
    </GoBackModalWrapper>
  );
}


EEBomGoBackModal.defaultProps = {
  goBack: () => {},
  tabsComponent: <div />,
  contentComponent: <div />
};

EEBomGoBackModal.propTypes = {
  // 按下返回鍵
  goBack: PropTypes.func,
  // header的component
  tabsComponent: PropTypes.element,
  // content的component
  contentComponent: PropTypes.element
};

export default EEBomGoBackModal;
