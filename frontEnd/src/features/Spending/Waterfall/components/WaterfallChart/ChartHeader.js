import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Box = styled.div`
  border-bottom: 1px solid #ccc;
  /* position: absolute; */
  height: 59px;
  width: ${props => props.width}px;
  display: flex;
  flex-direction: row;
  & div {
    font-size: 12px;
    color: #333;
    align-self: center;
    :first-of-type{
      width: 170px;
      padding-left: 20px;
    }
    :nth-of-type(2){
      width: 615px;
      span {
        opacity: .5;
        margin-left: 26px;
      }
    }
    :nth-of-type(3), :nth-of-type(4) {
      width: 90px;
      text-align: center;
    }
    :last-of-type {
      width: 120px;
      padding-right: 20px;
    }
  }
`;

export default class ChartHeader extends Component {
  static propTypes = {
    category: PropTypes.string,
    requestData: PropTypes.shape(),
  }

  static defaultProps = {
    category: PropTypes.string,
    requestData: {},
  }


  render() {
    const { width, category, requestData: { dateFrom: from, dateTo: to, measure } } = this.props;
    return (
      <Box width={width}>
        <div>{category}</div>
        <div>
          {from} - {to}
          {measure === 'amount' && <span>$ thousand</span>}
        </div>
        <div>Share of spend</div>
        <div># of P/N</div>
        <div># of Suppliers</div>
      </Box>
    );
  }
}
