import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import {
  actionTypes,
  getContentTables,
  getTableTypeListSuccess,
  getTableTypeListFailed,
  getContentTablesSuccess,
  getContentTablesFailed,
  downloadSuccess,
  downloadFailed,
  uploadSuccess,
  uploadFailed,
} from './CostGeneratorDatabaseActions';


export const getTableTypeListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.COSTGENERATOR_DATABASE___GET_TABLE_TYPE_LIST),
    mergeMap((action) => {
      return from(Resource.CostGeneratorResource.getTableTypeList())
        .pipe(
          map(response => getTableTypeListSuccess(response)),
          catchError(error => {
            return concat(
              of(getTableTypeListFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }),
    catchError(error => console.log('[getTableType] EPIC ERROR >>>', error.message))
  );
};

export const getContentTablesEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.COSTGENERATOR_DATABASE___GET_CONTENT_TABLES),
    mergeMap((action) => {
      return from(Resource.CostGeneratorResource.getContentTables(action.params))
        .pipe(
          map(response => getContentTablesSuccess(response)),
          catchError(error => {
            return concat(
              of(getContentTablesFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }),
    catchError(error => console.log('[getContentTables] EPIC ERROR >>>', error.message))
  );
};

export const downloadEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.COSTGENERATOR_DATABASE___DOWNLOAD),
    mergeMap((action) => {
      const { tableType, tableName } = action;
      return from(Resource.CostGeneratorResource.download(tableType, tableName))
        .pipe(
          map(response => downloadSuccess(response)),
          catchError(error => {
            return concat(
              of(downloadFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '下載資料有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }),
    catchError(error => console.log('[download] EPIC ERROR >>>', error.message))
  );
};

export const uploadEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.COSTGENERATOR_DATABASE___UPLOAD),
    mergeMap((action) => {
      const { tableType, tableName, file } = action;
      const { costgeneratorDatabase } = state$.value;
      const params = {
        type: costgeneratorDatabase.activeTableType,
        orderBy: CommonUtils.genOrderByFormat(costgeneratorDatabase.sortInfo),
      };
      return from(Resource.CostGeneratorResource.upload(tableType, tableName, file))
        .pipe(
          mergeMap(response => {
            return concat(
              of(uploadSuccess(response)),
              of(getContentTables(params)),
              of(NotificationSystemActions.pushNotification({
                message: '上傳資料成功',
                level: 'success'
              }))
            );
          }),
          catchError(error => {
            return concat(
              of(uploadFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '上傳資料失敗，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }),
    catchError(error => console.log('[upload] EPIC ERROR >>>', error.message))
  );
};

/*
統一處理loading mask
*/
export const handelOnLoadingEpic = (action$, state$) => {
  const getTableTypeAction = CommonUtils.getTemplateActionTypes('COSTGENERATOR_DATABASE___', 'GET_TABLE_TYPE_LIST');
  const getContentTableAction = CommonUtils.getTemplateActionTypes('COSTGENERATOR_DATABASE___', 'GET_CONTENT_LIST');
  const downloadAction = CommonUtils.getTemplateActionTypes('COSTGENERATOR_DATABASE___', 'DOWNLOAD');
  const uploadAction = CommonUtils.getTemplateActionTypes('COSTGENERATOR_DATABASE___', 'UPLOAD');
  const needLoadingList = [
    getTableTypeAction.base,
    getContentTableAction.base,
    downloadAction.base,
    uploadAction.base,
  ];
  return action$.pipe(
    ofType(
      getTableTypeAction.base, getTableTypeAction.success, getTableTypeAction.failed,
      getContentTableAction.base, getContentTableAction.success, getContentTableAction.failed,
      downloadAction.base, downloadAction.success, downloadAction.failed,
      uploadAction.base, uploadAction.success, uploadAction.failed,
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
  getTableTypeListEpic,
  getContentTablesEpic,
  downloadEpic,
  uploadEpic,
  handelOnLoadingEpic
];

