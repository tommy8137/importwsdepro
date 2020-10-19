import util from 'util';

import V2Utils from '../V2Utils';
import initialValues from './DieCut/V1InitialValues';
import layout from './DieCut/V2Layout';


describe('[DieCut]', () => {
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

    const desired = {
      dieCutTab:
      {
        DieCutPartItemInfo: { partname: 'Die Cut-190620.excel', partnumber: 'T004' },
        MainMaterial:
        {
          type2: 'Sponge_of_Mylar_Sponge_Poron',
          materialspec: 'T0.5Sponge',
          material: 'EVA',
          materialPerCost: 0,
          mainMaterialSize:
          {
            partssizelength: '20',
            partssizewidth: '30',
            partssizehigh: '0'
          },
          stampingTypeName: '沖切',
          stampingType: 1,
          dieCutRemark: null
        },
        usingSubMaterialSwitch: true,
        usingSubMaterial:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            subMaterialLabel: null,
            subType2: 'Adhesive',
            subMaterialspec: 'T0.4Adhesive',
            subMaterial: 'DIC_8404B',
            subMaterialPerCost: 36.39705882,
            subMaterialSize:
            {
              subMaterialLength: 20,
              subMaterialWidth: 20,
              subMaterialHeight: 0
            },
            assyCount: 2
          },
          {
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            subMaterialLabel: null,
            subType2: 'Mylar',
            subMaterialspec: 'T0.05Mylar',
            subMaterial: '透明',
            subMaterialPerCost: 0.638235294,
            subMaterialSize:
            {
              subMaterialLength: 30,
              subMaterialWidth: 30,
              subMaterialHeight: 0
            },
            assyCount: 2
          }]
      }
    };
    expect(v2Data).toMatchObject(desired);
  });
});
