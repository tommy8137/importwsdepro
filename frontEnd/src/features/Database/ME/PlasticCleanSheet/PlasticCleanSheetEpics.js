import { Observable, Subject, pipe, of, from, interval, merge, fromEvent, SubscriptionLike, concat, forkJoin } from 'rxjs';
import { ofType } from 'redux-observable';
import { mergeMap, concatMap, tap, mapTo, map, catchError, retry, retryWhen, takeUntil, flatMap, delay } from 'rxjs/operators';
import Resource from '~~apis/resource';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import _get from 'lodash/get';
import { getMessageByErrorCode } from '~~utils/ErrorCodeUtils';

import {
  actionTypes,

  // Plastic parameters
  getPlasticParameters,
  getPlasticParametersSuccess,

  // Material LossRate
  getMaterialLossRate,
  getMaterialLossRateSuccess,

  // Machine Module
  getMachineModuleList,
  getMachineModuleListSuccess,
  setIsUpdateSuccessed,

  // Machine Tonnage Price
  getMachineTonnagePrice,
  getMachineTonnagePriceSuccess,

  // Labor Unit Price And WorkSheet
  getLaborUnitPriceAndWorkSheetList,
  getLaborUnitPriceAndWorkSheetListSuccess,

  // Paint Machine Price
  getPaintMachinePriceList,
  getPaintMachinePriceListSuccess,

  // Paint Man Power Price List
  getPaintManPowerPriceList,
  getPaintManPowerPriceListSuccess,
  getPaintManPowerProductTypeListSuccess,

  // Paint Group List
  getPaintGroupListSuccess,

  // Paint Type Price
  getPaintTypeOptions,
  getPaintTypeOptionsSuccess,
  getPaintTypePriceList,
  getPaintTypePriceListSuccess,

  // Print Process Price
  getPrintProcessPrice,
  getPrintProcessPriceSuccess,

  // Paint Type List
  getPaintTypeListSuccess,

  // Embedded Nail Price
  getEmbeddedNailPriceList,
  getEmbeddedNailPriceListSuccess,

  // Grinding Price
  getGrindingPriceList,
  getGrindingPriceListSuccess,

  // Emi Sputtering List
  getEmiSputteringList,
  getEmiSputteringListSuccess,

  // PaintVendor List
  getPaintVendorList,
  getPaintVendorListSuccess,

  // Emi Sputtering Base List
  getEmiSputteringBaseListSuccess,

  // Emi Sputtering Price
  getEmiSputteringPriceList,
  getEmiSputteringPriceListSuccess,
  getEmiSputteringPriceSiteListSuccess,

  // Emi Sputtering Site
  getEmiSputteringSite,
  getEmiSputteringSiteSuccess,

  openPaintFormulaPriceModalSuccess,
  putPaintFormulaPriceSuccess,

} from './PlasticCleanSheetActions';

/* Plastic Parameters ----------------------------------------------------------------------------------------*/
export const getPlasticParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_PLASTIC_PARAMETERS),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getPlasticParameters(params))
          .pipe(
            mergeMap(response => {
              const { data } = response;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPlasticParametersSuccess(data)),
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

export const updatePlasticParametersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___PUT_PLASTIC_PARAMETERS),
    mergeMap((action) => {
      const { parameter: { date: { nextId } } } = state$.value.plasticCleanSheet;
      const { data: { typeId, datas, } } = action;
      const data = {
        nextId,
        typeId,
        items: datas.map(d => ({ id: d.id, next: d.next })),
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.DatabaseResource.updateCleanSheetParameters(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPlasticParameters()),
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

/* Material LossRate ----------------------------------------------------------------------------------------*/
export const putMaterialLossRateEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___PUT_MATERIAL_LOSS_RATE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.putMaterialLossRate(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialLossRate()),
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
                  message: '取得資料有誤，請稍後再試',
                  level: 'error'
                }))
              );
            })
          )
      );
    })
  );
};

export const getMaterialLossRateEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_MATERIAL_LOSS_RATE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getMaterialLossRate())
          .pipe(
            mergeMap(response => {
              const { data } = response;
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMaterialLossRateSuccess(data)),
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

/* Machine Module ------------------------------------------------------------------------------------------------*/
export const getMachineModuleListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_MACHINE_MODULE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getMachineModuleList())
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMachineModuleListSuccess(response)),
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

export const updateMachineModuleListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_MACHINE_MODULE_LIST),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        of(setIsUpdateSuccessed(null)),
        from(Resource.PlasticCleanSheetResource.updateMachineModuleList(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMachineModuleList()),
                of(setIsUpdateSuccessed(true)),
                of(NotificationSystemActions.pushNotification({
                  message: '更新成功',
                  level: 'success'
                })),
              );
            }),
            catchError(error => {
              const message = getMessageByErrorCode(error.response.data, '更新失敗，請稍後再試');
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(setIsUpdateSuccessed(false)),
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_MACHINE_TONNAGE_PRICE),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getMachineTonnagePrice())
          .pipe(
            mergeMap(response => {
              const { data: { date, machineTonnesList: list, } } = response;

              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMachineTonnagePriceSuccess({ list, date, })),
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___PUT_MACHINE_TONNAGE_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.putMachineTonnagePrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getMachineTonnagePrice()),
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getLaborUnitPriceAndWorkSheetList())
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_LABOR_UNIT_PRICE_AND_WORK_SHEET_LIST),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.updateLaborUnitPriceAndWorkSheetList(data))
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

