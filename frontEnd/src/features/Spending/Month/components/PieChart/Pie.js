import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import { comma } from '~~utils/Math';
import Slice from './Slice';
import Legend from './Legend';
import NoData from '../NoData';

const Svg = styled.svg`
&.svg-pie {
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC|Roboto');
  font-family: 'Roboto', 'Noto Sans TC', sans-serif;
  text {
    font-family: 'Roboto';
    font-weight: normal;
  }
  .header {
    .date {
      fill: #333333;
      font-size: 14px;
    }
    .currency {
      /* fill: rgba(204, 204, 204, 0.5); */
      fill: #333333;
      fill-opacity: 0.5;
      font-size: 12px;
    }
  }}
`;

export default class Pie extends Component {
  static propTypes = {

  }

  constructor(props) {
    super(props);
    this.state = {
      hoverIndex: -1,
    };
  }


  componentDidMount() {
    this.handleHover(0);
  }


  handleHover = (hoverIndex) => {
    this.setState({
      hoverIndex
    });
  }
  render() {
    const { interpolate, radius, paddingX, paddingY,
      width, height, data, query, isNoData, onRetry } = this.props;
    const { hoverIndex } = this.state;

    const self = this;
    let startAngle = 0;
    const datalen = data.length;
    const sum = data.reduce((carry, current) => carry + current.value, 0);

    const totalData = {
      data: {
        key: 11,
        label: 'Total',
        value: Number(data.reduce((carry, current) => carry + current.data.value, 0).toFixed(4)),
        percentage: data.reduce((carry, current) => carry + current.data.percentage, 0).toFixed(2),
      } };

    return (
      <Svg
        className="svg-pie"
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <g className="header">
          <text x="20" y="35">{moment(query.dateFrom).format('YYYY.MM.DD')} - {moment(query.dateTo).format('YYYY.MM.DD')}</text>
          <line x1="0" x2={width} y1="59" y2="59" stroke="#cccccc" strokeWidth={1} />
          <text className="currency" x={width - 20} y="35" textAnchor="end">$ thousand</text>
        </g>
        {
          !isNoData ?
            <g transform="translate(0 60)">
              {/* START: 後面灰色圓圈部份 */}
              <circle
                cx={radius + paddingX}
                cy={radius + paddingY}
                r={radius + 15}
                fill="#ddd"
              />
              {/* END: 後面灰色圓圈部份 */}
              { data.map((slice, sliceIndex) => {
                const angle = (slice.value / sum) * 360;
                const nextAngle = startAngle;
                const percent = (slice.value / sum) * 100;

                startAngle += angle;

                return (<Slice
                  key={sliceIndex}
                  slicedata={slice}
                  percent={self.props.percent}
                  percentValue={percent.toFixed(1)}
                  startAngle={nextAngle}
                  angle={angle}
                  radius={radius}
                  fill={interpolate[sliceIndex]}
                  stroke={self.props.stroke}
                  strokeWidth={self.props.strokeWidth}
                  paddingX={paddingX}
                  paddingY={paddingY}
                  onHover={this.handleHover}
                  isHover={hoverIndex === slice.index}
                />);
              }) }
              {/* START: 中間半透明白色圓圈部份 */}
              <circle
                cx={radius + paddingX}
                cy={radius + paddingY}
                r="90"
                fill="rgba(255, 255, 255, 0.3)"
              />
              <circle
                cx={radius + paddingX}
                cy={radius + paddingY}
                r="100"
                fill="rgba(255, 255, 255, 0.6)"
              />
              <text
                x={radius + paddingX}
                y={radius + paddingY + 15}
                fill="#939393"
                textAnchor="middle"
                fontSize={30}
              >
            ${comma(sum)}
              </text>
              {/* END: 中間半透明白色圓圈部份 */}
              {/* START: 圖例 */}
              <g>
                {data.map((slice, sliceIndex) =>
                  (<Legend
                    key={sliceIndex}
                    x={width * 0.6}
                    y={30 + 40 * sliceIndex}
                    width={width * 0.35}
                    height={40}
                    color={interpolate[sliceIndex]}
                    slicedata={slice}
                    onHover={this.handleHover}
                    isHover={hoverIndex === slice.index}
                  />)
                  )}
                {/* 計算加總 */}
                <line
                  x1={width * 0.6}
                  y1={30 + 40 * datalen + 8}
                  x2={width * 0.95}
                  y2={30 + 40 * datalen + 8}
                  stroke="#ccc"
                  strokeWidth="1"
                />
                <Legend
                  x={width * 0.6}
                  y={30 + 40 * datalen + 10}
                  width={width * 0.35}
                  height={40}
                  color="transparent"
                  slicedata={totalData}
                  isHover={false}
                />
              </g>
              {/* END: 圖例 */}
            </g> :
            <NoData onRetry={onRetry} />}
      </Svg>
    );
  }
}
