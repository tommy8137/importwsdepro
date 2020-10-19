import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin, empty, EMPTY } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

import {
  actionTypes,
  getPartItemDetailSuccess,
  getPartItemDetailFailed,
  getPartItemLayoutSuccess,
  getPartItemLayoutFailed,
  getPartItemDataSuccess,
  updatePartItemDetailSuccess,
  getPartItemPriceSuccess,
  togglePartItem,
  updatePartItemDetailFailed
} from './PartlistActions';

import {
  getBomItemList,
  getBomDetail,
} from '../BomDetailActions';


export const getPartItemDataEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PARTLIST___GET_PART_ITEM_DATA),
    mergeMap((action) => {
      const { partlistName, bomId, productTypeId, productTypeName } = action;
      const { bomID: bomProjectId, currentVersion: { value: versionid }, assignItem: { bomDesigneeID } } = state$.value.bomDetail;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.PartlistResource.getPartlistLayout(partlistName, productTypeId, productTypeName, bomProjectId),
          Resource.PartlistResource.getPartItemDetail(bomId, versionid, productTypeId, productTypeName),
          Resource.PartlistResource.getPartItemPrice(bomId, versionid),
          Resource.BomDetailResource.getBomItem(bomProjectId, bomDesigneeID, bomId, { versionid })
        ).pipe(
          mergeMap(responses => {
            const { data: {
              part_size_ef: ef,
              part_size_h: h,
              part_size_l: l,
              part_size_l2: l2,
              part_size_m: m,
              part_size_w: w,
              part_size_w2: w2,
              part_weight: partWeight,
              thickness,
            } } = responses[3];
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getPartItemLayoutSuccess(responses[0])),
              of(getPartItemDetailSuccess(responses[1])),
              of(getPartItemPriceSuccess(responses[2])),
              of(getPartItemDataSuccess({ ef, h, l, l2, m, w, w2, partWeight, thickness })),
            );
          }),
          catchError(error => {
            return concat(
              of(getPartItemLayoutFailed(error.response)),
              of(getPartItemDetailFailed(error.response)),
              of(LoadingActions.toggleLoadingStatus(false)),
              of(NotificationSystemActions.pushNotification({
                message: '此 Partlist 尚未建置完成。',
                level: 'error'
              }))
            );
          }),
        )
      );
    }),
    catchError(error => concat(
      of(LoadingActions.toggleLoadingStatus(false)),
      of(NotificationSystemActions.pushNotification({
        message: '取得BOM資料有誤，請稍後再試',
        level: 'error'
      })),
    ))
  );
};

// PUT: update part item detail
export const updatePartItemDetailEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PARTLIST___UPDATE_PART_ITEM_DETAIL),
    mergeMap((action) => {
      const { partItemInfo: { productTypeId, productTypeName } } = state$.value.partlist;
      const { bomID, } = state$.value.bomDetail;
      const { bomId, partlistName, initialValues, } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PartlistResource.updatePartItemDetail(bomId, partlistName, initialValues, productTypeId, productTypeName))
          .pipe(
            mergeMap(response => {
              console.log('Part List calculate result', response.data.calulateResult.forDebug.summary);
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(updatePartItemDetailSuccess(response)),
                of(getBomDetail({ bomID })),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                })),
                of(togglePartItem(false)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(updatePartItemDetailFailed(error.response)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料失敗，請稍後再試',
                  level: 'error'
                }))
              );
            })
          )
      );
    }),
  );
};

export default [
  getPartItemDataEpic,
  updatePartItemDetailEpic
];

