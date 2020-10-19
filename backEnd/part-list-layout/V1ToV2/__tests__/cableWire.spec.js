import util from 'util';

import V2Utils from '../V2Utils';
import initialValues from './CableWire/V1InitialValues';
import layout from './CableWire/V2Layout';


describe('[CableWire]', () => {
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

    // let
    const desired = {
      cwTab:
      {
        CWItems: { partname: 'Cable wire-190620.excel', partnumber: 'T006' },
        CWGroup:
          [{
            uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
            CWGroupName: 'Group Name',
            CWWire: null,
            cableMaterialType: '鐵氟龍線1',
            cableMaterialLength: 150,
            cableMaterialPin: 40,
            cableMaterialGuage: 34,
            CWConnector: null,
            cableConnectorName: 'Panel connector',
            cableConnectorType: 'Panel connector(without pull bar/40 pin)',
            cableConnectorVendorPn: 'YDY：051A-101-40P-802',
            cableConnectorMotherPN: null,
            cableMaterialUnitPrice: 0.033,
            cableConnectorWorkingTime: 210,
            cableConnectorUnitPrice: 0.075,
            CWSubMertialSwitch: true,
            CWSubMertial:
              [{
                uuid: expect.stringMatching(/[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}/i),
                CWSubMertialLabel: null,
                cableSupportMaterial: '醋酸布',
                cableSupportMaterialQty: 1,
                cableSupportMaterialLength: 0,
                cableSupportMaterialWidth: 0
              }]
          }]
      }
    };
    expect(v2Data).toMatchObject(desired);
  });
});
