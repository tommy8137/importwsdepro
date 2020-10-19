import React, { useState } from 'react';
import { Popover } from 'reactstrap';
import ErrorBoundary from '~~elements/ErrorBoundary';

class PopoverComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // console.log(error, info);
  }
  render() {
    // ErrorBoundary: 解決scroll時找不到id的error
    // popoverRef:popoverRef的innerRef跟styledComponent互相衝突，如果要拿到tooltip的ref, 可以用tooltipRef
    return (
      <ErrorBoundary>
        <Popover {...this.props} innerRef={this.props.popoverRef} >
          {this.props.children}
        </Popover>
      </ErrorBoundary>
    );
  }
}


export default PopoverComponent;

