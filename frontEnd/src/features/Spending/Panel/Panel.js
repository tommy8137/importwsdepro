import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as LoadingActions from '~~redux/Loading/LoadingActions';
import checkingRbac from '~~hoc/CheckingRbac';

import PlantSourcerSelectorSection from './PlantSourcerSelector/PlantSourcerSelectorSection';
import BaseCheckboxSelector from './BaseCheckboxSelector';
import MonthPicker from './MonthPicker';
import MonthSubmit from './SubmitZone/MonthSubmit';
import WaterFallSubmit from './SubmitZone/WaterFallSubmit';
import * as PanelActions from './PanelActions';
import * as PlantSourcerSelectorActions from './PlantSourcerSelector/PlantSourcerSelectorActions';

import { PanelDiv } from './PanelStyles';
import WaterfallChartModal from '../Waterfall/WaterfallChartModal';
import MonthChartModal from '../Month/MonthChartModal';

const allowList = [
  ['List', 'allow', 'dashboard']
];
@checkingRbac(allowList)
@connect(
  (state) => {
    /* 分析鈕可以按的情況:
      1. plant一定要選一個
      2. sourcer一定要選一個
      3. 日期一定要選 from to
      4. type1一定要選
      5. type2可以不選
      6. supply type可以不選
      7. None, Manufacturer, Vendor 三選一
      8. Amount, GR-Qty三選一
    */

    const canAnalysisFn = () => {
      const { selectedPlantCodeList, selectedSourcerCodeList } = state.plantSourcerSelector;
      if (selectedPlantCodeList.length === 0 || selectedSourcerCodeList.length === 0) {
        return false;
      }
      const { selectedType1List, startDate, endDate } = state.spendingPanel;
      if (selectedType1List.length === 0) {
        return false;
      }
      if (!startDate || !endDate) {
        return false;
      }
      return true;
    };
    return {
      filterTypeList: state.spendingPanel.filterTypeList,
      selectedType1List: state.spendingPanel.selectedType1List,
      selectedType2List: state.spendingPanel.selectedType2List,
      type1OptionsList: state.spendingPanel.type1OptionsList,
      type2OptionsList: state.spendingPanel.type2OptionsList,

      supplyTypeOptionsList: state.spendingPanel.supplyTypeOptionsList,
      selectedSupplyTypeList: state.spendingPanel.selectedSupplyTypeList,
      startDate: state.spendingPanel.startDate,
      endDate: state.spendingPanel.endDate,
      maximumDate: state.spendingPanel.maximumDate,
      minimumDate: state.spendingPanel.minimumDate,
      waterfallSubmitData: state.spendingPanel.waterfallSubmitData,
      monthSubmitData: state.spendingPanel.monthSubmitData,

      waterfallChartModal: state.spendingPanel.waterfallChartModal,
      monthChartModal: state.spendingPanel.monthChartModal,

      selectedPlantCodeList: state.plantSourcerSelector.selectedPlantCodeList,
      selectedFilteredBgList: state.plantSourcerSelector.selectedFilteredBgList,
      canMonthAnalysisFn: canAnalysisFn,
      canWaterfallAnalysisFn: canAnalysisFn,
    };
  },
  {
    initAction: PanelActions.initAction,
    updateType1SelectedOptions: PanelActions.updateType1SelectedOptions,
    updateType2SelectedOptions: PanelActions.updateType2SelectedOptions,
    updateSupplyTypeSelectedOptions: PanelActions.updateSupplyTypeSelectedOptions,
    updateDates: PanelActions.updateDates,
    resetPanel: PanelActions.resetPanel,
    updateWaterfallSubmitData: PanelActions.updateWaterfallSubmitData,
    getWaterfallAnalysis: PanelActions.getWaterfallAnalysis,
    updateMonthSubmitData: PanelActions.updateMonthSubmitData,
    getMonthAnalysis: PanelActions.getMonthAnalysis,
    toggleWaterfallChartModal: PanelActions.toggleWaterfallChartModal,
    toggleMonthChartModal: PanelActions.toggleMonthChartModal,
    PlantSourcerSelectorResetPanel: PlantSourcerSelectorActions.resetPanel,
    getPlants: PlantSourcerSelectorActions.getPlants,
    getSourcers: PlantSourcerSelectorActions.getSourcers,
    toggleLoadingStatus: LoadingActions.toggleLoadingStatus
  }
)
export default class Panel extends Component {
  state = {
    showDatePicker: true
  }
  componentDidMount() {
    // 取得供應商列表 取得plants 取得採購
    this.props.initAction();
  }
  componentWillUnmount() {
    this.handleReset();
  }

