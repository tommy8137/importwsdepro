import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { comma } from '~~utils/Math';
import { getAnglePoint, getAngleByRadian } from './utils';

export default class Slice extends Component {
  static propTypes = {
    angle: PropTypes.number.isRequired,
    startAngle: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    paddingX: PropTypes.number.isRequired,
    paddingY: PropTypes.number.isRequired,
  }

  static defaultProps = {
    showLabel: false,
  }


  constructor(props) {
    super(props);
    this.state = {
      path: '',
      companyText: { x: 0, y: 0, textAlign: 'left' },
      valueText: { x: 0, y: 0, textAlign: 'left' },
      percentText: { x: 0, y: 0, textAlign: 'left' },
      point: { x: 0, y: 0 },
    };
  }

  componentWillMount() {
    const { startAngle, radius, paddingX, paddingY } = this.props;
    const path = this.getSlicePath(startAngle, radius, radius + paddingX, radius + paddingY);
    this.setState({ path: path.join(' ') });
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.isHover !== nextProps.isHover) {
      if (nextProps.isHover) {
        this.drawHover();
      } else {
        this.revertHover();
      }
    }
  }


  // 畫一個單片的path command
  getSlicePath(startAngle, radius, centerX, centerY) {
    const { angle, paddingX, paddingY } = this.props;
    const path = [];
    // 計算slice的座標
    const coord = getAnglePoint(startAngle, startAngle + angle, radius, centerX, centerY);
    // 先到中心點
    path.push(`M${centerX},${centerY}`);
    // 先畫一個半徑
    path.push(`L${coord.x1},${coord.y1}`);
    // 畫弧惹...
    path.push(`A${radius},${radius},${0},${angle > 180 ? 1 : 0},${1},${coord.x2},${coord.y2}`);
    // 畫完收工
    path.push('Z');
    return path;
  }


  // 單片要往外推、出現折線
  drawHover = () => {
    const { angle, startAngle, radius, paddingX, paddingY } = this.props;
    const lineLength = 90;
    const lineHeight = 40;
    const hoverPadding = 15;
    const hoverZoom = 20;
    const isRight = (startAngle + angle / 2 <= 90 || startAngle + angle / 2 >= 270);

    // 重新計算往外推移的中心點
    const hoverCenter = getAnglePoint(
      startAngle + (angle / 2),
      startAngle + (angle / 2),
      hoverPadding,
      radius + paddingX,
      radius + paddingY);

    // 放大的餅
    const path = this.getSlicePath(
      startAngle,
      radius + hoverZoom,
      hoverCenter.x1,
      hoverCenter.y1);

      // 折線的起點
    const lineStart = getAnglePoint(
      startAngle + (angle / 2),
      startAngle + (angle / 2),
      radius + hoverZoom,
      hoverCenter.x1,
      hoverCenter.y1);
    // 折線轉彎處
    const lineCorner = getAnglePoint(
      startAngle + (angle / 2),
      startAngle + (angle / 2),
      radius + lineHeight,
      hoverCenter.x1,
      hoverCenter.y1);

    // 折線終點
    const lineEnd = {
      x: (isRight ? lineCorner.x1 + lineLength : lineCorner.x1 - lineLength),
      y: lineCorner.y1
    };

    // 公司名稱
    const companyText = {
      x: isRight ? lineEnd.x - 80 : lineEnd.x,
      y: lineEnd.y - 10,
      textAlign: isRight ? 'right' : 'left',
    };

    // 金額
    const valueText = {
      x: isRight ? lineEnd.x - 70 : lineEnd.x,
      y: lineEnd.y + 25,
      textAlign: 'left',
    };

    // 百分比
    const percentText = {
      x: isRight ? lineEnd.x - 10 : lineEnd.x + 70,
      y: lineEnd.y + 25,
      textAlign: 'right',
    };

    // 畫出折線
    const polyline = [];
    polyline.push(`${lineStart.x1}, ${lineStart.y1}`); // 起點
    polyline.push(`${lineCorner.x1}, ${lineCorner.y1}`); // 轉折
    polyline.push(`${lineEnd.x}, ${lineEnd.y}`); // 終點

    this.setState({
      path: path.join(' '),
      linePath: polyline.join(', '),
      point: { x: lineEnd.x, y: lineEnd.y },
      companyText,
      valueText,
      percentText,
    });
  }

  revertHover = () => {
    const { radius, startAngle, paddingX, paddingY } = this.props;
    // 恢復原狀的餅
    const path = this.getSlicePath(startAngle, radius, radius + paddingX, radius + paddingY);
    this.setState({
      path: path.join(' '),
    });
  }

  handleMouseEnter = (e) => {
    this.props.onHover(this.props.slicedata.index);
  }

  render() {
    const { fill, stroke, strokeWidth, percentValue,
      slicedata, isHover } = this.props;
    const { path, linePath, companyText, point, valueText, percentText } = this.state;
    return (
      <g overflow="hidden">
        <path
          d={path}
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          onMouseEnter={this.handleMouseEnter}
        />
        { isHover &&
          <Fragment>
            <polyline
              points={linePath}
              style={{
                fill: 'none',
                stroke: '#7c90a9',
                strokeWidth: 1
              }}
            />
            <circle cx={point.x} cy={point.y} r="2" stroke="#7c90a9" strokeWidth="3" fill="#7c90a9" />
            <text
              x={companyText.x}
              y={companyText.y}
              fill="#939393"
              textAnchor={companyText.textAlign}
            >
              {slicedata.data.label}
            </text>
            <text
              x={valueText.x}
              y={valueText.y}
              fill="#333"
              textAnchor={valueText.textAlign}
              fontSize={14}
            >
            ${comma(slicedata.data.value)}
            </text>
            <text
              x={percentText.x}
              y={String(slicedata.data.value).length >= 8 ? percentText.y + 15 : percentText.y}
              fill="#939393"
              textAnchor={percentText.textAlign}
              fontSize={14}
            >
              {slicedata.data.percentage}%
            </text>
          </Fragment>
        }
      </g>
    );
  }
}
