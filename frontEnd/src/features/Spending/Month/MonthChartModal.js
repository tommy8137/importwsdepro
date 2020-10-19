import React, { Component } from 'react';
import { select as d3select } from 'd3-selection';
import saver from 'save-svg-as-png';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import moment from 'moment';
import _get from 'lodash/get';

import fakedata from '~~apis/fakeData/fakeMonthAnalysisResult.json';
import Clickoutside from '~~elements/Clickoutside';
import Icon from '~~elements/Icon';
import ChartModalBase from '../Panel/ChartModal/ChartModalBase';
import ContentBox from './components/CurrencySwitchStyle';
import Container from './components/PieChart';
import * as PanelActions from '../Panel/PanelActions';

@connect(
  (state) => ({
    monthChartData: state.spendingPanel.monthChartData,
    // monthChartData: fakedata,
  }),
  {
    downloadRawReport: PanelActions.downloadRawReport,
    downloadSummaryReport: PanelActions.downloadSummaryReport,
  }
)
export default class MonthChartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountKey: 'amountUSD',
      toggle: false,
    };
  }
  toggleDropdown = () => {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  hideDropdown = () => {
    this.setState({
      toggle: false,
    });
  }

  saveSvg = () => {
    const svg = d3select('.svg-pie').node();
    saver.saveSvgAsPng(svg, `Spending_${moment().format('YYMMDD')}.png`, { backgroundColor: '#f7f7f7' });
  }

  render() {
    const { monthChartData, downloadRawReport, downloadSummaryReport, getMonthAnalysis } = this.props;
    const { data, query } = monthChartData;
    const { amountKey, toggle } = this.state;
    // 整理資料
    const piedata = data.map((elm) => ({
      ...elm,
      label: elm.name,
      value: elm[amountKey]
    }));
    const isNoData = _get(monthChartData, 'data', []).length === 0;
    return (
      <ChartModalBase
        onClose={this.props.onClose}
        modal={this.props.modal}
      >
        <ContentBox>
          <div className="tabs-panel">
            <div className="tabs">
              <div
                className={`tab ${amountKey === 'amountUSD' ? 'active' : ''}`}
                onClick={() => this.setState({ amountKey: 'amountUSD' })}
                onKeyPress={() => {}}
              >
              USD
              </div>
              <div
                className={`tab ${amountKey === 'amountNTD' ? 'active' : ''}`}
                onClick={() => this.setState({ amountKey: 'amountNTD' })}
                onKeyPress={() => {}}
              >
              NTD
              </div>
            </div>
            {/* EXPORT的按鈕 */}
            <Clickoutside handleBlur={this.hideDropdown}>
              <Button
                className={`btn-export ${toggle ? 'drop' : ''}`}
                onClick={this.toggleDropdown}
                disabled={isNoData}
              >
                <Icon className="icon" icon="IcoExport" />
              EXPORT...
                <div className={`options ${toggle ? 'active' : ''}`}>
                  <div className="divider" />
                  <div onClick={this.saveSvg} onKeyDown={null}>Month of Chart</div>
                  <div onClick={() => downloadSummaryReport(query)} onKeyDown={null}>Summary Report</div>
                  <div onClick={() => downloadRawReport(query)} onKeyDown={null}>Raw Data</div>
                </div>
              </Button>
            </Clickoutside>
          </div>
          <div className="chart">
            <Container
              data={piedata}
              query={query}
              valueKey={amountKey}
              isNoData={isNoData}
              onRetry={this.props.onClose}
            />
          </div>
        </ContentBox>
      </ChartModalBase>
    );
  }
}
