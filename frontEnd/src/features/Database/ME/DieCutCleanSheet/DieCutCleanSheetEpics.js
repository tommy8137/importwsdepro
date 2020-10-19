import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

import {
  actionTypes,

  // Parameters
  getDieCutParameters,
  getDieCutParametersSuccess,

  // MaterialSizeAdderPrice
  getMaterialSizeAdderPrice,
  getMaterialSizeAdderPriceSuccess,
  // ReleasePaperPrice
  getReleasePaperPrice,
  getReleasePaperPriceSuccess,
  // TypePrice
  getTypePrice,
  getTypePriceSuccess,

  // AreaTimesPrice
  getAreaTimesPrice,
  getAreaTimesPriceSuccess,

} from './DieCutCleanSheetActions';

/* Parameters ------------------------------------------------------------------------------------------------------------------------------*/
export const getDieCutParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DIECUT_CLEAN_SHEET___GET_DIE_CUT_PARAMETERS),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DieCutCleanSheetResource.getDieCutParameters())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getDieCutParametersSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateDieCutParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DIECUT_CLEAN_SHEET___UPDATE_DIE_CUT_PARAMETERS),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetParameters(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getDieCutParameters()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* MaterialSizeAdderPrice ------------------------------------------------------------------------------------------------------------------*/
export const getMaterialSizeAdderPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DIECUT_CLEAN_SHEET___GET_MATERIAL_SIZE_ADDER_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DieCutCleanSheetResource.getMaterialSizeAdderPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialSizeAdderPriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateMaterialSizeAdderPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DIECUT_CLEAN_SHEET___UPDATE_MATERIAL_SIZE_ADDER_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DieCutCleanSheetResource.updateMaterialSizeAdderPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialSizeAdderPrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};


/* ReleasePaperPrice -----------------------------------------------------------------------------------------------------------------------*/
export const getReleasePaperPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DIECUT_CLEAN_SHEET___GET_RELEASE_PAPER_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DieCutCleanSheetResource.getReleasePaperPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getReleasePaperPriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateReleasePaperPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DIECUT_CLEAN_SHEET___UPDATE_RELEASE_PAPER_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DieCutCleanSheetResource.updateReleasePaperPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getReleasePaperPrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* TypePrice -------------------------------------------------------------------------------------------------------------------------------*/
export const getTypePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DIECUT_CLEAN_SHEET___GET_TYPE_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DieCutCleanSheetResource.getTypePrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTypePriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.popNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateTypePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DIECUT_CLEAN_SHEET___UPDATE_TYPE_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DieCutCleanSheetResource.updateTypePrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTypePrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* AreaTimesPrice --------------------------------------------------------------------------------------------------------------------------*/
export const getAreaTimesPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DIECUT_CLEAN_SHEET___GET_AREA_TIMES_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DieCutCleanSheetResource.getAreaTimesPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getAreaTimesPriceSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateAreaTimesPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DIECUT_CLEAN_SHEET___UPDATE_AREA_TIMES_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DieCutCleanSheetResource.updateAreaTimesPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getAreaTimesPrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export default [
  // Parameters
  getDieCutParametersEpic,
  updateDieCutParametersEpic,

  // MaterialSizeAdderPrice
  getMaterialSizeAdderPriceEpic,
  updateMaterialSizeAdderPriceEpic,

  // ReleasePaperPrice
  getReleasePaperPriceEpic,
  updateReleasePaperPriceEpic,
  // TypePrice
  getTypePriceEpic,
  updateTypePriceEpic,

  // AreaTimesPrice
  getAreaTimesPriceEpic,
  updateAreaTimesPriceEpic,
];
