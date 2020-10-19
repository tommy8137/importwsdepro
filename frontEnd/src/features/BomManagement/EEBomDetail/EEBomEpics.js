import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import _get from 'lodash/get';
import _find from 'lodash/find';

import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import { round } from '~~utils/Math';
import {
  closeChooseVersionModal
} from '../BomManagementActions';
import {
  actionTypes,
  getEEBomDetailTabSuccess,
  getEEBomDetailTabFailed,
  getEdmVersionIdListSuccess,
  getTypesListSuccess
} from './EEBomActions';

export const getTypesListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM___GET_TYPES_LIST),
    mergeMap((action) => {
      return from(Resource.EEBomResource.getTypesList())
        .pipe(
          mergeMap(response => {
            return concat(
              of(getTypesListSuccess(response)),
            );
          }),
          catchError(error => {
            return concat(
              of(NotificationSystemActions.pushNotification({
                message: '取得 EEBOM Type1 List 有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

export const getEdmVersionIdListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM___GET_EEBOM_VERSION_ID_LIST),
    mergeMap((action) => {
      return from(Resource.EEBomResource.getEdmVersionIdList(action.params))
        .pipe(
          mergeMap(response => {
            console.log('eeBomEpic'); // 注意EEBomPersonalEpics也有類似邏輯
            // 在這裡順便塞小版號 (n.0, n.5...etc)
            const { edmVersionID, activeTab: { type } } = state$.value.eeBom;
            const edmVersionIdList = response.data;
            const statusVersion = _get(_find(edmVersionIdList, ['edm_version_id', edmVersionID]), 'status_version', null);
            const mainVersion = round(statusVersion.split('.')[0], 0, '-');
            const subVersion = round(statusVersion.split('.')[1], 0, '-');
            // AVL toggle 規則
            // 0.0  顯示但disabled
            // n.5  顯示且可編輯 (僅在approver，在其他tab時為disabled狀態)
            // m.0 (m > 0) 不顯示
            const disabledAvl = !(type === 'approver' && subVersion === 5);
            const showAvl = !(mainVersion > 0 && subVersion === 0);
            const avlSetting = { showAvl, disabledAvl, };
            return concat(
              of(getEdmVersionIdListSuccess(edmVersionIdList, statusVersion, avlSetting)),
            );
          }),
          catchError(error => {
            return concat(
              of(NotificationSystemActions.pushNotification({
                message: '取得 EEBOM VersionList 有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};


export const getEEBomDetailTabEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM___GET_EEBOM_DETAIL_TAB),
    mergeMap((action) => {
      return from(Resource.EEBomResource.getEEBomDetailTab(action.params))
        .pipe(
          mergeMap(response => {
            return concat(
              of(getEEBomDetailTabSuccess(response)),
              of(closeChooseVersionModal()),
            );
          }),
          catchError(error => {
            return concat(
              of(getEEBomDetailTabFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得 EEBOM Tab 有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};


export default [
  getEEBomDetailTabEpic,
  getEdmVersionIdListEpic,
  getTypesListEpic
];
