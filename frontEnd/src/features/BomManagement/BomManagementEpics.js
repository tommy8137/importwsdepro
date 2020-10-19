import { of, from, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, map, catchError } from 'rxjs/operators';
import _get from 'lodash/get';
import _remove from 'lodash/remove';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import CommonUtils from '~~utils/CommonUtils';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';
import {
  actionTypes,
  getBomList,
  getBomListSuccess,
  getBomListFailed,
  getFilterTypeSuccess,
  getFilterTypeFailed,
  getFilterValueSuccess,
  getFilterValueFailed,
  getCreateBaseDataSuccess,
  closeCreateBomModal,
  getBomDetailSuccess,
  closeEditBomModal,
  highlightBom,
  getVersionDataSuccess,
  getEEBomDetailSuccess,
  closeEditEEBomModal,
  getEeBomPlantCodeListSuccess,

  openParameterModalSuccess,
  putBomParameterSuccess,

} from './BomManagementActions';


/** ======================================================
 * 需要的function
 ========================================================= */

// 將option的格式轉成只有value
const convertFormValues = (formvalues) => {
  Object.keys(formvalues)
    .forEach((keyname) => {
      if (typeof formvalues[keyname] === 'object') {
        formvalues[keyname] = _get(formvalues[keyname], 'value', '');
      }
    });

  return formvalues;
};


/** ======================================================
 * Epics
 ========================================================= */
