import { ActionsObservable } from 'redux-observable';
import { of, throwError } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

import Resource from '~~apis/resource';
import CommonUtils from '~~utils/CommonUtils';
import * as LoadingActions from '~~redux/Loading/LoadingActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';

import * as CalculatorEpics from '../CalculatorEpics';
import * as CalculatorActions from '../CalculatorActions';
import CalculatorUtils from '../CalculatorUtils';


describe('[CalculatorEpics]', () => {
  test('test updateThermalTotalEpic', () => {
    // expect(1).toEqual(1);
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const action$ = hot('--a', {
        a: { type: CalculatorActions.actionTypes[`${CalculatorActions.actionPrefix}UPDATE_THERMAL_CALCULATOR_TABS_DATA_BY_NAME`] }
      });

      // 14個config加總是140
      const fakeData = CalculatorUtils.calculatorList.reduce((prev, curr) => {
        return {
          ...prev,
          [curr.value]: [{
            formData: {
              finalPrice: 10
            }
          }]
        };
      }, {});

      const state$ = {
        value: {
          calculator: fakeData
        }
      };
      const output$ = CalculatorEpics.updateThermalTotalEpic(action$, state$);
      expectObservable(output$).toBe('-- 500ms b', {
        b: {
          type: CalculatorActions.actionTypes[`${CalculatorActions.actionPrefix}UPDATE_THERMAL_CALCULATOR_TOTAL`],
          thermalCalculatorTotal: 140
        }
      });
    });
    testScheduler.flush();
  });


  describe('exportReportEpic', () => {
    const fakeData = CalculatorUtils.calculatorList.reduce((prev, curr) => {
      return {
        ...prev,
        [curr.value]: [{
          formData: {
            finalPrice: 0,
            unitPrice: 0,
            amount: 0
          }
        }]
      };
    }, {});
    const state$ = {
      value: {
        calculator: fakeData
      }
    };
    test('成功的時候有進到成功的action', (done) => {
      const {
        success: SUCCESS_ACTION_TYPE,
      } = CommonUtils.getTemplateActionTypes(CalculatorActions.actionPrefix, 'EXPORT_REPORT');

      // mock api
      const spy = jest
        .spyOn(Resource.CostGeneratorResource, 'exportThermalCalculatorReport')
        .mockReturnValue(Promise.resolve({
          status: 200,
          data: 'ok',
          headers: {
            'content-disposition': 'attachment; filename="Cost_Result_20181119.xlsx"',
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          }
        }));

      const action$ = ActionsObservable.of(CalculatorActions.exportReport());
      const result = CalculatorEpics.exportReportEpic(action$, state$)
        .pipe(toArray())
        .subscribe(actions => {
          expect(actions[0].type).toEqual(SUCCESS_ACTION_TYPE);
          expect(Object.keys(actions[0]).length).toEqual(1);
          spy.mockRestore();
          done();
        });
    });
    test('失敗的時候進到失敗的action', (done) => {
      const {
        failed: FAILED_ACTION_TYPE
      } = CommonUtils.getTemplateActionTypes(CalculatorActions.actionPrefix, 'EXPORT_REPORT');

      // mock api
      let Error = {
        status: 400,
        data: 'fail',
      };
      const spy = jest
        .spyOn(Resource.CostGeneratorResource, 'exportThermalCalculatorReport')
        .mockReturnValue(Promise.reject(Error));

      const action$ = ActionsObservable.of(CalculatorActions.exportReport());
      const result = CalculatorEpics.exportReportEpic(action$, state$)
        .pipe(toArray())
        .subscribe(actions => {
          expect(actions[0].type).toEqual(FAILED_ACTION_TYPE);
          expect(Object.keys(actions[0]).length).toEqual(1);
          expect(actions[1].type).toEqual('PUSH_NOTIFICATION');
          expect(actions[1].notifications.message).toEqual('export有誤，請稍後再試');
          expect(actions[1].notifications.level).toEqual('error');
          // FIXME 收不到第二個action
          spy.mockRestore();
          done();
        });
    });
    /* 不管用 END */
    xtest('use', (done) => {
      // mock api
      let Error = {
        status: 400,
        data: 'fail',
      };
      const spy = jest
        .spyOn(Resource.CostGeneratorResource, 'exportThermalCalculatorReport')
        .mockReturnValue(Promise.reject(Error));

      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const exportAction = CommonUtils.getTemplateActionTypes(CalculatorActions.actionPrefix, 'EXPORT_REPORT');
        const action$ = hot('--a', {
          a: { type: exportAction.base },
        });

        const output$ = CalculatorEpics.exportReportEpic(action$, state$);
        expectObservable(output$).toBe('--b', {
          b: LoadingActions.toggleLoadingStatus(true)
        });
        spy.mockRestore();
        done();
      });
      testScheduler.flush();
    });
  });

  describe('getThermalConfigsEpic', () => {
    const {
      base: BASE_ACTION_TYPE,
      success: SUCCESS_ACTION_TYPE,
      failed: FAILED_ACTION_TYPE
    } = CommonUtils.getTemplateActionTypes(CalculatorActions.actionPrefix, 'GET_THERMAL_CONFIGS');
    const state$ = null;
    test('成功的時候有進到成功的action', (done) => {
      // mock api
      const spy = jest
        .spyOn(Resource.CostGeneratorResource, 'getThermalTables')
        .mockReturnValue(Promise.resolve({
          status: 200,
          data: { "Fan": { "bearingAndSleeveTable": { "header": [{ "key": "type", "name": "軸承+套筒類別", "typeof": "string" }, { "key": "price", "name": "價格", "typeof": "number" }], "data": [{ "type": "Sleeve+塑膠_H<=7.5", "price": 0 }, { "type": "Sleeve+金屬_H<=7.5", "price": 0 }, { "type": "FDB+金屬_H<=4.5", "price": 0 }, { "type": "FDB+金屬_H>=5.0", "price": 0.35 }] }, "fanBladeMaterialTable": { "header": [{ "key": "type", "name": "扇葉材料", "typeof": "string" }, { "key": "price", "name": "價格", "typeof": "number" }], "data": [{ "type": "PBT_H<=7.5", "price": 0 }, { "type": "LCP_H<= 5.5", "price": 0.1 }, { "type": "LCP_H>=6", "price": 0.15 }] }, "fanSizeTable": { "header": [{ "key": "fanSize", "name": "Size", "typeof": "string" }, { "key": "price", "name": "價格", "typeof": "number" }], "data": [{ "fanSize": "60*60*3.5", "price": 5.5 }, { "fanSize": "60*60*4", "price": 3.7 }, { "fanSize": "60*60*4.5", "price": 3.5 }, { "fanSize": "60*60*5", "price": 2.5 }, { "fanSize": "60*60*5.5", "price": 2.1 }, { "fanSize": "60*60*6", "price": 1.75 }, { "fanSize": "60*60*6.5", "price": 1.65 }, { "fanSize": "60*60*7", "price": 1.4 }, { "fanSize": "60*60*7.5", "price": 1.4 }, { "fanSize": "80*80*5.5", "price": 2.2 }] }, "materialTable": { "header": [{ "key": "type", "name": "材質", "typeof": "string" }], "data": [{ "type": "有鹵" }, { "type": "無鹵" }] }, "motorArchitectureTable": { "header": [{ "key": "type", "name": "馬達", "typeof": "string" }, { "key": "price", "name": "價格", "typeof": "number" }], "data": [{ "type": "1_phase_H<=7.5", "price": "0.51234" }, { "type": "3_phase_H<=4.5", "price": 0 }, { "type": "3_phase_H>=5.0", "price": 0.25 }] }, "magnetMaterialAndSizeTable": { "header": [{ "key": "type", "name": "磁石材料", "typeof": "string" }, { "key": "price", "name": "價格", "typeof": "number" }], "data": [{ "type": "橡膠_H<=7.5", "price": 0 }, { "type": "MQ_H<= 5.5", "price": 0.1 }, { "type": "MQ_H>=6", "price": 0.15 }] }, "fanTypeTable": { "header": [{ "key": "fanType", "name": "風扇類型", "typeof": "string" }], "data": [{ "fanType": "Axial(軸流扇)" }, { "fanType": "Cross Flow Fan(橫流扇)" }, { "fanType": "Blower(離心扇)" }] } }, "Grease": { "materialTable": { "header": [{ "key": "material", "name": "材質", "typeof": "string" }, { "key": "materialCost", "name": "材料成本", "typeof": "number" }], "data": [{ "material": "7783", "materialCost": 490 }, { "material": "7762", "materialCost": 145 }] } }, "Fin": { "materialCostPerKilogramTable": { "header": [{ "key": "material", "name": "材料", "typeof": "string" }, { "key": "materialThickness", "name": "材料厚度", "typeof": "number" }, { "key": "materialCostPerKilogram", "name": "材料每公斤費用", "typeof": "number" }], "data": [{ "material": "AL1050", "materialThickness": 0.15, "materialCostPerKilogram": 3.6 }, { "material": "CU1100", "materialThickness": 0.1, "materialCostPerKilogram": 8.6 }, { "material": "CU1100", "materialThickness": 0.3, "materialCostPerKilogram": 8.2 }, { "material": "AL1050", "materialThickness": 0.4, "materialCostPerKilogram": 2.1 }, { "material": "AL1050", "materialThickness": 0.3, "materialCostPerKilogram": 2.9 }, { "material": "CU1100", "materialThickness": 0.2, "materialCostPerKilogram": 8.2 }, { "material": "AL1050", "materialThickness": 0.2, "materialCostPerKilogram": 2.9 }] }, "densityTable": { "header": [{ "key": "material", "name": "材料", "typeof": "string" }, { "key": "density", "name": "密度", "typeof": "number" }, { "key": "price", "name": "Price USD", "typeof": "number" }], "data": [{ "material": "AL1050", "density": 2.75, "price": 2.75 }, { "material": "CU1100", "density": 8.9, "price": 8.9 }] } }, "Pipe": { "pipeTypeTable": { "header": [{ "key": "pipeType", "name": "pipe形式", "typeof": "string" }], "data": [{ "pipeType": "Powder(結燒管)" }, { "pipeType": "Groove(溝槽管)" }, { "pipeType": "Complex(複合管)" }, { "pipeType": "VC(均熱管)" }] }, "outerDiameterTable": { "header": [{ "key": "outerDiameter", "name": "外徑直徑", "typeof": "string" }], "data": [{ "outerDiameter": "D4_" }, { "outerDiameter": "D6_" }, { "outerDiameter": "D8_" }] }, "outerDiameterFlatteningThicknessTable": { "header": [{ "key": "outerDiameter", "name": "外徑", "typeof": "string" }, { "key": "flatteningThickness", "name": "打扁", "typeof": "string" }, { "key": "math", "name": "數學", "typeof": "number" }, { "key": "cost", "name": "Cost", "typeof": "number" }], "data": [{ "outerDiameter": "D4_", "flatteningThickness": ">=2.0mm", "math": 2, "cost": 0 }, { "outerDiameter": "D4_", "flatteningThickness": ">=1.8mm", "math": 1.8, "cost": 0.15 }, { "outerDiameter": "D4_", "flatteningThickness": ">=1.6mm", "math": 1.6, "cost": 0.2 }, { "outerDiameter": "D4_", "flatteningThickness": ">=1.4mm", "math": 1.4, "cost": 0.25 }, { "outerDiameter": "D4_", "flatteningThickness": ">=1.2mm", "math": 1.2, "cost": 0.35 }, { "outerDiameter": "D4_", "flatteningThickness": ">=1.0mm", "math": 1, "cost": 0.45 }, { "outerDiameter": "D4_", "flatteningThickness": ">=0.8mm", "math": 0.8, "cost": 0.6 }, { "outerDiameter": "D4_", "flatteningThickness": ">=0.6mm", "math": 0.6, "cost": 0.8 }, { "outerDiameter": "D4_", "flatteningThickness": ">=0mm", "math": 0, "cost": 1 }, { "outerDiameter": "D6_", "flatteningThickness": ">=2.0mm", "math": 2, "cost": 0 }, { "outerDiameter": "D6_", "flatteningThickness": ">=1.8mm", "math": 1.8, "cost": 0.15 }, { "outerDiameter": "D6_", "flatteningThickness": ">=1.6mm", "math": 1.6, "cost": 0.2 }, { "outerDiameter": "D6_", "flatteningThickness": ">=1.4mm", "math": 1.4, "cost": 0.25 }, { "outerDiameter": "D6_", "flatteningThickness": ">=1.2mm", "math": 1.2, "cost": 0.35 }, { "outerDiameter": "D6_", "flatteningThickness": ">=1.0mm", "math": 1, "cost": 0.45 }, { "outerDiameter": "D6_", "flatteningThickness": ">=0.8mm", "math": 0.8, "cost": 0.6 }, { "outerDiameter": "D6_", "flatteningThickness": ">=0mm", "math": 0, "cost": 1 }, { "outerDiameter": "D8_", "flatteningThickness": ">=2.0mm", "math": 2, "cost": 0 }, { "outerDiameter": "D8_", "flatteningThickness": ">=1.8mm", "math": 1.8, "cost": 0.25 }, { "outerDiameter": "D8_", "flatteningThickness": ">=1.6mm", "math": 1.6, "cost": 0.3 }, { "outerDiameter": "D8_", "flatteningThickness": ">=1.4mm", "math": 1.4, "cost": 0.4 }, { "outerDiameter": "D8_", "flatteningThickness": ">=1.2mm", "math": 1.2, "cost": 0.5 }, { "outerDiameter": "D8_", "flatteningThickness": ">=1.0mm", "math": 1, "cost": 0.6 }, { "outerDiameter": "D8_", "flatteningThickness": ">=0mm", "math": 0, "cost": 1 }] }, "outerDiameterLengthTable": { "header": [{ "key": "outerDiameter", "name": "外徑", "typeof": "string" }, { "key": "flatteningThickness", "name": "打扁", "typeof": "string" }, { "key": "math", "name": "數學", "typeof": "number" }, { "key": "cost", "name": "cost", "typeof": "number" }], "data": [{ "outerDiameter": "D4_", "flatteningThickness": "2.0mm", "math": 2, "cost": 0 }, { "outerDiameter": "D4_", "flatteningThickness": "1.8mm", "math": 1.8, "cost": 0.15 }, { "outerDiameter": "D4_", "flatteningThickness": "1.6mm", "math": 1.6, "cost": 0.2 }, { "outerDiameter": "D4_", "flatteningThickness": "1.4mm", "math": 1.4, "cost": 0.25 }, { "outerDiameter": "D4_", "flatteningThickness": "1.2mm", "math": 1.2, "cost": 0.35 }, { "outerDiameter": "D4_", "flatteningThickness": "1.0mm", "math": 1, "cost": 0.45 }, { "outerDiameter": "D4_", "flatteningThickness": "0.8mm", "math": 0.8, "cost": 0.6 }, { "outerDiameter": "D4_", "flatteningThickness": "0.6mm", "math": 0.6, "cost": 0.8 }, { "outerDiameter": "D6_", "flatteningThickness": "2.0mm", "math": 2, "cost": 0 }, { "outerDiameter": "D6_", "flatteningThickness": "1.8mm", "math": 1.8, "cost": 0.15 }, { "outerDiameter": "D6_", "flatteningThickness": "1.4mm", "math": 1.4, "cost": 0.25 }, { "outerDiameter": "D6_", "flatteningThickness": "1.2mm", "math": 1.2, "cost": 0.35 }, { "outerDiameter": "D6_", "flatteningThickness": "1.0mm", "math": 1, "cost": 0.45 }, { "outerDiameter": "D6_", "flatteningThickness": "0.8mm", "math": 0.8, "cost": 0.6 }, { "outerDiameter": "D8_", "flatteningThickness": "2.0mm", "math": 2, "cost": 0 }, { "outerDiameter": "D8_", "flatteningThickness": "1.8mm", "math": 1.8, "cost": 0.25 }, { "outerDiameter": "D8_", "flatteningThickness": "1.6mm", "math": 1.6, "cost": 0.3 }, { "outerDiameter": "D8_", "flatteningThickness": "1.4mm", "math": 1.4, "cost": 0.4 }, { "outerDiameter": "D8_", "flatteningThickness": "1.2mm", "math": 1.2, "cost": 0.5 }, { "outerDiameter": "D8_", "flatteningThickness": "1.0mm", "math": 1, "cost": 0.6 }] } }, "ThermalBlock": { "thermalBlockTable": { "header": [{ "key": "material", "name": "材料", "typeof": "string" }, { "key": "materialThickness", "name": "材料厚度", "typeof": "number" }, { "key": "materialCostPerKilogram", "name": "材料每公斤費用", "typeof": "number" }], "data": [{ "material": "CU1100", "materialThickness": 0.1, "materialCostPerKilogram": 8.6 }, { "material": "CU1100", "materialThickness": 0.2, "materialCostPerKilogram": 8.2 }, { "material": "CU1100", "materialThickness": 0.3, "materialCostPerKilogram": 8.2 }, { "material": "CU1100", "materialThickness": 0.5, "materialCostPerKilogram": 8.2 }, { "material": "CU1100", "materialThickness": 0.6, "materialCostPerKilogram": 8.2 }, { "material": "CU1100", "materialThickness": 0.8, "materialCostPerKilogram": 8.2 }, { "material": "皮銅", "materialThickness": 0.5, "materialCostPerKilogram": 8.2 }, { "material": "AL1050", "materialThickness": 0.15, "materialCostPerKilogram": 3.6 }, { "material": "AL1050", "materialThickness": 0.2, "materialCostPerKilogram": 2.9 }, { "material": "AL1050", "materialThickness": 0.3, "materialCostPerKilogram": 2.9 }, { "material": "AL1050", "materialThickness": 0.4, "materialCostPerKilogram": 2.9 }, { "material": "AL1050", "materialThickness": 0.5, "materialCostPerKilogram": 2.9 }, { "material": "AL1050", "materialThickness": 0.6, "materialCostPerKilogram": 2.9 }, { "material": "AL1050", "materialThickness": 0.8, "materialCostPerKilogram": 2.9 }, { "material": "AL1052", "materialThickness": 1, "materialCostPerKilogram": 5 }] }, "materialDensityTable": { "header": [{ "key": "material", "name": "材料", "typeof": "string" }, { "key": "density", "name": "密度", "typeof": "number" }], "data": [{ "material": "CU1100", "density": 8.9 }, { "material": "皮銅", "density": 8.8 }, { "material": "AL1050", "density": 2.75 }, { "material": "AL1052", "density": 2.71 }] } }, "ThermalPad": { "thicknessTable": { "header": [{ "key": "heatTransferCoefficient", "name": "熱傳係數(K值)", "typeof": "number" }, { "key": "thickness", "name": "厚度", "typeof": "number" }, { "key": "price", "name": "價格", "typeof": "number" }, { "key": "shore", "name": "硬度", "typeof": "number" }], "data": [{ "heatTransferCoefficient": 6, "thickness": 0.5, "price": 257, "shore": 45 }, { "heatTransferCoefficient": 6, "thickness": 0.8, "price": 300, "shore": 45 }, { "heatTransferCoefficient": 6, "thickness": 1, "price": 320, "shore": 45 }, { "heatTransferCoefficient": 1.3, "thickness": 0.5, "price": 74, "shore": 24 }, { "heatTransferCoefficient": 1.3, "thickness": 1, "price": 98, "shore": 24 }, { "heatTransferCoefficient": 1.3, "thickness": 1.5, "price": 136, "shore": 24 }, { "heatTransferCoefficient": 1.3, "thickness": 3, "price": 197, "shore": 24 }, { "heatTransferCoefficient": 3, "thickness": 0.5, "price": 95, "shore": 42 }, { "heatTransferCoefficient": 3, "thickness": 1, "price": 121, "shore": 42 }, { "heatTransferCoefficient": 3, "thickness": 1.5, "price": 168, "shore": 42 }, { "heatTransferCoefficient": 3, "thickness": 2.25, "price": 270, "shore": 42 }, { "heatTransferCoefficient": 3, "thickness": 2.5, "price": 315, "shore": 42 }, { "heatTransferCoefficient": 6, "thickness": 0.3, "price": 189, "shore": 45 }] }, "heatTransferCoefficientTable": { "header": [{ "key": "heatTransferCoefficient", "name": "熱傳係數(K值)", "typeof": "number" }, { "key": "shore", "name": "硬度", "typeof": "number" }], "data": [{ "heatTransferCoefficient": 1.3, "shore": 24 }, { "heatTransferCoefficient": 3, "shore": 42 }, { "heatTransferCoefficient": 6, "shore": 45 }] } }, "ThermalPlate": { "materialDensityTable": { "header": [{ "key": "material", "name": "材料", "typeof": "string" }, { "key": "density", "name": "密度", "typeof": "number" }], "data": [{ "material": "CU1100", "density": 8.9 }, { "material": "KU400", "density": 7.85 }, { "material": "SGCC", "density": 7.85 }, { "material": "SECC", "density": 7.85 }, { "material": "SPCC", "density": 7.85 }, { "material": "C18400", "density": 8.8 }] }, "materialCostPerKilogramTable": { "header": [{ "key": "material", "name": "材料", "typeof": "string" }, { "key": "materialThickness", "name": "材料厚度", "typeof": "number" }, { "key": "materialCostPerKilogram", "name": "材料每公斤費用", "typeof": "number" }], "data": [{ "material": "CU1100", "materialThickness": 0.5, "materialCostPerKilogram": 4.5 }, { "material": "CU1100", "materialThickness": 0.6, "materialCostPerKilogram": 4.5 }, { "material": "CU1100", "materialThickness": 0.8, "materialCostPerKilogram": 4.5 }, { "material": "C18400", "materialThickness": 0.3, "materialCostPerKilogram": 4.5 }, { "material": "KU400", "materialThickness": 0.5, "materialCostPerKilogram": 1.5 }, { "material": "KU400", "materialThickness": 0.6, "materialCostPerKilogram": 1.5 }, { "material": "SGCC", "materialThickness": 0.5, "materialCostPerKilogram": 1.4 }, { "material": "SGCC", "materialThickness": 0.6, "materialCostPerKilogram": 1.37 }, { "material": "SGCC", "materialThickness": 0.8, "materialCostPerKilogram": 1 }, { "material": "SGCC", "materialThickness": 1, "materialCostPerKilogram": 1.35 }, { "material": "SGCC", "materialThickness": 1.2, "materialCostPerKilogram": 1.36 }, { "material": "SECC", "materialThickness": 0.5, "materialCostPerKilogram": 1.39 }, { "material": "SECC", "materialThickness": 0.6, "materialCostPerKilogram": 1.37 }, { "material": "SPCC", "materialThickness": 0.5, "materialCostPerKilogram": 0.95 }, { "material": "SPCC", "materialThickness": 0.6, "materialCostPerKilogram": 0.9 }, { "material": "SPCC", "materialThickness": 0.8, "materialCostPerKilogram": 0.8 }, { "material": "SPCC", "materialThickness": 1, "materialCostPerKilogram": 0.8 }, { "material": "SPCC", "materialThickness": 1.2, "materialCostPerKilogram": 0.8 }, { "material": "SPCC", "materialThickness": 1.6, "materialCostPerKilogram": 0.8 }] } }, "Screw": { "polishedRodTable": { "header": [{ "key": "type", "name": "光桿", "typeof": "string" }], "data": [{ "type": "Yes" }, { "type": "No" }] } }, "Sponge": { "materialTable": { "header": [{ "key": "material", "name": "材料", "typeof": "string" }, { "key": "materialThickness", "name": "材料厚度", "typeof": "number" }, { "key": "materialCostPerMM", "name": "材料每mm費用", "typeof": "number" }], "data": [{ "material": "CR1015", "materialThickness": 0.5, "materialCostPerMM": 0.98 }, { "material": "CR1015", "materialThickness": 0.8, "materialCostPerMM": 1.15 }, { "material": "CR1015", "materialThickness": 1, "materialCostPerMM": 1.31 }, { "material": "CR1015", "materialThickness": 1.5, "materialCostPerMM": 2.62 }, { "material": "CR1015", "materialThickness": 2, "materialCostPerMM": 2.62 }, { "material": "CR1015", "materialThickness": 2.5, "materialCostPerMM": 3.93 }, { "material": "CR1015", "materialThickness": 3, "materialCostPerMM": 3.93 }, { "material": "CR1015", "materialThickness": 4, "materialCostPerMM": 5.25 }, { "material": "CR1015", "materialThickness": 5, "materialCostPerMM": 6.56 }, { "material": "SM55", "materialThickness": 2, "materialCostPerMM": 4.43 }, { "material": "SM55", "materialThickness": 2.5, "materialCostPerMM": 4.59 }, { "material": "SM55", "materialThickness": 3, "materialCostPerMM": 4.75 }, { "material": "SM55", "materialThickness": 4, "materialCostPerMM": 5.74 }, { "material": "SM55", "materialThickness": 4.5, "materialCostPerMM": 6.23 }, { "material": "SM55", "materialThickness": 5, "materialCostPerMM": 7.38 }, { "material": "藍色PMP1800", "materialThickness": 1, "materialCostPerMM": 5.9 }, { "material": "藍色PMP1800", "materialThickness": 1.5, "materialCostPerMM": 6.56 }, { "material": "藍色PMP1800", "materialThickness": 2, "materialCostPerMM": 6.56 }, { "material": "藍色PMP1800", "materialThickness": 2.5, "materialCostPerMM": 7.87 }, { "material": "黑色PMP1800", "materialThickness": 1, "materialCostPerMM": 5.9 }, { "material": "黑色PMP1800", "materialThickness": 2, "materialCostPerMM": 6.5 }, { "material": "黑色PMP1800", "materialThickness": 3, "materialCostPerMM": 8.2 }, { "material": "E4382", "materialThickness": 0.5, "materialCostPerMM": 4.92 }, { "material": "E4382", "materialThickness": 1, "materialCostPerMM": 4.92 }, { "material": "E4382", "materialThickness": 1.5, "materialCostPerMM": 7.38 }, { "material": "E4382", "materialThickness": 2.5, "materialCostPerMM": 12.3 }, { "material": "E4382", "materialThickness": 3.5, "materialCostPerMM": 17.21 }, { "material": "E4382", "materialThickness": 4.5, "materialCostPerMM": 22.13 }] } } },
        }));
      const spy2 = jest
        .spyOn(Resource.CostGeneratorResource, 'getThermalDefaultFields')
        .mockReturnValue(Promise.resolve({
          status: 200,
          data: 'ok',
        }));
      const action$ = ActionsObservable.of(CalculatorActions.getThermalConfigs());
      const result = CalculatorEpics.getThermalConfigsEpic(action$, state$)
        .pipe(toArray())
        .subscribe(actions => {
          expect(actions[0].type).toEqual(LoadingActions.actionTypes.LOADING___TOGGLE_LOADING_STATUS);
          expect(actions[0].isOnLoading).toEqual(true);
          expect(Object.keys(actions[0]).length).toEqual(2);
          expect(actions[1].type).toEqual(SUCCESS_ACTION_TYPE);
          // 14個計算機只有9個有table
          expect(Object.keys(actions[1].thermalStore).length).toEqual(9);
          // 有14個計算機
          expect(Object.keys(actions[1].thermalConfig).length).toEqual(14);
          expect(actions[2].type).toEqual(LoadingActions.actionTypes.LOADING___TOGGLE_LOADING_STATUS);
          expect(actions[2].isOnLoading).toEqual(false);
          spy.mockRestore();
          spy2.mockRestore();
          done();
        });
    });

    test('失敗的時候有進到失敗的action', (done) => {
      // mock api
      const spy = jest
        .spyOn(Resource.CostGeneratorResource, 'getThermalTables')
        .mockReturnValue(Promise.reject({
          status: 400,
          data: 'fail'
        }));
      const spy2 = jest
        .spyOn(Resource.CostGeneratorResource, 'getThermalDefaultFields')
        .mockReturnValue(Promise.resolve({
          status: 400,
          data: 'fail',
        }));
      const action$ = ActionsObservable.of(CalculatorActions.getThermalConfigs());
      const result = CalculatorEpics.getThermalConfigsEpic(action$, state$)
        .pipe(toArray())
        .subscribe(actions => {
          expect(actions[0].type).toEqual(LoadingActions.actionTypes.LOADING___TOGGLE_LOADING_STATUS);
          expect(actions[0].isOnLoading).toEqual(true);
          expect(actions[1].type).toEqual(FAILED_ACTION_TYPE);
          expect(Object.keys(actions[1]).length).toEqual(1);
          expect(actions[2].type).toEqual(NotificationSystemActions.actionTypes.PUSH_NOTIFICATION);
          expect(actions[2].notifications.message).toEqual('取得資料有誤，請稍後再試');
          expect(actions[2].notifications.level).toEqual('error');
          expect(actions[3].type).toEqual(LoadingActions.actionTypes.LOADING___TOGGLE_LOADING_STATUS);
          expect(actions[3].isOnLoading).toEqual(false);
          spy.mockRestore();
          spy2.mockRestore();
          done();
        });
    });
  });

  describe('handelOnLoadingEpic', () => {
    test('1. exportAction.base的action 會讓loader打開', () => {
      // expect(1).toEqual(1);
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const exportAction = CommonUtils.getTemplateActionTypes(CalculatorActions.actionPrefix, 'EXPORT_REPORT');
        const action$ = hot('--a', {
          a: { type: exportAction.base }
        });

        const state$ = null;
        const output$ = CalculatorEpics.handelOnLoadingEpic(action$, state$);
        expectObservable(output$).toBe('--b', {
          b: LoadingActions.toggleLoadingStatus(true)
        });
      });
      testScheduler.flush();
    });

    test('2. exportAction.success的action 會讓loader關起來', () => {
      // expect(1).toEqual(1);
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const exportAction = CommonUtils.getTemplateActionTypes(CalculatorActions.actionPrefix, 'EXPORT_REPORT');
        const action$ = hot('--a', {
          a: { type: exportAction.success },
        });

        const state$ = null;
        const output$ = CalculatorEpics.handelOnLoadingEpic(action$, state$);
        expectObservable(output$).toBe('--b', {
          b: LoadingActions.toggleLoadingStatus(false)
        });
      });
      testScheduler.flush();
    });

    test('3. exportAction.failed的action 會讓loader關起來', () => {
      // expect(1).toEqual(1);
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
      });
      testScheduler.run(({ hot, cold, expectObservable }) => {
        const exportAction = CommonUtils.getTemplateActionTypes(CalculatorActions.actionPrefix, 'EXPORT_REPORT');
        const action$ = hot('--a', {
          a: { type: exportAction.failed },
        });

        const state$ = null;
        const output$ = CalculatorEpics.handelOnLoadingEpic(action$, state$);
        expectObservable(output$).toBe('--b', {
          b: LoadingActions.toggleLoadingStatus(false)
        });
      });
      testScheduler.flush();
    });
  });
});
