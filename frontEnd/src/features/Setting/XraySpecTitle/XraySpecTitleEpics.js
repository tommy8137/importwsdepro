import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import { FILTER_INFO, LOADING_STATUS } from './XraySpecTitleConst';
import {
  actionTypes,
  getSpecTitleList,
  updateLoadingStatus,

  getSpecTitleListSuccess,
  getSpecTitleListFailed,

  getTypeIOptionsSuccess,
  getTypeIOptionsFailed,

  getTypeIIOptionsSuccess,
  getTypeIIOptionsFailed,

  getProductTypeOptionsSuccess,
  getProductTypeOptionsFailed,

  updateSpecTitleSuccess,
  updateSpecTitleFailed,
} from './XraySpecTitleActions';


/*
XraySpecTitle
*/
export const getSpecTitleListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY_SPEC_TITLE___GET_SPEC_TITLE_LIST),
    mergeMap((action) => {
      const { filterInfo } = state$.value.xraySpecTitle;
      const productType = filterInfo[FILTER_INFO.PRODUCT_TYPE];
      const typeI = filterInfo[FILTER_INFO.TYPE_I];
      const typeII = filterInfo[FILTER_INFO.TYPE_II];
      const params = {
        spec1: encodeURIComponent(productType),
        type1: encodeURIComponent(typeI),
        type2: encodeURIComponent(typeII),
        ...action.data
      };
      return from(Resource.SettingResource.getSpecTitleList(params))
        .pipe(
          map(response => getSpecTitleListSuccess(response)),
          catchError(error => {
            return concat(
              of(getSpecTitleListFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得 Spec Title List 有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

export const getTypeIOptionsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY_SPEC_TITLE___GET_TYPE_I_OPTIONS),
    mergeMap((action) => {
      return from(Resource.SettingResource.getTypeIOptions())
        .pipe(
          mergeMap(response => {
            return concat(
              of(getTypeIOptionsSuccess(response)),
              of(updateLoadingStatus(LOADING_STATUS.TYPE_I, false)),
            );
          }),
          catchError(error => {
            return concat(
              of(getTypeIOptionsFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得 Type I 清單有誤，請稍後再試',
                level: 'error'
              })),
              of(updateLoadingStatus(LOADING_STATUS.TYPE_I, false)),
            );
          })
        );
    })
  );
};

export const getTypeIIOptionsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY_SPEC_TITLE___GET_TYPE_II_OPTIONS),
    mergeMap((action) => {
      return from(Resource.SettingResource.getTypeIIOptions(action.data))
        .pipe(
          mergeMap(response => {
            return concat(
              of(getTypeIIOptionsSuccess(response)),
              of(updateLoadingStatus(LOADING_STATUS.TYPE_II, false)),
            );
          }),
          catchError(error => {
            return concat(
              of(getTypeIIOptionsFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得 Type II 清單有誤，請稍後再試',
                level: 'error'
              })),
              of(updateLoadingStatus(LOADING_STATUS.TYPE_II, false)),
            );
          })
        );
    })
  );
};

export const getProductTypeOptionsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY_SPEC_TITLE___GET_PRODUCT_TYPE_OPTIONS),
    mergeMap((action) => {
      return from(Resource.SettingResource.getProductTypeOptions(action.data))
        .pipe(
          mergeMap(response => {
            return concat(
              of(getProductTypeOptionsSuccess(response)),
              of(updateLoadingStatus(LOADING_STATUS.PRODUCT_TYPE, false)),
            );
          }),
          catchError(error => {
            return concat(
              of(getProductTypeOptionsFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得 Product Type 清單有誤，請稍後再試',
                level: 'error'
              })),
              of(updateLoadingStatus([LOADING_STATUS.PRODUCT_TYPE], false)),
            );
          })
        );
    })
  );
};

export const updateSpecTitleEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY_SPEC_TITLE___UPDATE_SPEC_TITLE),
    mergeMap((action) => {
      return from(Resource.SettingResource.updateSpecTitle(action.data))
        .pipe(
          mergeMap(response => {
            return concat(
              of(updateSpecTitleSuccess(response)),
              of(getSpecTitleList()),
              of(NotificationSystemActions.pushNotification({
                message: '更新成功',
                level: 'success'
              }))
            );
          }),
          catchError(error => {
            return concat(
              of(updateSpecTitleFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '更新失敗，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

/*
統一處理loading mask
*/
export const handelOnLoadingEpic = (action$, state$) => {
  const getSpecTitleListAction = CommonUtils.getTemplateActionTypes('XRAY_SPEC_TITLE___', 'GET_SPEC_TITLE_LIST');
  const needLoadingList = [
    getSpecTitleListAction.base,
  ];
  return action$.pipe(
    ofType(
      getSpecTitleListAction.base, getSpecTitleListAction.success, getSpecTitleListAction.failed,
    ),
    mergeMap((action) => {
      if (needLoadingList.includes(action.type)) {
        return of(LoadingActions.toggleLoadingStatus(true));
      }
      return of(LoadingActions.toggleLoadingStatus(false));
    }),
    catchError(error => {
      console.log('[handelOnLoading] Epic Error', error);
    })
  );
};

export default [
  getSpecTitleListEpic,
  getProductTypeOptionsEpic,
  getTypeIOptionsEpic,
  getTypeIIOptionsEpic,
  updateSpecTitleEpic,

  handelOnLoadingEpic
];
