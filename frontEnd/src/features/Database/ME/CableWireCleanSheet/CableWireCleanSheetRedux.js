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
  CABLE_WIRE_CLEAN_SHEET___GET_CABLE_WIRE_PARAMETERS: 'CABLE_WIRE_CLEAN_SHEET___GET_CABLE_WIRE_PARAMETERS',
  CABLE_WIRE_CLEAN_SHEET___GET_CABLE_WIRE_PARAMETERS_SUCCESS: 'CABLE_WIRE_CLEAN_SHEET___GET_CABLE_WIRE_PARAMETERS_SUCCESS',
  CABLE_WIRE_CLEAN_SHEET___UPDATE_CABLE_WIRE_PARAMETERS: 'CABLE_WIRE_CLEAN_SHEET___UPDATE_CABLE_WIRE_PARAMETERS',

  // Material Price
  CABLE_WIRE_CLEAN_SHEET___GET_MATERIAL_PRICE: 'CABLE_WIRE_CLEAN_SHEET___GET_MATERIAL_PRICE',
  CABLE_WIRE_CLEAN_SHEET___GET_MATERIAL_PRICE_SUCCESS: 'CABLE_WIRE_CLEAN_SHEET___GET_MATERIAL_PRICE_SUCCESS',
  CABLE_WIRE_CLEAN_SHEET___PUT_MATERIAL_PRICE: 'CABLE_WIRE_CLEAN_SHEET___PUT_MATERIAL_PRICE',

  // Connecter Price
  CABLE_WIRE_CLEAN_SHEET___GET_CONNECTOR_PRICE: 'CABLE_WIRE_CLEAN_SHEET___GET_CONNECTOR_PRICE',
  CABLE_WIRE_CLEAN_SHEET___GET_CONNECTOR_PRICE_SUCCESS: 'CABLE_WIRE_CLEAN_SHEET___GET_CONNECTOR_PRICE_SUCCESS',
  CABLE_WIRE_CLEAN_SHEET___UPDATE_CONNECTOR_PRICE: 'CABLE_WIRE_CLEAN_SHEET___UPDATE_CONNECTOR_PRICE',

};

/* Parameters ================================================================================================================================= */
/* Actions */
export const getCableWireParameters = () => {
  return {
    type: actionTypes.CABLE_WIRE_CLEAN_SHEET___GET_CABLE_WIRE_PARAMETERS,
  };
};

export const getCableWireParametersSuccess = (response) => {
  const { date, cableWireParameter } = response.data;
  return {
    type: actionTypes.CABLE_WIRE_CLEAN_SHEET___GET_CABLE_WIRE_PARAMETERS_SUCCESS,
    date,
    parameterList: cableWireParameter
  };
};

export const updateCableWireParameters = (data) => {
  return {
    type: actionTypes.CABLE_WIRE_CLEAN_SHEET___UPDATE_CABLE_WIRE_PARAMETERS,
    data,
  };
};

/* Epics */
const getCableWireParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_WIRE_CLEAN_SHEET___GET_CABLE_WIRE_PARAMETERS),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableWireCleanSheetResource.getCableWireParameters())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getCableWireParametersSuccess(response)),
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

const updateCableWireParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_WIRE_CLEAN_SHEET___UPDATE_CABLE_WIRE_PARAMETERS),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetParameters(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getCableWireParameters()),
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
const CABLE_WIRE_CLEAN_SHEET___GET_CABLE_WIRE_PARAMETERS_SUCCESS = (state, payload) => {
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
    type: actionTypes.CABLE_WIRE_CLEAN_SHEET___GET_MATERIAL_PRICE,
  };
};

export const getMaterialPriceSuccess = response => {
  return {
    type: actionTypes.CABLE_WIRE_CLEAN_SHEET___GET_MATERIAL_PRICE_SUCCESS,
    ...response.data,
  };
};

export const putMaterialPrice = (data) => {
  return {
    type: actionTypes.CABLE_WIRE_CLEAN_SHEET___PUT_MATERIAL_PRICE,
    data,
  };
};

/* Epics */
const getMaterialPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_WIRE_CLEAN_SHEET___GET_MATERIAL_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableWireCleanSheetResource.getMaterialPrice()).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getMaterialPriceSuccess(response)),
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

const putMaterialPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_WIRE_CLEAN_SHEET___PUT_MATERIAL_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data)).pipe(
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
const CABLE_WIRE_CLEAN_SHEET___GET_MATERIAL_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    materialPrice: {
      ...state.materialPrice,
      ...payload,
    },
  };
};

/* Connector Price ================================================================================================================================ */
/* Actions */
export const getConnectorPrice = () => {
  return {
    type: actionTypes.CABLE_WIRE_CLEAN_SHEET___GET_CONNECTOR_PRICE,
  };
};

export const getConnectorPriceSuccess = (response) => {
  const { date, connectorPrice } = response.data;
  return {
    type: actionTypes.CABLE_WIRE_CLEAN_SHEET___GET_CONNECTOR_PRICE_SUCCESS,
    date,
    connectorPriceList: connectorPrice,
  };
};

export const updateConnectorPrice = (data) => {
  return {
    type: actionTypes.CABLE_WIRE_CLEAN_SHEET___UPDATE_CONNECTOR_PRICE,
    data,
  };
};

/* Epics */
const getConnectorPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_WIRE_CLEAN_SHEET___GET_CONNECTOR_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableWireCleanSheetResource.getConnectorPrice()).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getConnectorPriceSuccess(response)),
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

const updateConnectorPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_WIRE_CLEAN_SHEET___UPDATE_CONNECTOR_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableWireCleanSheetResource.updateConnectorPrice(data)).pipe(
          mergeMap((response) => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getConnectorPrice()),
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
const CABLE_WIRE_CLEAN_SHEET___GET_CONNECTOR_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    connectorPrice: {
      ...state.connectorPrice,
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

// Material price 預設值
const initialMaterialPrice = {
  date: {},
  materialPriceList: [],
};

// Connector Price 預設值
const initialConnectorPrice = {
  date: {},
  connectorPriceList: [],
};

const initialState = {
  parameters: initialParameters,
  materialPrice: initialMaterialPrice,
  connectorPrice: initialConnectorPrice,
};

export const reducer = handleActions({
  // Parameters
  CABLE_WIRE_CLEAN_SHEET___GET_CABLE_WIRE_PARAMETERS_SUCCESS,

  // Material Price
  CABLE_WIRE_CLEAN_SHEET___GET_MATERIAL_PRICE_SUCCESS,

  // Connecter Price
  CABLE_WIRE_CLEAN_SHEET___GET_CONNECTOR_PRICE_SUCCESS,

}, initialState);

// All Epics Here ----------------------------------------------------------------------------------------------------------------------------------
export const epics = [
  // Parameters
  getCableWireParametersEpic,
  updateCableWireParametersEpic,

  // Material Price
  getMaterialPriceEpic,
  putMaterialPriceEpic,

  // Connecter Price
  getConnectorPriceEpic,
  updateConnectorPriceEpic,
];
