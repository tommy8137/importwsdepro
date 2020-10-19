import { handleActions } from 'redux-actions';
import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin, } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay, } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

// All Actions Here ---------------------------------------------------------------------------------------------------------------------------
const actionTypes = {
  // Graphite Price
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_GRAPHITE_PRICE: 'THERMAL_GRAPHITE_CLEAN_SHEET___GET_GRAPHITE_PRICE',
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_GRAPHITE_PRICE_SUCCESS: 'THERMAL_GRAPHITE_CLEAN_SHEET___GET_GRAPHITE_PRICE_SUCCESS',
  THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_GRAPHITE_PRICE: 'THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_GRAPHITE_PRICE',

  // Glue Price
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_GLUE_PRICE: 'THERMAL_GRAPHITE_CLEAN_SHEET___GET_GLUE_PRICE',
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_GLUE_PRICE_SUCCESS: 'THERMAL_GRAPHITE_CLEAN_SHEET___GET_GLUE_PRICE_SUCCESS',
  THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_GLUE_PRICE: 'THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_GLUE_PRICE',

  // Pet Price
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_PET_PRICE: 'THERMAL_GRAPHITE_CLEAN_SHEET___GET_PET_PRICE',
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_PET_PRICE_SUCCESS: 'THERMAL_GRAPHITE_CLEAN_SHEET___GET_PET_PRICE_SUCCESS',
  THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_PET_PRICE: 'THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_PET_PRICE',

  // Processing Price
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_PROCESSING_PRICE: 'THERMAL_GRAPHITE_CLEAN_SHEET___GET_PROCESSING_PRICE',
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_PROCESSING_PRICE_SUCCESS: 'THERMAL_GRAPHITE_CLEAN_SHEET___GET_PROCESSING_PRICE_SUCCESS',
  THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_PROCESSING_PRICE: 'THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_PROCESSING_PRICE',

};

/* Graphite Price ================================================================================================================================ */
/* Actions */
export const getGraphitePrice = () => {
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_GRAPHITE_PRICE,
  };
};

export const getGraphitePriceSuccess = (response) => {
  const { date, thicknessPrice } = response.data;
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_GRAPHITE_PRICE_SUCCESS,
    date,
    graphitePriceList: thicknessPrice,
  };
};

export const updateGraphitePrice = (data) => {
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_GRAPHITE_PRICE,
    data,
  };
};

/* Epics */
export const getGraphitePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_GRAPHITE_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalGraphiteCleanSheetResource.getGraphitePrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getGraphitePriceSuccess(response)));
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

export const updateGraphitePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_GRAPHITE_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getGraphitePrice()),
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
const THERMAL_GRAPHITE_CLEAN_SHEET___GET_GRAPHITE_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    graphitePrice: {
      ...state.graphitePrice,
      ...payload,
    },
  };
};

/* Glue Price  =================================================================================================================================== */
/* Actions */
export const getGluePrice = () => {
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_GLUE_PRICE,
  };
};

export const getGluePriceSuccess = (response) => {
  const { date, gluePrice } = response.data;
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_GLUE_PRICE_SUCCESS,
    date,
    gluePriceList: gluePrice
  };
};

export const updateGluePrice = data => {
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_GLUE_PRICE,
    data,
  };
};

/* Epics */
export const getGluePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_GLUE_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalGraphiteCleanSheetResource.getGluePrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getGluePriceSuccess(response)));
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

export const updateGluePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_GLUE_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getGluePrice()),
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
const THERMAL_GRAPHITE_CLEAN_SHEET___GET_GLUE_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    gluePrice: {
      ...state.gluePrice,
      ...payload,
    },
  };
};

/* Pet Price  ==================================================================================================================================== */
/* Actions */
export const getPetPrice = () => {
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_PET_PRICE,
  };
};

export const getPetPriceSuccess = response => {
  const { date, petPrice } = response.data;
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_PET_PRICE_SUCCESS,
    date,
    petPriceList: petPrice
  };
};

export const updatePetPrice = data => {
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_PET_PRICE,
    data,
  };
};

/* Epics */
export const getPetPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_PET_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalGraphiteCleanSheetResource.getPetPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPetPriceSuccess(response)));
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

export const updatePetPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_PET_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPetPrice()),
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
const THERMAL_GRAPHITE_CLEAN_SHEET___GET_PET_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    petPrice: {
      ...state.petPrice,
      ...payload,
    },
  };
};

/* Processing Price  ============================================================================================================================= */
/* Actions */
export const getProcessingPrice = () => {
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_PROCESSING_PRICE,
  };
};

export const getProcessingPriceSuccess = response => {
  const { date, processPrice } = response.data;
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_PROCESSING_PRICE_SUCCESS,
    date,
    processingPriceList: processPrice
  };
};

export const updateProcessingPrice = data => {
  return {
    type: actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_PROCESSING_PRICE,
    data,
  };
};

/* Epics */
export const getProcessingPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___GET_PROCESSING_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.ThermalGraphiteCleanSheetResource.getProcessingPrice())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getProcessingPriceSuccess(response)));
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

export const updateProcessingPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.THERMAL_GRAPHITE_CLEAN_SHEET___UPDATE_PROCESSING_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getProcessingPrice()),
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
const THERMAL_GRAPHITE_CLEAN_SHEET___GET_PROCESSING_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    processingPrice: {
      ...state.processingPrice,
      ...payload,
    },
  };
};

// All Reducers Here -------------------------------------------------------------------------------------------------------------------------------
// GraphitePrice 預設值
const initialGraphitePrice = {
  date: {},
  graphitePriceList: [],
};

// Glue Price 預設值
const initialGluePrice = {
  date: {},
  gluePriceList: [],
};

// Pet Price 預設值
const initialPetPrice = {
  date: {},
  petPriceList: [],
};

// Processing Price 預設值
const initialProcessingPrice = {
  date: {},
  processingPriceList: [],
};

const initialState = {
  graphitePrice: initialGraphitePrice,
  gluePrice: initialGluePrice,
  petPrice: initialPetPrice,
  processingPrice: initialProcessingPrice
};

export const reducer = handleActions({
  // GraphitePrice
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_GRAPHITE_PRICE_SUCCESS,

  // Glue Price
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_GLUE_PRICE_SUCCESS,

  // Pet Price
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_PET_PRICE_SUCCESS,

  // Processing Price
  THERMAL_GRAPHITE_CLEAN_SHEET___GET_PROCESSING_PRICE_SUCCESS,

}, initialState);

// All Epics Here ----------------------------------------------------------------------------------------------------------------------------------
export const epics = [
  // GraphitePrice
  getGraphitePriceEpic,
  updateGraphitePriceEpic,

  // Glue Price
  getGluePriceEpic,
  updateGluePriceEpic,

  // Pet Price
  getPetPriceEpic,
  updatePetPriceEpic,

  // Processing Price
  getProcessingPriceEpic,
  updateProcessingPriceEpic,
];
