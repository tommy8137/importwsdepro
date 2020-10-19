import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import { push } from 'connected-react-router';

import * as XrayActions from '~~features/XRay/XrayActions';


const NodataContainer = styled.div`
  padding: 10%;
  text-align: center;
  label {
    display:block;
    width: 100%;
  }
  .icon {
    display: block;
    width: 400px;
    max-width: 100%;
    margin: 0 auto;
  }
`;

@connect(
  (state) => {
    return {
      lppData: state.xray.lppData,
      lppChart: state.xray.lppChart,
    };
  },
  {
    setLppChartAction: XrayActions.setLppChart,
    goToRouter: push
  }
)

export default class NodataComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    this.props.goToRouter('/s/xRay');
  }
  render() {
    return (
      <NodataContainer className="no-data">
        <Icon icon={IconName.IcoNoData} />
        <Button
          className="try"
          color="black"
          border={false}
          onClick={this.handleClick}
        >
          <span>TRY AGAIN</span>
        </Button>
      </NodataContainer>
    );
  }
}
