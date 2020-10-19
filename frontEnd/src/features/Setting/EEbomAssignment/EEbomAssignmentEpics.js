import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import {
// EEbomAssignment
  actionTypes,
  resetFilterBar,
  getEEbomList,
  getEEbomListSuccess,
  getEEbomListFailed,
  searchUsersSuccess,
  searchUsersFailed,
  updateUsersSuccess,
  updateUsersFailed,
} from './EEbomAssignmentActions';


/*
EEbomAssignment
*/
export const getEEbomListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM_ASSIGNMENT___GET_EEBOM_LIST),
    mergeMap((action) => {
      return from(Resource.SettingResource.getEEbomList())
        .pipe(
          map(response => getEEbomListSuccess(response)),
          catchError(error => {
            return concat(
              of(getEEbomListFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得EEBOM LIST有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

export const searchUsersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM_ASSIGNMENT___SEARCH_USERS),
    mergeMap((action) => {
      return from(Resource.SettingResource.searchUsers(action.keyword))
        .pipe(
          map(response => searchUsersSuccess(action.field, response)),
          catchError(error => {
            return concat(
              of(searchUsersFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得清單有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

export const updateUsersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM_ASSIGNMENT___UPDATE_USERS),
    mergeMap((action) => {
      return from(Resource.SettingResource.updateUsers(action.data))
        .pipe(
          mergeMap(response => {
            return concat(
              of(updateUsersSuccess(response)),
              of(resetFilterBar()),
              of(getEEbomList()),
              of(NotificationSystemActions.pushNotification({
                message: '更新成功',
                level: 'success'
              }))
            );
          }),
          catchError(error => {
            return concat(
              of(updateUsersFailed(error.response)),
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
  const getEEbomListAction = CommonUtils.getTemplateActionTypes('EEBOM_ASSIGNMENT___', 'GET_EEBOM_LIST');
  const needLoadingList = [
    getEEbomListAction.base,
  ];
  return action$.pipe(
    ofType(
      getEEbomListAction.base, getEEbomListAction.success, getEEbomListAction.failed,
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
  getEEbomListEpic,
  searchUsersEpic,
  updateUsersEpic,

  handelOnLoadingEpic
];
