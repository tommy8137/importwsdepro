import { handleActions } from 'redux-actions';
import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin, } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay, } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

// All Actions Here ---------------------------------------------------------------------------------------------------------------------------
const actionTypes = {
  // Parameters
  TURNING_CLEAN_SHEET___GET_TURNING_PARAMETER: 'TURNING_CLEAN_SHEET___GET_TURNING_PARAMETER',
  TURNING_CLEAN_SHEET___GET_TURNING_PARAMETER_SUCCESS: 'TURNING_CLEAN_SHEET___GET_TURNING_PARAMETER_SUCCESS',
  TURNING_CLEAN_SHEET___PUT_COMMON_PARAMETER: 'TURNING_CLEAN_SHEET___PUT_COMMON_PARAMETER',
  // Tooth Path
  TURNING_CLEAN_SHEET___GET_TOOTH_PATH: 'TURNING_CLEAN_SHEET___GET_TOOTH_PATH',
  TURNING_CLEAN_SHEET___GET_TOOTH_PATH_SUCCESS: 'TURNING_CLEAN_SHEET___GET_TOOTH_PATH_SUCCESS',
  TURNING_CLEAN_SHEET___PUT_TOOTH_PATH: 'TURNING_CLEAN_SHEET___PUT_TOOTH_PATH',
  // Heat Treatment Unit Price
  TURNING_CLEAN_SHEET___GET_HEAT_TREATMENT_UNIT_PRICE: 'TURNING_CLEAN_SHEET___GET_HEAT_TREATMENT_UNIT_PRICE',
  TURNING_CLEAN_SHEET___GET_HEAT_TREATMENT_UNIT_PRICE_SUCCESS: 'TURNING_CLEAN_SHEET___GET_HEAT_TREATMENT_UNIT_PRICE_SUCCESS',
  TURNING_CLEAN_SHEET___PUT_HEAT_TREATMENT_UNIT_PRICE: 'TURNING_CLEAN_SHEET___PUT_HEAT_TREATMENT_UNIT_PRICE',
  // Electroplating Unit Price
  TURNING_CLEAN_SHEET___GET_ELECTROPLATING_UNIT_PRICE: 'TURNING_CLEAN_SHEET___GET_ELECTROPLATING_UNIT_PRICE',
  TURNING_CLEAN_SHEET___GET_ELECTROPLATING_UNIT_PRICE_SUCCESS: 'TURNING_CLEAN_SHEET___GET_ELECTROPLATING_UNIT_PRICE_SUCCESS',
  TURNING_CLEAN_SHEET___PUT_ELECTROPLATING_UNIT_PRICE: 'TURNING_CLEAN_SHEET___PUT_ELECTROPLATING_UNIT_PRICE',
  // Nylok Unit Price
  TURNING_CLEAN_SHEET___GET_NYLOK_UNIT_PRICE: 'TURNING_CLEAN_SHEET___GET_NYLOK_UNIT_PRICE',
  TURNING_CLEAN_SHEET___GET_NYLOK_UNIT_PRICE_SUCCESS: 'TURNING_CLEAN_SHEET___GET_NYLOK_UNIT_PRICE_SUCCESS',
  TURNING_CLEAN_SHEET___PUT_NYLOK_UNIT_PRICE: 'TURNING_CLEAN_SHEET___PUT_NYLOK_UNIT_PRICE',
};

/* Parameters ============================================================================================================================================== */
/* Actions */
export const getTurningParameter = () => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___GET_TURNING_PARAMETER,
  };
};

export const getTurningParameterSuccess = response => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___GET_TURNING_PARAMETER_SUCCESS,
    ...response.data,
  };
};

export const putCommonParameter = data => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___PUT_COMMON_PARAMETER,
    data,
  };
};
/* Epics */
export const getTurningParameterEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.TURNING_CLEAN_SHEET___GET_TURNING_PARAMETER),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.TurningCleanSheetResource.getTurningParameter()).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getTurningParameterSuccess(response)));
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(
                NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error',
                }),
              ),
            );
          }),
        ),
      );
    }),
  );
};

