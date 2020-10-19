import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, zip, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay, switchMap, take } from 'rxjs/operators';
import Resource from '~~apis/resource';
import { push } from 'connected-react-router';
import _ from 'lodash';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import DropdownConfigHelper from './dropdownConfigHelper';

import {
  actionTypes,
  // get type1 List
  getType1List,
  // get specGroup List
  getSpecGroupList,
  getSpecGroupListSuccess,
  getSpecGroupListFailed,
  // get Sourcer List
  getSourcerList,
  getSourcerListSuccess,
  getSourcerListFailed,
  // get SpecItemsList
  getSpecItemsList,
  getSpecItemsListSuccess,
  getSpecItemsListFailed,
  // get ME SpecItemsList
  getMeSpecItemsList,
  getMeSpecItemsListSuccess,
  getMeSpecItemsListFailed,

  // post AddSpecGroup
  postAddSpecGroup,
  postAddSpecGroupSuccess,
  postAddSpecGroupFailed,
  // delete SpecGroup
  deleteSpecGroup,
  deleteSpecGroupSuccess,
  deleteSpecGroupFailed,
  // put SpecGroup
  putSpecGroup,
  putSpecGroupSuccess,
  putSpecGroupFailed,
  // post SPA Analysis
  postSpaAnalysisSuccess,
  postSpaAnalysisFailed,
  postSpaExportSuccess,
  postSpaExportFailed,

  getProductTypeListSuccess,
  getProductTypeListFailed,

  getType1ListSuccess,
  getType1ListFailed,

  getType2ListSuccess,
  getType2ListFailed,

  getGroupItemSuccess,
  getGroupItemFailed,

  getSpecItemByPartNumberSuccess,
  getSpecItemByPartNumberFailed

} from './XrayActions';


// POST init Xray 
// 初始化 Xray : 取得sourcelsit, specGroupList
export const initXrayEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___INIT_XRAY),
    mergeMap((action) => {
      const { roleType } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.XrayResource.getSpecGroupList(roleType),
          Resource.XrayResource.getProductTypeList(roleType)
        )
          .pipe(
            mergeMap(response => {
              const productType = response[1].data;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getSpecGroupListSuccess(response[0])),
                of(getProductTypeListSuccess(response[1])),
                of(getType1List(roleType, productType))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                })),
              );
            }),
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


// POST init Xray 
// 初始化 Xray : 取得sourcelsit, specGroupList
export const initMEXrayEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___INIT_ME_XRAY),
    mergeMap((action) => {
      const { roleType } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.XrayResource.getSpecGroupList(roleType),
          Resource.XrayResource.getType1List(roleType, [])
        )
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getSpecGroupListSuccess(response[0])),
                of(getType1ListSuccess(response[1])),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                })),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
          )
      );
    }),
    catchError(error => console.log('EPIC ERROR', error))
  );
};


// 修改specGroup
export const putSpecGroupEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___PUT_SPEC_GROUP),
    mergeMap((action) => {
      const { id, data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.XrayResource.putSpecGroup(id, data)).pipe(
          mergeMap(response => {
            return concat(
              of(putSpecGroupSuccess(response)),
            );
          }),
          catchError(error => {
            if (error.response && error.response.status === 400) {
              return concat(
                of(putSpecGroupFailed(error)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(NotificationSystemActions.pushNotification({
                message: '發生錯誤，請稍後再試',
                level: 'error'
              }))
            );
          }
          )
        )
      );
    })
  );
};

// 刪除specGroup
export const deleteSpecGroupEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___DELETE_SPEC_GROUP),
    mergeMap((action) => {
      const { id, data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.XrayResource.deleteSpecGroup(id)).pipe(
          mergeMap(response => {
            return concat(
              of(getSpecGroupList()),
              of(deleteSpecGroupSuccess(response)),
              of(LoadingActions.toggleLoadingStatus(false)),
            );
          }),
          catchError(error =>
            concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(deleteSpecGroupFailed(error)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              })),
            )
          )
        )
      );
    })
  );
};

// 新增specGroup
export const postAddSpecGroupEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___POST_ADD_SPEC_GROUP),
    mergeMap((action) => {
      const { id, data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.XrayResource.postAddSpecGroup(data)).pipe(
          mergeMap(response => {
            return concat(
              of(getSpecGroupList()),
              of(postAddSpecGroupSuccess(response)),
              of(LoadingActions.toggleLoadingStatus(false)),
            );
          }),
          catchError(error => {
            if (error.response && error.response.status === 400) {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(postAddSpecGroupFailed(error)),
              );
            }
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
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

// GET SpecGroup List
export const getSpecGroupListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___GET_SPEC_GROUP_LIST),
    mergeMap((action) => {
      const { roleType } = action;
      return from(Resource.XrayResource.getSpecGroupList(roleType))
        .pipe(
          map(response => getSpecGroupListSuccess(response)),
          catchError(error =>
            concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getSpecGroupListFailed(error)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              })),
            )
          )
        );
    })
  );
};

