import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _get from 'lodash/get';
import { comma } from '~~utils/Math';


const RowBox = styled.rect`
fill: rgba(255,255,255, 0);
width: 96%;
height: 60px;
stroke-width: 1;
x: 2%;
&.active-l1 {
  fill: #cccccc;
  stroke: rgba(0, 0, 0, 0.16);
  rx: 4px;
  ry: 4px;
  transition: 0.3s ease all;
  filter: url(#blur);
  y: 4px;
}
&.active-l2 {
  fill: rgba(255,255,255, 1);
  rx: 4px;
  ry: 4px;
  transition: 0.3s ease all;
}
`;

const Text = styled.text`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC|Roboto');
  font-family: 'Roboto', 'Noto Sans TC', sans-serif;
  font-weight: normal;
  font-size: 12px;
  fill: #333;
`;

const Bar = styled.rect`
  fill: #00a99d;
  height: 40px;
`;

export default class RowComponent extends Component {
  static propTypes = {
    data: PropTypes.shape().isRequired,
    valueKey: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({
      isHover: true
    });
  }

  handleMouseLeave = () => {
    this.setState({
      isHover: false
    });
  }

  render() {
    const { data, valueKey } = this.props;
    const barstart = 170 - 12 + data.start * 535;
    const barend = 170 - 12 + data.start * 535 + data.share * 535;
    const { isHover } = this.state;
    return (
      <Fragment>
        <defs>
          <filter id="blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        <g onMouseEnter={this.handleMouseEnter}  onMouseLeave={this.handleMouseLeave}>
          {String(_get(data, 'category', '')).toUpperCase() !== 'TOTAL' &&
            <line x1={barend} x2={barend} y1={54} y2={66} stroke="#333333" strokeWidth={1} />}
          {/* 底框 */}
          <RowBox className={isHover ? 'active-l1' : ''}  onMouseEnter={this.handleMouseEnter} />
          <RowBox className={isHover ? 'active-l2' : ''}  onMouseEnter={this.handleMouseEnter} />
          {/* category */}
          <Text x={0 + 30} y={38} onMouseEnter={this.handleMouseEnter}>{data.category || 'null'}</Text>
          {/* Bar */}
          <Bar x={barstart} y={10} width={data.share * 535} onMouseEnter={this.handleMouseEnter} />
          {/* quantity */}
          <Text x={barend + 5} y={38} onMouseEnter={this.handleMouseEnter}>{comma(data[valueKey])}</Text>
          {/* share of spend */}
          <Text x={820 - 12} y={38} onMouseEnter={this.handleMouseEnter}>{data.percentage}</Text>
          {/* # of P/N */}
          <Text x={919 - 12} y={38} onMouseEnter={this.handleMouseEnter}>{data.pn}</Text>
          {/* # of Suppliers */}
          <Text x={1023 - 12} y={38} onMouseEnter={this.handleMouseEnter}>{data.suppliers}</Text>
        </g>
      </Fragment>
    );
  }
}