export const getBomListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___GET_BOM_LIST),
    mergeMap((action) => {
      const {
        currentPage, pageSize, filterType, filterValue, table, sortInfo, searchValue,
        disable,
      } = state$.value.bomManagement;
      // column的值是從filter左邊的bar來的
      // keyword的值是從filter右邊的bar來的
      const params = {
        pages: currentPage,
        items: pageSize,
        orderBy: CommonUtils.genOrderByFormat(sortInfo),
        column: filterType,
        keyword: filterValue,
        role: table,
        project: searchValue,
        disable,
        ...action.params,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomManagementResource.getBomList(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(getBomListSuccess(response)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              return concat(
                of(getBomListFailed(error.response)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得BOM LIST有誤，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          ),
      );
    })
  );
};

export const getFilterTypeEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___GET_FILTER_TYPE),
    mergeMap((action) => {
      return from(Resource.BomManagementResource.getFilterType(action.role))
        .pipe(
          map(response => getFilterTypeSuccess(response)),
          catchError(error => {
            return concat(
              of(getFilterTypeFailed(error.response)),
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

export const getFilterValueEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___GET_FILTER_VALUE),
    mergeMap((action) => {
      return from(Resource.BomManagementResource.getfilterValue(action.params))
        .pipe(
          map(response => getFilterValueSuccess(response)),
          catchError(error => {
            return concat(
              of(getFilterValueFailed(error.response)),
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


/**
 * 取得create bom modal的下拉選單內容
 */
export const toggleCreateBomModalEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___TOGGLE_CREATE_MODAL),
    mergeMap(() => {
      return from(Resource.BomManagementResource.getCreateBomBaseData())
        .pipe(
          map(response => getCreateBaseDataSuccess({ baseData: response.data, isCreateOpen: true })),
          catchError(error => {
            return concat(
              // of(getUserListFail(error.response)),
              of(console.log('error: %o', error)),
              of(NotificationSystemActions.pushNotification({
                message: '取得選單資料有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        );
    })
  );
};

export const createBomEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___DO_CREATE_BOM),
    mergeMap((action) => {
      // 取BomList資料
      const {
        currentPage: pages,
        pageSize: items,
        sortInfo,
        filterType: column,
        filterValue: keyword,
        table: role,
        searchValue: project,
        disable,
      } = state$.value.bomManagement;
      const orderBy = CommonUtils.genOrderByFormat(sortInfo);
      const params = { pages, items, orderBy, column, keyword, role, project, disable, };

      of(LoadingActions.toggleLoadingStatus(true));
      let { bomData: { bomProject } } = state$.value.bomManagement;
      // 處理bomProject部份下拉選單的值
      bomProject = convertFormValues(bomProject);

      // 處理bomDesignee部份下拉選單的值
      let { bomDesignee } = action;
      // 先把form裡下拉的值整理好
      const arrangedata = convertFormValues(bomDesignee);

      // 從表單裡找到function team的部份及me部份  分類好
      const meList = Object.keys(arrangedata)
        .filter(k => k.includes('me_'))
        .map(k => ({ user_id: arrangedata[k], function_team_name: '' }));
      const ftList = Object.keys(arrangedata)
        .filter(k => !k.includes('_'))
        .map(k => ({ user_id: arrangedata[k], function_team_name: arrangedata[`ft_${k}`] }));
      bomDesignee = [...meList, ...ftList];
      // 濾掉空的designee
      _remove(bomDesignee, d => !d.user_id);

      // 呼叫API
      return from(Resource.BomManagementResource.createBomProject(bomProject, bomDesignee))
        .pipe(
          mergeMap(response => {
            return concat(
              of(highlightBom(Number(response.data.id))),
              of(getBomList(params)),
              of(LoadingActions.toggleLoadingStatus(false)),
              of(closeCreateBomModal()),
              of(NotificationSystemActions.pushNotification({
                message: '新增成功',
                level: 'success'
              })),
            );
          }),
          catchError(error => {
            const errorCode = _get(error, ['response', 'data'], '').replace('Error: ', '');
            return concat(
              // of(getUserListFail(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: getMessageByErrorCode(errorCode, '新增失敗，請稍後再試'),
                level: 'error'
              }))
            );
          })
        );
    })
  );
};


/**
 * 取得bom的詳細內容
 */
export const toggleEditBomModalEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___TOGGLE_EDIT_MODAL),
    mergeMap((action) => {
      const { bomid } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.BomManagementResource.getBomDetail(bomid),
          Resource.BomManagementResource.getCreateBomBaseData(),
        ).pipe(
          mergeMap(responses => {
            return concat(
              of(getBomDetailSuccess({
                bomData: responses[0].data,
                baseData: responses[1].data,
                isEditOpen: true
              })),
              of(LoadingActions.toggleLoadingStatus(false)),
            );
          }),
        ) // end of pipe after forkjoin
      ); // end of mergeMap
    }),
    catchError(error => concat(
      of(console.log('error: %o', error)),
      of(NotificationSystemActions.pushNotification({
        message: '取得BOM資料有誤，請稍後再試',
        level: 'error'
      })),
      of(LoadingActions.toggleLoadingStatus(false)),
    ))
  );
};


export const updateBomEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___DO_UPDATE_BOM),
    mergeMap(() => {
      const { bomData: { bomProject: bomp, bomDesignee: bomd } } = state$.value.bomManagement;
      // console.log('::::================================::::');
      // console.log(':::::::::::bomData :', state$.value.bomManagement.bomData);
      // console.log(':::::::::::bomProject :', bomp);
      // console.log(':::::::::::bomDesignee :', bomd);
      // console.log('::::================================::::');

      // BomProject 格式整理
      const bomProject = convertFormValues(bomp);

      // BomDesignee 格式整理
      const bomdarrange = convertFormValues(bomd);
      const melist = Object.keys(bomdarrange)
        .filter(k => k.includes('me_'))
        .map(k => ({ id: k.replace('me_', ''), user_id: bomdarrange[k], function_team_name: '' }));

      const ftlist = Object.keys(bomdarrange)
        .filter(k => !k.includes('_'))
        .map(k => ({ id: k, user_id: bomdarrange[k], function_team_name: bomdarrange[`ft_${k}`] }));

      // 濾掉空的designee
      const bomDesignee = [...melist, ...ftlist];
      _remove(bomDesignee, d => !d.user_id);

      // 取BomList資料
      const {
        currentPage: pages,
        pageSize: items,
        sortInfo,
        filterType: column,
        filterValue: keyword,
        table: role,
        searchValue: project,
        disable,
      } = state$.value.bomManagement;
      const orderBy = CommonUtils.genOrderByFormat(sortInfo);
      const params = { pages, items, orderBy, column, keyword, role, project, disable, };

      of(LoadingActions.toggleLoadingStatus(true));

      return from(Resource.BomManagementResource.updateBomProject({ bomProject, bomDesignee }, bomp.id))
        .pipe(
          mergeMap(response => {
            return concat(
              of(highlightBom(Number(response.data.id))),
              of(getBomList(params)),
              of(LoadingActions.toggleLoadingStatus(false)),
              of(closeEditBomModal()),
              of(NotificationSystemActions.pushNotification({
                message: '修改成功',
                level: 'success'
              })),
            );
          }),
          catchError(error => {
            const errorCode = _get(error, ['response', 'data'], '').replace('Error: ', '');
            return concat(
              // of(getUserListFail(error.response)),
              of(NotificationSystemActions.pushNotification({
                message: getMessageByErrorCode(errorCode, '修改失敗，請稍後再試'),
                level: 'error'
              }))
            );
          })
        );
    })
  );
};


/**
 * 取得version list
 */
export const toggleEEBomVersionModalEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___TOGGLE_CHOOSE_VERSION_MODAL),
    mergeMap((action) => {
      const { id } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomManagementResource.getVersionList(id))
          .pipe(
            mergeMap(response => {
              const { data: { edmVersions } } = response;
              return concat(
                of(getVersionDataSuccess({ edmVersions, isVersionOpen: true })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              return concat(
                of(console.log('error: %o', error)),
                // of(getUserListFail(error.response)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Version資料有誤，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          ),
      );
    })
  );
};

/**
 * 取得EE BOM project detail、打開Edit的modal
 */
export const toggleEEBomEditModalEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___TOGGLE_EE_EDIT_MODAL),
    mergeMap((action) => {
      const { id, edmVersionId } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.BomManagementResource.getEeBomDetail(id, edmVersionId),
          Resource.BomManagementResource.getEeBomPlantCodeList(id),
        )
          .pipe(
            mergeMap((response = []) => {
              const [eeBomDetailRes, plantListRes] = response;
              const { data: { bomInfo: eeBomData } } = eeBomDetailRes;
              const { data = [] } = plantListRes;
              return concat(
                of(getEEBomDetailSuccess({ eeBomData, isEeEditOpen: true })),
                of(getEeBomPlantCodeListSuccess(data)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              return concat(
                of(console.log('error: %o', error)),
                // of(getUserListFail(error.response)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          ),
      );
    })
  );
};


export const updateEEBomEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___DO_UPDATE_EE_BOM),
    mergeMap((action) => {
      const { eeBomData } = state$.value.bomManagement;
      const { formvalue, projectId, edmVersionID } = action;
      // 如果在外面的projectList，修改時直接送eeBomData的ID；在Approver時，修改送從Modal來的ID
      const pid = projectId || eeBomData.id;

      // 取BomList資料
      const {
        currentPage: pages,
        pageSize: items,
        sortInfo,
        filterType: column,
        filterValue: keyword,
        table: role,
        searchValue: project,
        disable,
      } = state$.value.bomManagement;
      const orderBy = CommonUtils.genOrderByFormat(sortInfo);
      const params = { pages, items, orderBy, column, keyword, role, project, disable, };
      // 只需要送出version remark
      const data = {
        plant_code: formvalue.plant_code,
        version_remark: formvalue.version_remark,
        avl: formvalue.avl,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomManagementResource.updateEeBomProject(data, pid, edmVersionID))
          .pipe(
            mergeMap(response => {
              return concat(
                of(highlightBom(response.data.id)),
                of(getBomList(params)),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(closeEditEEBomModal()),
                of(NotificationSystemActions.pushNotification({
                  message: '修改成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(console.log('error: %o', error)),
                // of(getUserListFail(error.response)),
                of(NotificationSystemActions.pushNotification({
                  message: '修改失敗，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          ),
      );
    })
  );
};


/*
統一處理loading mask
*/
export const handelOnLoadingEpic = (action$) => {
  const getBomListAction = CommonUtils.getTemplateActionTypes('BOMMANAGEMENT___', 'GET_BOM_LIST');
  const getFilterTypeAction = CommonUtils.getTemplateActionTypes('BOMMANAGEMENT___', 'GET_FILTER_TYPE');
  const getFilterValueAction = CommonUtils.getTemplateActionTypes('BOMMANAGEMENT___', 'GET_FILTER_VALUE');
  const needLoadingList = [
    getBomListAction.base,
    getFilterTypeAction.base,
    getFilterValueAction.base,
  ];
  return action$.pipe(
    ofType(
      getBomListAction.base, getBomListAction.success, getBomListAction.failed,
      getFilterTypeAction.base, getFilterTypeAction.success, getFilterTypeAction.failed,
      getFilterValueAction.base, getFilterValueAction.success, getFilterValueAction.failed,
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


export const openParameterModalEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___OPEN_PARAMETER_MODAL),
    mergeMap((action) => {
      const { bomId } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomManagementResource.getBomParams(bomId))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(openParameterModalSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(console.log('error: %o', error)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料失敗',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          )
      );
    })
  );
};


export const putParameterEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___PUT_BOM_PARAMETER),
    mergeMap((action) => {
      const { bomId, data } = action;
      // 取BomList資料
      const {
        currentPage: pages,
        pageSize: items,
        sortInfo,
        filterType: column,
        filterValue: keyword,
        table: role,
        searchValue: project,
        disable,
      } = state$.value.bomManagement;
      const orderBy = CommonUtils.genOrderByFormat(sortInfo);
      const params = { pages, items, orderBy, column, keyword, role, project, disable };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomManagementResource.putBomParams(bomId, data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(putBomParameterSuccess()),
                of(getBomList(params)),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '修改成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(console.log('error: %o', error)),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料失敗',
                  level: 'error'
                })),
              );
            })
          ));
    })
  );
};

