import React, { Component } from 'react';

import { Wrapper, CloseBtn } from './ChartModalBaseStyles';


export default class ChartModalBase extends Component {
  render() {
    return (
      <Wrapper
        className="base-chart-modal"
        show={this.props.modal}
      >
        <CloseBtn
          className="close-button"
          scale={1}
          onClick={this.props.onClose}
        >
          <div className="cross">
            <div className="cross-line cross-line--x" />
            <div className="cross-line cross-line--y" />
          </div>
        </CloseBtn>
        <div className="base-chart-modal--content">
          {this.props.children}
        </div>
      </Wrapper>
    );
  }
}
