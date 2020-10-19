import * as R from 'ramda';
import uuid from 'uuid';
import FileSaver from 'file-saver';
import CommonUtils from '~~utils/CommonUtils';


export const actionPrefix = 'SPENDING_PANEL_WATERFALL___';
export const actionTypes = {
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_TYPES').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_SELECTED_TYPES').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_SUPPLY_TYPE').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_WATERFALL_ANALYSIS').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_MONTH_ANALYSIS').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_WATERFALL_SUBMIT_DATA').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'SET_DEFAULT_TYPES_RELATED__OPTIONS').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'INIT_ACTION').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_RAW_REPORT').template,
  ...CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_SUMMARY_REPORT').template,
  [`${actionPrefix}UPDATE_TYPE1_SELECTED_OPTIONS`]: `${actionPrefix}UPDATE_TYPE1_SELECTED_OPTIONS`,
  [`${actionPrefix}UPDATE_TYPE2_SELECTED_OPTIONS`]: `${actionPrefix}UPDATE_TYPE2_SELECTED_OPTIONS`,
  [`${actionPrefix}UPDATE_SUPPLY_TYPE_SELECTED_OPTIONS`]: `${actionPrefix}UPDATE_SUPPLY_TYPE_SELECTED_OPTIONS`,
  [`${actionPrefix}UPDATE_DATES`]: `${actionPrefix}UPDATE_DATES`,
  [`${actionPrefix}RESET_PANEL`]: `${actionPrefix}RESET_PANEL`,
  [`${actionPrefix}UPDATE_MONTH_SUBMIT_DATA`]: `${actionPrefix}UPDATE_MONTH_SUBMIT_DATA`,
  [`${actionPrefix}TOGGLE_WATERFALL_CHART_MODAL`]: `${actionPrefix}TOGGLE_WATERFALL_CHART_MODAL`,
  [`${actionPrefix}TOGGLE_MONTH_CHART_MODAL`]: `${actionPrefix}TOGGLE_MONTH_CHART_MODAL`,
  [`${actionPrefix}RESET_TYPE_OPTIONS`]: `${actionPrefix}RESET_TYPE_OPTIONS`,
  [`${actionPrefix}TOGGLE_FIRST_TIME`]: `${actionPrefix}TOGGLE_FIRST_TIME`,
};

export function toggleFirstTime(status) {
  return {
    type: actionTypes[`${actionPrefix}TOGGLE_FIRST_TIME`],
    status
  };
}

export function resetTypeOptions() {
  return {
    type: actionTypes[`${actionPrefix}RESET_TYPE_OPTIONS`]
  };
}


export function initAction() {
  return {
    type: actionTypes[`${actionPrefix}INIT_ACTION`]
  };
}

// 根據plantList和sourcerList取得type1 和 type2
export function getTypes(typeList) {
  return {
    type: CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_TYPES').BASE,
    typeList
  };
}


/**
 小記：
 type1在type2上面，type2選幾個都不會影響type1可以選的選項和已經選的選項
 但是type1的選擇會影響type2可以選的選項和已經選的選項
 */

export function updateType1SelectedOptions(selectedItemList) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_TYPE1_SELECTED_OPTIONS`],
    selectedType1List: selectedItemList,
  };
}

export function updateType2SelectedOptions(selectedItemList) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_TYPE2_SELECTED_OPTIONS`],
    selectedType2List: selectedItemList,
  };
}

export function updateSupplyTypeSelectedOptions(selectedItemList) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_SUPPLY_TYPE_SELECTED_OPTIONS`],
    selectedSupplyTypeList: selectedItemList,
  };
}


export function getSupplyTypes() {
  return {
    type: actionTypes[`${actionPrefix}GET_SUPPLY_TYPE`],
  };
}


export function updateDates(dates) {
  // console.log('來了', dates);
  const { startDate, endDate } = dates;
  return {
    type: actionTypes[`${actionPrefix}UPDATE_DATES`],
    startDate,
    endDate,
  };
}


export function resetPanel() {
  return {
    type: actionTypes[`${actionPrefix}RESET_PANEL`],
  };
}


export function updateWaterfallSubmitData(key, value) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_WATERFALL_SUBMIT_DATA`],
    key,
    value
  };
}


export function getWaterfallAnalysis() {
  return {
    type: actionTypes[`${actionPrefix}GET_WATERFALL_ANALYSIS`],
  };
}

// 幫他自動全選plant, sourcer, type1, type2
export function setDefaultTypesRelatedOptions() {
  return {
    type: actionTypes[`${actionPrefix}SET_DEFAULT_TYPES_RELATED__OPTIONS`],
  };
}


// 取得圓餅圖結果
export function getMonthAnalysis() {
  return {
    type: actionTypes[`${actionPrefix}GET_MONTH_ANALYSIS`],
  };
}


// 更新選項
export function updateMonthSubmitData(key, value) {
  return {
    type: actionTypes[`${actionPrefix}UPDATE_MONTH_SUBMIT_DATA`],
    key,
    value
  };
}


export function toggleWaterfallChartModal() {
  return {
    type: actionTypes[`${actionPrefix}TOGGLE_WATERFALL_CHART_MODAL`],
  };
}

export function toggleMonthChartModal() {
  return {
    type: actionTypes[`${actionPrefix}TOGGLE_MONTH_CHART_MODAL`],
  };
}


/**
 * 下載raw data報表
 */
export function downloadRawReport(querydata) {
  return {
    type: CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_RAW_REPORT').BASE,
    querydata
  };
}

export function downloadRawReportSuccess(response) {
  // 檔名的取得 要靠後端
  const { 'content-type': type, 'content-disposition': disposition } = response.headers;
  const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
  const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : 'Spending_raw.zip';
  FileSaver.saveAs(
    new Blob([response.data], { type }),
    filename
  );

  return {
    type: CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_RAW_REPORT').SUCCESS,
    response
  };
}

export function downloadRawReportFailed(error) {
  return {
    type: CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_RAW_REPORT').FAILED,
    error
  };
}


/**
 * 下載summary report報表
 */
export function downloadSummaryReport(querydata) {
  return {
    type: CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_SUMMARY_REPORT').BASE,
    querydata
  };
}

export function downloadSummaryReportSuccess(response) {
  // 檔名的取得 要靠後端
  const { 'content-type': type, 'content-disposition': disposition } = response.headers;
  const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
  const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : 'Spending_sum.xlsx';
  FileSaver.saveAs(
    new Blob([response.data], { type }),
    filename
  );

  return {
    type: CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_SUMMARY_REPORT').SUCCESS,
    response
  };
}

export function downloadSummaryReportFailed(error) {
  return {
    type: CommonUtils.getTemplateActionTypes(actionPrefix, 'DOWNLOAD_SUMMARY_REPORT').FAILED,
    error
  };
}

