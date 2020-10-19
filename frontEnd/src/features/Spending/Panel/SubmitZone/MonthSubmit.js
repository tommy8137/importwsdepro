import React, { Component } from 'react';

import styled from 'styled-components';

import Radio from '~~elements/Radio';

import ResetButton from './ResetButton';
import AnalysisButton from './AnalysisButton';
import { SubmitCardDiv } from './SubmitStyles';


export default class MonthSubmit extends Component {
  render() {
    const { vendorCategory, vendorCategoryOptions } = this.props.monthSubmitData;
    return (
      <SubmitCardDiv className="submit--card">
        <div className="submit--card--radio-group">
          {vendorCategoryOptions.map(item => {
            return (
              <div className="submit--card--radio-group--radio" key={item.value}>
                <Radio
                  name="vendorCategory"
                  value={item.value}
                  onChange={() => this.props.updateMonthSubmitData('vendorCategory', item)}
                  checked={vendorCategory.value === item.value}
                >
                  {item.label}
                </Radio>
              </div>
            );
          })}
        </div>
        <div className="submit--card--horizontal-seperatate-line" />
        <div className="submit--card--submit-zone">
          <ResetButton onClick={this.props.onReset} />
          <AnalysisButton
            className={this.props.canAnalysisFn() ? 'analysis-btn' : 'analysis-btn disabled'}
            onClick={this.props.canAnalysisFn() ? () => this.props.onSure() : () => {}}
          />
        </div>
      </SubmitCardDiv>
    );
  }
}
