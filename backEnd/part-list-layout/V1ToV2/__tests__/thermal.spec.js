
import util from 'util';

import V2Utils from '../V2Utils';
import initialValues from './ThermalModule/V1InitialValues';
import layout from './ThermalModule/V2Layout';


describe('[ThermalModule]', () => {
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
      'thermal-module':
      {
        Fan:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            fanLabel: 'Fan',
            fanAmount: 1,
            fanType: 'Cross Flow Fan(橫流扇)',
            fanSize: '60*60*5',
            fanSizePrice: 2.5,
            motorArchitecture: '3_phase_H>=5.0',
            motorArchitecturePrice: 0.25,
            bearingAndSleeve: 'Sleeve+金屬_H<=7.5',
            bearingAndSleevePrice: 0,
            fanBladeMaterial: 'LCP_H>=6',
            fanBladeMaterialPrice: 0.15,
            magnetMaterialAndSize: 'MQ_H<= 5.5',
            magnetMaterialAndSizePrice: 0.1,
            hasHalogen: false,
            fanAppearanceProcess1: '塗黑',
            fanAppearanceProcess2: null
          }],
        Pipe:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            pipeLabel: 'Pipe',
            pipeAmount: 1,
            pipeType: 'Powder(結燒管)',
            outerDiameter: 'PD6_',
            pipeLength: 255,
            pipiLenThickODiaToCost: 0,
            pipiLenODiaToCost: 0,
            pipeFlatteningThickness: 2.4,
            pipiFlThickODiaToCost: 0,
            pipeAppearanceProcess1: null,
            pipeAppearanceProcess2: null
          }],
        Fin:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            finLabel: 'Fin',
            finAmount: 1,
            finMaterial: 'CU1100',
            finPitch: 1.5,
            finProductionSize:
            {
              finProductionLength: 60,
              finProductionWidth: 10,
              finProductionHigh: 4.2
            },
            finProductionExpandSize:
            {
              finProductionExpandLength: 12.2,
              finProductionExpandWidth: 20
            },
            finMaterialCostPerKilogram: 8.6,
            finDensity: 0,
            finMaterialThickness: 0.1,
            finNickelPlating: true,
            finAppearanceProcess1: null,
            finAppearanceProcess2: null
          }],
        ThermalPlate:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            thPlLabel: 'CPU',
            thPlAmount: 1,
            thPlMaterial: 'KU400',
            thPlMaterialCostPerKilogram: 1.5,
            thPlMaterialThickness: 0.5,
            thPlProductionSize:
            {
              thPlProductionLength: 0,
              thPlProductionWidth: 0,
              thPlProductionHigh: 0
            },
            thPlProductionExpandSize:
            {
              thPlProductionExpandLength: 69,
              thPlProductionExpandWidth: 35.9
            },
            thPlNickelPlating: true,
            thPlAppearanceProcess1: null,
            thPlAppearanceProcess2: null,
            thPlDensity: 0
          }],
        ThermalBlock:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            thBlLabel: 'CPU',
            thBlAmount: 1,
            thBlMaterial: 'CU1100',
            thBlMaterialCostPerKilogram: 8.2,
            thBlMaterialThickness: 0.5,
            thBlProductionSize: { thBlProductionLength: 42, thBlProductionWidth: 24 },
            thBlNickelPlating: false,
            thBlDensity: 0
          }],
        Screw:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            screwLabel: 'Screw',
            screwAmount: 7,
            screwToothpath: 2.5,
            screwHeadDiameter: 5,
            screwHeadThickness: 0.8,
            screwLength: 6,
            screwPolishedRod: true,
            screwNeckDiameter: 0,
            screwNeckLength: 0,
            screwResistantFall: true
          }],
        Spring:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            springLabel: 'Spring',
            springAmount: 7,
            springWireDiameter: 0.45,
            springCoilCenterDiameter: 4.3,
            springFreeLong: 3.3
          }],
        ORing:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            oRLabel: 'O-Ring',
            oRAmount: 7,
            oROuterDiameter: 5.6,
            oRInnerDiameter: 2.5,
            oRThickness: 0.35
          }],
        Clip:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            clipLabel: 'Clip',
            clipAmount: 2,
            clipMaterial: 'KU400',
            clipMaterialCostPerKilogram: 1.5,
            clipWireDiameter: 0,
            clipProductionLength: 0,
            clipProductionWidth: 0
          }],
        PushPin:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            pupiLabel: 'Push Pin',
            pupiAmount: 0,
            pupiLength: 0,
            pupiHeadDiameter: 0
          }],
        Label:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            labelLabel: 'Label',
            labelAmount: 0,
            labelLength: 0,
            labelWidth: 0,
            labelThickness: 0
          }],
        Sponge:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            spongeLabel: 'Sponge',
            spongeAmount: 1,
            spongeMaterial: 'E4382',
            spongeLength: 13.5,
            spongeWidth: 4.2,
            spongeMaterialThickness: 0.5,
            spongeMaterialCostPerMM: 4.92
          },
          {
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            spongeLabel: 'Sponge',
            spongeAmount: 1,
            spongeMaterial: 'E4382',
            spongeLength: 12.1,
            spongeWidth: 3.8,
            spongeMaterialThickness: 1.5,
            spongeMaterialCostPerMM: 7.38
          },
          {
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            spongeLabel: 'Sponge',
            spongeAmount: 4,
            spongeMaterial: 'E4382',
            spongeLength: 13.5,
            spongeWidth: 4,
            spongeMaterialThickness: 1.5,
            spongeMaterialCostPerMM: 7.38
          },
          {
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            spongeLabel: 'Sponge',
            spongeAmount: 2,
            spongeMaterial: 'E4382',
            spongeLength: 11,
            spongeWidth: 4,
            spongeMaterialThickness: 2.5,
            spongeMaterialCostPerMM: 12.3
          }],
        Grease:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            greaseLabel: 'Grease',
            greaseAmount: 2,
            greaseMaterial: 7783,
            greaseMaterialCost: 490,
            greaseLength: 37,
            greaseWidth: 14,
            greaseThickness: 0.2
          },
          {
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            greaseLabel: 'Grease',
            greaseAmount: 1,
            greaseMaterial: 7783,
            greaseMaterialCost: 490,
            greaseLength: 12,
            greaseWidth: 10,
            greaseThickness: 0.2
          }],
        ThermalPad:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            thermalPadLabel: 'Thermal Plad',
            thermalPadAmount: 1,
            thermalPadHeatTransferCoefficient: 3,
            thermalPadShore: 42,
            thermalPadThickness: 1,
            thermalPadLength: 9,
            thermalPadWidth: 6,
            thermalPadPrice: 121
          }]
      }
    };
    expect(v2Data).toMatchObject(desired);
  });
});
