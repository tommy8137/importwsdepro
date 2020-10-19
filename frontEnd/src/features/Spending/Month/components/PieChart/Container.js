import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import random from 'lodash/random';
import styled from 'styled-components';

import Pie from './Pie';
// TODO: animation if everything is ok...
const Box = styled.div`
  width: 1088px;
  height: 620px;
`;
export default class Container extends Component {
  static propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
    query: PropTypes.shape(),
    valueKey: PropTypes.string.isRequired,
    isNoData: PropTypes.bool.isRequired,
    onRetry: PropTypes.func.isRequired,
  }

  static defaultProps = {
    height: 600,
    width: 1088,
    data: null,
    query: null,
  }


  render() {
    // const interpolate = d3.interpolateRgb('#008f84', '#ffec9b');
    const interpolate = ['#008f84', '#00a99d', '#17c2b5', '#2fdace', '#6feae1',
      '#ffec9b', '#ffdc47', '#f5c910', '#f5b010', '#e7a100'];
    const { height, width, data, valueKey, query, isNoData, onRetry } = this.props;
    const pie = d3.pie().value(d => d[valueKey])(data);
    return (
      <Box>
        <Pie
          width={width}
          height={height}
          data={pie}
          query={query}
          radius={180}
          hole={0}
          interpolate={interpolate}
          labels={true}
          percent={true}
          strokeWidth={0.25}
          stroke="rgba(255,255,255, .2)"
          paddingX={150}
          paddingY={90}
          isNoData={isNoData}
          onRetry={onRetry}
        />
      </Box>
    );
  }
}
