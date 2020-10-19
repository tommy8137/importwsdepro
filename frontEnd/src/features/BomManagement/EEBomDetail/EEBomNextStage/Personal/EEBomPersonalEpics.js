import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin, empty, EMPTY } from 'rxjs';
import { ofType } from 'redux-observable';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { push } from 'connected-react-router';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import { round } from '~~utils/Math';

import {
  actionTypes,
  actionPrefix,
  getTableData,
  toggleCopyModal,
  setAlertMessage,
} from './EEBomPersonalActions';

import {
  getEdmVersionIdListSuccess,
} from '../../EEBomActions';


// 排序有改變，就要call api重新取得table
export const updateSortInfoEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes[`${actionPrefix}UPDATE_SORT_INFO`]),
    mergeMap((action) => {
      return of(getTableData());
    }
    )
  );
};

export const getPersonalDataEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_PERSONAL_TABLE_DATA');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const tabType = state$.value.eeBom.activeTab.type;
      const eeBomProjectID = state$.value.eeBom.activeTab.eebom_project_id;
      const edmVersionId = state$.value.eeBom.activeTab.edm_version_id;
      const edmVersion = state$.value.eeBom.activeTab.edm_version;
      const { sortInfo, twoLevelFilterInfo } = state$.value.eeBomPersonalReducer;
      const orderBy = CommonUtils.genOrderByFormat(sortInfo);
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.EEBomResource.getEEBomDetailTable({ tabType, edmVersionId, orderBy }),
          Resource.EEBomResource.getEdmVersionIdList({ eeBomProjectID, edmVersion })
        )
          .pipe(
            mergeMap(response => {
              console.log('EEBomPersonalEpic'); // 注意EEBomEpics也有類似邏輯
              // 在這裡順便塞小版號 (n.0, n.5...etc)
              const { edmVersionID, activeTab: { type } } = state$.value.eeBom;
              const edmVersionIdList = response[1].data;
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
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getEdmVersionIdListSuccess(edmVersionIdList, statusVersion, avlSetting)),
                of({
                  type: SUCCESS_ACTION_TYPE,
                  data: response[0].data,
                }),
              );
            }),
            catchError(error => {
              if (error.response.data === 'not assign type1 for this account') {
                return concat(
                  of(LoadingActions.toggleLoadingStatus(false)),
                  of(NotificationSystemActions.pushNotification({
                    message: '你沒有權限',
                    level: 'error'
                  })),
                  of(push('/'))
                );
              }
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.log(error))
  );
};

export const updatePersonalCheckEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_PERSONAL_CHECK');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { idList } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updatePersonalCheck(idList))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTableData()),
                of(NotificationSystemActions.pushNotification({
                  message: '提交成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[getPersonalDataEpic] EPIC ERROR >>>', error.message))
  );
};

export const savePersonalDataEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'SAVE_PERSONAL_TABLE');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updateEEBomTableItems(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of({
                  type: SUCCESS_ACTION_TYPE,
                  lastModifiedItems: data.map(x => x.id)
                }),
                // 更新完重要一次table更新originalTableData
                of(getTableData()),
                of(NotificationSystemActions.pushNotification({
                  message: '修改成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '修改失敗，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[savePersonalDataEpic] EPIC ERROR >>>', error.message))
  );
};

export const submitPersonalDataEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'SUBMIT_PERSONAL_TABLE');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { submitData } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updatePersonalSubmit(submitData))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                // 更新完重要一次table更新originalTableData
                of(getTableData()),
                // of({
                //   type: SUCCESS_ACTION_TYPE,
                //   data: response.data,
                // }),
                of(NotificationSystemActions.pushNotification({
                  message: '提交成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[savePersonalDataEpic] EPIC ERROR >>>', error.message))
  );
};

/* ************************************************  APPROVER ************************************************************ */
export const updateLeaderCheckEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_LEADER_CHECK');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { idList } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updateLeaderChecked(idList))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTableData()),
                of(NotificationSystemActions.pushNotification({
                  message: '提交成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[getPersonalDataEpic] EPIC ERROR >>>', error.message))
  );
};


export const leaderApproveEEBOMEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'LEADER_APPROVE_EEBOM_BY_TYPE');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { bomType, versionRemark } = action;
      const edmVersionId = state$.value.eeBom.activeTab.edm_version_id;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.leaderApproveBom(bomType, edmVersionId, versionRemark))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTableData()),
                of(NotificationSystemActions.pushNotification({
                  message: bomType === 'pcb' ? 'PCB 審核成功' : '審核成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: 'Approve出錯',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[getPersonalDataEpic] EPIC ERROR >>>', error.message))
  );
};


