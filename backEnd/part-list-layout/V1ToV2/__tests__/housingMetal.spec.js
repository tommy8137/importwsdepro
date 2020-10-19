import util from 'util';

import V2Utils from '../V2Utils';
import initialValues from './HousingMetal/V1InitialValues';
import layout from './HousingMetal/V2Layout';


describe('[Housing-Metal]', () => {
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
        hmUser:
        {
          hmInputBomLevel: null,
          hmItem: 'M2',
          hmpartname: 'Housing Metal-190620.excel',
          hmpartnumber: 'T002',
          hmmaterial: 'SUS304',
          hmmaterialdensity: 0,
          hmmaterialprice: 5.8,
          cmfProcessPrice: 0,
          cmfProcessDensity: 0,
          hmthickness: '0.5',
          hmpartssizespec:
          {
            hmpartssizewidth: '118.2',
            hmpartssizelength: '13.82',
            hmpartssizehigh: '2'
          },
          hmpartsexpandsize: { hmpartsexpandwidth: '333.9', hmpartsexpandlength: '237.95' },
          hmSecondProcess:
          {
            hmStandOff: null,
            hmRivetCount: null,
            hmTappingCount: null,
            hmSelfriveCount: null,
            hmHoleCount: 0
          }
        },
        hmTooling:
        {
          hmToolingMaterialSize: { hmToolingMaterialWidth: 5, hmToolingMaterialLength: 5 },
          hmToolingMaterialExpandSize:
          {
            hmToolingMaterialExpandWidth: 338.9,
            hmToolingMaterialExpandLength: 242.95
          },
          hmToolingIntervalPrice: 0.12,
          hmToolingWeight: 315.02521732499997,
          hmToolingMaterialWeight: 326.46126857499996,
          hmToolingHoleCount: 1,
          hmToolingStageDie:
          {
            hmToolingStageDieCount: 3,
            hmToolingStageDiePress: '160T',
            hmToolingStageDieModuleCost: 0.0103
          },
          hmToolingProgressiveDie:
          {
            hmToolingProgressiveDieCount: 2,
            hmToolingProgressiveDieStation: 2,
            hmToolingProgressiveDiePress: '250T',
            hmToolingProgressiveDieModuleCost: 0.018
          },
          hmToolingRivetingDie:
          {
            hmToolingRivetingDieCount: 3,
            hmToolingRivetingDiePress: '60T',
            hmToolingRivetingDieModuleCost: 0.0099
          },
          hmToolingTotalCount: 8,
          hmToolingModuleMode: '連續模+工程模+鉚合模',
          hmToolingModuleFeature: '修改for 新機種',
          hmToolingModuleFactory: '聖美',
          hmToolingMoldingManufacturer: 'CNP',
          hmToolingSource: 'WCQ',
          hmToolingPayout: 'WCQ',
          hmToolingBonded: '非保稅',
          hmToolingTSDate: '2018-10-01 ',
          hmToolingT1Date: '2018-11-01 ',
          hmToolingRemark: null
        }
      },
      CMFProcessList:
      {
        cmfProcessListUltrasonicClean: { cmfProcessListultrasonicCleanExist: true },
        cmfProcessListAnode:
        {
          cmfProcessListFirstAnodeCheckBox: true,
          cmfProcessListFirstAnodeColor: '銀色',
          cmfProcessListFirstAnodePrice: 16,
          cmfProcessListSecondAnodeCheckBox: true,
          cmfProcessListSecondAnodeColor: '鋁本色',
          cmfProcessListSecondAnodePrice: 16
        },
        cmfProcessListSandBlast:
        {
          cmfProcessListSandBlastCheckBox: true,
          cmfProcessListSandBlastSide: '單面',
          cmfProcessListSandBlastSideCount: 1
        },
        cmfProcessListHairLine:
        {
          cmfProcessListHairLineCheckBox: true,
          cmfProcessListHairLineArea: 70000
        },
        cmfProcessListPainting:
        {
          cmfProcessListPaintingCheckBox: true,
          cmfProcessListPaintingTypeAndColor: '粉體漆：(一般素色)',
          CmfProcessListPaintingPriceUSD: 5.7554,
          CmfProcessListPaintingPriceRMB: 40,
          cmfProcessListPaintingArea: 79451.5,
          cmfProcessListPaintingFilmThickness: 0.08,
          cmfProcessListPaintingCount: 1,
          cmfProcessListPaintingColor: null
        },
        cmfProcessListThermalBonding:
        {
          cmfProcessListThermalBondingCheckBox: true,
          cmfProcessListThermalBondingGlueType: 'DEVCON DV14167',
          cmfProcessListThermalBondingGluePrice: 0.3428,
          cmfProcessListThermalBondingGlueDensity: 0.97,
          cmfProcessListThermalBondingPathLength: 250,
          cmfProcessListThermalBondingGlueSyringeDiameter: 0.6,
          cmfProcessListThermalBondingGlueWeight: 0.06856542,
          cmfProcessListThermalBondingCycleTime: '90sec',
          cmfProcessListThermalBondingCycleTimePrice: 0.00303,
          cmfProcessListThermalBondingCycleTimeValue: 90
        },
        cmfProcessListSingleTapping:
        {
          cmfProcessListSingleTappingCheckBox: true,
          cmfProcessListSingleTappingCount: 1
        },
        cmfProcessListMultiTapping:
        {
          cmfProcessListMultiTappingCheckBox: true,
          cmfProcessListMultiTappingCount: 1
        },
        cmfProcessListSingleSpotWelding:
        {
          cmfProcessListSingleSpotWeldingCheckBox: true,
          cmfProcessListSingleSpotWeldingCount: 1
        },
        cmfProcessListMultiSpotWelding:
        {
          cmfProcessListMultiSpotWeldingCheckBox: true,
          cmfProcessListMultiSpotWeldingCount: 1
        },
        cmfProcessListPopRivet:
        {
          cmfProcessListPopRivetCheckBox: true,
          cmfProcessListPopRivetCount: 1
        },
        cmfProcessListRivet:
        {
          cmfProcessListRicetCheckBox: true,
          cmfProcessListRicetCount: 1
        },
        cmfProcessListHandMakeDraw:
        {
          cmfProcessListHandMakeDrawCheckBox: true,
          cmfProcessListHandMakeDrawCount: 2000
        },
        cmfProcessListScreenPrinting:
        {
          cmfProcessListScreenPrintingCheckBox: true,
          cmfProcessListScreenPrintingCount: 1
        },
        cmfProcessListPadPrinting:
        {
          cmfProcessListPadPrintingCheckBox: true,
          cmfProcessListPadPrintingCount: 1
        },
        cmfProcessListSilkPrint:
        {
          cmfProcessListSilkPrintCheckBox: true,
          cmfProcessListSilkPrintCount: 1
        },
        cmfProcessListCNC: { cmfProcessListCNCCheckBox: true, cmfProcessListCNCArea: 900 },
        cmfProcessListCNCPL:
        {
          cmfProcessListCNCPLCheckBox: true,
          cmfProcessListCNCPLLength: 250
        },
        cmfProcessListDrillCut:
        {
          cmfProcessListDrillCutCheckBox: true,
          cmfProcessListDrillCutArea: 120
        },
        cmfProcessListLaserPrint:
        {
          cmfProcessListLaserPrintCheckBox: true,
          cmfProcessListLaserPrintArea: 5000
        },
        cmfProcessListLaserPrintIcon:
        {
          cmfProcessListLaserPrintIconCheckBox: true,
          cmfProcessListLaserPrintIconCount: 11
        },
        cmfProcessListPolishing:
        {
          cmfProcessListPolishingAutoCheckBox: true,
          cmfProcessListPolishingAutoArea: 106000,
          cmfProcessListPolishingArtificialCheckBox: true,
          cmfProcessListPolishingArtificialArea: 105000,
          cmfProcessListPolishingSpeed: 0,
          cmfProcessListPolishingPrice: 0
        },
        cmfProcessListDrilling:
        {
          cmfProcessListDrillingCheckBox: true,
          cmfProcessListDrillingCount: 5400
        }
      }
    };
    expect(v2Data).toMatchObject(desired);
  });
});
