import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import _get from 'lodash/get';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';

import {
  actionTypes,

  // AnodeColorPrice
  getAnodeColorPriceList,
  getAnodeColorPriceListSuccess,

  // PaintingTypePrice
  getPaintingTypePriceList,
  getPaintingTypePriceListSuccess,
  updatePaintingTypePriceListSuccess,

  // GlueSyringeInnerDeameter
  getGlueSyringeInnerDeameterList,
  getGlueSyringeInnerDeameterListSuccess,

  // Metal parameters
  getMetalParameters,
  getMetalParametersSuccess,

  // Machine Tonnage Price
  getMachineTonnagePrice,
  getMachineTonnagePriceSuccess,


  // GlueModelPrice
  getGlueModelPriceList,
  getGlueModelPriceListSuccess,

  // MachineModuleList
  getMachineModuleList,
  getMachineModuleListSuccess,

  // DrillPrice
  getDrillPriceList,
  getDrillPriceListSuccess,
  updateDrillPriceListSuccess,

  // Labor Unit Price And WorkSheet
  getLaborUnitPriceAndWorkSheetList,
  getLaborUnitPriceAndWorkSheetListSuccess,

  // Paint Man Power Price List
  getPaintManPowerPriceList,
  getPaintManPowerPriceListSuccess,
  getPaintManPowerProductTypeListSuccess,

  // Paint Machine Price
  getPaintMachinePriceList,
  getPaintMachinePriceListSuccess,

  // PaintVendor List
  getPaintVendorList,
  getPaintVendorListSuccess,

  // Paint Type List
  getPaintTypeListSuccess,

  // Paint Group List
  getPaintGroupListSuccess,

  // Paint Type Price
  getPaintTypeOptions,
  getPaintTypeOptionsSuccess,
  getPaintTypePriceList,
  getPaintTypePriceListSuccess,
  openPaintFormulaPriceModalSuccess,
  putPaintFormulaPriceSuccess,
} from './MetalCleanSheetActions';


/* AnodeColorPrice ---------------------------------------------------------------------------------------*/
export const putAnodeColorPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___PUT__ANODE_COLOR_PRICE_LIST),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.putAnodeColorPriceList(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getAnodeColorPriceList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Painting Type Price List有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const getAnodeColorPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET__ANODE_COLOR_PRICE_LIST),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getAnodeColorPriceList(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getAnodeColorPriceListSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Painting Type Price List有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* PaintingTypePrice -----------------------------------------------------------------*/
export const getPaintingTypePriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_PAINTING_TYPE_PRICE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getPaintingTypePriceList())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPaintingTypePriceListSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Painting Type Price List有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updatePaintingTypePriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___UPDATE_PAINTING_TYPE_PRICE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.updatePaintingTypePriceList(action.data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(updatePaintingTypePriceListSuccess(response)),
                // 重刷列表
                of(getPaintingTypePriceList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* GlueSyringeInnerDeameter --------------------------------------------------------------------------------*/
export const getGlueSyringeInnerDeameterListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_GLUE_SYRINGE_INNER_DEAMETER_LIST),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getGlueSyringeInnerDeameterList(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getGlueSyringeInnerDeameterListSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得熱壓膠水針筒內徑表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateGlueSyringeInnerDeameterListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___UPDATE_GLUE_SYRINGE_INNER_DEAMETER_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.updateGlueSyringeInnerDeameterList(action.data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                // 重刷列表
                of(getGlueSyringeInnerDeameterList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* GlueModelPrice ------------------------------------------------------------------------------------------*/
export const getGlueModelPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_GLUE_MODEL_PRICE_LIST),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getGlueModelPriceList(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getGlueModelPriceListSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得膠水型號價目表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateGlueModelPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___UPDATE_GLUE_MODEL_PRICE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.updateGlueModelPriceList(action.data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                // 重刷列表
                of(getGlueModelPriceList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Metal Parameters ----------------------------------------------------------------------------------------*/
export const getMetalParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_METAL_PARAMETERS),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getMetalParameters(params))
          .pipe(
            mergeMap(response => {
              const { data } = response;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMetalParametersSuccess(data)),
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
    })
  );
};

export const updateMetalParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___PUT_METAL_PARAMETERS),
    mergeMap((action) => {
      const { parameter: { date: { nextId } } } = state$.value.metalCleanSheet;
      const { data: { typeId, datas, } } = action;
      const data = {
        nextId,
        typeId,
        items: datas.map(d => ({ id: d.id, next: d.next })),
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.putMetalParameters(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMetalParameters()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* MachineModuleList ---------------------------------------------------------------------------------------*/
export const getMachineModuleListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_MACHINE_MODULE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getMachineModuleList())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMachineModuleListSuccess(response)),
              );
            }),
            catchError(error => {
              console.log('error', error);
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Machine Module List有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateMachineModuleListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___UPDATE_MACHINE_MODULE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.updateMachineModuleList(action.data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMachineModuleList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              const errorData = _get(error, 'response.data', '');
              const message = getMessageByErrorCode(errorData, '更新失敗，請稍後再試');
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message,
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Machine Tonnage Price -----------------------------------------------------------------*/
export const getMachineTonnagePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_MACHINE_TONNAGE_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getMachineTonnagePrice())
          .pipe(
            mergeMap(response => {
              const { data: { date, machineTonnesList: datalist, } } = response;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMachineTonnagePriceSuccess({ datalist, date, })),
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
    })
  );
};

