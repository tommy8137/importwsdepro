import { handleActions } from 'redux-actions';
import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

const actionTypes = {
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_PARAMETER: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_PARAMETER',
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_PARAMETER_SUCCESS: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_PARAMETER_SUCCESS',
  CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_PARAMETER: 'CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_PARAMETER',

  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_PRICE: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_PRICE',
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_PRICE_SUCCESS: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_PRICE_SUCCESS',
  CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_CONNECTOR_PRICE: 'CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_CONNECTOR_PRICE',

  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR',
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SUCCESS: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SUCCESS',

  // material price
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_MATERIAL_PRICE: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_MATERIAL_PRICE',
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_MATERIAL_PRICE_SUCCESS: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_MATERIAL_PRICE_SUCCESS',
  CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_MATERIAL_PRICE: 'CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_MATERIAL_PRICE',


  // connect spec price
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SPEC_PRICE: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SPEC_PRICE',
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SPEC_PRICE_SUCCESS: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SPEC_PRICE_SUCCESS',
  CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_CONNECTOR_SPEC_PRICE: 'CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_CONNECTOR_SPEC_PRICE',


  // 補強板
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_REINFORCEMENT_BOARD_PRICE: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_REINFORCEMENT_BOARD_PRICE',
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_REINFORCEMENT_BOARD_PRICE_SUCCESS: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_REINFORCEMENT_BOARD_PRICE_SUCCESS',
  CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_REINFORCEMENT_BOARD_PRICE: 'CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_REINFORCEMENT_BOARD_PRICE',


  // 輔料
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_ACCESSORIES_PRICE: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_ACCESSORIES_PRICE',
  CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_ACCESSORIES_PRICE_SUCCESS: 'CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_ACCESSORIES_PRICE_SUCCESS',
  CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_ACCESSORIES_PRICE: 'CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_ACCESSORIES_PRICE',
};

export const getCableFfcParameter = () => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_PARAMETER,
  };
};

export const getCableFfcParameterSuccess = response => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_PARAMETER_SUCCESS,
    ...response.data,
  };
};

export const putCableFfcParameter = data => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_PARAMETER,
    data,
  };
};

export const getCableFfcParameterEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_PARAMETER),
    mergeMap(action => {
      const { activeProductType: { value: productTypeId } } = state$.value.dataBase.common;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.getCableFfcParameter({ productTypeId })).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getCableFfcParameterSuccess(response)));
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

export const putCableFfcParameterEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_PARAMETER),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetParameters(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getCableFfcParameter()),
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

const CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_PARAMETER_SUCCESS = (state, payload) => {
  return {
    ...state,
    cableffcParameter: {
      ...state.cableffcParameter,
      ...payload,
    },
  };
};


/* connector price */
export const getCableFfcConnectorPrice = () => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_PRICE,
  };
};

export const getCableFfcConnectorPriceSuccess = response => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_PRICE_SUCCESS,
    ...response.data,
  };
};

export const putCableFfcConnectorPrice = data => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_CONNECTOR_PRICE,
    data,
  };
};

export const getCableFfcConnectorPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.getCableFfcConnectorPrice()).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getCableFfcConnectorPriceSuccess(response)));
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

export const putCableFfcConnectorPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_CONNECTOR_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.putCableFfcConnectorPrice(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getCableFfcConnectorPrice()),
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

const CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    connectorPrice: {
      ...state.connectorPrice,
      ...payload,
    },
  };
};

export const getCableFfcConnector = () => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR,
  };
};

export const getCableFfcConnectorSuccess = response => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SUCCESS,
    ...response.data,
  };
};

export const getCableFfcConnectorEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.getCableFfcConnector()).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getCableFfcConnectorSuccess(response)));
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

const CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SUCCESS = (state, payload) => {
  return {
    ...state,
    connector: {
      ...state.connector,
      ...payload,
    },
  };
};

/* material price */
export const getCableFfcMaterialPrice = () => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_MATERIAL_PRICE,
  };
};

export const getCableFfcMaterialPriceSuccess = response => {
  const { data: { date, items: materialPrice } } = response;
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_MATERIAL_PRICE_SUCCESS,
    materialPrice,
    date,
  };
};

export const putCableFfcMaterialPrice = data => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_MATERIAL_PRICE,
    data,
  };
};

export const getCableFfcMaterialPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_MATERIAL_PRICE),
    mergeMap(action => {
      const { activeProductType: { value: productTypeId } } = state$.value.dataBase.common;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.getCableFfcMaterialPrice({ productTypeId })).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getCableFfcMaterialPriceSuccess(response)));
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

export const putCableFfcMaterialPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_MATERIAL_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.putCableFfcMaterialPrice(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getCableFfcMaterialPrice()),
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

const CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_MATERIAL_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    materialPrice: {
      ...state.materialPrice,
      ...payload,
    },
  };
};


/* connector spec price */
export const getCableFfcConnectorSpecPrice = () => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SPEC_PRICE,
  };
};

export const getCableFfcConnectorSpecPriceSuccess = response => {
  const { data: { date, items: connectorSpecPrice } } = response;
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SPEC_PRICE_SUCCESS,
    connectorSpecPrice,
    date,
  };
};

export const putCableFfcConnectorSpecPrice = data => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_CONNECTOR_SPEC_PRICE,
    data,
  };
};

export const getCableFfcConnectorSpecPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SPEC_PRICE),
    mergeMap(action => {
      const { activeProductType: { value: productTypeId } } = state$.value.dataBase.common;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.getCableFfcConnectorSpecPrice({ productTypeId })).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getCableFfcConnectorSpecPriceSuccess(response)));
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

export const putCableFfcConnectorSpecPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_CONNECTOR_SPEC_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.putCableFfcConnectorSpecPrice(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getCableFfcConnectorSpecPrice()),
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

const CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SPEC_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    connectorSpecPrice: {
      ...state.connectorSpecPrice,
      ...payload,
    },
  };
};


/* 補強板 */
export const getCableFfcReinforcementBoardPrice = () => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_REINFORCEMENT_BOARD_PRICE,
  };
};

export const getCableFfcReinforcementBoardPriceSuccess = response => {
  const { data: { date, items: reinforcementBoardPrice } } = response;
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_REINFORCEMENT_BOARD_PRICE_SUCCESS,
    reinforcementBoardPrice,
    date,
  };
};

export const putCableFfcReinforcementBoardPrice = data => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_REINFORCEMENT_BOARD_PRICE,
    data,
  };
};

export const getCableFfcReinforcementBoardPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_REINFORCEMENT_BOARD_PRICE),
    mergeMap(action => {
      const { activeProductType: { value: productTypeId } } = state$.value.dataBase.common;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.getCableFfcReinforcementBoardPrice({ productTypeId })).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getCableFfcReinforcementBoardPriceSuccess(response)));
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

export const putCableFfcReinforcementBoardPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_REINFORCEMENT_BOARD_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.putCableFfcReinforcementBoardPrice(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getCableFfcReinforcementBoardPrice()),
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

const CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_REINFORCEMENT_BOARD_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    reinforcementBoardPrice: {
      ...state.reinforcementBoardPrice,
      ...payload,
    },
  };
};


/* 輔料 */
export const getCableFfcAccessoriesPrice = () => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_ACCESSORIES_PRICE,
  };
};

export const getCableFfcAccessoriesPriceSuccess = response => {
  const { data: { date, items: accessoriesPrice } } = response;
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_ACCESSORIES_PRICE_SUCCESS,
    accessoriesPrice,
    date,
  };
};

export const putCableFfcAccessoriesPrice = data => {
  return {
    type: actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_ACCESSORIES_PRICE,
    data,
  };
};

export const getCableFfcAccessoriesPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_ACCESSORIES_PRICE),
    mergeMap(action => {
      const { activeProductType: { value: productTypeId } } = state$.value.dataBase.common;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.getCableFfcAccessoriesPrice({ productTypeId })).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getCableFfcAccessoriesPriceSuccess(response)));
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

export const putCableFfcAccessoriesPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FFC_CLEAN_SHEET___PUT_CABLE_FFC_ACCESSORIES_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFfcCleanSheetResource.putCableFfcAccessoriesPrice(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getCableFfcAccessoriesPrice()),
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

const CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_ACCESSORIES_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    accessoriesPrice: {
      ...state.accessoriesPrice,
      ...payload,
    },
  };
};


/** end all */


const initialCableffcParameter = {
  date: {},
  cableffcParameter: [],
};

const initialConnectorPrice = {
  date: {},
  connectorPrice: [],
};

const initialConnector = {
  date: {},
  connector: [],
};

const initialMaterialPrice = {
  date: {},
  materialPrice: [],
};

const initialConnectorSpecPrice = {
  date: {},
  connectorSpecPrice: [],
};

const initialReinforcementBoardPrice = {
  date: {},
  reinforcementBoardPrice: [],
};

const initialAccessoriesPricePrice = {
  date: {},
  accessoriesPrice: [],
};

const initialState = {
  cableffcParameter: initialCableffcParameter,
  connectorPrice: initialConnectorPrice,
  connector: initialConnector,
  materialPrice: initialMaterialPrice,
  connectorSpecPrice: initialConnectorSpecPrice,
  reinforcementBoardPrice: initialReinforcementBoardPrice,
  accessoriesPrice: initialAccessoriesPricePrice,
};

export const reducer = handleActions(
  {
    CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_PARAMETER_SUCCESS,
    CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_PRICE_SUCCESS,
    CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SUCCESS,
    CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_MATERIAL_PRICE_SUCCESS,
    CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_CONNECTOR_SPEC_PRICE_SUCCESS,
    CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_REINFORCEMENT_BOARD_PRICE_SUCCESS,
    CABLE_FFC_CLEAN_SHEET___GET_CABLE_FFC_ACCESSORIES_PRICE_SUCCESS,
  },
  initialState,
);

export const epics = [
  getCableFfcParameterEpic, putCableFfcParameterEpic,
  getCableFfcConnectorPriceEpic, putCableFfcConnectorPriceEpic,
  getCableFfcConnectorEpic,
  getCableFfcMaterialPriceEpic, putCableFfcMaterialPriceEpic,
  getCableFfcConnectorSpecPriceEpic, putCableFfcConnectorSpecPriceEpic,
  getCableFfcReinforcementBoardPriceEpic, putCableFfcReinforcementBoardPriceEpic,
  getCableFfcAccessoriesPriceEpic, putCableFfcAccessoriesPriceEpic,
];
