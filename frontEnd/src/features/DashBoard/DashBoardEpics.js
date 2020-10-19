import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import _get from 'lodash/get';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import { push } from 'connected-react-router';
import {
  actionTypes,
  getProjectListSuccess,
  getProjectListFailed,
  getDetailSuccess,
  getModuleListsSuccess,
  toggleModuleDetail,
  getVersionsSuccess,
  showAlert,
  getListDetail,
  getSummarizeFilterSuccess,
  closeVersionModal,
  getFilterListLv1Success,
  getFilterListLv2Success,
  setFilterCondition,
  exportDashboardExcelSuccess,
  exportModuleExcelSuccess,
} from './DashBoardActions';


export const getProjectListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DASHBOARD___GET_PROJECT_LIST),
    mergeMap((action) => {
      const { isInit } = action;
      const { searchInfo: {
        lv1: column,
        lv2: keyword,
        keyword: project,
        pageSize: items,
        currentPage: pages,
      } } = state$.value.dashBoard;
      // 整理要傳給API的parameter
      const params = {
        pages: isInit ? 1 : pages, // 第幾頁
        items, // 一頁幾筆
        column: column.toLowerCase(), // (左邊)要用哪個方向的條件
        keyword, // (左邊)要用什麼條件過濾
        project, // (右邊)要用什麼字串搜尋
      };

      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DashBoardResource.getProjectList(params))
          .pipe(
            mergeMap(response => {
              const { data, data: { numberOfProject: totalDataCount } } = response;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getProjectListSuccess(data)),
                of(setFilterCondition({
                  totalDataCount,
                  pageSize: 10,
                  currentPage: isInit ? 1 : pages,
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getProjectListFailed(error.response)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Project List有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const getListDetailEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DASHBOARD___GET_LIST_DETAIL),
    mergeMap((action) => {
      const { params: { id: dashboard, } } = action;
      const { summarizeCondition: { supplyType, manufacturer, }, } = state$.value.dashBoard;
      const params = {
        dashboard,
        supply_type: supplyType.map(st => st.value).join(','),
        manufacturer: manufacturer.map(st => st.value).join(','),
      };

      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.DashBoardResource.getListDetail(params),
        ).pipe(
          mergeMap(res => {
            return concat(
              of(getDetailSuccess(res.data)),
              of(LoadingActions.toggleLoadingStatus(false)),
            );
          }),
          catchError(error => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(NotificationSystemActions.pushNotification({
                message: '取得Project List Detail有誤，請稍後再試',
                level: 'error'
              }))
            );
          })
        ));
    })
  );
};