export const updateMachineTonnagePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___PUT_MACHINE_TONNAGE_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.putMachineTonnagePrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMachineTonnagePrice()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* DrillPrice -----------------------------------------------------------------*/
export const getDrillPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_DRILL_PRICE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getDrillPriceList())
          .pipe(
            mergeMap(({ data }) => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getDrillPriceListSuccess(data)),
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
    })
  );
};

export const updateDrillPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___UPDATE_DRILL_PRICE_LIST),
    mergeMap(({ data }) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.updateDrillPriceList(data))
          .pipe(
            mergeMap((response) => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                // 重刷列表
                of(getDrillPriceList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Labor Unit Price And WorkSheet --------------------------------------------------------------------------------*/
export const getLaborUnitPriceAndWorkSheetListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getLaborUnitPriceAndWorkSheetList())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getLaborUnitPriceAndWorkSheetListSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updateLaborUnitPriceAndWorkSheetListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___UPDATE_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.updateLaborUnitPriceAndWorkSheetList(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getLaborUnitPriceAndWorkSheetList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};


/* Paint Man Power Price List --------------------------------------------------------------------------------*/
export const getPaintManPowerProductTypeListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRODUCT_TYPE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.DatabaseResource.getProductTypeList()
        ).pipe(
          mergeMap(response => {
            const { data } = response;
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getPaintManPowerProductTypeListSuccess(data))
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
    })
  );
};

export const putPaintManPowerPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___PUT_PAINT_MAN_POWER_PRICE_LIST),
    mergeMap((action) => {
      const { data } = action;
      const productTypeId = _get(state$.value, ['metalCleanSheet', 'paintManPowerPrice', 'selectedProductType', 'value'], false);
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.MetalCleanSheetResource.putPaintManPowerPriceList(data)
        ).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getPaintManPowerPriceList(productTypeId)),
              of(NotificationSystemActions.pushNotification({
                message: '更新成功',
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
    })
  );
};

export const getPaintManPowerPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRICE_LIST),
    mergeMap((action) => {
      const { productTypeId } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.MetalCleanSheetResource.getPaintManPowerPriceList(productTypeId)
        ).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getPaintManPowerPriceListSuccess(response.data))
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
    })
  );
};


/* Paint Machine Price ------------------------------------------------------------------------------------------------------------------------------*/
export const getPaintMachinePriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_PAINT_MACHINE_PRICE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getPaintMachinePriceList())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPaintMachinePriceListSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updatePaintMachinePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___UPDATE_PAINT_MACHINE_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.updatePaintMachinePrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPaintMachinePriceList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Paint Vendor List -------------------------------------------------------------------------------------------------------------------------------------------*/
export const getPaintVendorListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_PAINT_VENDOR_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.MetalCleanSheetResource.getPaintVendorList()
        ).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getPaintVendorListSuccess(response))
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
    })
  );
};

