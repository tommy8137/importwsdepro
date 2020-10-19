import React, { Component } from 'react';
import styled from 'styled-components';
import Button from '~~elements/Button';
import Icon from '~~elements/Icon';


const AnalysisButtonDiv = styled.div`
  color: #fff;
  &.analysis-btn-wrapper {
    &.disabled {
      button {
        cursor: not-allowed;
        opacity: 0.5;
      }
      svg {
        .cls-1 {
          fill: #666;
        }
      }
      cursor: not-allowed;
    }
    .analysis-btn-wrapper {
      &--btn {
        width: 14rem;
        height: 3.5rem;
        padding: 0;
        display: flex;
        align-items: center;
        display: flex;
        justify-content: space-between;
        padding: 0 0.5rem 0 1.5rem;
        @media (max-width: 1440px) {
          width: 11.5rem;
          height: 3rem;
        }
      }
    }

  .title {
    text-transform: uppercase;
  }
  .analysis-icon {
    width: 2.4rem;
    @media (max-width: 1440px) {
      width: 2rem;
    }
  }
}
`;


export default class AnalysisButton extends Component {
  render() {
    return (
      <AnalysisButtonDiv className={`analysis-btn-wrapper ${this.props.className}`}>
        <Button className="analysis-btn-wrapper--btn" border={true} color="black" onClick={this.props.onClick}>
          <div className="title">分析</div>
          <div><Icon icon="IcoArrow" className="analysis-icon" /></div>
        </Button>
      </AnalysisButtonDiv>

    );
  }
}
