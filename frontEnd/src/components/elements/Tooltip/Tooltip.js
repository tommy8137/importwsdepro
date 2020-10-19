import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import ErrorBoundary from '~~elements/ErrorBoundary';


// 最基本的tooltip 外面墊一層ErrorBoundary以防爆掉
class TooltipComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // ErrorBoundary: 解決 scroll時找不到target, 或是找不到target id時會噴錯的問題
    // tooltipRef:tooltip的innerRef跟styledComponent互相衝突，如果要拿到tooltip的ref, 可以用tooltipRef
    return (
      <ErrorBoundary>
        <Tooltip
          {...this.props}
          innerRef={this.props.tooltipRef}
        >
          {this.props.children}
        </Tooltip>
      </ErrorBoundary>
    );
  }
}


export default TooltipComponent;

