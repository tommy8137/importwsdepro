import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import Button from '~~elements/Button';
import Icon from '~~elements/Icon';
import { comma } from '~~utils/Math';
import checkingRbac from '~~hoc/CheckingRbac';
import * as CalculatorActions from './CalculatorActions';
import CalculatorItem from './CalculatorItem';
import CalculatorUtils from './CalculatorUtils';
import styles from './CalculatorListStyles';


const allowList = [
  ['Edit', 'allow', 'cleansheet.me.cal.thermal-module']
];

@connect(
  (state) => {
    const thermalCalculators = CalculatorUtils.calculatorList.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.value]: state.calculator[curr.value]
      };
    }, {});
    return {
      calculatorList: state.calculator.calculatorList,
      thermalStore: state.calculator.thermalStore,
      thermalConfig: state.calculator.thermalConfig,
      thermalCalculatorTotal: state.calculator.thermalCalculatorTotal,
      ...thermalCalculators
    };
  },
  {
    getThermalConfigs: CalculatorActions.getThermalConfigs,
    updateThermalCalculatorTabsByName: CalculatorActions.updateThermalCalculatorTabsByName,
    exportReport: CalculatorActions.exportReport,
    resetData: CalculatorActions.resetData,
  }
)

@checkingRbac(allowList)

export default class CalculatorList extends Component {
  componentDidMount() {
    this.props.getThermalConfigs();
  }

  componentWillUnmount() {
    this.props.resetData();
  }

  handleExport = () => {
    console.log('handleExport');
    this.props.exportReport();
  }
  renderList = () => {
    return this.props.thermalConfig.map(config => {
      return (
        <Col xs={12} sm={6} md={6} lg={4} key={config.label}>
          <CalculatorItem
            calculatorConfig={config}
            updateThermalCalculatorTabsByName={this.props.updateThermalCalculatorTabsByName}
            tabs={this.props[config.uniqKey]}
            key={config.uniqKey}
          />
        </Col>
      );
    });
  }

  render() {
    return (
      <styles.Wrapper className="calculator">
        <div className="calculator--header">
          <div>
            <span className="calculator--header-total-title">TOTAL </span>
            <span className="calculator--header-total-number">$ {comma(this.props.thermalCalculatorTotal)}</span>
          </div>
          <div>
            <Button
              className="calculator--header-export-btn"
              border={true}
              color="white"
              onClick={this.handleExport}
            >
              <Icon className="calculator--header-export-btn-icon" icon="IcoExport" />
              EXPORT...
            </Button>
          </div>
        </div>

        <div className="calculator--content">
          <Row>
            {this.renderList()}
          </Row>
        </div>

      </styles.Wrapper>
    );
  }
}
