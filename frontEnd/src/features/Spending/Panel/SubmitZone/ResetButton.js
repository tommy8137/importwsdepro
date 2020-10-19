import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '~~elements/Icon';

const ResetButtonDiv = styled.div`
  width: 6rem;
  cursor: pointer;
  opacity: 0.5;
  /* border: 1px solid black; */
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .field-reset-btn {
    &--icon {
      width: 1.5rem;
      color: #333;
      margin-right: 0.5rem;
    }
    &--text {
      color: #333;
    }
  }


`;


export default class ButtonComponent extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => { },
  }

  render() {
    return (
      <ResetButtonDiv
        className="field-reset-btn"
        onClick={this.props.onClick}
        onKeyUp={() => { }}
      >
        <Icon className="field-reset-btn--icon" icon="BtnReset" />
        <span className="field-reset-btn--text">RESET</span>
      </ResetButtonDiv>
    );
  }
}
