import { handleActions } from 'redux-actions';
import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

const actionTypes = {
  CABLE_FPC_CLEAN_SHEET___GET_FPC_PARAMETERS: 'CABLE_FPC_CLEAN_SHEET___GET_FPC_PARAMETERS',
  CABLE_FPC_CLEAN_SHEET___GET_FPC_PARAMETERS_SUCCESS: 'CABLE_FPC_CLEAN_SHEET___GET_FPC_PARAMETERS_SUCCESS',
  CABLE_FPC_CLEAN_SHEET___PUT_FPC_PARAMETERS: 'CABLE_FPC_CLEAN_SHEET___PUT_FPC_PARAMETERS',

  CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_MATERIAL_UNIT_PRICE: 'CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_MATERIAL_UNIT_PRICE',
  CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_MATERIAL_UNIT_PRICE_SUCCESS: 'CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_MATERIAL_UNIT_PRICE_SUCCESS',
  CABLE_FPC_CLEAN_SHEET___PUT_CABLE_FPC_MATERIAL_UNIT_PRICE: 'CABLE_FPC_CLEAN_SHEET___PUT_CABLE_FPC_MATERIAL_UNIT_PRICE',

  CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_SHIELDING_PRICE: 'CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_SHIELDING_PRICE',
  CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_SHIELDING_PRICE_SUCCESS: 'CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_SHIELDING_PRICE_SUCCESS',
  CABLE_FPC_CLEAN_SHEET___PUT_CABLE_FPC_SHIELDING_PRICE: 'CABLE_FPC_CLEAN_SHEET___PUT_CABLE_FPC_SHIELDING_PRICE',
};

export const getFpcParameters = () => {
  return {
    type: actionTypes.CABLE_FPC_CLEAN_SHEET___GET_FPC_PARAMETERS,
  };
};

export const getFpcParametersSuccess = response => {
  return {
    type: actionTypes.CABLE_FPC_CLEAN_SHEET___GET_FPC_PARAMETERS_SUCCESS,
    ...response.data,
  };
};

export const putFpcParameters = data => {
  return {
    type: actionTypes.CABLE_FPC_CLEAN_SHEET___PUT_FPC_PARAMETERS,
    data,
  };
};

export const getFpcParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FPC_CLEAN_SHEET___GET_FPC_PARAMETERS),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFpcCleanSheetResource.getFpcParameters()).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getFpcParametersSuccess(response)));
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

export const putFpcParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FPC_CLEAN_SHEET___PUT_FPC_PARAMETERS),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetParameters(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getFpcParameters()),
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

const CABLE_FPC_CLEAN_SHEET___GET_FPC_PARAMETERS_SUCCESS = (state, payload) => {
  return {
    ...state,
    cablefpcParameter: {
      ...state.cablefpcParameter,
      ...payload,
    },
  };
};


export const getCableFpcMaterialUnitPrice = () => {
  return {
    type: actionTypes.CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_MATERIAL_UNIT_PRICE,
  };
};

export const getCableFpcMaterialUnitPriceSuccess = response => {
  return {
    type: actionTypes.CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_MATERIAL_UNIT_PRICE_SUCCESS,
    ...response.data,
  };
};

export const putCableFpcMaterialUnitPrice = data => {
  return {
    type: actionTypes.CABLE_FPC_CLEAN_SHEET___PUT_CABLE_FPC_MATERIAL_UNIT_PRICE,
    data,
  };
};

export const getCableFpcMaterialUnitPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_MATERIAL_UNIT_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFpcCleanSheetResource.getCableFpcMaterialUnitPrice()).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getCableFpcMaterialUnitPriceSuccess(response)));
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

export const putCableFpcMaterialUnitPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FPC_CLEAN_SHEET___PUT_CABLE_FPC_MATERIAL_UNIT_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFpcCleanSheetResource.putCableFpcMaterialUnitPrice(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getCableFpcMaterialUnitPrice()),
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

const CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_MATERIAL_UNIT_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    materialUnitPrice: {
      ...state.materialUnitPrice,
      ...payload,
    },
  };
};

export const getCableFpcShieldingPrice = () => {
  return {
    type: actionTypes.CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_SHIELDING_PRICE,
  };
};

export const getCableFpcShieldingPriceSuccess = response => {
  return {
    type: actionTypes.CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_SHIELDING_PRICE_SUCCESS,
    ...response.data,
  };
};

export const putCableFpcShieldingPrice = data => {
  return {
    type: actionTypes.CABLE_FPC_CLEAN_SHEET___PUT_CABLE_FPC_SHIELDING_PRICE,
    data,
  };
};

export const getCableFpcShieldingPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_SHIELDING_PRICE),
    mergeMap(action => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFpcCleanSheetResource.getCableFpcShieldingPrice()).pipe(
          mergeMap(response => {
            return concat(of(LoadingActions.toggleLoadingStatus(false)), of(getCableFpcShieldingPriceSuccess(response)));
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

export const putCableFpcShieldingPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.CABLE_FPC_CLEAN_SHEET___PUT_CABLE_FPC_SHIELDING_PRICE),
    mergeMap(action => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.CableFpcCleanSheetResource.putCableFpcShieldingPrice(data)).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getCableFpcShieldingPrice()),
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

const CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_SHIELDING_PRICE_SUCCESS = (state, payload) => {
  return {
    ...state,
    shieldingPrice: {
      ...state.shieldingPrice,
      ...payload,
    },
  };
};


const initialShieldingPrice = {
  date: {},
  shieldingPrice: [],
};

const initialMaterialUnitPrice = {
  date: {},
  materialUnitPrice: [],
};

const initialCablefpcParameter = {
  date: {},
  cablefpcParameter: [],
};

const initialState = {
  cablefpcParameter: initialCablefpcParameter,
  materialUnitPrice: initialMaterialUnitPrice,
  shieldingPrice: initialShieldingPrice,
};

export const reducer = handleActions(
  {
    CABLE_FPC_CLEAN_SHEET___GET_FPC_PARAMETERS_SUCCESS,
    CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_MATERIAL_UNIT_PRICE_SUCCESS,
    CABLE_FPC_CLEAN_SHEET___GET_CABLE_FPC_SHIELDING_PRICE_SUCCESS,
  },
  initialState,
);

export const epics = [
  getFpcParametersEpic, putFpcParametersEpic,
  getCableFpcMaterialUnitPriceEpic, putCableFpcMaterialUnitPriceEpic,
  getCableFpcShieldingPriceEpic, putCableFpcShieldingPriceEpic,
];