// GET SpecGroup List
export const addSpecGroupSuccessEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___POST_ADD_SPEC_GROUP_SUCCESS),
    mergeMap((action) => {
      return from(Resource.XrayResource.getSpecGroupList())
        .pipe(
          map(response => getSpecGroupListSuccess(response)),
          catchError(error =>
            concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getSpecGroupListFailed(error)),
              of(NotificationSystemActions.pushNotification({
                message: '取得資料有誤，請稍後再試',
                level: 'error'
              })),
            )
          )
        );
    })
  );
};

// GET EE SpecItemsList
export const getSpecItemsListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___GET_SPEC_ITEMS_LIST),
    mergeMap((action) => {
      const { xray: { specItem, selected: { productType, sourcer, type1, type2 } } } = state$.value;
      const data = {
        productType,
        sourcer,
        type1: type1[0],
        type2: type2[0],
        // productType: 'Desktop',
        // type1: 'Connector',
        // type2: 'SD card',
        // sourcer: [],
        spec: _.mapValues(specItem.specGroup, sp => sp.filter(o => o.value).map(o => o.item_name))
      };
      const params = {
        roleType: 'EE',
        productType: data.productType,
        type1: data.type1,
        type2: data.type2,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.XrayResource.getSpecItemsList(data),
          // Resource.XrayResource.getSpecTitleList(params)
        )
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getSpecItemsListSuccess(response[0])),
                // of(getSpecTitleListSuccess(response[1])),
              );
            }),
            catchError(error =>
              concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getSpecItemsListFailed(error)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                })),
              )
            )
          )
      );
    })
  );
};

// GET ME SpecItemsList
export const getMeSpecItemsListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___GET_ME_SPEC_ITEMS_LIST),
    mergeMap((action) => {
      const { xray: { specItem, selected: { productType, sourcer, type1, type2 } } } = state$.value;
      const { specN } = action;
      const data = {
        productType,
        sourcer,
        type1: type1[0],
        type2: type2[0],
        specN,
        spec: _.mapValues(specItem.specGroup, sp => sp.filter(o => o.value).map(o => o.item_name))
      };
      const params = {
        roleType: 'ME',
        productType: data.productType,
        type1: data.type1,
        type2: data.type2,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.XrayResource.getMeSpecItemsList(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                // ...(specN === 1 ? [of(getSpecTitleList(params))] : []),
                of(getMeSpecItemsListSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMeSpecItemsListFailed(error)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
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

// post SPA Chart
export const postSpaAnalysisEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___POST_SPA_ANALYSIS),
    mergeMap((action) => {
      const { xray: { roleType } } = state$.value;
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.XrayResource.postSpaAnalysis(roleType, data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(postSpaAnalysisSuccess(response)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => {
              return concat(
                of(postSpaAnalysisFailed(error.response)),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

// POST SPA export excel
export const postSpaExportEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___POST_SPA_EXPORT),
    mergeMap((action) => {
      const { xray: { roleType } } = state$.value;
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.XrayResource.postSpaExport(roleType, data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(postSpaExportSuccess(response)),
                of(LoadingActions.toggleLoadingStatus(false)),
              );
            }),
            catchError(error => concat(
              of(postSpaExportFailed(error)),
              of(LoadingActions.toggleLoadingStatus(false)),
              of(NotificationSystemActions.pushNotification({
                message: '取得分析資料有誤，請稍後再試',
                level: 'error'
              })),
            ))
          ));
    })
  );
};

// GET ProductTypeEpic
export const getProductTypeEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___GET_PRODUCTTYPE_LIST),
    mergeMap((action) => {
      const { role } = action;
      return from(Resource.XrayResource.getProductTypeList(role))
        .pipe(
          map(response => getProductTypeListSuccess(response)),
          catchError(error => concat(
            of(getProductTypeListFailed(error)),
            of(NotificationSystemActions.pushNotification({
              message: '取得分析資料有誤，請稍後再試',
              level: 'error'
            })),
          ))
        );
    })
  );
};

