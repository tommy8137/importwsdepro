import { of, from, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, catchError } from 'rxjs/operators';
import _get from 'lodash/get';
import moment from 'moment';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import Constants from '~~features/Database/DatabaseConstant';
import { notificationAction } from '~~utils/CommonUtils';

import {
  actionTypes,
  // Material Price
  getMaterialPriceList,
  getMaterialPriceListSuccess,
  getMaterialPricePartCategorySuccess,
  putMaterialPricePartCategorySuccess,
  getMaterialPriceTurningDropdownSuccess,
  // 共用
  getScheduleSuccess,
  getProductTypeSuccess,

  // Product Type
  getProductTypeList,
  getProductTypeListSuccess,
  putProductTypeListSuccess,
  postProductTypeListSuccess,
  setProductTypeAddModal,

  // Site
  getSiteList,
  getSiteListSuccess,
  updateSiteListSuccess,
  createSiteSuccess,

  // common parameters
  getCommonParameters,
  getCommonParametersSuccess,

  // die cut
  getMaterialPriceDieCutDropDown,
  getMaterialPriceDieCutDropDownSuccess,

} from './DatabaseActions';

/* Material Price --------------------------------------------------------------------------------*/

/**
 * Material Price 設定下次生效日
 * @param {*} action$
 * @param {*} state$
 */
export const setMaterialPriceScheduleEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___SET_MATERIAL_PRICE_SCHEDULE),
    mergeMap((action) => {
      const partCate = state$.value.dataBase.materialPrice.selectedPartCate.value;
      const { data: { nextDate } } = action;
      const data = {
        formulaType: Constants.FORMULA_TYPE.material,
        nextDate,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.putNextSchedule(data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPriceList(partCate)),
                of(NotificationSystemActions.pushNotification({
                  message: '設定日期成功',
                  level: 'success'
                }))
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '設定生效日有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
  );
};

export const putMaterialPricePartCategoryEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___PUT_MATERIAL_PRICE_PART_CATEGORY),
    mergeMap((action) => {
      const { partCategoryType, data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.putMaterialPricePartCategory(partCategoryType, data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(putMaterialPricePartCategorySuccess(response)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(() => {
              return concat(
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

export const getMaterialPricePartCategoryEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___GET_MATERIAL_PRICE_PART_CATEGORY),
    mergeMap((action) => {
      const { partCategoryType, linkItem: { materialId } } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.getMaterialPricePartCategory(partCategoryType, materialId))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPricePartCategorySuccess(response)),
              );
            }),
            catchError(() => {
              return concat(
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

export const getMaterialPriceDieCutDropDownEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___MATERIAL_PRICE_DIECUT_DROPDOWN),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.getMaterialPriceDieCutDropDown())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPriceDieCutDropDownSuccess(response)),
              );
            }),
            catchError(() => {
              return concat(
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

/**
 * 取得partCategory的list
 */
export const getMaterialPriceListEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___GET_MATERIAL_PRICE_LIST),
    mergeMap((action) => {
      const { partCate } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.getMaterialPriceList(partCate))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPriceListSuccess(response)),
              );
            }),
            catchError(() => {
              return concat(
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

export const addNewMaterialPriceItemEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___ADD_NEW_MATERIAL_PRICE_ITEM),
    mergeMap((action) => {
      const { info } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.addNewMaterialPriceItem(info))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPriceList(info.partCate)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(notificationAction({ error }))
              );
            })
          ));
    })
  );
};

export const archiveMaterialPriceItemEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___ARCHIVE_MATERIAL_PRICE_ITEM),
    mergeMap((action) => {
      const { info } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.archiveMaterialPriceItem(info))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPriceList(info.partCate)),
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '封存有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const unArchiveMaterialPriceItemEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___UNARCHIVE_MATERIAL_PRICE_ITEM),
    mergeMap((action) => {
      const { info } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.unArchiveMaterialPriceItem(info))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPriceList(info.partCate)),
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '解除封存有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