/* Paint Machine Price ------------------------------------------------------------------------------------------------------------------------------*/
export const getPaintMachinePriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MACHINE_PRICE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getPaintMachinePriceList())
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_PAINT_MACHINE_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.updatePaintMachinePrice(data))
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

/* Paint Group List ----------------------------------------------------------------------------------------------------------------------------------------------*/
export const getPaintGroupListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_GROUP_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getPaintGroupList())
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_OPTIONS),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getPaintTypeOptions())
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_PRICE_LIST),
    mergeMap((action) => {
      const { paintBottomTopId } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getPaintTypePriceList(paintBottomTopId))
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_PAINT_TYPE_PRICE),
    mergeMap((action) => {
      const { data } = action;
      const { selectedPaintType } = state$.value.plasticCleanSheet.paintTypePrice;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.updatePaintTypePrice(data))
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___OPEN_PAINT_FORMULA_PRICE_MODAL),
    mergeMap((action) => {
      const { data, readOnly } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getPaintFormulaPirce(data))
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___PUT_PAINT_FORMULA_PRICE),
    mergeMap((action) => {
      const { data } = action;
      const paintBottomTopId = _get(state$, ['value', 'plasticCleanSheet', 'paintTypePrice', 'selectedPaintType', 'value'], '');
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.putPaintFormulaPirce(data))
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

/* Print Process Price --------------------------------------------------------------------------------*/
export const getPrintProcessPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_PRINT_PROCESS_PRICE),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getPrintProcessPrice(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPrintProcessPriceSuccess(response)),
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

export const updatePrintProcessPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_PRINT_PROCESS_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.updatePrintProcessPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getPrintProcessPrice()),
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

/* Paint Type List --------------------------------------------------------------------------------*/
export const getPaintTypeListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_TYPE_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getPaintTypeColorList())
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

/* Embedded Nail Price ------------------------------------------------------------------------------------------------------------------------------*/
export const getEmbeddedNailPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_EMBEDDED_NAIL_PRICE_LIST),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getEmbeddedNailPriceList(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getEmbeddedNailPriceListSuccess(response)),
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

export const updateEmbeddedNailPriceEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_EMBEDDED_NAIL_PRICE),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.updateEmbeddedNailPrice(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getEmbeddedNailPriceList()),
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

/* Paint Man Power Price List --------------------------------------------------------------------------------*/
export const getPaintManPowerProductTypeListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRODUCT_TYPE_LIST),
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___PUT_PAINT_MAN_POWER_PRICE_LIST),
    mergeMap((action) => {
      const { data } = action;
      const productTypeId = _get(state$.value, ['plasticCleanSheet', 'paintManPowerPrice', 'selectedProductType', 'value'], false);
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.PlasticCleanSheetResource.putPaintManPowerPriceList(data)
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_MAN_POWER_PRICE_LIST),
    mergeMap((action) => {
      const { productTypeId } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.PlasticCleanSheetResource.getPaintManPowerPriceList(productTypeId)
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

/* Grinding Price ------------------------------------------------------------------------------------------------------------------------------*/
export const getGrindingPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_GRINDING_PRICE_LIST),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.PlasticCleanSheetResource.getGrindingPriceList(params)
        ).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getGrindingPriceListSuccess(response.data))
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

export const putGrindingPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___PUT_GRINDING_PRICE_LIST),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.PlasticCleanSheetResource.putGrindingPriceList(data)
        ).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getGrindingPriceList()),
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

/* EmiSputteringPrice ------------------------------------------------------------------------------------------------------------------------------*/
export const getEmiSputteringPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_LIST),
    mergeMap((action) => {
      const { siteGroupId } = action;
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        siteGroupId,
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.PlasticCleanSheetResource.getEmiSputteringPriceList(params)
        ).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getEmiSputteringPriceListSuccess(response.data)),
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

export const putEmiSputteringPriceListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___PUT_EMI_SPUTTERING_PRICE_LIST),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.PlasticCleanSheetResource.putEmiSputteringPriceList(data)
        ).pipe(
          mergeMap(response => {
            const siteGroupId = _get(state$.value, ['plasticCleanSheet', 'emiSputteringPrice', 'selectedSite', 'value'], false);
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getEmiSputteringPriceList(siteGroupId)),
              of(NotificationSystemActions.pushNotification({
                message: '更新成功',
                level: 'success'
              }))
            );
          }),
          catchError(error => {
            console.log(error);
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

export const getEmiSputteringPriceSiteGroupListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_PRICE_SITE_LIST),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.PlasticCleanSheetResource.getEmiSiteGroupList(params)
        ).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getEmiSputteringPriceSiteListSuccess(response.data)),
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

