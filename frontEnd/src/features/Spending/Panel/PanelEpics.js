import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, zip } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay, switchMap, take } from 'rxjs/operators';
import * as R from 'ramda';
import moment from 'moment';

import CommonUtils from '~~utils/CommonUtils';
import Resource from '~~apis/resource';

import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as PanelActions from './PanelActions';
import * as PlantSourcerSelectorActions from './PlantSourcerSelector/PlantSourcerSelectorActions';


export const initActionEpic = (action$, $state$) => {
  const {
    BASE: BASE_ACTION_TYPE,
    SUCCESS: SUCCESS_ACTION_TYPE,
    FAILED: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(PanelActions.actionPrefix, 'INIT_ACTION');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    switchMap((action) => {
      return concat(
        of(
          LoadingActions.toggleLoadingStatus(true),
          PlantSourcerSelectorActions.getPlants(),
          PlantSourcerSelectorActions.getSourcers(),
          PanelActions.getSupplyTypes()
        ),
        zip(
          action$.pipe(ofType(CommonUtils.getTemplateActionTypes(PlantSourcerSelectorActions.actionPrefix, 'GET_PLANTS').SUCCESS), take(1)),
          action$.pipe(ofType(CommonUtils.getTemplateActionTypes(PlantSourcerSelectorActions.actionPrefix, 'GET_SOURCERS').SUCCESS), take(1)),
          action$.pipe(ofType(CommonUtils.getTemplateActionTypes(PanelActions.actionPrefix, 'GET_SUPPLY_TYPE').SUCCESS), take(1))
        ).pipe(mapTo(LoadingActions.toggleLoadingStatus(false)))
      );
      // TODO 這裡還可以做一個強制停止的動作
    }) // .pipe(takeUntil(action$.pipe(ofType(`${PanelActions.actionPrefix}INIT_ACTION_FORCE_STOP`))))
  );
};


export const getSupplyTypesEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(PanelActions.actionPrefix, 'GET_SUPPLY_TYPE');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      return from(Resource.PanelResource.getSupplyTypes())
        .pipe(
          mergeMap(response => {
            const { supplyList } = response.data;
            return concat(
              of({
                type: SUCCESS_ACTION_TYPE,
                supplyTypeList: supplyList
              })
            );
          }),
          catchError(error => of({
            type: FAILED_ACTION_TYPE,
          }))
        );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


