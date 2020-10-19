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
  EMC_MAGNET_CLEAN_SHEET___GET_EMC_MAGNET_PARAMETERS: 'EMC_MAGNET_CLEAN_SHEET___GET_EMC_MAGNET_PARAMETERS',
  EMC_MAGNET_CLEAN_SHEET___GET_EMC_MAGNET_PARAMETERS_SUCCESS: 'EMC_MAGNET_CLEAN_SHEET___GET_EMC_MAGNET_PARAMETERS_SUCCESS',
  EMC_MAGNET_CLEAN_SHEET___UPDATE_EMC_MAGNET_PARAMETERS: 'EMC_MAGNET_CLEAN_SHEET___UPDATE_EMC_MAGNET_PARAMETERS',

  // Material Price
  EMC_MAGNET_CLEAN_SHEET___GET_MATERIAL_PRICE: 'EMC_MAGNET_CLEAN_SHEET___GET_MATERIAL_PRICE',
  EMC_MAGNET_CLEAN_SHEET___GET_MATERIAL_PRICE_SUCCESS: 'EMC_MAGNET_CLEAN_SHEET___GET_MATERIAL_PRICE_SUCCESS',
  EMC_MAGNET_CLEAN_SHEET___UPDATE_MATERIAL_PRICE: 'EMC_MAGNET_CLEAN_SHEET___UPDATE_MATERIAL_PRICE',

  // Cutting Material Loss Rate
  EMC_MAGNET_CLEAN_SHEET___GET_CUTTING_MATERIAL_LOSS_RATE: 'EMC_MAGNET_CLEAN_SHEET___GET_CUTTING_MATERIAL_LOSS_RATE',
  EMC_MAGNET_CLEAN_SHEET___GET_CUTTING_MATERIAL_LOSS_RATE_SUCCESS: 'EMC_MAGNET_CLEAN_SHEET___GET_CUTTING_MATERIAL_LOSS_RATE_SUCCESS',
  EMC_MAGNET_CLEAN_SHEET___UPDATE_CUTTING_MATERIAL_LOSS_RATE: 'EMC_MAGNET_CLEAN_SHEET___UPDATE_CUTTING_MATERIAL_LOSS_RATE',

  // Magnetizing And Labor Price
  EMC_MAGNET_CLEAN_SHEET___GET_MAGNETIZING_AND_LABOR_PRICE: 'EMC_MAGNET_CLEAN_SHEET___GET_MAGNETIZING_AND_LABOR_PRICE',
  EMC_MAGNET_CLEAN_SHEET___GET_MAGNETIZING_AND_LABOR_PRICE_SUCCESS: 'EMC_MAGNET_CLEAN_SHEET___GET_MAGNETIZING_AND_LABOR_PRICE_SUCCESS',
  EMC_MAGNET_CLEAN_SHEET___UPDATE_MAGNETIZING_AND_LABOR_PRICE: 'EMC_MAGNET_CLEAN_SHEET___UPDATE_MAGNETIZING_AND_LABOR_PRICE',

};

/* Parameters ================================================================================================================================= */
/* Actions */
export const getEmcMagnetParameters = () => {
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_EMC_MAGNET_PARAMETERS,
  };
};

export const getEmcMagnetParametersSuccess = (response) => {
  const { date, emcMagnetParameter } = response.data;
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_EMC_MAGNET_PARAMETERS_SUCCESS,
    date,
    parameterList: emcMagnetParameter,
  };
};

export const updateEmcMagnetParameters = (data) => {
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___UPDATE_EMC_MAGNET_PARAMETERS,
    data,
  };
};

/* Epics */
const getEmcMagnetParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_EMC_MAGNET_PARAMETERS),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EmcMagnetCleanSheetResource.getEmcMagnetParameters())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getEmcMagnetParametersSuccess(response)),
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

const updateEmcMagnetParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EMC_MAGNET_CLEAN_SHEET___UPDATE_EMC_MAGNET_PARAMETERS),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetParameters(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getEmcMagnetParameters()),
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
const EMC_MAGNET_CLEAN_SHEET___GET_EMC_MAGNET_PARAMETERS_SUCCESS = (state, payload) => {
  return {
    ...state,
    parameters: {
      ...state.parameters,
      ...payload,
    },
  };
};

/* Material Price ============================================================================================================================= */
/* Actions */
export const getMaterialPrice = () => {
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_MATERIAL_PRICE,
  };
};

export const getMaterialPriceSuccess = (response) => {
  const { date,  materialPrice } = response.data;
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_MATERIAL_PRICE_SUCCESS,
    date,
    materialPriceList: materialPrice
  };
};

export const updateMaterialPrice = (data) => {
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___UPDATE_MATERIAL_PRICE,
    data,
  };
};

/* Epics */
export const getMaterialPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_MATERIAL_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EmcMagnetCleanSheetResource.getMaterialPrice())
          .pipe(
            mergeMap(response => {
              return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getMaterialPriceSuccess(response)));
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

export const updateMaterialPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EMC_MAGNET_CLEAN_SHEET___UPDATE_MATERIAL_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPrice()),
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
const EMC_MAGNET_CLEAN_SHEET___GET_MATERIAL_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    materialPrice: {
      ...state.materialPrice,
      ...payload,
    },
  };
};

