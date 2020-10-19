import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, forkJoin, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import {
  actionTypes,
  setIsViewMode,
  getFormLayoutSuccess,
  getTypeIIOptionsSuccess,
  calculatePcbSuccess,
  reCalculatePcbSuccess,
  getPcbSpecSuccess,
  calculateWistronPnPcbSuccess,
  exportPcbSuccess,
} from './PCBCalculatorActions';

export const getPcbLayoutEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PCB_CALCULATOR___GET_FORM_LAYOUT),
    mergeMap((action) => {
      const { layoutName } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.getPcbLayout(layoutName))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getFormLayoutSuccess(response)),
              );
            }),
            catchError(error => {
              console.error('::::: getPcbLayoutEpic catchError', error.response);
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: '取得計算機失敗，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          ),
      );
    })
  );
};

export const getTypeIIOptionsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PCB_CALCULATOR___GET_TYPEII_OPTIONS),
    mergeMap((action) => {
      return concat(
        from(Resource.EEBomResource.getEEbomPCBType2())
          .pipe(
            mergeMap(response => {
              return concat(
                of(getTypeIIOptionsSuccess(response)),
              );
            }),
            catchError(error => {
              console.error('::::: getTypeIIOptionsEpic catchError', error.response);
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: '取得Type II選單失敗，請稍後再試',
                  level: 'error'
                })),
              );
            })
          ),
      );
    })
  );
};

export const getPcbSpecEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PCB_CALCULATOR___GET_PCB_SPEC),
    mergeMap((action) => {
      const { params } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PCBCalculatorResource.getPcbSpec(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPcbSpecSuccess(response)),
                of(setIsViewMode(false)),
              );
            }),
            catchError(error => {
              console.error('::::: getPcbSpecEpic catchError', error.response);
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: error.response.status === 400 ? 'Wistron P/N 不存在' : '取得資料有誤，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          ),
      );
    })
  );
};

export const calculatePcbEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PCB_CALCULATOR___CALCULATE_PCB),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PCBCalculatorResource.calculatePcb(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(calculatePcbSuccess(response)),
              );
            }),
            catchError(error => {
              console.error('::::: calculatePcbEpic catchError', error.response);
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: '計算失敗，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          ),
      );
    })
  );
};

export const reCalculatePcbEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PCB_CALCULATOR___RE_CALCULATE_PCB),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PCBCalculatorResource.calculatePcb(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(reCalculatePcbSuccess(response)),
              );
            }),
            catchError(error => {
              console.error('::::: reCalculatePcbEpic catchError', error.response);
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: '計算失敗，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          ),
      );
    })
  );
};

export const calculateWistronPnPcbEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PCB_CALCULATOR___CALCULATE_WISTRON_PN_PCB),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        from(Resource.PCBCalculatorResource.calculatePcb(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(calculateWistronPnPcbSuccess(response)),
              );
            }),
            catchError(error => {
              console.error('::::: calculateWistronPnPcbEpic catchError', error.response);
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: '計算失敗，請稍後再試',
                  level: 'error'
                })),
              );
            })
          ),
      );
    })
  );
};

export const exportPcbEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PCB_CALCULATOR___EXPORT_PCB),
    mergeMap((action) => {
      const { infoList } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PCBCalculatorResource.exportPcb(infoList))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(exportPcbSuccess(response)),
              );
            }),
            catchError(error => {
              console.error('::::: exportPcbEpic catchError', error.response);
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: '匯出失敗，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          ),
      );
    })
  );
};

export default [
  getPcbLayoutEpic,
  getTypeIIOptionsEpic,
  getPcbSpecEpic,
  calculatePcbEpic,
  reCalculatePcbEpic,
  calculateWistronPnPcbEpic,
  exportPcbEpic,
];