export const putCommonParameterEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.TURNING_CLEAN_SHEET___PUT_COMMON_PARAMETER),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetParameters(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getTurningParameter()),
              of(
                NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success',
                }),
              ),
            );
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(
                NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error',
                }),
              ),
            );
          }),
        ),
      );
    }),
  );
};
/* Reducers */
const TURNING_CLEAN_SHEET___GET_TURNING_PARAMETER_SUCCESS = (state, payload) => {
  return {
    ...state,
    turningParameter: {
      ...state.turningParameter,
      ...payload,
    },
  };
};


/* Tooth Path ============================================================================================================================================== */
/* Actions */
export const getToothPath = () => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___GET_TOOTH_PATH,
  };
};

export const getToothPathSuccess = response => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___GET_TOOTH_PATH_SUCCESS,
    ...response.data,
  };
};

export const putToothPath = data => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___PUT_TOOTH_PATH,
    data,
  };
};
/* Epics */
export const getToothPathEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.TURNING_CLEAN_SHEET___GET_TOOTH_PATH),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.TurningCleanSheetResource.getToothPath()).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getToothPathSuccess(response)));
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(
                NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error',
                }),
              ),
            );
          }),
        ),
      );
    }),
  );
};

export const putToothPathEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.TURNING_CLEAN_SHEET___PUT_TOOTH_PATH),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.TurningCleanSheetResource.putToothPath(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getToothPath()),
              of(
                NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success',
                }),
              ),
            );
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(
                NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error',
                }),
              ),
            );
          }),
        ),
      );
    }),
  );
};

/* Reducers */
const TURNING_CLEAN_SHEET___GET_TOOTH_PATH_SUCCESS = (state, payload) => {
  return {
    ...state,
    toothPath: {
      ...state.toothPath,
      ...payload,
    },
  };
};

/* Heat Treatment Unit Price =============================================================================================================================== */
/* Actions */
export const getHeatTreatmentUnitPrice = () => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___GET_HEAT_TREATMENT_UNIT_PRICE,
  };
};

export const getHeatTreatmentUnitPriceSuccess = response => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___GET_HEAT_TREATMENT_UNIT_PRICE_SUCCESS,
    ...response.data,
  };
};

export const putHeatTreatmentUnitPrice = data => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___PUT_HEAT_TREATMENT_UNIT_PRICE,
    data,
  };
};
/* Epics */
export const getHeatTreatmentUnitPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.TURNING_CLEAN_SHEET___GET_HEAT_TREATMENT_UNIT_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.TurningCleanSheetResource.getHeatTreatmentUnitPrice()).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getHeatTreatmentUnitPriceSuccess(response)));
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(
                NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error',
                }),
              ),
            );
          }),
        ),
      );
    }),
  );
};

export const putHeatTreatmentUnitPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.TURNING_CLEAN_SHEET___PUT_HEAT_TREATMENT_UNIT_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getHeatTreatmentUnitPrice()),
              of(
                NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success',
                }),
              ),
            );
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(
                NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error',
                }),
              ),
            );
          }),
        ),
      );
    }),
  );
};
/* Reducers */
const TURNING_CLEAN_SHEET___GET_HEAT_TREATMENT_UNIT_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    heatTreatmentUnitPrice: {
      ...state.heatTreatmentUnitPrice,
      ...payload,
    },
  };
};

/* Electroplating Unit Price =============================================================================================================================== */
/* Actions */
export const getElectroplatingUnitPrice = () => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___GET_ELECTROPLATING_UNIT_PRICE,
  };
};

export const getElectroplatingUnitPriceSuccess = response => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___GET_ELECTROPLATING_UNIT_PRICE_SUCCESS,
    ...response.data,
  };
};

export const putElectroplatingUnitPrice = data => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___PUT_ELECTROPLATING_UNIT_PRICE,
    data,
  };
};
/* Epics */
export const getElectroplatingUnitPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.TURNING_CLEAN_SHEET___GET_ELECTROPLATING_UNIT_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.TurningCleanSheetResource.getElectroplatingUnitPrice()).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getElectroplatingUnitPriceSuccess(response)));
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(
                NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error',
                }),
              ),
            );
          }),
        ),
      );
    }),
  );
};