export const getWaterfallAnalysisEpic = (action$, state$) => {
  const {
    BASE: BASE_ACTION_TYPE,
    SUCCESS: SUCCESS_ACTION_TYPE,
    FAILED: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(PanelActions.actionPrefix, 'GET_WATERFALL_ANALYSIS');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { selectedPlantCodeList, selectedSourcerCodeList } = state$.value.plantSourcerSelector;
      const { startDate, endDate, selectedType1List, selectedType2List, selectedSupplyTypeList, waterfallSubmitData } = state$.value.spendingPanel;
      const consditionData = {
        plant: selectedPlantCodeList,
        user: selectedSourcerCodeList,
        dateFrom: moment(startDate).format('YYYY-MM-DD'),
        dateTo: moment(endDate).endOf('month').format('YYYY-MM-DD'),
        type1: selectedType1List.map(item => item.value),
        type2: selectedType2List.map(item => item.value),
        supplyType: selectedSupplyTypeList.map(item => item.value),
        category: waterfallSubmitData.category.value,
        measure: waterfallSubmitData.measure.value,
        // 特殊規則，如果是選擇GR-Qty 幣別就要帶none
        currency: waterfallSubmitData.measure.value === 'grQty' ? 'none' : waterfallSubmitData.currency.value
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PanelResource.getWaterfallAnalysis(consditionData))
          .pipe(
            mergeMap(response => {
              return concat(
                of({
                  type: SUCCESS_ACTION_TYPE,
                  data: response.data
                }),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              return concat(
                of({
                  type: FAILED_ACTION_TYPE,
                }),
                of(NotificationSystemActions.pushNotification({
                  message: '取得分析資料有誤，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


// 如果第一次進畫面，或是按了reset鍵後，先選了manufacturer 或vendor，就會把plant, sourcer, type1, type2全選
export const checkIsFirstTimeEpic = (action$, state$) => {
  return action$.pipe(
    ofType(
      PlantSourcerSelectorActions.actionTypes[`${PlantSourcerSelectorActions.actionPrefix}UPDATE_SELECTED_PLANT_OR_SOURCER`],
      PanelActions.actionTypes[`${PanelActions.actionPrefix}UPDATE_DATES`],
      PanelActions.actionTypes[`${PanelActions.actionPrefix}UPDATE_SUPPLY_TYPE_SELECTED_OPTIONS`],
    ),
    mergeMap((action) => {
      return of(PanelActions.toggleFirstTime(false));
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};

export const beforeSetDefaultTypesRelatedOptionsEpic = (action$, state$) => {
  const {
    BASE: BASE_ACTION_TYPE,
    SUCCESS: SUCCESS_ACTION_TYPE,
  } = CommonUtils.getTemplateActionTypes(PanelActions.actionPrefix, 'UPDATE_WATERFALL_SUBMIT_DATA');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const candidate = ['manufacturer', 'vendor'];
      if (candidate.includes(action.value.value)) {
        const { isFirstTime } = state$.value.spendingPanel;
        if (isFirstTime) {
          // 幫他自動全選plant, sourcer, type1, type2
          console.log('幫他自動全選plant, sourcer, type1, type2');
          return concat(
            of(PanelActions.toggleFirstTime(false)),
            of(PanelActions.setDefaultTypesRelatedOptions())
          );
        }
      }
      console.log('沒有要做什麼事');
      return of(PanelActions.toggleFirstTime(false));
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


export const setDefaultTypesRelatedOptionsEpic = (action$, state$) => {
  const {
    BASE: BASE_ACTION_TYPE,
    SUCCESS: SUCCESS_ACTION_TYPE,
    FAILED: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(PanelActions.actionPrefix, 'SET_DEFAULT_TYPES_RELATED__OPTIONS');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { plants, sourcers } = state$.value.plantSourcerSelector;
      const selectedPlantCodeList = plants.map(item => item.idCode);
      const selectedSourcerCodeList = sourcers.map(item => item.idCode);
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PanelResource.getProcureTypes({
          plant: selectedPlantCodeList,
          scode: selectedSourcerCodeList
        }))
          .pipe(
            mergeMap(response => {
              const { typeList } = response.data;
              return concat(
                of({
                  type: SUCCESS_ACTION_TYPE,
                  typeList,
                }),
                of(PlantSourcerSelectorActions.selectAllPlantsAndSourcers(selectedPlantCodeList, selectedSourcerCodeList)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              return concat(
                of({
                  type: FAILED_ACTION_TYPE,
                }),
                of(NotificationSystemActions.pushNotification({
                  message: '操作失敗，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


export const getMonthAnalysisEpic = (action$, state$) => {
  const {
    BASE: BASE_ACTION_TYPE,
    SUCCESS: SUCCESS_ACTION_TYPE,
    FAILED: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(PanelActions.actionPrefix, 'GET_MONTH_ANALYSIS');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { selectedPlantCodeList, selectedSourcerCodeList } = state$.value.plantSourcerSelector;
      const { startDate, endDate, selectedType1List, selectedType2List, selectedSupplyTypeList, monthSubmitData } = state$.value.spendingPanel;
      const consditionData = {
        plant: selectedPlantCodeList,
        scode: selectedSourcerCodeList,
        dateFrom: moment(startDate).format('YYYY-MM-DD'),
        dateTo: moment(endDate).endOf('month').format('YYYY-MM-DD'),
        type1: selectedType1List.map(item => item.value),
        type2: selectedType2List.map(item => item.value),
        supplyType: selectedSupplyTypeList.map(item => item.value),
        vendorSelection: monthSubmitData.vendorCategory.value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PanelResource.getMonthAnalysis(consditionData))
          .pipe(
            mergeMap(response => {
              return concat(
                of({
                  type: SUCCESS_ACTION_TYPE,
                  data: response.data
                }),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              return concat(
                of({
                  type: FAILED_ACTION_TYPE,
                }),
                of(NotificationSystemActions.pushNotification({
                  message: '取得分析資料有誤，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


/**
 * 下載Raw data報表
 */
export const downloadRawdataReportEpic = (action$, state$) => {
  const { BASE } = CommonUtils.getTemplateActionTypes(PanelActions.actionPrefix, 'DOWNLOAD_RAW_REPORT');
  return action$.pipe(
    ofType(BASE),
    mergeMap((payload) => {
      const { querydata } = payload;
      const condition = {
        user: querydata.scodes,
        plant: querydata.plants,
        ...querydata,
        dateFrom: moment(querydata.dateFrom).format('YYYY-MM-DD'),
        dateTo: moment(querydata.dateTo).format('YYYY-MM-DD'),
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PanelResource.downloadRawData(condition))
          .pipe(
            mergeMap(response => {
              return concat(
                of(PanelActions.downloadRawReportSuccess(response)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              return concat(
                of(PanelActions.downloadRawReportFailed(error)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得檔案失敗',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};

/**
 * 下載Report data報表
 */
export const downloadSummaryReportEpic = (action$, state$) => {
  const { BASE } = CommonUtils.getTemplateActionTypes(PanelActions.actionPrefix, 'DOWNLOAD_SUMMARY_REPORT');
  return action$.pipe(
    ofType(BASE),
    mergeMap((payload) => {
      const { querydata } = payload;
      const condition = {
        user: querydata.scodes,
        plant: querydata.plants,
        ...querydata,
        dateFrom: moment(querydata.dateFrom).format('YYYY-MM-DD'),
        dateTo: moment(querydata.dateTo).format('YYYY-MM-DD'),
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PanelResource.downloadSummaryReport(condition))
          .pipe(
            mergeMap(response => {
              return concat(
                of(PanelActions.downloadSummaryReportSuccess(response)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              return concat(
                of(PanelActions.downloadSummaryReportFailed(error)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得檔案失敗',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};

export default [
  checkIsFirstTimeEpic,
  getSupplyTypesEpic,
  getWaterfallAnalysisEpic,
  beforeSetDefaultTypesRelatedOptionsEpic,
  setDefaultTypesRelatedOptionsEpic,
  getMonthAnalysisEpic,
  initActionEpic,
  downloadRawdataReportEpic,
  downloadSummaryReportEpic,
];

