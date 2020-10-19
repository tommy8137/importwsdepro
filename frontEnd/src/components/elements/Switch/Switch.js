import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Label = styled.label`
  display: inline-block;
  width: ${props => props.width || 40}px;
  height: auto;
  position: relative;
  cursor: pointer;
  opacity: ${props => (props.disabled ? 0.3 : 1)};
  pointer-events: ${props => (props.disabled ? 'none' : '')};
  input[type="checkbox"] {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    z-index: 2;
    cursor: pointer;
    &.active svg,
    &:checked + svg {
      rect {
        opacity: 0.5;
        fill: #009688;
      };
      circle {
        fill: #009688;
        transform: translate(45px, 0);
      };
    }
  }
  &.disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  &:active {
    svg {
      circle {
        transform: scale(1.06);
        stroke: #fff;
        stroke-width: 2px;
      }
    }
  }
  svg {
    width: 100%;
    height: auto;
    path,
    circle {
      transition: 0.3s ease all;
    }
    rect {
      fill: #c5c5c5;
    }
    circle {
      fill: #f1f1f1;
    }
  }
`;

export default class Switch extends Component {
  static defaultProps = {
    disabled: false,
    width: 40,
  };
  static propTypes = {
    disabled: PropTypes.bool, // 'true' | 'false' | 'auto'
    width: PropTypes.number, // number'
  }
  render() {
    const { disabled, width } = this.props;
    return (
      <Label className="switch" disabled={disabled} width={width}>
        <input type="checkbox" {...this.props} />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 106.84 75.84"
        >
          <g>
            <rect x="0.5" y="17.24" width="100" height="35.33" rx="20.67" />
            <circle cx="30" cy="35" r="30" />
          </g>
        </svg>
      </Label>
    );
  }
}

