import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remove from 'lodash/remove';
import _get from 'lodash/get';
import NoData from './NoData';
import Row from './Row';
import FixHeader from './ChartHeader';

const Div = styled.div`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  &.svg-waterfall {
    background-color: #F7F7F7;
  }
  .svgbox {
    height: ${props => props.height - 60}px;
    width: ${props => props.width}px;
    overflow-y: scroll;
    overflow-x: hidden;
    /* width */
    ::-webkit-scrollbar {
      width: 6px;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #939393;
        border-radius: 10px;
    }
    svg {
      transform: translateY(-74px);
    }
  }
`;

const Text = styled.text`
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC|Roboto');
  font-family: 'Roboto', 'Noto Sans TC', sans-serif;
  text {
    font-family: 'Roboto';
    font-weight: normal;
  }
  font-size: 12px;
  fill: #333;
  .thousand {
    fill: #333;
    opacity: 0.5;
  }
`;

export default class WaterfallChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    requestData: PropTypes.shape().isRequired,
    valueKey: PropTypes.string.isRequired,
    isNoData: PropTypes.bool.isRequired,
    onRetry: PropTypes.func.isRequired,
  }

  render() {
    const { isNoData, width, height, data, category, requestData: { dateFrom: from, dateTo: to, measure }, valueKey, onRetry } = this.props;
    const puredata = [...data];
    const totaldata = remove(puredata, o => String(_get(o, 'category', '')).toUpperCase() === 'TOTAL');
    const total = puredata.reduce((value, current) => value + current[valueKey], 0);
    let start = 0;
    const arrangeData = puredata.map((d, idx) => {
      start += idx > 0 ? puredata[idx - 1][valueKey] : 0;
      return {
        ...d,
        total,
        start: start / total,
        share: d[valueKey] / total,
      };
    });

    return (
      <Div width={width} height={height}>
        <FixHeader {...this.props} />
        <div className="svgbox">
          <svg
            className="svg-waterfall"
            width={width}
            height={isNoData ? 560 : (data.length + 1.5) * 60}
            viewport={`0 0 ${width} ${isNoData ? 560 : (data.length + 1) * 60}`}
            viewBox={`0 0 ${width} ${isNoData ? 560 : (data.length + 1) * 60}`}
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            {/* 表頭 */}
            <g>
              <Text y="36" x="30">{category}</Text>
              <Text y="36" x="160">
                {from} - {to}
              </Text>
              {measure === 'amount' && <Text className="thousand" y="36" x="430">$ thousand</Text>}
              <Text y="36" x="788">Share of spend</Text>
              <Text y="36" x="888"># of P/N</Text>
              <Text y="36" x="988"># of Suppliers</Text>
            </g>
            {/* 分隔線 */}
            <line x1={0} x2={width} y1={58} y2={58} stroke="#cccccc" strokeWidth={1} />
            {/* 內容 */}
            {!isNoData ?
          (
            <g>
              {arrangeData.map((d, idx) => (
                <g key={idx} transform={`translate(0,${(idx + 1) * 60})`}>
                  <Row data={d} valueKey={valueKey} />
                </g>)
              )}
              {/* total */}
              <g transform={`translate(0,${(arrangeData.length + 1) * 60})`}>
                <Row data={{ ...totaldata[0], share: 1, start: 0 }} valueKey={valueKey} />
              </g>
            </g>
          ) :
            <NoData onRetry={onRetry} />
        }
          </svg>
        </div>
      </Div>
    );
  }
}