export const archiveBomEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___ARCHIVE_EMDM_BOM_PROJECT),
    mergeMap((action) => {
      const { data } = action;
      // 取BomList資料
      const {
        currentPage: pages,
        pageSize: items,
        sortInfo,
        filterType: column,
        filterValue: keyword,
        table: role,
        searchValue: project,
        disable,
      } = state$.value.bomManagement;
      const orderBy = CommonUtils.genOrderByFormat(sortInfo);
      const params = { pages, items, orderBy, column, keyword, role, project, disable };

      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomManagementResource.archiveBomProject(data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '封存成功',
                  level: 'success'
                })),
                of(getBomList(params)),
              );
            }),
            catchError(error => {
              return concat(
                of(console.log('error: %o', error)),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '封存失敗',
                  level: 'error'
                })),
              );
            })
          ));
    })
  );
};

export const unarchiveBomEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.BOMMANAGEMENT___UNARCHIVE_EMDM_BOM_PROJECT),
    mergeMap((action) => {
      const { data } = action;
      // 取BomList資料
      const {
        currentPage: pages,
        pageSize: items,
        sortInfo,
        filterType: column,
        filterValue: keyword,
        table: role,
        searchValue: project,
        disable,
      } = state$.value.bomManagement;
      const orderBy = CommonUtils.genOrderByFormat(sortInfo);
      const params = { pages, items, orderBy, column, keyword, role, project, disable };

      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.BomManagementResource.unarchiveBomProject(data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '解除封存成功',
                  level: 'success'
                })),
                of(getBomList(params)),
              );
            }),
            catchError(error => {
              return concat(
                of(console.log('error: %o', error)),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '解除封存失敗',
                  level: 'error'
                })),
              );
            })
          ));
    })
  );
};


export default [
  getBomListEpic,
  getFilterTypeEpic,
  getFilterValueEpic,
  // handelOnLoadingEpic,
  toggleCreateBomModalEpic,
  createBomEpic,
  toggleEditBomModalEpic,
  updateBomEpic,
  toggleEEBomVersionModalEpic,
  toggleEEBomEditModalEpic,
  updateEEBomEpic,
  openParameterModalEpic,
  putParameterEpic,
  archiveBomEpic,
  unarchiveBomEpic,
];

