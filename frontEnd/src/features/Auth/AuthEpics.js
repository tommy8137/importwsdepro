import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import { push } from 'connected-react-router';
import Resource from '~~apis/resource';
import CommonUtils from '~~utils/CommonUtils';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import { actionTypes, loginSuccess, loginFailed, logoutSuccess, logoutFailed } from './AuthActions';


export const loginEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.AUTH___LOGIN),
    mergeMap((action) => {
      const { fromPath } = action;
      const data = action.value;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.AuthResource.login(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(loginSuccess(response, fromPath)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              if (error.response) {
                // console.log('error.data >>>', error.response.data);
                return concat(
                  of(loginFailed(error.response)),
                  of(LoadingActions.toggleLoadingStatus(false)),
                );
              } else if (error.message === 'Unexpected Error: Network Error') {
                console.log('error.message >>>', error.message);
                return concat(
                  of(NotificationSystemActions.pushNotification({
                    message: '網路連線有誤，請稍後再試',
                    level: 'error'
                  })),
                  of(LoadingActions.toggleLoadingStatus(false)),
                );
              }
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: '發生異常，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          ));
    }),
    catchError(error => console.log('[login] EPIC ERROR >>>', error.message))
  );
};

export const loginSuccessEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.AUTH___LOGIN_SUCCESS),
    map((action) => {
      const { data: { userid, username, access_token: token, token_type: type } } = action.response;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('tokentype', type);
      sessionStorage.setItem('username', username);
      sessionStorage.setItem('userid', userid);
      return push(action.fromPath);
    }
    )
  );
};

export const logout = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.AUTH___LOGOUT),
    mergeMap((action) => {
      return from(Resource.AuthResource.logout())
        .pipe(
          mergeMap(response => {
            return concat(
              of(sessionStorage.clear()),
              of(LoadingActions.toggleLoadingStatus(false)),
            );
          }),
          map(() => {
            return push('/');
          }),
        );
    }),
    catchError(of(NotificationSystemActions.pushNotification({
      message: '登出失敗，請稍後再試',
      level: 'error'
    })))
  );
};


export default [
  loginEpic,
  loginSuccessEpic,
  logout,
];