export const putElectroplatingUnitPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.TURNING_CLEAN_SHEET___PUT_ELECTROPLATING_UNIT_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getElectroplatingUnitPrice()),
              of(
                NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success',
                }),
              ),
            );
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(
                NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error',
                }),
              ),
            );
          }),
        ),
      );
    }),
  );
};
/* Reducers */
const TURNING_CLEAN_SHEET___GET_ELECTROPLATING_UNIT_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    electroplatingUnitPrice: {
      ...state.electroplatingUnitPrice,
      ...payload,
    },
  };
};

/* Nylok Unit Price ======================================================================================================================================== */
/* Actions */
export const getNylokUnitPrice = () => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___GET_NYLOK_UNIT_PRICE,
  };
};

export const getNylokUnitPriceSuccess = response => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___GET_NYLOK_UNIT_PRICE_SUCCESS,
    ...response.data,
  };
};

export const putNylokUnitPrice = data => {
  return {
    type: actionTypes.TURNING_CLEAN_SHEET___PUT_NYLOK_UNIT_PRICE,
    data,
  };
};
/* Epics */
export const getNylokUnitPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.TURNING_CLEAN_SHEET___GET_NYLOK_UNIT_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.TurningCleanSheetResource.getNylokUnitPrice()).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getNylokUnitPriceSuccess(response)));
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(
                NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error',
                }),
              ),
            );
          }),
        ),
      );
    }),
  );
};

export const putNylokUnitPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.TURNING_CLEAN_SHEET___PUT_NYLOK_UNIT_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getNylokUnitPrice()),
              of(
                NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success',
                }),
              ),
            );
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(
                NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error',
                }),
              ),
            );
          }),
        ),
      );
    }),
  );
};
/* Reducers */
const TURNING_CLEAN_SHEET___GET_NYLOK_UNIT_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    nylokUnitPrice: {
      ...state.nylokUnitPrice,
      ...payload,
    },
  };
};

// All Reducers Here -------------------------------------------------------------------------------------------------------------------------------
// Parameters 預設值
const initialTurningParameter = {
  date: {},
  turningParameter: [],
};

// Tooth Path 預設值
const initialToothPath = {
  items: [],
};

// Heat Treatment Unit Price 預設值
const initialHeatTreatmentUnitPrice = {
  date: {},
  heatTreatmentPrice: [],
};

// Electroplating Unit Price 預設值
const initialElectroplatingUnitPrice = {
  date: {},
  platingPrice: [],
};

// Nylok Unit Price 預設值
const initialNylokUnitPrice = {
  date: {},
  nylokPrice: [],
};

const initialState = {
  turningParameter: initialTurningParameter,
  toothPath: initialToothPath,
  heatTreatmentUnitPrice: initialHeatTreatmentUnitPrice,
  electroplatingUnitPrice: initialElectroplatingUnitPrice,
  nylokUnitPrice: initialNylokUnitPrice
};

export const reducer = handleActions({
  // Parameters
  TURNING_CLEAN_SHEET___GET_TURNING_PARAMETER_SUCCESS,
  // Tooth Path
  TURNING_CLEAN_SHEET___GET_TOOTH_PATH_SUCCESS,
  // Heat Treatment Unit Price
  TURNING_CLEAN_SHEET___GET_HEAT_TREATMENT_UNIT_PRICE_SUCCESS,
  // Electroplating Unit Price
  TURNING_CLEAN_SHEET___GET_ELECTROPLATING_UNIT_PRICE_SUCCESS,
  // Nylok Unit Price
  TURNING_CLEAN_SHEET___GET_NYLOK_UNIT_PRICE_SUCCESS,
}, initialState);

// All Epics Here ----------------------------------------------------------------------------------------------------------------------------------
export const epics = [
  // Parameters
  getTurningParameterEpic, putCommonParameterEpic,
  // Tooth Path
  getToothPathEpic, putToothPathEpic,
  // Heat Treatment Unit Price
  getHeatTreatmentUnitPriceEpic, putHeatTreatmentUnitPriceEpic,
  // Electroplating Unit Price
  getElectroplatingUnitPriceEpic, putElectroplatingUnitPriceEpic,
  // Nylok Unit Price
  getNylokUnitPriceEpic, putNylokUnitPriceEpic,
];
