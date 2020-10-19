import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, forkJoin, SubscriptionLike, concat } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import * as R from 'ramda';
import { resetFilterBarInfo } from '../SettingActions';
import { USER_MODAL_GET_FILTERTYPE_BY_RBACLIST, USER_MODAL_TRANSFORM_RBACLIST, USER_MODAL_GET_PRODUCTTYPE_BY_RBACLIST } from './AllAccountConst';

import {
  actionTypes,
  getUserList,
  getUserListSuccess,
  getUserListFailed,
  updateKeyword,
  updatePageInfo,
  // copy from permission
  toggleUserModal,
  getUserInfoSuccess,
  getUserInfoFailed,
  updateUserInfoSuccess,
  updateUserInfoFailed,
  removeUserSuccess,
  removeUserFailed,
  createUserSuccess,
  createUserFailed,
  getType1MenusSuccess,
  getProductTypeMenusSuccess,
  getType1MenusFailed,
  getProductTypeMenusFailed,
  getRbacListSuccess,
  getRbacListFailed,
  getCheckType1MenusSuccess,
  getCheckProductTypeMenusSuccess,
  getCheckType1MenusFailed,
  getCheckProductTypeMenusFailed,
  setFilterType

} from './AllAccountsActions';

export const getUserListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___GET_USER_LIST),
    mergeMap((action) => {
      const {
        allAccount: { currentPage, pageSize, keyword, sortInfo },
        setting: { filterBarInfo: { roleGroup, roleName } }
      } = state$.value;
      const originPage = {
        pages: currentPage,
        items: pageSize,
        keyword,
        role_group: roleGroup.join(',') || '',
        role_name: roleName || '',
        orderBy: CommonUtils.genOrderByFormat(sortInfo),
        ...action.params
      };
      return from(Resource.AllAccountResource.getUserList(originPage))
        .pipe(
          map(response => getUserListSuccess(response)),
          catchError(error => {
            return concat(
              of(getUserListFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得USER LIST有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

// Permission
export const getUserInfoEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___GET_USER_INFO),
    mergeMap((action) => {
      return from(Resource.AllAccountResource.getUserInfo(action.emplid))
        .pipe(
          mergeMap(response => {
            return concat(
              of(getUserInfoSuccess(response)),
              of(toggleUserModal(true))
            );
          }),
          catchError(error => {
            return concat(
              of(getUserInfoFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }), catchError(error => console.log('[getUserInfo] EPIC ERROR >>>', error.message))
  );
};


// Permission
export const openEditModalEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___OPEN_EDIT_MODAL),
    mergeMap((action) => {
      const { emplid } = action;
      return from(Resource.AllAccountResource.getUserInfo(emplid))
        .pipe(
          mergeMap(response => {
            return concat(
              of(getUserInfoSuccess(response)),
              of(toggleUserModal(true))
            );
          }),
          catchError(error => {
            return concat(
              of(getUserInfoFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }), catchError(error => console.log('[getUserInfo] EPIC ERROR >>>', error.message))
  );
};

export const removeUserEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___REMOVE_USER),
    mergeMap((action) => {
      const firstPage = {
        pages: 1,
        keyword: '',
        role_group: '',
        role_name: '',
      };
      return from(Resource.AllAccountResource.removeUser(action.emplid))
        .pipe(
          mergeMap(response => {
            return concat(
              of(removeUserSuccess(response)),
              of(getUserList(firstPage)),
              of(resetFilterBarInfo(), updateKeyword(''), updatePageInfo(1, 10)),
              of(NotificationSystemActions.pushNotification({
                message: '刪除成功',
                level: 'success'
              }))
            );
          }),
          catchError(error => {
            return concat(
              of(removeUserFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '刪除失敗，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    }), catchError(error => console.log('[removeUser] EPIC ERROR >>>', error.message))
  );
};

export const createUserEpic = (action$, state$) => {
  const onError = (error) => {
    console.log('onError >>>', error);
    if (error.response && error.response.data === 'account already exist') {
      return concat(
        of(createUserFailed(error.response)),
        of(NotificationSystemActions.pushNotification({
          message: '新增失敗，帳號已存在',
          level: 'error'
        })),
      );
    }
    return concat(
      of(createUserFailed(error.response)),
      of(NotificationSystemActions.pushNotification({
        message: '新增失敗，請稍後再試',
        level: 'error'
      })),
    );
  };

  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___CREATE_USER),
    mergeMap((action) => {
      const { userToAdd } = action;
      const firstPage = {
        pages: 1,
        keyword: '',
        role_group: '',
        role_name: '',
      };
      return from(Resource.AllAccountResource.createUser(userToAdd))
        .pipe(
          mergeMap(response => {
            return concat(
              of(createUserSuccess(response)),
              of(getUserList(firstPage)),
              of(resetFilterBarInfo(), updateKeyword(''), updatePageInfo(1, 10)),
              of(toggleUserModal(false)),
              of(NotificationSystemActions.pushNotification({
                message: '新增成功',
                level: 'success'
              })),
            );
          }),
          catchError(onError)
        );
    }), catchError(onError)
  );
};


export const updateUserInfoEpic = (action$, state$) => {
  const onError = (error) => {
    console.log('onError >>>', error);
    return concat(
      of(updateUserInfoFailed(error.response)),
      of(NotificationSystemActions.pushNotification({
        message: '更新資料失敗，請稍後再試',
        level: 'error'
      })),
    );
  };

  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___UPDATE_USER_INFO),
    mergeMap((action) => {
      const { info } = action;
      return from(Resource.AllAccountResource.updateUserInfo(info))
        .pipe(
          mergeMap(response => {
            // UPDATE成功
            return concat(
              of(updateUserInfoSuccess(response)),
              of(getUserList()),
              of(toggleUserModal(false)),
              of(NotificationSystemActions.pushNotification({
                message: '更新成功',
                level: 'success'
              })),
            );
          }),
          catchError(onError)
        );
    }), catchError(onError)
  );
};


export const getType1MenusEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___GET_TYPE1_MENUS),
    mergeMap((action) => {
      const { params } = action;
      return from(Resource.AllAccountResource.getType1Menus(params))
        .pipe(
          mergeMap(response => {
            return concat(
              of(getType1MenusSuccess(response)),
            );
          }),
          catchError(error => {
            return concat(
              of(getType1MenusFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得Type1 Menu有誤，請稍後再試',
                level: 'error'
              })),
            );
          })
        );
    }), catchError(error => console.log('[createUser] EPIC ERROR >>>', error.message))
  );
};

export const getProductTypeMenusEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___GET_PRODUCTTYPE_MENUS),
    mergeMap((action) => {
      const { params } = action;
      return from(Resource.AllAccountResource.getProductTypeMenus(params))
        .pipe(
          mergeMap(response => {
            return concat(
              of(getProductTypeMenusSuccess(response)),
            );
          }),
          catchError(error => {
            return concat(
              of(getProductTypeMenusFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得Product Type Menu有誤，請稍後再試',
                level: 'error'
              })),
            );
          })
        );
    }), catchError(error => console.log('[createUser] EPIC ERROR >>>', error.message))
  );
};


export const getCheckType1MenusEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___GET_CHECK_TYPE1_MENUS),
    mergeMap((action) => {
      const { params } = action;
      return from(Resource.SettingResource.getRbacList(params))
        .pipe(
          mergeMap(response => {
            const rbacList = USER_MODAL_TRANSFORM_RBACLIST(response.data);
            const filterType = USER_MODAL_GET_FILTERTYPE_BY_RBACLIST(rbacList);
            const type1Params = { eeme: filterType };
            return concat(
              of(getRbacListSuccess(response)),
              forkJoin(
                Resource.AllAccountResource.getType1Menus(type1Params)
              ).pipe(
                mergeMap(responses => {
                  return concat(
                    of(getCheckType1MenusSuccess(responses[0])),
                  );
                }),
              ) // end of pipe after forkjoin
            ); // end of mergeMap
          }),
          catchError(error => {
            return concat(
              of(getCheckType1MenusFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              })),
            );
          })
        );
    }), catchError(error => console.log('[createUser] EPIC ERROR >>>', error.message))
  );
};

export const getCheckProductTypeMenusEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___GET_CHECK_PRODUCTTYPE_MENUS),
    mergeMap((action) => {
      const { params } = action;
      return from(Resource.SettingResource.getRbacList(params))
        .pipe(
          mergeMap(response => {
            const rbacList = USER_MODAL_TRANSFORM_RBACLIST(response.data);
            const filterType = USER_MODAL_GET_PRODUCTTYPE_BY_RBACLIST(rbacList);
            const productTypeParams = { eeme: filterType };
            return concat(
              of(getRbacListSuccess(response)),
              forkJoin(
                Resource.AllAccountResource.getProductTypeMenus(productTypeParams)
              ).pipe(
                mergeMap(responses => {
                  return concat(
                    of(getCheckProductTypeMenusSuccess(responses[0])),
                  );
                }),
              ) // end of pipe after forkjoin
            ); // end of mergeMap
          }),
          catchError(error => {
            return concat(
              of(getCheckProductTypeMenusFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              })),
            );
          })
        );
    }), catchError(error => console.log('[createUser] EPIC ERROR >>>', error.message))
  );
};


export const getRbacListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.ALLACCOUNTS___GET_RBAC_LIST),
    mergeMap((action) => {
      const { params } = action;
      return from(Resource.SettingResource.getRbacList(params))
        .pipe(
          mergeMap(response => {
            const rbacList = USER_MODAL_TRANSFORM_RBACLIST(response.data);
            const filterType = USER_MODAL_GET_FILTERTYPE_BY_RBACLIST(rbacList);
            return concat(
              of(getRbacListSuccess(response)),
              of(setFilterType(filterType)),
            ); // end of mergeMap
          }),
          catchError(error => {
            return concat(
              of(getRbacListFailed(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              })),
            );
          })
        );
    }), catchError(error => console.log('[createUser] EPIC ERROR >>>', error.message))
  );
};


