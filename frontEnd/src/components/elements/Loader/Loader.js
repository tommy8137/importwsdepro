import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  0% {
      transform: scale(1);
      opacity: 1;
  }
  45% {
      transform: scale(0.1);
      opacity: 0.7;
  }
  80% {
      transform: scale(1);
      opacity: 1;
  }
`;

const LoaderDiv = styled.div`
  &.loader-wrapper {
    display: ${p => (p.isLoading ? 'block' : 'none')};
    .loader {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(0,0,0,0.3);
      z-index: 9999;
      width: 100%;
      height: 100%;
    }
    .pointbase-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 10rem;
      height: 10rem;
      opacity: 0.9;
      border-radius: 0.5rem;
      background-color: #1d1d1d;
    }
    .pointbase {
      background-color: #f5c910;
      width: 1rem;
      height: 1rem;
      display: inline-block;
      margin: 0.2rem;
      border-radius: 100%;

      &.point1 {
        animation: ${loading} 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0.12s infinite normal both running;
      }
      &.point2 {
        animation: ${loading} 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0.24s infinite normal both running;
      }
      &.point3 {
        animation: ${loading} 0.75s cubic-bezier(0.2, 0.68, 0.18, 1.08) 0.36s infinite normal both running;
      }
    }
  }

`;


export default class Loader extends Component {
  render() {
    return (
      <LoaderDiv className="loader-wrapper" isLoading={this.props.isLoading}>
        <div className="loader">
          <div className="pointbase-wrapper">
            <div className="pointbase point1" />
            <div className="pointbase point2" />
            <div className="pointbase point3" />
          </div>
        </div>
      </LoaderDiv>
    );
  }
}
