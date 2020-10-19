import styled from 'styled-components';
import React, { Component } from 'react';

// 清空的按鈕
const StyledResetBtn = styled.div`
  background-color: #f2f2f2;
  color: rgba(51, 51, 51, 0.5);
  width: 25px;
  height: 25px;
  font-size: 14px;
  border-radius: 100%;
  display: block;
  text-align: center;
  line-height: 25px;
  margin: .25rem;
  cursor: pointer;
  :hover {
    background-color: #CCC;
    transition: 0.3s ease all;
  }
`;

// 箭頭朝下
export const DownBtn = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  &:after {
    content: '';
    display: inline-block;
    margin: calc((100% - .4rem) / 2 );
    width: .4rem;
    height: .4rem;
    border-top: 1px solid #333;
    border-right: 1px solid #333;
    transform: rotate(135deg);
    transition: .3s ease all;
  }
  &.to-up:after {
    transform: rotate(-45deg);
    transition: .3s ease all;
  }
`;

// 箭頭朝上
export const UpBtn = styled.div`
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  &:after {
    content: '';
    display: inline-block;
    margin: calc((100% - .4rem) / 2 );
    width: .4rem;
    height: .4rem;
    border-top: 1px solid #333;
    border-right: 1px solid #333;
    transform: rotate(-45deg);
  }
`;

export class ResetBtn extends Component {
  render() {
    return (
      <StyledResetBtn {...this.props}>&#10005;</StyledResetBtn>
    );
  }
}
