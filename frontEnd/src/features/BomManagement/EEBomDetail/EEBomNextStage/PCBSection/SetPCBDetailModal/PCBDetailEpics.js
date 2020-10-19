import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import { PATH } from './PcbDetailConst';
import {
  actionTypes,
  getPCBList,
  getPCBListSuccess,
  getPCBListFailed,

  deletePCBItemSuccess,
  deletePCBItemFailed,

  getPCBType2Success,
  getPCBType2Failed,

  getPcbLayoutSuccess,
  getPcbLayoutFailed,

  setPcbModalPath,
  getSpecByPnSuccess
} from './PCBDetailActions';


// GET ME SpecItemsList
export const getEEbomPCBListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM___GET_PCB_LIST),
    mergeMap((action) => {
      const { edmVersionID } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.getEEbomPCBList(edmVersionID))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPCBListSuccess(response, edmVersionID)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                })),
                of(getPCBListFailed(error)),
              );
            }
            )
          )
      );
    })
  );
};

export const getSpecByPnEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM___GET_SPEC_BY_PN),
    mergeMap((action) => {
      const { wistronpn } = action;
      const { edmVersionID, pcbModalInfo: { plant } } = state$.value.pcbDetail;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.getPCBSpecByPN(wistronpn, edmVersionID, plant))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getSpecByPnSuccess(response)),
                of(setPcbModalPath({
                  path: PATH.PCB_SPECS_MODAL,
                  wistronpn
                })),
              );
            }),
            catchError(error => {
              console.error('取得PCB Spec失敗 >>>', error.response);
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '查無此料，取得PCB Spec失敗',
                  level: 'error'
                })),
              );
            }
            )
          )
      );
    })
  );
};

export const deletePCBItemEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM___DELETE_PCB_ITEM),
    mergeMap((action) => {
      const { idList } = action;
      const { edmVersionID } = state$.value.pcbDetail;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.deleteEEbomPCB(idList))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(deletePCBItemSuccess(response)),
                of(getPCBList(edmVersionID)),
                of(NotificationSystemActions.pushNotification({
                  message: '刪除成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                })),
                of(deletePCBItemFailed(error)),
              );
            }
            )
          )
      );
    })
  );
};

export const createPCBItempic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM___CREATE_PCB_ITEM),
    mergeMap((action) => {
      const { data } = action;
      const { edmVersionID } = state$.value.pcbDetail;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.createEEbomPCB(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPCBList(edmVersionID)),
                of(setPcbModalPath({
                  path: PATH.PCB_DETAIL_MODAL,
                })),
                of(NotificationSystemActions.pushNotification({
                  message: '新增成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '新增失敗，請稍後再試',
                  level: 'error'
                })),
              );
            }
            )
          )
      );
    })
  );
};

export const updatePCBItemEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM___UPDATE_PCB_ITEM),
    mergeMap((action) => {
      const { data } = action;
      const { edmVersionID } = state$.value.pcbDetail;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updateEEbomPCB(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPCBList(edmVersionID)),
                of(setPcbModalPath({
                  path: PATH.PCB_DETAIL_MODAL,
                })),
                of(NotificationSystemActions.pushNotification({
                  message: '修改成功',
                  level: 'success'
                })),

              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '修改失敗，請稍後再試',
                  level: 'error'
                })),
              );
            }
            )
          )
      );
    })
  );
};

export const getPCBType2Epic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM___GET_PCB_TYPE2_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.getEEbomPCBType2())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPCBType2Success(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                })),
                of(getPCBType2Failed(error)),
              );
            }
            )
          )
      );
    })
  );
};

export const getPcbLayoutEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM___GET_PCB_LAYOUT),
    mergeMap((action) => {
      const { layoutName } = action;
      return from(Resource.EEBomResource.getPcbLayout(layoutName))
        .pipe(
          mergeMap(response => {
            return concat(
              of(getPcbLayoutSuccess(response)),
            );
          }),
          catchError(error => {
            return concat(
              of(getPcbLayoutFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得PCB Layout失敗，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }),
  );
};

/*
統一處理loading mask
*/
export const handelOnLoadingEpic = (action$, state$) => {
  const getPcbLayoutAction = CommonUtils.getTemplateActionTypes('EEBOM___', 'GET_PCB_LAYOUT');
  const needLoadingList = [
    getPcbLayoutAction.base,
  ];
  return action$.pipe(
    ofType(
      getPcbLayoutAction.base, getPcbLayoutAction.success, getPcbLayoutAction.failed,
    ),
    mergeMap((action) => {
      if (needLoadingList.includes(action.type)) {
        return of(LoadingActions.toggleLoadingStatus(true));
      }
      return of(LoadingActions.toggleLoadingStatus(false));
    }),
    catchError(error => {
      console.error('[handelOnLoading] Epic Error', error);
    })
  );
};
export default [
  getEEbomPCBListEpic,
  deletePCBItemEpic,
  createPCBItempic,
  updatePCBItemEpic,
  getSpecByPnEpic,
  getPCBType2Epic,
  getPcbLayoutEpic
];
