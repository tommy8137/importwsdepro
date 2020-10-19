import React, { Component, Fragment } from 'react';
import { comma } from '~~utils/Math';

export default class Legend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxStyle: {
        fill: 'rgba(255,255,255, 1)',
      },
      iconStyle: {
        xpadding: 15,
        ypadding: 15,
        width: 10,
        height: 10,
      },
      companyStyle: { xpadding: 40, ypadding: 25, fill: '#939393' },
      amountStyle: { xpadding: 250, ypadding: 25, fill: '#333', textAnchor: 'end' },
      percentStyle: { xpadding: 350, ypadding: 25, fill: '#333', textAnchor: 'end' },
    };
  }

  handleMouseEnter = (e) => {
    this.props.onHover(this.props.slicedata.index);
  }
  render() {
    const { color, x, y, slicedata, isHover, onHover, ...rest } = this.props;
    const { boxStyle, iconStyle, companyStyle, amountStyle, percentStyle } = this.state;
    return (
      <Fragment>
        <defs>
          <filter id="blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        {/* 方框 */}
        {(isHover ?
          <g>
            <rect
              {...rest}
              {...boxStyle}
              fill="#ccc"
              x={x}
              y={y + 4}
              rx="5"
              ry="5"
              filter="url(#blur)"
              onMouseEnter={this.handleMouseEnter}
            />
            <rect
              {...rest}
              {...boxStyle}
              x={x}
              y={y}
              rx="5"
              ry="5"
              onMouseEnter={this.handleMouseEnter}
            />
          </g> :
          <rect
            {...rest}
            fill="transparent"
            x={x}
            y={y}
            rx="5"
            ry="5"
            onMouseEnter={this.handleMouseEnter}
          />)}
        {/* 色票 */}
        <rect
          {...iconStyle}
          x={x + iconStyle.xpadding}
          y={y + iconStyle.ypadding}
          fill={color}
          onMouseEnter={this.handleMouseEnter}
        />
        {/* 公司名稱 */}
        <text
          {...companyStyle}
          x={x + companyStyle.xpadding}
          y={y + companyStyle.ypadding}
          onMouseEnter={this.handleMouseEnter}
        >
          {slicedata.data.label}
        </text>
        {/* 金額 */}
        <text
          {...amountStyle}
          x={x + amountStyle.xpadding}
          y={y + amountStyle.ypadding}
          onMouseEnter={this.handleMouseEnter}
        >
          ${comma(slicedata.data.value)}
        </text>
        {/* 金額佔的比例 */}
        <text
          {...percentStyle}
          x={x + percentStyle.xpadding}
          y={y + percentStyle.ypadding}
          onMouseEnter={this.handleMouseEnter}
        >
          {slicedata.data.percentage}%
        </text>
      </Fragment>
    );
  }
}