/* Cutting Material Loss Rate ============================================================================================================================= */
/* Actions */
export const getCuttingMaterialLossRate = () => {
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_CUTTING_MATERIAL_LOSS_RATE,
  };
};

export const getCuttingMaterialLossRateSuccess = response => {
  const { date, cutLossRate } = response.data;
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_CUTTING_MATERIAL_LOSS_RATE_SUCCESS,
    date,
    cuttingMaterialLossRateList: cutLossRate
  };
};

export const updateCuttingMaterialLossRate = (data) => {
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___UPDATE_CUTTING_MATERIAL_LOSS_RATE,
    data,
  };
};

/* Epics */
export const getCuttingMaterialLossRateEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_CUTTING_MATERIAL_LOSS_RATE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EmcMagnetCleanSheetResource.getCuttingMaterialLossRate())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getCuttingMaterialLossRateSuccess(response)));
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
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

export const updateCuttingMaterialLossRateEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EMC_MAGNET_CLEAN_SHEET___UPDATE_CUTTING_MATERIAL_LOSS_RATE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EmcMagnetCleanSheetResource.updateCuttingMaterialLossRate(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getCuttingMaterialLossRate()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success',
                }),
                ),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
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
const EMC_MAGNET_CLEAN_SHEET___GET_CUTTING_MATERIAL_LOSS_RATE_SUCCESS = (state, payload) => {
  return {
    ...state,
    cuttingMaterialLossRate: {
      ...state.cuttingMaterialLossRate,
      ...payload,
    },
  };
};

/* Magnetizing And Labor Price ============================================================================================================================= */
/* Actions */
export const getMagnetizingAndLaborPrice = () => {
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_MAGNETIZING_AND_LABOR_PRICE,
  };
};

export const getMagnetizingAndLaborPriceSuccess = (response) => {
  const { date, manPowerPrice } = response.data;
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_MAGNETIZING_AND_LABOR_PRICE_SUCCESS,
    date,
    magnetizingAndLaborPriceList: manPowerPrice,
  };
};

export const updateMagnetizingAndLaborPrice = data => {
  return {
    type: actionTypes.EMC_MAGNET_CLEAN_SHEET___UPDATE_MAGNETIZING_AND_LABOR_PRICE,
    data,
  };
};

/* Epics */
export const getMagnetizingAndLaborPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EMC_MAGNET_CLEAN_SHEET___GET_MAGNETIZING_AND_LABOR_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EmcMagnetCleanSheetResource.getMagnetizingAndLaborPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMagnetizingAndLaborPriceSuccess(response)));
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
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

export const updateMagnetizingAndLaborPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EMC_MAGNET_CLEAN_SHEET___UPDATE_MAGNETIZING_AND_LABOR_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMagnetizingAndLaborPrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success',
                }),
                ),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
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
const EMC_MAGNET_CLEAN_SHEET___GET_MAGNETIZING_AND_LABOR_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    magnetizingAndLaborPrice: {
      ...state.magnetizingAndLaborPrice,
      ...payload,
    },
  };
};


// All Reducers Here -------------------------------------------------------------------------------------------------------------------------------
// Parameters 預設值
const initialParameters = {
  date: {},
  parameterList: []
};

// Material Price 預設值
const initialMaterialPrice = {
  date: {},
  materialPriceList: [],
};

// Cutting Material Loss Rate 預設值
const initialCuttingMaterialLossRate = {
  date: {},
  cuttingMaterialLossRateList: [],
};


// Magnetizing And Labor Price  預設值
const initialMagnetizingAndLaborPrice = {
  date: {},
  magnetizingAndLaborPriceList: [],
};

const initialState = {
  parameters: initialParameters,
  materialPrice: initialMaterialPrice,
  cuttingMaterialLossRate: initialCuttingMaterialLossRate,
  magnetizingAndLaborPrice: initialMagnetizingAndLaborPrice
};

export const reducer = handleActions({
  // Parameters
  EMC_MAGNET_CLEAN_SHEET___GET_EMC_MAGNET_PARAMETERS_SUCCESS,

  // Material Price
  EMC_MAGNET_CLEAN_SHEET___GET_MATERIAL_PRICE_SUCCESS,

  // Cutting Material Loss Rate
  EMC_MAGNET_CLEAN_SHEET___GET_CUTTING_MATERIAL_LOSS_RATE_SUCCESS,

  // Magnetizing And Labor Price
  EMC_MAGNET_CLEAN_SHEET___GET_MAGNETIZING_AND_LABOR_PRICE_SUCCESS,

}, initialState);

// All Epics Here ----------------------------------------------------------------------------------------------------------------------------------
export const epics = [
  // Parameters
  getEmcMagnetParametersEpic,
  updateEmcMagnetParametersEpic,

  // Cutting Material Loss Rate
  getCuttingMaterialLossRateEpic,
  updateCuttingMaterialLossRateEpic,

  // Material Price
  getMaterialPriceEpic,
  updateMaterialPriceEpic,

  // Magnetizing And Labor Price
  getMagnetizingAndLaborPriceEpic,
  updateMagnetizingAndLaborPriceEpic,

];
