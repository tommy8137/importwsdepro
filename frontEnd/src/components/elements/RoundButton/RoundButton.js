import styled from 'styled-components';
import { Button as ReactstrapBtn } from 'reactstrap';

const ButtonBase = styled(ReactstrapBtn)`
  width: auto;
  height: 1.875rem;
  border-radius: 0.9375rem;
  border: solid 1px #333333;
  padding: 0 0.6rem;
  color: #333;
  transition: 0.3s ease all;
  margin: 0rem 0.2rem;
  &:active {
    box-shadow: none;
  }
  &:focus {
    box-shadow: none;
  }
  &:disabled {
    cursor: not-allowed;
  }
`;


const BlackButton = styled(ButtonBase)`
  border: solid 1px #333333;
  background-color: #333333;
  color: #ffffff;
  font-size: 0.7rem;
  &:active {
    background-color: #1e1e1e;
  }
  &:hover {
    color: #ffffff;
    background-color: #555555;
  }
  &:disabled {
    background-color: #333333;
    color: #ffffff;
  }
`;

const WhiteButton = styled(ButtonBase)`
  background-color: white;
  border: solid 1px #333333;
  color: #333333;
  font-size: 0.9rem;
  &:active {
    background-color: #1e1e1e;
  }
  &:hover {
    color: #ffffff;
    background-color: #555555;
  }
  &:disabled {
    background-color: white;
    color: #333333;
  }
`;

const GreenButton = styled(ButtonBase)`
  background-color: #00a99d;
  border: solid 1px #00a99d;
  color: #ffffff;
  font-size: 0.9rem;
  &:active {
    background-color: #00a99d;
  }
  &:hover {
    color: #ffffff;
    background-color: #00c5b7;
  }
  &:disabled {
    background-color: #00a99d;
    color: #ffffff;
  }
`;

const TransparentButton = styled(ButtonBase)`
  background-color: transparent;
  border: solid 1px #333333;
  color: #333333;
  font-size: 0.9rem;
  &:active {
    background-color: #1e1e1e;
  }
  &:hover {
    color: #ffffff;
    background-color: #555555;
  }
  &:disabled {
    background-color: transparent;
    color: #333333;
  }
`;


export {
  BlackButton,
  WhiteButton,
  GreenButton,
  TransparentButton
};
