import util from 'util';

import V2Utils from '../V2Utils';
import initialValues from './CableFFC/V1InitialValues';
import layout from './CableFFC/V2Layout';


describe('[CableFFC]', () => {
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
    // console.log(util.inspect(versionsCompare, { showHidden: false, depth: null }));
    console.log(util.inspect(v2Data, { showHidden: false, depth: null }));

    let desired = {
      FFCTab:
      {
        FFCItems:
        {
          partname: 'Cable FFC-190620.excel',
          partnumber: 'T005',
          FFCQty: 2,
          FFCPin: 20,
          FFCPitch: 2,
          FFCCableLength: 85.5
        },
        FFCProcessingContent:
        {
          FFCBendTImes: 2,
          FFCPrint: 1,
          FFCFlush: true,
          FFCGoldPlating: 1,
          FFCStopLine: 2
        },
        FFCAccessory:
        {
          FFCAlFoil: null,
          FFCAlFoilLength: 85.5,
          FFCAlFoilQty: 1,
          FFCReinforcingPlate: null,
          FFCReinforcingPlateLength: 10,
          FFCReinforcingPlateQty: 3,
          FFCLabel: null,
          FFCLabelQty: 1,
          FFCConductiveCloth: null,
          FFCConductiveClothLength: 85.5,
          FFCConductiveClothQty: 1,
          FFCAdhesive1: null,
          FFCAdhesive1Length: 15,
          FFCAdhesive1width: 10,
          FFCAdhesive1Qty: 1,
          FFCAdhesive2: null,
          FFCAdhesive2Length: 10,
          FFCAdhesive2width: 20,
          FFCAdhesive2Qty: 1
        },
        FFCRemark: { FFCRemarks: null }
      }
    };
    expect(v2Data).toMatchObject(desired);
  });
});
