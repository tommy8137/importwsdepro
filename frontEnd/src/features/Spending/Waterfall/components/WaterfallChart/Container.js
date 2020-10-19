import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Waterfall from './WaterfallChart';


const Box = styled.div`
  width: 100%;
  height: 100%;
`;
export default class Container extends Component {
  static propTypes = {
    data: PropTypes.shape().isRequired,
    valueKey: PropTypes.string.isRequired,
    isNoData: PropTypes.bool.isRequired,
    onRetry: PropTypes.func.isRequired,
  }

  render() {
    const { isNoData, valueKey, data: { category, requestData, waterfall }, onRetry } = this.props;
    // const pie = d3.pie().value(d => d[valueKey])(data);
    return (
      <Box>
        <Waterfall
          isNoData={isNoData}
          category={category}
          requestData={requestData}
          data={waterfall}
          valueKey={valueKey}
          height={560}
          width={1088}
          onRetry={onRetry}
        />
      </Box>
    );
  }
}
