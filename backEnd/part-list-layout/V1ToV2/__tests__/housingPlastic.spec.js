import util from 'util';

import V2Utils from '../V2Utils';
import initialValues from './HousingPlastic/V1InitialValues';
import layout from './HousingPlastic/V2Layout';


describe('[HousingPlastic]', () => {
  test('V1轉V2', async () => {
    let { initialValue: v1Initial } = initialValues;
    let { layout: v2Layout, version } = layout;


    // 整理tree info (multiple, switchable, children)
    let multipleInfo = V2Utils.convertLayoutWithMultipleInfo(v2Layout, 1);

    // V1和V2的path差異
    let versionsCompare = V2Utils.versionsPathInfo(multipleInfo);

    // // Step. 把v1的initial data 拿來轉成v2看得懂的格式(把multiple:false 砍掉的key補齊)
    // v2的格式
    let fullPathInitialData = V2Utils.convertFullPathInitialData(v1Initial, versionsCompare);
    // v2格式轉成Nested Object
    let v2NestedObjData = V2Utils.convertFullPathInitialDataToObj(fullPathInitialData);

    // 判斷Nested Object哪些要放到array裡面，哪些要維持object
    let v2Data = V2Utils.getFinalV2Data(v2NestedObjData, multipleInfo);
    console.log(util.inspect(v2Data, { showHidden: false, depth: null }));
    const desired = {
      toolingPartList:
      {
        hpUser:
        {
          hpItem: 'P5',
          hppartname: 'Housing Plastic-190620(From PRD -> U-Case_Sideband_FF_Faroe14_SILIVER _YH))',
          hppartnumber: 'T003',
          hpComponent: 'NB-Side_Band',
          hpProcess: 'PAINTING (1C1B)',
          hpModule: 'module1',
          ce: 0.1,
          hpmaterial: 'MEP_TMB1615',
          hpPrice: 0,
          hpmaterialspec1: 'PC_ABS_15percent_Talc',
          hpmaterial2: null,
          hpMaterialColor: 'GY1411 (Pika sliver 派克銀)',
          hpthickness: '1.7',
          hppartweightone: '31',
          hppartweighttwo: 0,
          hppartssizespec:
          {
            hppartssizewidth: '223.85',
            hppartssizelength: '324.2',
            hppartssizehigh: '10.8'
          }
        },
        hpTooling:
        {
          hpToolingPartsWeightSpec1: 25.3,
          hpToolingPartsWeightSpec2: 0,
          hpToolingModuleMode: '熱膠道正灌開放式',
          hpToolingSize:
          {
            hpToolingSizeLength: 660,
            hpToolingSizeWidth: 760,
            hpToolingSizeHigh: 620
          },
          hpToolingMachineTon: '450T',
          hpToolingMachinePrice: 0.2118,
          hpToolingSizeHole: { hpToolingHoleProduct1: 1, hpToolingHoleProduct2: 0 },
          hpToolingCT: 40,
          hpToolingShrinkRate: 2.5,
          hpToolingModuleFactory: '重慶 有勝',
          hpToolingMoldingManufacturer: '重慶 宇海',
          hpToolingSource: 'WCQ',
          hpToolingBonded: '保稅',
          hpToolingTSDate: '2018-08-16 ',
          hpToolingT1Date: '2018-09-17 ',
          hpToolingRemark: '外觀噴漆UV  \n正確價格為: 2.2859'
        }
      },
      CMFProcessList:
      {
        cmfPPainting:
        {
          cmfPPaintingCheckBox: true,
          cmfPPaintingType: 'UV',
          cmfPPaintingTypeYield: 0,
          cmfPPaintingPrimerTypeYield: 0.9,
          cmfPPaintingTopcoatTypeYield: 0.8,
          cmfPPaintingTypeLoss: 0,
          cmfPPaintingPrimerTypeLoss: 0.05,
          cmfPPaintingTopcoatTypeLoss: 0.05,
          cmfPPaintingColor: '常見顏色例如：黑色；灰色；銀色等 膜厚一般在15～20um',
          cmfPPaintingVendor: null,
          cmfPPaintingPrice: 0,
          cmfPPaintingPrimerPrice: 0,
          cmfPPaintingTopcoatPrice: 11.2,
          cmfPPaintingPreprocessor: 0,
          cmfPPaintingPrimerPreprocessor: 5,
          cmfPPaintingTopcoatPreprocessor: 5,
          cmfPPaintingGrinder: 0,
          cmfPPaintingPrimerGrinder: 3,
          cmfPPaintingTopcoatGrinder: 3,
          cmfPPaintingPainter: 0,
          cmfPPaintingPrimerPainter: 3,
          cmfPPaintingTopcoatPainter: 3,
          cmfPPaintingValidator: 0,
          cmfPPaintingPrimerValidator: 3,
          cmfPPaintingTopcoatValidator: 3,
          cmfPPaintingLaborCost: 0,
          cmfPPaintingPrimerLaborCost: 0.04,
          cmfPPaintingTopcoatLaborCost: 0.04,
          cmfPInch: 0,
          cmfPLengthOutside: 325,
          cmfPWidthOutside: 224,
          cmfPLengthInside: 0,
          cmfPWidthInside: 0,
          cmfPPrimer: { cmfPPrimerQTY: 0, cmfPPrimerThickness: 0 },
          cmfPTopcoat: { cmfPTopcoatQTY: 1, cmfPTopcoatThickness: 0.02 }
        },
        cmfPHotMelt: { cmfPHotMeltCheckBox: false, cmfPHotMeltCount: 0 },
        cmfPEmbedNail:
        {
          cmfPEmbedNailCheckBox: false,
          cmfPEmbedNailCount: 0,
          cmfPEmbedNailAuto: null
        },
        cmfPScreenPrinting:
        {
          cmfPScreenPrintingCheckBox: false,
          cmfPScreenPrintingCount: 0
        },
        cmfPPadPrinting: { cmfPPadPrintingCheckBox: true, cmfPPadPrintingCount: 4 },
        cmfPCNCFeeder: { cmfPCNCFeederCheckBox: false, cmfPCNCFeederCount: 0 },
        cmfPEMISputtering:
        {
          cmfPEMISputteringCheckBox: false,
          cmfPEMISputteringCount: 0,
          cmfPrice: 0.45
        }
      }
    };
    expect(v2Data).toMatchObject(desired);
  });
});