  handleReset = () => {
    // 清空panel所有的資料 要清兩個地方
    this.props.resetPanel();
    this.props.PlantSourcerSelectorResetPanel();
    this.setState(() => ({
      showDatePicker: false
    }), () => {
      this.setState({
        showDatePicker: true
      });
    });
  }

  render() {
    return (
      <PanelDiv className="spending--panel">
        <div className="flex-3">
          <PlantSourcerSelectorSection />
        </div>
        <div className="flex-2 spending--panel--select" >
          <div className="mb1">
            {this.state.showDatePicker ? <MonthPicker
              onDatesChange={this.props.updateDates}
              // disabled={false}
              // defaultStartDate={null}
              // defaultEndDate={null}
              // defaultDisabledDays={{
              //   before: moment(new Date()).add(-3, 'years').toDate(),
              //   after: moment(new Date()).toDate(),
              // }}
              startDate={this.props.startDate}
              endDate={this.props.endDate}
              minDate={moment().add(-3, 'years').startOf('month').toDate()}
              maxDate={moment().startOf('month').subtract(1, 'day').toDate()}
            /> : null}
          </div>
          <div className="mb1">
            <BaseCheckboxSelector
              title="TYPE I"
              options={this.props.type1OptionsList}
              selectedOptions={this.props.selectedType1List}
              updateSelectedOptions={this.props.updateType1SelectedOptions}
              showSelectHelper={true}
            />
          </div>
          <div className="mb1">
            <BaseCheckboxSelector
              title="TYPE II"
              options={this.props.type2OptionsList.filter(i => i.value !== null)}
              selectedOptions={this.props.selectedType2List}
              updateSelectedOptions={this.props.updateType2SelectedOptions}
              showSelectHelper={true}
            />
          </div>
          <div className="mb1">
            <BaseCheckboxSelector
              title="SUPPLY TYPE"
              options={this.props.supplyTypeOptionsList}
              selectedOptions={this.props.selectedSupplyTypeList}
              updateSelectedOptions={this.props.updateSupplyTypeSelectedOptions}
              showSelectHelper={false}
            />

          </div>
          {this.props.feature === 'waterfall' ?
            <WaterFallSubmit
              waterfallSubmitData={this.props.waterfallSubmitData}
              updateWaterfallSubmitData={this.props.updateWaterfallSubmitData}
              onReset={this.handleReset}
              onSure={this.props.getWaterfallAnalysis}
              canAnalysisFn={this.props.canWaterfallAnalysisFn}
            /> : <div />
          }
          {this.props.feature === 'month' ?
            <MonthSubmit
              monthSubmitData={this.props.monthSubmitData}
              updateMonthSubmitData={this.props.updateMonthSubmitData}
              onReset={this.handleReset}
              onSure={this.props.getMonthAnalysis}
              canAnalysisFn={this.props.canMonthAnalysisFn}
            /> : <div />}
        </div>
        {
          this.props.waterfallChartModal ?
            <WaterfallChartModal
              modal={this.props.waterfallChartModal}
              onClose={this.props.toggleWaterfallChartModal}
            /> : <div />
        }
        {
          this.props.monthChartModal ?
            <MonthChartModal
              modal={this.props.monthChartModal}
              onClose={this.props.toggleMonthChartModal}
            /> : <div />
        }

      </PanelDiv >
    );
  }
}