/* Emi Sputtering List ------------------------------------------------------------------------------------------------------------------------------*/
export const getEmiSputteringListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_LIST),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.PlasticCleanSheetResource.getEmiSputteringList(params)
        ).pipe(
          mergeMap(response => {
            return concat(
              of(LoadingActions.toggleLoadingStatus(false)),
              of(getEmiSputteringListSuccess(response))
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

export const updateEmiSputteringEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_EMI_SPUTTERING),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.updateEmiSputtering(data))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getEmiSputteringList()),
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

/* Emi Sputtering Base List ----------------------------------------------------------------------------------------------------------------------------------------------*/
export const getEmiSputteringBaseListEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_BASE_LIST),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.getEmiSputteringBaseList(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getEmiSputteringBaseListSuccess(response)),
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

/* Emi Sputtering Site ----------------------------------------------------------------------------------------*/
export const getEmiSputteringSiteEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_EMI_SPUTTERING_SITE),
    mergeMap((action) => {
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        forkJoin(
          Resource.PlasticCleanSheetResource.getEmiSputteringSite(params),
          Resource.DatabaseResource.getSiteList(),
        )
          .pipe(
            mergeMap(responses => {
              const { data: { emiSputteringSiteGroupList: list, }, } = responses[0];
              const { data: { siteList: dropdown } } = responses[1];
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getEmiSputteringSiteSuccess({ list, dropdown, })),
              );
            }),
            catchError(error => {
              console.log('error :', error);
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

export const updateEmiSputteringSiteEpic = (action$, state$) => {
  return action$.pipe(
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_EMI_SPUTTERING_SITE),
    mergeMap((action) => {
      const { data } = action;
      const { activeProductType: { value } } = state$.value.dataBase.common;
      const params = {
        ...data,
        productTypeId: value,
      };
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.updateEmiSputteringSite(params))
          .pipe(
            mergeMap(response => {
              return concat(
                of(LoadingActions.toggleLoadingStatus(false)),
                of(getEmiSputteringSite({ productTypeId: value })),
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___GET_PAINT_VENDOR_LIST),
    mergeMap((action) => {
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(
          Resource.PlasticCleanSheetResource.getPaintVendorList()
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
    ofType(actionTypes.PLASTIC_CLEAN_SHEET___UPDATE_PAINT_VENDOR_LIST),
    mergeMap((action) => {
      const { data } = action;
      return concat(
        of(LoadingActions.toggleLoadingStatus(true)),
        from(Resource.PlasticCleanSheetResource.updatePaintVendorList(data))
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


export default [
  // Plastic parameters
  getPlasticParametersEpic,
  updatePlasticParametersEpic,

  //  Material LossRate
  getMaterialLossRateEpic,
  putMaterialLossRateEpic,

  // Machine Module
  getMachineModuleListEpic,
  updateMachineModuleListEpic,

  // Machine Tonnage Price
  getMachineTonnagePriceEpic,
  updateMachineTonnagePriceEpic,

  // Labor Unit Price And WorkSheet
  getLaborUnitPriceAndWorkSheetListEpic,
  updateLaborUnitPriceAndWorkSheetListEpic,

  // Paint Machine Price
  getPaintMachinePriceListEpic,
  updatePaintMachinePriceEpic,

  // PaintManPowerPrice
  getPaintManPowerPriceListEpic,
  putPaintManPowerPriceListEpic,
  getPaintManPowerProductTypeListEpic,

  // Paint Group List
  getPaintGroupListEpic,

  // Paint Type Price
  getPaintTypeOptionsEpic,
  getPaintTypePriceListEpic,
  updatePaintTypePriceEpic,
  // Paint Type Formula Price
  openPaintFormulaPriceModalEpic,
  putPaintFormulaPriceEpic,
  // Print Process Price
  getPrintProcessPriceEpic,
  updatePrintProcessPriceEpic,

  // Paint Type List
  getPaintTypeListEpic,

  // Embedded Nail Price
  getEmbeddedNailPriceListEpic,
  updateEmbeddedNailPriceEpic,

  // Grinding Price
  getGrindingPriceListEpic,
  putGrindingPriceListEpic,

  // Emi Sputtering List
  getEmiSputteringListEpic,
  updateEmiSputteringEpic,

  // Paint Vendor List
  getPaintVendorListEpic,
  updatePaintVendorListEpic,

  // Emi Sputtering Base List
  getEmiSputteringBaseListEpic,

  // Emi Sputtering Price
  getEmiSputteringPriceListEpic,
  putEmiSputteringPriceListEpic,
  getEmiSputteringPriceSiteGroupListEpic,

  // Emi Sputtering Site
  getEmiSputteringSiteEpic,
  updateEmiSputteringSiteEpic,

];
