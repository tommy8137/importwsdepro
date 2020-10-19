import React, { Component } from 'react';

import styled from 'styled-components';

import Radio from '~~elements/Radio';

import ResetButton from './ResetButton';
import AnalysisButton from './AnalysisButton';

import { SubmitCardDiv } from './SubmitStyles';


export default class WaterfallSubmit extends Component {
  render() {
    const { category, measure, categoryOptions, measureOptions } = this.props.waterfallSubmitData;
    return (
      <SubmitCardDiv className="submit--card">
        <div className="submit--card--radio-group">
          {categoryOptions.map(item => {
            return (
              <div className="submit--card--radio-group--radio" key={item.value}>
                <Radio
                  name="category"
                  value={item.value}
                  onChange={() => this.props.updateWaterfallSubmitData('category', item)}
                  checked={category.value === item.value}
                >
                  {item.label}
                </Radio>
              </div>
            );
          })}
        </div>
        <div className="submit--card--horizontal-seperatate-line" />

        <div className="submit--card--radio-group">
          {measureOptions.map(item => {
            return (
              <div className="submit--card--radio-group--radio" key={item.value}>
                <Radio
                  name="measure"
                  value={item.value}
                  onChange={() => this.props.updateWaterfallSubmitData('measure', item)}
                  checked={measure.value === item.value}
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