/*
統一處理loading mask
*/
export const handelOnLoadingEpic = (action$, state$) => {
  const getType1MenusEpicAction = CommonUtils.getTemplateActionTypes('ALLACCOUNTS___', 'GET_TYPE1_MENUS');
  const getProductTypeEpicAction = CommonUtils.getTemplateActionTypes('ALLACCOUNTS___', 'GET_PRODUCTTYPE_MENUS');
  const getUserListEpicAction = CommonUtils.getTemplateActionTypes('ALLACCOUNTS___', 'GET_USER_LIST');
  const createUserEpicAction = CommonUtils.getTemplateActionTypes('ALLACCOUNTS___', 'CREATE_USER');
  const updateUserInfoEpicAction = CommonUtils.getTemplateActionTypes('ALLACCOUNTS___', 'UPDATE_USER_INFO');
  const getRbacListEpicAction = CommonUtils.getTemplateActionTypes('ALLACCOUNTS___', 'GET_RBAC_LIST');
  const getCheckType1MenusEpicAction = CommonUtils.getTemplateActionTypes('ALLACCOUNTS___', 'GET_CHECK_TYPE1_MENUS');
  const getCheckProductTypeMenusEpicAction = CommonUtils.getTemplateActionTypes('ALLACCOUNTS___', 'GET_CHECK_PRODUCTTYPE_MENUS');
  const needLoadingList = [
    getUserListEpicAction.base,
    getType1MenusEpicAction.base,
    createUserEpicAction.base,
    updateUserInfoEpicAction.base,
    getRbacListEpicAction.base,
    getCheckType1MenusEpicAction.base,
    getProductTypeEpicAction.base,
    getCheckProductTypeMenusEpicAction.base
  ];

  return action$.pipe(
    ofType(
      getUserListEpicAction.base, getUserListEpicAction.success, getUserListEpicAction.failed,
      getType1MenusEpicAction.base, getType1MenusEpicAction.success, getType1MenusEpicAction.failed,
      getProductTypeEpicAction.base, getProductTypeEpicAction.success, getProductTypeEpicAction.failed,
      createUserEpicAction.base, createUserEpicAction.success, createUserEpicAction.failed,
      updateUserInfoEpicAction.base, updateUserInfoEpicAction.success, updateUserInfoEpicAction.failed,
      getRbacListEpicAction.base, getRbacListEpicAction.success, getRbacListEpicAction.failed,
      getCheckType1MenusEpicAction.base, getCheckType1MenusEpicAction.success, getCheckType1MenusEpicAction.failed,
      getCheckProductTypeMenusEpicAction.base, getCheckProductTypeMenusEpicAction.success, getCheckProductTypeMenusEpicAction.failed,
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
  getUserListEpic,
  handelOnLoadingEpic,
  // copy from permission
  getUserInfoEpic,
  updateUserInfoEpic,
  removeUserEpic,
  createUserEpic,
  getType1MenusEpic,
  getProductTypeMenusEpic,
  openEditModalEpic,
  getRbacListEpic,
  getCheckType1MenusEpic,
  getCheckProductTypeMenusEpic
];
