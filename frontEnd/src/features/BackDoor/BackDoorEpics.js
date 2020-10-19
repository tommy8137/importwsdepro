import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import { push } from 'connected-react-router';
import {
  actionTypes,
  loginBackDoorSuccess,
  loginBackDoorFailed
} from './BackDoorActions';


export const loginBackDoorEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BACK_DOOR___LOGIN),
    mergeMap((action) => {
      const { emplid } = action;
      return from(Resource.BackDoorResource.loginBackDoor(emplid))
        .pipe(
          mergeMap(response => {
            const { data: { username, access_token: token, token_type: type } } = response;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('tokentype', type);
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('userid', emplid);
            return concat(
              of(loginBackDoorSuccess(response)),
              of(push('/'))
            );
          }),
          catchError(error => {
            return concat(
              of(loginBackDoorFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: error.response.data,
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
  const loginBackDoorAction = CommonUtils.getTemplateActionTypes('BACK_DOOR___', 'LOGIN');
  const needLoadingList = [
    loginBackDoorAction.base,
  ];
  return action$.pipe(
    ofType(
      loginBackDoorAction.base, loginBackDoorAction.success, loginBackDoorAction.failed,
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
  // handelOnLoadingEpic,
  loginBackDoorEpic,
];