export const saveLeaderTableEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'SAVE_LEADER_TABLE');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updateEEBomApproverTableItems(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of({
                  type: SUCCESS_ACTION_TYPE,
                  lastModifiedItems: data.map(x => x.id)
                }),
                // 更新完重要一次table更新originalTableData
                of(getTableData()),
                of(NotificationSystemActions.pushNotification({
                  message: '修改成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '修改失敗，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[saveLeaderTableEpic] EPIC ERROR >>>', error.message))
  );
};

/* ************************************************  APPROVER ************************************************************ */


export const updatePCBPersonalCheckEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_PCB_PERSONAL_CHECK');

  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updateEEbomPCBPersonalCheck(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTableData()),
                of(NotificationSystemActions.pushNotification({
                  message: '提交成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[getPersonalDataEpic] EPIC ERROR >>>', error.message))
  );
};

export const updatePCBPersonalSubmitEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_PCB_PERSONAL_SUBMIT');

  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updateEEbomPCBPersonalSubmit(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTableData()),
                of(NotificationSystemActions.pushNotification({
                  message: '提交成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[getPersonalDataEpic] EPIC ERROR >>>', error.message))
  );
};

export const updatePCBLeaderCheckEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_PCB_LEADER_CHECK');
  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updateEEbomPCBLeaderCheck(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTableData()),
                of(NotificationSystemActions.pushNotification({
                  message: '提交成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '提交失敗，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[getPersonalDataEpic] EPIC ERROR >>>', error.message))
  );
};

export const updatePCBLeaderSubmitEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_PCB_LEADER_SUBMIT');

  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updateEEbomPCBLeaderSubmit(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTableData()),
                of(NotificationSystemActions.pushNotification({
                  message: '提交成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '提交失敗，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[updatePCBLeaderSubmitEpic] EPIC ERROR >>>', error.message))
  );
};


export const updateLeaderSubmitEpic = (action$, state$) => {
  const {
    base: BASE_ACTION_TYPE,
    success: SUCCESS_ACTION_TYPE,
    failed: FAILED_ACTION_TYPE
  } = CommonUtils.getTemplateActionTypes(actionPrefix, 'UPDATE_LEADER_SUBMIT');

  return action$.pipe(
    ofType(BASE_ACTION_TYPE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.updateEEbomLeaderSubmit(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTableData()),
                of(NotificationSystemActions.pushNotification({
                  message: '提交成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => console.error('[updateLeaderSubmitEpic] EPIC ERROR >>>', error.message))
  );
};

export const getCopyPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.EEBOM_PERSONAL_PAGE___GET_EEBOM_COPY_PRICE),
    mergeMap((action) => {
      return from(Resource.EEBomResource.getCostByCopy(action.data))
        .pipe(
          mergeMap(response => {
            return concat(
              of({
                type: actionTypes[`${actionPrefix}GET_EEBOM_COPY_PRICE_SUCCESS`],
                data: response.data,
              }),
              of(toggleCopyModal(false)),
            );
          }),
          catchError(error => {
            return concat(
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};


export const triggerRefreshPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes[`${actionPrefix}TRIGGER_EEBOM_REFRESH_PRICE`]),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.EEBomResource.triggerRefreshPrice(action.edmVersion))
          .pipe(
            mergeMap(response => {
              // 成功trigger refresh的話 刷新頁面重load資料
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getTableData()),
              );
            }),
            catchError(error => {
              // 後端回傳400 「Bom already start editing」
              // 顯示Alert 「The BOM have been edited. You can't refresh the information.」

              if (_get(error, 'response.data', '') === 'Bom already start editing') {
                return concat(
                  of(LoadingActions.toggleLoadingStatus(false)),
                  of(setAlertMessage('The BOM have been edited. You can\'t refresh the information.')),
                );
              }
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error',
                }))
              );
            })
          ));
    })
  );
};


export default [
  getPersonalDataEpic,
  updatePersonalCheckEpic,
  savePersonalDataEpic,
  submitPersonalDataEpic,
  updateLeaderCheckEpic,
  leaderApproveEEBOMEpic,
  updatePCBPersonalCheckEpic,
  updatePCBPersonalSubmitEpic,
  saveLeaderTableEpic,
  updateSortInfoEpic,
  updatePCBLeaderCheckEpic,
  updatePCBLeaderSubmitEpic,
  updateLeaderSubmitEpic,
  getCopyPriceEpic,
  triggerRefreshPriceEpic,
];