export const updatePaintVendorListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___UPDATE_PAINT_VENDOR_LIST),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.updatePaintVendorList(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPaintVendorList()),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Paint Type List --------------------------------------------------------------------------------*/
export const getPaintTypeListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_PAINT_TYPE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getPaintTypeColorList())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPaintTypeListSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

/* Paint Group List ----------------------------------------------------------------------------------------------------------------------------------------------*/
export const getPaintGroupListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_PAINT_GROUP_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getPaintGroupList())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPaintGroupListSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};
/* Paint Type Price ----------------------------------------------------------------------------------------------------------------------------------------------*/
export const getPaintTypeOptionsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_PAINT_TYPE_OPTIONS),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getPaintTypeOptions())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPaintTypeOptionsSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得Paint Type下拉選單有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const getPaintTypePriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST),
    mergeMap((action) => {
      const { paintBottomTopId } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getPaintTypePriceList(paintBottomTopId))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPaintTypePriceListSuccess(response)),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '取得列表有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export const updatePaintTypePriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___UPDATE_PAINT_TYPE_PRICE),
    mergeMap((action) => {
      const { data } = action;
      const { selectedPaintType } = state$.value.metalCleanSheet.paintTypePrice;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.updatePaintTypePrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPaintTypePriceList(selectedPaintType.value)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                }))
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};


export const openPaintFormulaPriceModalEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___OPEN_PAINT_FORMULA_PRICE_MODAL),
    mergeMap((action) => {
      const { data, readOnly } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.getPaintFormulaPirce(data))
          .pipe(
            mergeMap(res => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(openPaintFormulaPriceModalSuccess({ data: res.data, readOnly })),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};


export const putPaintFormulaPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.METAL_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE),
    mergeMap((action) => {
      const { data } = action;
      const paintBottomTopId = _get(state$, ['value', 'metalCleanSheet', 'paintTypePrice', 'selectedPaintType', 'value'], '');
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.MetalCleanSheetResource.putPaintFormulaPirce(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(getPaintTypePriceList(paintBottomTopId)),
                of(putPaintFormulaPriceSuccess()),
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          ));
    })
  );
};

export default [
  // PaintingTypePrice
  getPaintingTypePriceListEpic,
  updatePaintingTypePriceListEpic,

  // GlueSyringeInnerDeameter
  getGlueSyringeInnerDeameterListEpic,
  updateGlueSyringeInnerDeameterListEpic,

  // Metal parameters
  getMetalParametersEpic,
  updateMetalParametersEpic,

  // GlueModelPrice
  getGlueModelPriceListEpic,
  updateGlueModelPriceListEpic,

  // MachineModuleList
  getMachineModuleListEpic,
  updateMachineModuleListEpic,

  // MachineTonnagePrice
  getMachineTonnagePriceEpic,
  updateMachineTonnagePriceEpic,

  // AnodeColorPrice
  getAnodeColorPriceListEpic,
  putAnodeColorPriceListEpic,

  // DrillPrice
  getDrillPriceListEpic,
  updateDrillPriceListEpic,

  // Labor Unit Price And WorkSheet
  getLaborUnitPriceAndWorkSheetListEpic,
  updateLaborUnitPriceAndWorkSheetListEpic,

  // PaintManPowerPrice
  getPaintManPowerPriceListEpic,
  putPaintManPowerPriceListEpic,
  getPaintManPowerProductTypeListEpic,

  // Paint Machine Price
  getPaintMachinePriceListEpic,
  updatePaintMachinePriceEpic,

  // Paint Vendor List
  getPaintVendorListEpic,
  updatePaintVendorListEpic,

  // Paint Type List
  getPaintTypeListEpic,

  // Paint Group List
  getPaintGroupListEpic,

  // Paint Type Price
  getPaintTypeOptionsEpic,
  getPaintTypePriceListEpic,
  updatePaintTypePriceEpic,
  // Paint Type Formula Price
  openPaintFormulaPriceModalEpic,
  putPaintFormulaPriceEpic,
];