export const getModuleListsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DASHBOARD___GET_MODULE_LISTS),
    mergeMap((action) => {
      const { summarizeCondition: { supplyType, manufacturer, }, } = state$.value.dashBoard;
      const { params, params: { moduleId, columnType, listType }, } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DashBoardResource.getModuleLists({
          ...params,
          moduleId,
          supplyType: supplyType.map(st => st.value).join(','),
          manufacturer: manufacturer.map(st => st.value).join(','),
        }))
          .pipe(
            mergeMap(res => {
              const { data: { response, list } } = res;
              const moduleList = columnType === 'PCB' ? list : response;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getModuleListsSuccess({ moduleList, moduleId, listType })),
                of(toggleModuleDetail(true, columnType))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得BOM MODULE LIST有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};


// 拿ME跟EE的version
export const getVersionListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DASHBOARD___GET_VERSIONS),
    mergeMap((action) => {
      const { projectInfo } = action;
      const param = {
        project_code: _get(projectInfo, 'project_code', null) || '',
        me_id: _get(projectInfo, 'me_id', null) || '',
        ee_id: _get(projectInfo, 'ee_id', null) || '',
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DashBoardResource.getVersionLists(param))
          .pipe(
            mergeMap(res => {
              const { data } = res;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getVersionsSuccess({ ...data, projectInfo })), // 偷偷塞projectInfo給choose的時候用
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得版本有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

// User 選擇ME和EE的版本後
export const chooseVersionEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DASHBOARD___CHOOSE_VERSION),
    mergeMap((action) => {
      const { selectedVersions: { selectedEe, selectedMe }, projectCode } = action;

      // eeVersion會多一個V V1.0, 前端把它濾掉
      const eeVersion = _get(selectedEe, 'version_num', null);
      const eeVersionNum = eeVersion && eeVersion.indexOf('V') > -1 ?
        eeVersion.substring(eeVersion.indexOf('V') + 1) :
        eeVersion;

      const data = {
        ee_sku: _get(selectedEe, 'sku', null),
        ee_version_id: _get(selectedEe, 'id', null),
        ee_version_name: _get(selectedEe, 'version', null),
        ee_version: eeVersionNum,
        me_version_name: _get(selectedMe, 'version', null),
        me_version_id: _get(selectedMe, 'id', null),
        me_version: _get(selectedMe, 'version_num', null),
        project_code: projectCode,
      };

      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DashBoardResource.combineVersions(data))
          .pipe(
            mergeMap(res => {
              const { data: { id } } = res;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                // of(getListDetail(params)),
                of(push(`/g/board/dashboard/${id}`)),
                of(closeVersionModal()),
              );
            }),
            catchError(error => {
              if (_get(error, 'response.data', null) === 'record already exist') {
                return concat(
                  of(LoadingActions.toggleLoadingStatus(false)),
                  of(showAlert('您已經組合過此版本，請選擇其他版本組合'))
                );
              }
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '建立資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
    catchError(error => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(false)),
        of(NotificationSystemActions.pushNotification({
          message: '建立資料有誤，請稍後再試',
          level: 'error'
        }))
      );
    })
  );
};

// 拿project veiw頁面的filter條件
export const getFilterEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DASHBOARD___GET_PROJECT_FILTER),
    mergeMap((action) => {
      const { item } = action;

      // NOTE: 為了第一階以後可能會用API叫預留，目前第一階固定用customer
      if (!item) {
        return concat(
          of(getFilterListLv1Success(['Customer']))
        );
      }
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DashBoardResource.getFilter(item.toLowerCase()))
          .pipe(
            mergeMap(res => {
              const { data: { res: list } } = res;
              // if (!item) { // 拿第一階
              //   return concat(
              //     of(getFilterListLv1Success(list)),
              //   );
              // }
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getFilterListLv2Success(list)),
              );
            }),
            catchError(error => {
              console.log('error :', error);
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得下拉選單有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};


/**
 * Export ME/EE/Others
 */
export const exportDashboardEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DASHBOARD___EXPORT_EXCEL),
    mergeMap((payload) => {
      const { summarizeCondition: { supplyType, manufacturer, }, } = state$.value.dashBoard;
      const { querydata } = payload;
      const params = {
        supply_type: supplyType.map(st => st.value).join(','),
        manufacturer: manufacturer.map(st => st.value).join(','),
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DashBoardResource.downloadDashboardExcel(querydata, params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(exportDashboardExcelSuccess(response)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              console.log('error.response :', error.response);
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: '匯出檔案失敗',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};
/**
 * Export BU/module detail
 */
export const exportModuleDetailEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DASHBOARD___EXPORT_MODULE_DETAIL_EXCEL),
    mergeMap((payload) => {
      const {
        info: { edm_version_id: edmVersionId, },
        moduleName: item,
        listType: category,
        summarizeCondition: { supplyType, manufacturer, },
      } = state$.value.dashBoard;

      console.log('item >>>>', item);
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DashBoardResource.downloadModuleDetailExcel({
          edm_version_id: edmVersionId,
          item,
          category,
          supply_type: supplyType.map(st => st.value).join(','),
          manufacturer: manufacturer.map(st => st.value).join(','),
        }))
          .pipe(
            mergeMap(response => {
              return concat(
                of(exportModuleExcelSuccess(response)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              console.log('error.response :', error.response);
              return concat(
                of(NotificationSystemActions.pushNotification({
                  message: '匯出檔案失敗',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            })
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};

// 拿dashbaord內容頁面的filter條件
export const getSummarizeFilterEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DASHBOARD___GET_SUMMARIZE_FILTER),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DashBoardResource.getSummarizeFilterList())
          .pipe(
            mergeMap(res => {
              return concat(
                of(getSummarizeFilterSuccess(res.data)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              console.log('error :', error);
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得下拉選單有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};


export default [
  getProjectListEpic,
  getListDetailEpic,
  getModuleListsEpic,
  getVersionListEpic,
  chooseVersionEpic,
  getFilterEpic,
  exportDashboardEpic,
  exportModuleDetailEpic,
  getSummarizeFilterEpic,
];
