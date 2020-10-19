import React, { Component } from 'react';
import { select as d3select } from 'd3-selection';
import { Button } from 'reactstrap';
import moment from 'moment';
import saver from 'save-svg-as-png';
import { connect } from 'react-redux';
import _get from 'lodash/get';

import fakedata from '~~apis/fakeData/fakeWaterfallAnalysisResult.json';
import Clickoutside from '~~elements/Clickoutside';
import Icon from '~~elements/Icon';
import ChartModalBase from '../Panel/ChartModal/ChartModalBase';
import ContentBox from './components/CurrencySwitchStyle';
import Container from './components/WaterfallChart';
import * as PanelActions from '../Panel/PanelActions';

@connect(
  (state) => ({
    data: state.spendingPanel.waterfallDataChartData,
    // data: fakedata,
  }),
  {
    downloadRawReport: PanelActions.downloadRawReport,
    downloadSummaryReport: PanelActions.downloadSummaryReport,
  }
)
export default class WaterfallChartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountKey: 'USDAmount',
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
    const svg = d3select('.svg-waterfall').node();
    saver.saveSvgAsPng(svg, `Spending_${moment().format('YYMMDD')}.png`, { backgroundColor: '#f7f7f7' });
  }

  handleChangeCurrency = (amountKey) => {
    this.setState({
      amountKey
    });
  }
  render() {
    const { toggle } = this.state;
    const { data, data: { requestData: query }, downloadRawReport, downloadSummaryReport, getWaterfallAnalysis } = this.props;
    const measure = _get(data, ['requestData', 'measure'], '');
    const amountKey = measure === 'amount' ? this.state.amountKey : 'quantity';
    const isNoData = _get(data, 'waterfall', []).length === 0;
    return (
      <ChartModalBase
        onClose={this.props.onClose}
        modal={this.props.modal}
      >
        <ContentBox>
          <div className="tabs-panel">
            {/* 幣別選擇 */}
            <div className={`tabs ${measure !== 'amount' && 'hide'}`}>
              <div
                className={`tab ${amountKey === 'USDAmount' ? 'active' : ''}`}
                onClick={() => this.handleChangeCurrency('USDAmount')}
                onKeyDown={null}
              >
                USD
              </div>
              <div
                className={`tab ${amountKey === 'NTDAmount' ? 'active' : ''}`}
                onClick={() => this.handleChangeCurrency('NTDAmount')}
                onKeyDown={null}
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
                  <div onClick={this.saveSvg} onKeyDown={null}>Waterfall Chart</div>
                  <div onClick={() => downloadSummaryReport(query)} onKeyDown={null}>Summary Report</div>
                  <div onClick={() => downloadRawReport(query)} onKeyDown={null}>Raw Data</div>
                </div>
              </Button>
            </Clickoutside>
          </div>
          <div className="chart">
            <Container
              data={data}
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
