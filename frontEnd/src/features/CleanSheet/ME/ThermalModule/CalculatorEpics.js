import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, zip, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay, switchMap, take, finalize, debounceTime } from 'rxjs/operators';
import * as R from 'ramda';
import FileSaver from 'file-saver';

import CommonUtils from '~~utils/CommonUtils';
import Resource from '~~apis/resource';

import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import * as LoadingActions from '~~redux/Loading/LoadingActions';

import * as CalculatorActions from './CalculatorActions';
import Formula from './Formula';
import CalculatorUtils from './CalculatorUtils';


export const getThermalConfigsEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(CalculatorActions.actionPrefix, 'GET_THERMAL_CONFIGS');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.CostGeneratorResource.getThermalTables(),
          // Resource.CostGeneratorResource.getThermalDefaultFields()
        )
          .pipe(
            mergeMap(response => {
              const thermalStore = response[0].data;
              const thermalConfig = CalculatorUtils.calculatorList.map(item => {
                const config = Formula[item.value];
                return {
                  label: item.label,
                  uniqKey: item.value,
                  config: {
                    ...config,
                    store: {
                      ...thermalStore[item.value]
                    }
                  }
                };
              });

              return concat(
                of({
                  type: SUCCESS_ACTION_TYPE,
                  thermalStore,
                  thermalConfig
                }),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              console.log('[MRRRRRR]fail', error);
              return concat(
                of({
                  type: FAILED_ACTION_TYPE,
                }),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


export const updateThermalTotalEpic = (action$, state$) => {
  return action$.pipe(
    ofType(CalculatorActions.actionTypes[`${CalculatorActions.actionPrefix}UPDATE_THERMAL_CALCULATOR_TABS_DATA_BY_NAME`]),
    debounceTime(500),
    concatMap((action) => {
      const calculatorTotals = CalculatorUtils.calculatorList.map(item => {
        const total = R.pipe(
          R.map(R.path(['formData', 'finalPrice'])),
          R.filter(x => !R.isNil(x)),
          R.sum
        )(state$.value.calculator[item.value]);
        return {
          key: item.value,
          total
        };
      });
      const thermalCalculatorTotal = R.pipe(
        R.map((x) => x.total),
        R.filter(x => !R.isNil(x)),
        R.sum
      )(calculatorTotals);
      // console.log('calculatorTotals', calculatorTotals);
      // console.log('thermalCalculatorTotal', thermalCalculatorTotal);
      // const thermalCalculatorTotal = R.pipe(
      //   R.map((x) => x.tabs),
      //   R.flatten,
      //   R.map(R.path(['formData', 'finalPrice'])),      //   R.map(R.view(R.lensProp('formdata')))
      //   R.filter(x => !R.isNil(x)),
      //   R.sum
      // )(state$.value.calculator.thermalCalculatorTabs);
      return of(CalculatorActions.updateThermalCalculatorTotal(thermalCalculatorTotal));
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};

export const exportReportEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(CalculatorActions.actionPrefix, 'EXPORT_REPORT');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const reportData = CalculatorUtils.calculatorList.reduce((prev, curr) => {
        const mapIndexed = R.addIndex(R.map);
        const data = R.pipe(
          mapIndexed((item, index) => {
            const { unitPrice, amount, finalPrice } = item.formData;
            return {
              name: `${item.label} ${index + 1}`,
              unitprice: unitPrice,
              usage: amount,
              final: finalPrice,
              data: item.formData
            };
          }),
        )(state$.value.calculator[curr.value]);
        return {
          ...prev,
          [curr.value]: data
        };
      }, {});
      // const { thermalCalculatorTabs } = state$.value.calculator;
      // const reportData = thermalCalculatorTabs.reduce((prev, curr) => {
      //   return {
      //     ...prev,
      //     [curr.calcValue]: curr.tabs.map((item, index) => {
      //       const { unitPrice, amount, finalPrice } = item.formData;
      //       return {
      //         name: `${item.label} ${index + 1}`,
      //         unitprice: unitPrice,
      //         usage: amount,
      //         final: finalPrice,
      //         data: item.formData
      //       };
      //     })
      //   };
      // }, {});
      // console.log('reportData', reportData);
      return from(Resource.CostGeneratorResource.exportThermalCalculatorReport(reportData))
        .pipe(
          map(response => {
            const headerString = response.headers['content-disposition'];
            const contentType = response.headers['content-type'];

            // content-disposition格式如下：attachment; filename="Cost_Result_20181119.xlsx"
            const regexContentDisposition = /([a-zA-z/]+);\sfilename="(.*)"/g;
            let matchList = regexContentDisposition.exec(headerString);
            FileSaver.saveAs(
              new Blob([response.data],
                { type: contentType }
              ),
              matchList[2]
            );
            return {
              type: SUCCESS_ACTION_TYPE
            };
          }),
          catchError(error => of(
            {
              type: FAILED_ACTION_TYPE
            },
            NotificationSystemActions.pushNotification({
              message: 'export有誤，請稍後再試',
              level: 'error'
            })
          )
          )
        );
    })
  );
};

/*
統一處理loading mask
*/
export const handelOnLoadingEpic = (action$, state$) => {
  const exportAction = CommonUtils.getTemplateActionTypes(CalculatorActions.actionPrefix, 'EXPORT_REPORT');
  const needLoadingList = [
    exportAction.base,
  ];
  return action$.pipe(
    ofType(
      exportAction.base, exportAction.success, exportAction.failed,
    ),
    mergeMap((action) => {
      if (needLoadingList.includes(action.type)) {
        return of(LoadingActions.toggleLoadingStatus(true));
      }
      return of(LoadingActions.toggleLoadingStatus(false));
    }),
    catchError(error => {
      console.log('eeeeeee', error);
    })
  );
};


export default [
  getThermalConfigsEpic,
  updateThermalTotalEpic,
  exportReportEpic,
  handelOnLoadingEpic
];
