import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import {
  actionTypes,
  getRoleGroupOptionsSuccess,
  getRoleGroupOptionsFailed,
  getRoleNameOptionsSuccess,
  getRoleNameOptionsFailed,
} from './SettingActions';


/*
  Role management & All Accounts
*/

export const getRoleGroupOptionsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.SETTING__GET_ROLE_GROUP_OPTIONS),
    mergeMap((action) => {
      return from(Resource.SettingResource.getRoleGroup())
        .pipe(
          mergeMap(response => {
            return concat(
              of(getRoleGroupOptionsSuccess(response)),
            );
          }),
          catchError(error => {
            return concat(
              of(getRoleGroupOptionsFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得 Role Group 選單有誤，請稍後再試',
                level: 'error'
              })),
            );
          })
        );
    })
  );
};

export const getRoleNameOptionsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.SETTING__GET_ROLE_NAME_OPTIONS),
    mergeMap((action) => {
      const { roleGroup } = action;
      return from(Resource.SettingResource.getRoleName(roleGroup))
        .pipe(
          mergeMap(response => {
            return concat(
              of(getRoleNameOptionsSuccess(response)),
            );
          }),
          catchError(error => {
            return concat(
              of(getRoleNameOptionsFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得 Role Name 選單有誤，請稍後再試',
                level: 'error'
              })),
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
  const getEEbomListAction = CommonUtils.getTemplateActionTypes('SETTING___', 'GET_EEBOM_LIST');
  const getSpecTitleListAction = CommonUtils.getTemplateActionTypes('SETTING___', 'GET_SPEC_TITLE_LIST');
  const needLoadingList = [
    getEEbomListAction.base,
    getSpecTitleListAction.base,
  ];
  return action$.pipe(
    ofType(
      getEEbomListAction.base, getEEbomListAction.success, getEEbomListAction.failed,
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
  // role management & all accounts
  getRoleGroupOptionsEpic,
  getRoleNameOptionsEpic,

  handelOnLoadingEpic
];
