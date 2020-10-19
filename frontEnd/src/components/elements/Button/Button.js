/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _color from 'color';

const DARK_GRAY = '#333333';
const LIGHT_GRAY = '#f7f7f7';
const TRANSPARENT = 'transparent';
const WHITE = '#FFFFFF';
const GREEN = '#00A99D';
const YELLOW = '#ffc90b';

export const BTN_COLOR = {
  WHITE: 'white',
  BLACK: 'black',
  TRANSPARENT: 'transparent',
  GREEN: 'green',
  AUTO: 'auto',
  YELLOW: 'yellow',
};

const colorMapper = {
  yellow: {
    font: WHITE,
    background: YELLOW,
  },
  white: {
    font: DARK_GRAY,
    background: WHITE,
  },
  black: {
    font: WHITE,
    background: DARK_GRAY,
  },
  transparent: {
    font: DARK_GRAY,
    background: TRANSPARENT,
    hoverBackground: '#D9D9D9',
  },
  transparentInModal: {
    font: LIGHT_GRAY,
    background: TRANSPARENT,
    hoverFont: DARK_GRAY,
    hoverBackground: LIGHT_GRAY,
  },
  green: {
    font: LIGHT_GRAY,
    background: GREEN,
  },
  auto: {
    font: LIGHT_GRAY,
    background: TRANSPARENT,
  },
};

function getColoring(color) {
  return colorMapper[color] || colorMapper.black;
}

const Btn = styled.button`
  &.button {

    /* display: flex; */
    /* justify-content: space-around; */
    /* align-items: center; */
    font-size:  1rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1rem;
    letter-spacing: normal;
    transition: .3s ease all;
    padding: 0.4rem 0.6rem;
    min-height: 2.5rem;

    border-radius: 4px;
    width: 180px;
    color: ${props => props.coloring.font};
    background-color: ${props => props.coloring.background};
    border: 1px solid ${props => (props.border ? props.coloring.border : TRANSPARENT)};


    &:hover {
      cursor: pointer;
      color: ${props => props.coloring.hoverFont || props.coloring.font};
      background-color: ${props => props.coloring.hoverBackground || _color(props.coloring.background).darken(0.12).hex()};
    }
    &:focus, &.focus {
      box-shadow: none;
      outline: unset;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;

      &:hover {
        color: ${props => props.coloring.font};
        background-color: ${props => props.coloring.background};
      }
    }

    .icon {
      margin-right: 0.25rem;
    }
  }

  &.button-round {
    font-size: 0.9rem;
    padding: 0 0.6rem;
    min-height: 1.875rem;
    line-height: 1.5;
    border-radius: 180px;
    width: auto;
  }

  &.button-mini {
    font-size: 0.5rem;
    line-height: 0.5rem;
    padding: 0 0.4rem;
    min-height: 1.5rem;
  }

  &.button-inverse {
    color: ${props => props.coloring.background};
    background-color: ${props => props.coloring.font};

    :hover {
      cursor: pointer;
      color: ${props => props.coloring.hoverFont || props.coloring.background};
      background-color: ${props => props.coloring.hoverBackground || _color(props.coloring.font).darken(0.12).hex()};
    }

    &:disabled:hover {
      color: ${props => props.coloring.background};
      background-color: ${props => props.coloring.font};
    }
  }
`;

export default function ButtonComponent(props) {
  return (
    <Btn
      {...props}
      coloring={getColoring(props.color)}
      width={props.width}
      inverse={props.inverse}
      className={getClassName()}
    >
      {props.children}
    </Btn>
  );

  function getClassName() {
    const { round, mini, className, inverse } = props;
    let result = 'button';

    if (round) {
      result += ' button-round';
    }
    if (mini) {
      result += ' button-mini';
    }

    if (inverse) {
      result += ' button-inverse';
    }

    if (className) {
      result += ` ${className}`;
    }
    return result;
  }
}

ButtonComponent.propTypes = {
  /* 設定顏色的集合 */
  color: PropTypes.oneOf(['white', 'black', 'transparent', 'transparentInModal', 'green', 'auto']),
  /* 是否顯示邊框 */
  border: PropTypes.bool,
  /* 寬度設定 */
  width: PropTypes.string,
  /* 是否取消上下邊界高度設定以及縮小字體 */
  mini: PropTypes.bool,
  /* 是否使按鈕失效 */
  disabled: PropTypes.bool,
  /* 反轉文字與背景顏色 */
  inverse: PropTypes.bool,
  /* 是否變成圓角的按鈕 */
  round: PropTypes.bool,
};

ButtonComponent.defaultProps = {
  color: BTN_COLOR.BLACK,
  border: true,
  mini: false,
  disabled: false,
  inverse: false,
  round: false,
  width: '180px',
};
