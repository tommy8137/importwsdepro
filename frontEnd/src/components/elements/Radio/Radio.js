import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

const Radio = styled.div`
  
  label {
    margin-bottom: 0px;
    width: 100%;
    cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};
  }
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    z-index: -9999;
    /* top: -9999px; */
    display: none;
    + .radio-label {
      &:before {
        content: '';
        background: #FFFFFF;
        border-radius: 100%;
        border: 2px solid #333333;
        display: inline-block;
        width: 22px;
        height: 22px;
        position: relative;
        margin-right: 0.8em; 
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          background-color: #333333;
          box-shadow: inset 0 0 0 3.5px #FFFFFF;
        }
      }
    }
    &:focus {
      + .radio-label {
        &:before {
          outline: none;
          border: 2px solid #333333;
        }
      }
    }
    &:disabled {
      + .radio-label {
        cursor: not-allowed;
        &:before {
          box-shadow: inset 0 0 0 4px #FFFFFF;
          border-color: #FFFFFF;
          background: #FFFFFF;
          border: 2px solid #c0c0c0;
          cursor: not-allowed;
        }
      }
    }
    + .radio-label {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
`;

export default class RadioComponent extends Component {
  static propTypes = {
    children: PropTypes.node,
    checked: PropTypes.bool,
  }
  static defaultProps = {
    children: null,
    checked: false,
  }


  render() {
    const uuid = uuidv4();
    const { children, disabled, ...rest } = this.props;
    return (
      <Radio className="radio" disabled={disabled}>
        <input id={uuid} type="radio" {...rest} />
        <label htmlFor={uuid} className="radio-label">
          {children}
        </label>
      </Radio>
    );
  }
}