// Metal專用
export const updateMaterialPriceEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___UPDATE_MATERIAL_PRICE),
    mergeMap((action) => {
      const { partCate, data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateMaterialPrice(partCate, data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                // 重刷列表
                of(getMaterialPriceList(partCate)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功失敗，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};


export const putMaterialSpecEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___PUT_MATERIAL_PRICE_MATERIAL_SPEC),
    mergeMap((action) => {
      const { partCate, data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.putMaterialSpec(partCate, data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPriceList(partCate)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(() => {
              return concat(
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


export const putMaterialPriceCommonParameterEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___PUT_MATERIAL_PRICE_COMMON_PARAMETER),
    mergeMap((action) => {
      const { partCate, data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetNextPrice(data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPriceList(partCate)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(() => {
              return concat(
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


export const putMaterialPriceNutTypeEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___PUT_MATERIAL_PRICE_NUT_TYPE),
    mergeMap((action) => {
      const { partCate, data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.putNutType(data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPriceList(partCate)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(() => {
              return concat(
                of(getMaterialPriceList(partCate)),
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

export const getMaterialPriceTurningDropdownEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___GET_MATERIAL_PRICE_TURNING_DROPDOWN),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.DatabaseResource.getNutTypeList(),
          Resource.DatabaseResource.getPartCategoryList(),
          Resource.DatabaseResource.getPartCategoryMaterialMapping(),
        )
          .pipe(
            mergeMap((response) => {
              const { data: nutTypeList = [] } = response[0];
              const { data: partCate2List = [] } = response[1];
              const { data: materialMappingList = [] } = response[2];
              const data = {
                nutTypeList,
                partCate2List,
                materialMappingList,
              };
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialPriceTurningDropdownSuccess(data)),
              );
            }),
            catchError(() => {
              return concat(
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

/* Product Type --------------------------------------------------------------------------------*/
export const getProductTypeListEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___GET_PRODUCT_TYPE_LIST),
    mergeMap(() => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.getProductTypeList())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getProductTypeListSuccess(response)),
              );
            }),
            catchError(() => {
              return concat(
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

/**
 * 修改product type list
 */
export const putProductTypeListEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___PUT_PRODUCT_TYPE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.putProductTypeList(action.data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(putProductTypeListSuccess(response)),
                // 重刷列表
                of(getProductTypeList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(() => {
              return concat(
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

/**
 * 新增product type Epic
 */
export const postProductTypeListEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___POST_PRODUCT_TYPE_LIST),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.postProductTypeList(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(postProductTypeListSuccess(response)),
                // 重刷列表
                of(getProductTypeList()),
                // 關閉add modal
                of(setProductTypeAddModal(false))
              );
            }),
            catchError(() => {
              return concat(
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

/* Site ---------------------------------------------------------------------------------------*/
export const getSiteListEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___GET_SITE_LIST),
    mergeMap(() => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.getSiteList())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getSiteListSuccess(response)),
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Site List有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateSiteListEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___UPDATE_SITE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateSiteList(action.data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(updateSiteListSuccess(response)),
                of(getSiteList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新Site有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const createSiteEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___CREATE_SITE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.createSite(action.data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(createSiteSuccess(response)),
                of(getSiteList()),
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '新增Site有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/**
 * Main page 設定下次生效日
 * @param {*} action$
 * @param {*} state$
 */
export const setScheduleEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___SET_NEXT_SCHEDULE),
    mergeMap((action) => {
      const { nextDate } = action;
      const { formulaType, activeProductType } = state$.value.dataBase.common;
      const data = activeProductType ?
        {
          formulaType,
          nextDate,
          productTypeId: activeProductType.value,
        } :
        {
          formulaType,
          nextDate,
        };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.putNextSchedule(data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '設定日期成功',
                  level: 'success'
                })),
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '設定生效日有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
  );
};

/**
 * Main page 取得下次生效日
 * @param {*} action$
 * @param {*} state$
 */
export const getScheduleEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___GET_NEXT_SCHEDULE),
    mergeMap((action) => {
      const { formulaType } = action;
      const { activeProductType } = state$.value.dataBase.common;
      const params = activeProductType ?
        {
          formulaType,
          productTypeId: activeProductType.value
        } :
        {
          formulaType,
        };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.getNextSchedule(params))
          .pipe(
            mergeMap(response => {
              const { data: { nextDate } } = response;
              const schedule = nextDate || moment().add(1, 'days').format('YYYY/MM/DD');
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getScheduleSuccess({ formulaType, schedule })),
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得生效日有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
  );
};

/**
 * Main page 取得Product Type下拉選單
 * @param {*} action$
 * @param {*} state$
 */
export const getProductTypeEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___GET_PRODUCT_TYPE),
    mergeMap((action) => {
      const { formulaType } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.getProductType({ formulaType }))
          .pipe(
            mergeMap(response => {
              const { data: { productTypeList } } = response;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getProductTypeSuccess(productTypeList)),
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Product Type清單有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
  );
};

/**
 * Common Parameters 取得資料
 * @param {*} action$
 * @param {*} state$
 */
export const getCommonParametersEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___GET_COMMON_PARAMETERS),
    mergeMap(() => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.getCommonParameters())
          .pipe(
            mergeMap(response => {
              const { data: { date: { next: schedule }, date, commonParameterList: parameterList, } } = response;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getCommonParametersSuccess({ schedule, parameterList, date })),
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Common Parameters有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
  );
};


/**
 * 設定common parameters
 * @param {*} action$
 * @param {*} state$
 */
export const putCommonParametersEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___PUT_COMMON_PARAMETERS),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetParameters(data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getCommonParameters()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '儲存Common Parameters有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
  );
};

/**
 * 設定common parameters 下一個生效日
 * @param {*} action$
 * @param {*} state$
 */
export const setCommonParameterScheduleEpic = (action$) => {
  return action$.pipe(
    ofType(actionTypes.DATABASE___SET_COMMON_PARAMETERS_SCHEDULE),
    mergeMap((action) => {
      const { data: nextDate } = action;
      const data = {
        formulaType: Constants.FORMULA_TYPE.common,
        nextDate,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.putNextSchedule(data))
          .pipe(
            mergeMap(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '設定日期成功',
                  level: 'success'
                })),
                of(getCommonParameters()),
              );
            }),
            catchError(() => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '設定生效日有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    }),
  );
};


export default [
  // Material Price
  putMaterialPricePartCategoryEpic,
  getMaterialPriceListEpic,
  getMaterialPricePartCategoryEpic,
  updateMaterialPriceEpic,
  setMaterialPriceScheduleEpic,
  putMaterialSpecEpic,
  putMaterialPriceCommonParameterEpic,
  addNewMaterialPriceItemEpic,
  archiveMaterialPriceItemEpic,
  unArchiveMaterialPriceItemEpic,
  // 共用
  setScheduleEpic,
  getScheduleEpic,
  getProductTypeEpic,

  // Product Type
  getProductTypeListEpic,
  putProductTypeListEpic,
  postProductTypeListEpic,

  // Site
  getSiteListEpic,
  updateSiteListEpic,
  createSiteEpic,

  // Common Parameters
  getCommonParametersEpic,
  putCommonParametersEpic,
  setCommonParameterScheduleEpic,

  // turning
  putMaterialPriceNutTypeEpic,
  getMaterialPriceTurningDropdownEpic,

  // diecut
  getMaterialPriceDieCutDropDownEpic,
];