// GET Type1 List
export const getType1ListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___GET_TYPE1_LIST),
    mergeMap((action) => {
      const { role, productType } = action;
      return from(Resource.XrayResource.getType1List(role, productType))
        .pipe(
          map(response => getType1ListSuccess(response)),
          catchError(error => concat(
            of(getType1ListFailed(error)),
            of(NotificationSystemActions.pushNotification({
              message: '取得分析資料有誤，請稍後再試',
              level: 'error'
            })),
          ))
        );
    })
  );
};

// GET Type2 List
export const getType2ListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___GET_TYPE2_LIST),
    mergeMap((action) => {
      const { role, productType, type1 } = action;
      return from(Resource.XrayResource.getType2List(role, productType, type1[0]))
        .pipe(
          map(response => getType2ListSuccess(response)),
          catchError(error => concat(
            of(getType2ListFailed(error)),
            of(NotificationSystemActions.pushNotification({
              message: '取得分析資料有誤，請稍後再試',
              level: 'error'
            })),
          ))
        );
    })
  );
};

// GET SourceList
export const getSourcerListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___GET_SOURCER_LIST),
    mergeMap((action) => {
      const { role, productType, type1, type2 } = action;
      return from(Resource.XrayResource.getSourcerList(role, productType, type1[0], type2[0]))
        .pipe(
          map(response => getSourcerListSuccess(response)),
          catchError(error => concat(
            of(getSourcerListFailed(error)),
            of(NotificationSystemActions.pushNotification({
              message: '取得Sourcer有誤，請稍後再試',
              level: 'error'
            }),
            ))
          )
        );
    })
  );
};

// GET SourceList
export const getGroupItemEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___GET_GROUPITEM),
    mergeMap((action) => {
      const { roleType, specGroupID } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.XrayResource.getGroupItem(roleType, specGroupID))
          .pipe(
            mergeMap(response => {
              return concat(
                of(getGroupItemSuccess(response)),
                of(LoadingActions.toggleLoadingStatus(false))
              );
            }
            ),
            catchError(error =>
              concat(
                of(getGroupItemFailed(error)),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              )
            ),
          )
      );
    })
  );
};

// GET SourceList
export const getSpecItemByPartNumberEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.XRAY___GET_SPECITEM_BY_PARTNUMBER),
    mergeMap((action) => {
      const { roleType, data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.XrayResource.getSpecItemByPartNumber(roleType, data))
          .pipe(
            mergeMap(response =>
              concat(
                of(getSpecItemByPartNumberSuccess(response)),
                of(LoadingActions.toggleLoadingStatus(false))
              )
            ),
            catchError(error => {
              if (error.response && error.response.status === 404) {
                return concat(
                  of(getSpecItemByPartNumberFailed(error)),
                  of(LoadingActions.toggleLoadingStatus(false)),
                  of(NotificationSystemActions.pushNotification({
                    message: '找不到Reference partNumber',
                    level: 'error'
                  }))
                );
              }
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '發生錯誤，請稍後再試',
                  level: 'error'
                }))
              );
            }
            ),
          )
      );
    })
  );
};

/*
190523: 一律在這裡取得productType, type1, type2
*/
const getSearchConfig = params => {
  const { productType = [], role, type1, type2 } = params;

  switch (true) {
    case _.isString(role && type1 && type2) && _.isArray(productType):
      return {
        resource: Resource.XrayResource.getSourcerList(role, productType, type1, type2),
        onSuccess: response => getSourcerListSuccess(response),
        onError: error => getSourcerListFailed(error)
      };
    case _.isString(role && type1) && _.isArray(productType):
      return {
        resource: Resource.XrayResource.getType2List(role, productType, type1),
        onSuccess: response => {
          return getType2ListSuccess(response);
        },
        onError: error => getType2ListFailed(error)
      };
    case _.isString(role) && role === 'ME' ? _.isArray(productType) : productType.length > 0:
      return {
        resource: Resource.XrayResource.getType1List(role, productType),
        onSuccess: response => {
          return getType1ListSuccess(response);
        },
        onError: error => getType1ListFailed(error)
      };
    default:
      return {
        resource: Resource.XrayResource.getProductTypeList(role),
        onSuccess: response => getProductTypeListSuccess(response),
        onError: error => getProductTypeListFailed(error)
      };
  }
};

export default [
  getSpecGroupListEpic,
  getSpecItemsListEpic,
  getMeSpecItemsListEpic,
  postAddSpecGroupEpic,
  deleteSpecGroupEpic,
  putSpecGroupEpic,
  postSpaAnalysisEpic,
  postSpaExportEpic,
  initXrayEpic,
  initMEXrayEpic,
  getGroupItemEpic,
  getSpecItemByPartNumberEpic,
  getProductTypeEpic,
  getType1ListEpic,
  getType2ListEpic,
  getSourcerListEpic,
];

