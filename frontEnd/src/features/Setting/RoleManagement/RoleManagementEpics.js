import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import {
  getRoleGroupOptions
} from '~~features/Setting/SettingActions';
import {
  actionTypes,
  getPolicyRole,
  getRoles,
  toggleCreateRoleModal,
  createRoleSuccess,
  getPolicySuccess,
  getRolesSuccess,
  getResourcesSuccess,
  getPolicyRoleSuccess,
} from './RoleManagementActions';

function getRsId(state$) {
  return state$.value.roleManagement.selectedResource.value;
}

const SORTER_MAPPING = {
  roleGroup: 'role_group',
};
function getSorterForQuery(sorter) {
  if (!sorter.columnKey) return [];

  return CommonUtils.genOrderByFormat([
    {
      sortOrder: sorter.order,
      dataIndex: SORTER_MAPPING[sorter.columnKey],
    }
  ]);
}

export const createRoleEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.SETTING_ROLE_MAGT___DO_CREATE_ROLE),
    mergeMap((action) => {
      const { roleInfo } = action;
      return from(Resource.SettingResource.doCreateRole(roleInfo))
        .pipe(
          mergeMap((response) => {
            const { data } = response;
            return concat(
              of(createRoleSuccess(data)),
              of(toggleCreateRoleModal(false)),
              of(getPolicyRole(getRsId(state$))),
              of(getRoles(getRsId(state$))),
              of(getRoleGroupOptions()),
            );
          }),
          catchError(error => {
            console.error('::::: createRoleEpic catchError', error);
            return concat(
              of(NotificationSystemActions.pushNotification({
                message: '建立角色有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

export const updateRoleEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.SETTING_ROLE_MAGT___UPDATE_ROLE),
    mergeMap((action) => {
      const { roleInfo, policyRoleInfo } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.SettingResource.updateRole(roleInfo),
          Resource.SettingResource.updatePolicyRole(policyRoleInfo),
        ).pipe(
          mergeMap(responses => {
            return concat(
              of(getPolicyRole(getRsId(state$))),
              of(getRoles(getRsId(state$))),
              of(getRoleGroupOptions()),
              of(LoadingActions.toggleLoadingStatus(false)),
            );
          }),
        ) // end of pipe after forkjoin
      ); // end of mergeMap
    }),
    catchError(error => concat(
      of(NotificationSystemActions.pushNotification({
        message: '更新角色有誤，請稍後再試',
        level: 'error'
      })),
      of(LoadingActions.toggleLoadingStatus(false)),
    ))
  );
};

export const deleteRolesEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.SETTING_ROLE_MAGT___DELETE_ROLE),
    mergeMap((action) => {
      const { roleIds } = action;
      return from(Resource.SettingResource.deleteRoles(roleIds))
        .pipe(
          mergeMap((response) => {
            const { data } = response;
            return concat(
              of(getPolicyRole(getRsId(state$))),
              of(getRoles(getRsId(state$))),
              of(getRoleGroupOptions()),
            );
          }),
          catchError(error => {
            let errorMsg = '刪除角色有誤，請稍後再試';

            if (error.response &&  error.response.data === 'E00001') {
              errorMsg = '角色已被指派，請解除指派後再進行刪除';
            }
            return concat(
              of(NotificationSystemActions.pushNotification({
                message: errorMsg,
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

export const getRolesEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.SETTING_ROLE_MAGT___UPDATE_SORTER, actionTypes.SETTING_ROLE_MAGT___GET_ROLES),
    mergeMap((action) => {
      const { sorter } = state$.value.roleManagement;
      const { filterBarInfo } = state$.value.setting;

      return from(Resource.SettingResource.getRoles(getSorterForQuery(sorter), filterBarInfo.roleGroup.join(',')))
        .pipe(
          mergeMap((response) => {
            const { data } = response;
            return concat(
              of(getRolesSuccess(data)),
            );
          }),
          catchError(error => {
            console.error('::::: getRolesEpic catchError', error);
            return concat(
              of(NotificationSystemActions.pushNotification({
                message: '取得角色有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

export const getPolicyEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.SETTING_ROLE_MAGT___GET_POLICY),
    mergeMap((action) => {
      const { rsId } = action;
      return from(Resource.SettingResource.getPolicy(rsId))
        .pipe(
          mergeMap((response) => {
            const { data } = response;
            return concat(
              of(getPolicySuccess(data)),
            );
          }),
          catchError(error => {
            console.error('::::: getRolesEpic catchError', error);
            return concat(
              of(NotificationSystemActions.pushNotification({
                message: '取得角色有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};
export const getResourcesEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.SETTING_ROLE_MAGT___GET_RESOURCES),
    mergeMap((action) => {
      return from(Resource.SettingResource.getResources())
        .pipe(
          mergeMap((response) => {
            const { data } = response;
            const resourceSelect = data.map(item => ({
              label: item.description || item.rs_path,
              value: item.id,
              record: item,
            }));
            return concat(
              of(getResourcesSuccess(resourceSelect)),
            );
          }),
          catchError(error => {
            console.error('::::: getResourcesEpic catchError', error);
            return concat(
              of(NotificationSystemActions.pushNotification({
                message: '取得權限設定有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

export const getPolicyRoleEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.SETTING_ROLE_MAGT___GET_POLICY_ROLE),
    mergeMap((action) => {
      const { rsId } = action;
      return from(Resource.SettingResource.getPolicyRole(rsId))
        .pipe(
          mergeMap((response) => {
            const { data } = response;
            return concat(
              of(getPolicyRoleSuccess(data)),
            );
          }),
          catchError(error => {
            console.error('::::: getPolicyRoleEpic catchError', error);
            return concat(
              of(NotificationSystemActions.pushNotification({
                message: '取得權限設定有誤，請稍後再試',
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
  const getPolicyRoleAction = CommonUtils.getTemplateActionTypes('SETTING_ROLE_MAGT___', 'GET_POLICY_ROLE');
  const getResourcesAction = CommonUtils.getTemplateActionTypes('SETTING_ROLE_MAGT___', 'GET_RESOURCES');
  const getPolicyAction = CommonUtils.getTemplateActionTypes('SETTING_ROLE_MAGT___', 'GET_POLICY');
  const getRolesAction = CommonUtils.getTemplateActionTypes('SETTING_ROLE_MAGT___', 'GET_ROLES');
  const updateSorterAction = CommonUtils.getTemplateActionTypes('SETTING_ROLE_MAGT___', 'UPDATE_SORTER');
  const needLoadingList = [
    getPolicyRoleAction.base,
    getResourcesAction.base,
    getPolicyAction.base,
    getRolesAction.base,
    updateSorterAction.base,
  ];
  return action$.pipe(
    ofType(
      getPolicyRoleAction.base, getPolicyRoleAction.success, getPolicyRoleAction.failed,
      getResourcesAction.base, getResourcesAction.success, getResourcesAction.failed,
      getPolicyAction.base, getPolicyAction.success, getPolicyAction.failed,
      getRolesAction.base, getRolesAction.success, getRolesAction.failed,
      updateSorterAction.base, updateSorterAction.success, updateSorterAction.failed,
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
  createRoleEpic,
  updateRoleEpic,
  deleteRolesEpic,
  getRolesEpic,
  getPolicyEpic,
  getResourcesEpic,
  getPolicyRoleEpic,
  handelOnLoadingEpic,
];
