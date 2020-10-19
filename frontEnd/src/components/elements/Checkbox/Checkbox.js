import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';
import styled from 'styled-components';
import btnCheckboxN from '~~static/Icon2/btnCheckboxN.svg';
import btnCheckboxP from '~~static/Icon2/btnCheckboxP.svg';
import btnCheckboxH from '~~static/Icon2/btnCheckboxH.svg';
import btnCheckboxHalf from '~~static/Icon2/btnCheckboxHalf.svg';
import btnCheckboxS from '~~static/Icon2/btnCheckboxS.svg';

function svgToBase64(originSvg) {
  const svg64 = btoa(originSvg);
  return `data:image/svg+xml;base64,${svg64}`;
}

const Box = styled.div`
  display: inline-block;
  label {
    margin-bottom: unset;
  }
  input[type="checkbox"]: disabled + label {
    color: ${props => (props.disabled ? '#939393' : '#333333')}
  }
  /* 隱藏原生checkbox */
  input[type="checkbox"] {
      opacity: 0;
      position: absolute;
      margin: 0;
      z-index: -1;
      width: 0;
      height: 0;
      overflow: hidden;
      left: 0;
      pointer-events: none;
  }

  /* 一般checkbox */
  input[type="checkbox"] + label::before {
    content: url(${svgToBase64(btnCheckboxN)});
    display: inline-block;
    width: 1.125rem;
    height: 1.125rem;
    margin-right: .4rem;
    border-radius: .2rem;
    text-indent: .15em;
    line-height: .65;
    vertical-align: middle;
    opacity: ${props => (props.disabled ? 0.6 : 1)};
    pointer-events: ${props => (props.disabled ? 'none' : '')};


  }

  /* 已勾選 */
  input[type="checkbox"]:checked + label::before {
    content: url(${props => props.checkIcon});
  }

  /* 滑鼠點 */
  input[type="checkbox"]:hover:active:not(:disabled) + label::before {
    content: url(${svgToBase64(btnCheckboxP)});
  }

  /* 滑鼠移過 */
  :hover {
    input[type="checkbox"]:not(:checked):not(:disabled) + label::before {
      content: url(${svgToBase64(btnCheckboxH)});
    }
  }

  /* TODO 需要黑框框 */
  .hightlight-black {}

  * {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

export default class Checkbox extends Component {
  static propTypes = {
    children: PropTypes.node,
    /** 複選方框 (非全選) */
    indeterminate: PropTypes.bool,
  }
  static defaultProps = {
    children: null,
    indeterminate: false,
  }
  constructor(props) {
    super(props);
    this.state = {
      uuid: uuidv4()
    };
  }
  render() {
    const { children, indeterminate, disabled, ...rest } = this.props;
    const checkIcon = indeterminate ? svgToBase64(btnCheckboxHalf) : svgToBase64(btnCheckboxS);

    return (
      <Box className="checkbox" checkIcon={checkIcon} disabled={disabled}>
        <input
          type="checkbox"
          id={this.state.uuid}
          disabled={disabled}
          {...rest}
        />
        <label htmlFor={this.state.uuid}>{this.props.children}</label>
      </Box>
    );
  }
}
