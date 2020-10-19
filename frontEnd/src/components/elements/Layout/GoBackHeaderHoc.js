import React, { Component } from 'react';
import { ArrowIcon, GoBackModalWrapper } from '~~styles/goBackModalStyles';
import _get from 'lodash/get';

const headerHoc = (options) => (WrappedComponent) => {
  class HeaderHoc extends Component {
    handleClick = () => {
      const prevSearch = _get(this.props, ['location', 'state', 'prevSearch'], '');
      this.props.history.push({
        pathname: options.backLink,
        search: prevSearch
      });
    }
    render() {
      const { match: { url, path } } = this.props;
      return (
        <GoBackModalWrapper>
          <div className="go-back-modal-header">
            <div onKeyUp={() => { }} className="go-back-modal-backZone" onClick={this.handleClick}>
              <ArrowIcon />
              <span>返回</span>
            </div>
            <div className="go-back-modal-menu">
              {options.render}
            </div>
          </div>
          <div className="go-back-modal-main">
            <WrappedComponent {...this.props} />
          </div>
        </GoBackModalWrapper>
      );
    }
  }

  return HeaderHoc;
};

export default headerHoc;
