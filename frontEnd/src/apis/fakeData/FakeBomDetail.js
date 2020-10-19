import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import fakeDropdownvalue from './fakeDropdownvalue.json';

const fakeBomHeaders = ['item', 'CPN', 'modified_version', 'isCalculation', 'system_cost', 'source_cost', 'level', 'RFQ_PN', 'reference_PN', 'PartName', 'image', 'QTY', 'Owner'];


const fakeBomItems = [
  ...[...Array(4).keys()].map(index => {
    const level = _.random(2, 11);
    const levelLabel = level === 1 ? 'DC/65' : level;
    const subLeve = level === 2;
    return {
      item: index,
      id: 'c5a11310-85a0-11e9-8b21-0242ac110002',
      customer_pn: 'test',
      supply_type: 'AVAP',
      level: levelLabel,
      parent_level: 86,
      sub_leve: subLeve,
      rfq_pn: 'ABC11122223333',
      ref_part_num: null,
      part_name: 'NO',
      image_id: '0242ac110002',
      image_path: 'a/b/c.jpg',
      gb_assy_ctgy: 'KB Support ',
      func_ctgy: 'ME',
      parts_ctgy_1: 'Thermal',
      parts_ctgy_2: 'Module',
      material_spec: 'aa',
      material: null,
      part_size_l: '1.1',
      part_size_w: '2.1',
      part_size_h: '3.1',
      part_size_ef: '4.1',
      part_size_m: '9.1',
      part_size_l2: '5.1',
      part_size_w2: '6.1',
      thickness: '7.1',
      part_weight: '8.1',
      unedit: index % 2,
      partlist_price: {},
      partlist_amount: null,
      update_time: '2019年3月25日 3:38pm',
      sku0: '0',
      sku1: '0',
      sku2: '0',
      sku3: '0',
      sku4: '0',
      sku5: '0',
      system_cost: index % 2 ? 123.45 : 0,
      odm_oem: 'ODM',
      initaddmodidel: 'Add',
      part_number: null,
      owner: 'WINSOME YANG',
      current_price: { price: 100, validDate: '20190822' },
      suggestion_cost: [
        { key: 'system_cost', value: 0, selected: false },
        { key: 'sourcer_cost', value: 0, selected: false },
        { key: 'spa_cost', value: 0, selected: false }
      ],
      spa_cost: {
        material_name: 'test',
        cost: index % 2 ? 123.45 : ''
      },
      sourcer_cost: 12.22,
      suggestion_cost_type: index % 2 ? 'system_cost' : 'spa_cost'
    };
  })
];


const fakeInputBom = {
  version: 'V0.7',
  editAble: true,
  projectName: 'Bucky N15',
  totalItems: 30,
  skuDesc: '描述',
  bomItems: [...fakeBomItems],
  partItems: [
    {
      type1: 'Housing',
      type2: 'Metal',
      partlist: [
        {
          id: 'asda-asdasdgeadad',
          part_name: 'test',
          ref_part_num: '1234-23123',
          material_spec: 'WHAT',
          material: 'the',
          image_path: [
            'e20d5b52-7d40-11e9-9f2a-0242ac110002',
            'e20d5b52-7d40-11e9-9f2a-0242ac110002',
            'e20d5b52-7d40-11e9-9f2a-0242ac110002'
          ],
          update_time: '2019-07-09 13:00:00'
        },
      ]
    },
    {
      type1: 'Housing',
      type2: 'Whatever',
      partlist: [
        {
          id: 'asda-asdasdgeadad',
          part_name: 'test',
          ref_part_num: '1234-23123',
          material_spec: 'WHAT',
          material: 'the',
          image_path: [
            'e20d5b52-7d40-11e9-9f2a-0242ac110002',
          ],
          update_time: '2019-07-09 13:00:00'
        }
      ]
    }
  ]
};

const fakePartListHeaders = ['partName', 'partNumber', 'materialSpec', 'material', 'lastModified'];
const fakePartList = [
  ...[...Array(20).keys()].map((index, i) => {
    return {
      name: 'Thermal Module',
      type1: 'Thermal',
      type2: 'Module',
      list: [
        ...[...Array(_.random(0, 20)).keys()].map((j) => {
          return {
            partName: 'Bucky N5 15 LCD Cover 60ASSY-Silver',
            partNumber: '460.0f801.0002',
            materialSpec: 'PC ABS with 30percent PCR DT AIO',
            material: 'LG_LUPOY_GN5151RFA',
            lastModified: '-'
          };
        })
      ]
    };
  })
];

const fakeAssignment = [
  {
    username: 'ABC1',
    userID: uuidv4(),
    roleName: 'ME'
  },
  {
    username: 'ABC2',
    userID: uuidv4(),
    roleName: 'ME'
  },
  {
    username: 'ABC3',
    userID: uuidv4(),
    roleName: 'ME'
  },
  {
    username: 'ABC4',
    userID: uuidv4(),
    roleName: 'ME'
  },
  {
    username: 'TTTT1',
    userID: uuidv4(),
    roleName: 'Thermal'
  },
  {
    username: 'TTTT2',
    userID: uuidv4(),
    roleName: 'Tooling'
  }
];

// const fakeBomData = {
//   projectName: 'Bucky',
//   bomTotal: 30,
//   partlistTotal: 99,
//   parlistUnedit: 999,
//   inputBom: fakeInputBomList,
//   inputBomHeaders: fakeBomHeaders,
//   assignment: fakeAssignment,
//   partlist: fakePartList,
//   partlistHeaders: fakePartListHeaders,
// };

const fakePartListContent = () => {
  return {
    partListContent: [
      {
        title: 'Fan',
        contents: [
          { subTitle: 'test', fields: [] },
          // { subTitle: '', fields: [] }
        ]
      },
      { title: 'Pipe', contents: [{ subTitle: '', fields: [] }] },
      { title: 'Thermal Plate', content: [{ subTitle: '', fields: [] }] },
      { title: 'Thermal Block', content: [{ subTitle: '', fields: [] }] },
      { title: 'Spring', contents: [{ subTitle: '', fields: [] }] },
      { title: 'O-Ring', contents: [{ subTitle: '', fields: [] }] },
      { title: 'Clip', contents: [{ subTitle: '', fields: [] }] },
      { title: 'Push Pin', contents: [{ subTitle: '', fields: [] }] },
      { title: 'Label', contents: [{ subTitle: '', fields: [] }] },
      { title: 'Sponge', contents: [{ subTitle: '', fields: [] }] },
      { title: 'Grease', contents: [{ subTitle: '', fields: [] }] },
      { title: 'Thermal Pad', contents: [{ subTitle: '', fields: [] }] },
    ]
  };
};

const fakeBomAssignList = {
  approvalAble: false,
  completeAble: false,
  assignList: [{
    bomDesigneeID: uuidv4(),
    isFunctionTeam: false,
    assign: 'ME',
    order: 1,
    employeeName: 'Allan Zhang',
    employeeID: '10101011',
  },
  {
    bomDesigneeID: uuidv4(),
    isFunctionTeam: false,
    assign: 'ME',
    order: 2,
    employeeName: 'Alexander Perez',
    employeeID: '10101012',
  },
  {
    bomDesigneeID: uuidv4(),
    isFunctionTeam: true,
    assign: 'Thermal',
    order: null,
    employeeName: 'Alfred Wu',
    employeeID: '10101013',
  },
  {
    bomDesigneeID: uuidv4(),
    isFunctionTeam: true,
    assign: 'Tooling',
    order: null,
    employeeName: 'Alisa XP Li',
    employeeID: '10101014',
  },
  ]
};

// const fakeDropdownvalue = [
//   {
//     id: 'a65a7478-43cf-11e9-b34d-0242ac110002',
//     item_name: 'CoSign',
//     path: 'CONSIGN',
//     field_name: 'supply_type',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '48b79de4-43a9-11e9-b34d-0242ac110002',
//     item_name: 'ME',
//     path: 'ME',
//     field_name: 'func_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '0559741e-43a9-11e9-b34d-0242ac110002',
//     item_name: 'ID',
//     path: 'ID',
//     field_name: 'func_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '48c33fd2-43a9-11e9-b34d-0242ac110002',
//     item_name: 'RF',
//     path: 'RF',
//     field_name: 'func_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '48bb3134-43a9-11e9-b34d-0242ac110002',
//     item_name: 'EMC\n',
//     path: 'EMC',
//     field_name: 'func_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '48c780f6-43a9-11e9-b34d-0242ac110001',
//     item_name: 'AV',
//     path: 'AV',
//     field_name: 'supply_type',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '7eeb2b00-43d7-11e9-b34d-0242ac110002',
//     item_name: 'Fan',
//     path: 'TRML.FAN',
//     field_name: 'parts_ctgy_2',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '69af7322-43d7-11e9-b34d-0242ac110002',
//     item_name: 'Thermal',
//     path: 'TRML',
//     field_name: 'parts_ctgy_1',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'a6560172-43cf-11e9-b34d-0242ac110002',
//     item_name: 'AVAP',
//     path: 'AVAP',
//     field_name: 'supply_type',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '9291711e-43d7-11e9-b34d-0242ac110002',
//     item_name: 'Soundbar',
//     path: 'TRML.SB',
//     field_name: 'parts_ctgy_2',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'b821322a-46e3-11e9-a2f5-0242ac110002',
//     item_name: 'Heatsink',
//     path: 'TRML.HS',
//     field_name: 'supply_type',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '6c7b5432-46e7-11e9-91ea-0242ac110002',
//     item_name: 'Module',
//     path: 'TRML.MODULE',
//     field_name: 'parts_ctgy_2',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'b12c85fc-4a24-11e9-b26a-0242ac110002',
//     item_name: 'LCD Cover',
//     path: 'LCDCOV',
//     field_name: 'gb_assy_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'b13dc54c-4a24-11e9-b26a-0242ac110002',
//     item_name: 'LCD Bezel',
//     path: 'LCDBZL',
//     field_name: 'gb_assy_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'b148fd72-4a24-11e9-b26a-0242ac110002',
//     item_name: 'U-Case',
//     path: 'UC',
//     field_name: 'gb_assy_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'b15c5624-4a24-11e9-b26a-0242ac110002',
//     item_name: 'L-Case',
//     path: 'LC',
//     field_name: 'gb_assy_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'b165f6a2-4a24-11e9-b26a-0242ac110002',
//     item_name: 'PCB',
//     path: 'PCB',
//     field_name: 'gb_assy_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'b16ac6c8-4a24-11e9-b26a-0242ac110002',
//     item_name: 'KB Support ',
//     path: 'KBSPRT',
//     field_name: 'gb_assy_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '06493120-4a25-11e9-b26a-0242ac110002',
//     item_name: 'LCD DC-Level',
//     path: 'LCDDCLV',
//     field_name: 'gb_assy_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '0657528c-4a25-11e9-b26a-0242ac110002',
//     item_name: 'System DC-Level',
//     path: 'SYSDCLV',
//     field_name: 'gb_assy_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '48c780f6-43a9-11e9-b34d-0242ac110002',
//     item_name: 'Thermal',
//     path: 'THERMAL',
//     field_name: 'func_ctgy',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'cf157a82-4ebc-11e9-bf58-0242ac110002',
//     item_name: 'Cable',
//     path: 'CABLE',
//     field_name: 'parts_ctgy_1',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'e50cb152-4ebc-11e9-bf58-0242ac110002',
//     item_name: 'Housing',
//     path: 'HOUSING',
//     field_name: 'parts_ctgy_1',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'f9ecca30-4ebc-11e9-bf58-0242ac110002',
//     item_name: 'Packing',
//     path: 'PACKING',
//     field_name: 'parts_ctgy_1',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '0991cb16-4ebd-11e9-bf58-0242ac110002',
//     item_name: 'ElectroMechanical',
//     path: 'EM',
//     field_name: 'parts_ctgy_1',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '2086f06c-4ebd-11e9-bf58-0242ac110002',
//     item_name: 'MEothers',
//     path: 'MEO',
//     field_name: 'parts_ctgy_1',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'a3de5f0e-4ebd-11e9-bf58-0242ac110002',
//     item_name: 'Module',
//     path: 'MD',
//     field_name: 'parts_ctgy_1',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'b404cddc-4ebd-11e9-bf58-0242ac110002',
//     item_name: 'EMC',
//     path: 'EMC',
//     field_name: 'parts_ctgy_1',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'c1010794-4ebd-11e9-bf58-0242ac110002',
//     item_name: 'RACK',
//     path: 'RACK',
//     field_name: 'parts_ctgy_1',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'd404d032-4ebd-11e9-bf58-0242ac110002',
//     item_name: 'Medical',
//     path: 'MEDICAL',
//     field_name: 'parts_ctgy_1',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '5013728c-4ebe-11e9-bf58-0242ac110002',
//     item_name: 'Metal',
//     path: 'HOUSING.METAL',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '8ce573a4-4ebe-11e9-bf58-0242ac110002',
//     item_name: 'AL1050',
//     path: 'HOUSING.METAL.AL1050',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '2a69b4de-4adf-11e9-a584-0242ac110002',
//     item_name: 'AL5052',
//     path: 'HOUSING.METAL.AL5052',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'ec2a6be4-4ebe-11e9-bf58-0242ac110002',
//     item_name: 'SUS301',
//     path: 'HOUSING.METAL.SUS301',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'ec9a6700-4ebe-11e9-bf58-0242ac110002',
//     item_name: 'SUS304',
//     path: 'HOUSING.METAL.SUS304',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'ecf0da9a-4ebe-11e9-bf58-0242ac110002',
//     item_name: 'SUS403',
//     path: 'HOUSING.METAL.SUS403',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'ecf76338-4ebe-11e9-bf58-0242ac110002',
//     item_name: 'SUS430',
//     path: 'HOUSING.METAL.SUS430',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '5b316b64-4ebf-11e9-bf58-0242ac110002',
//     item_name: 'SECC',
//     path: 'HOUSING.METAL. SECC',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '5b471298-4ebf-11e9-bf58-0242ac110002',
//     item_name: 'SGCC',
//     path: 'HOUSING.METAL.SGCC',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '5b4e16d8-4ebf-11e9-bf58-0242ac110002',
//     item_name: 'SPCC',
//     path: 'HOUSING.METAL.SPCC',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '5b52163e-4ebf-11e9-bf58-0242ac110002',
//     item_name: 'SGLD',
//     path: 'HOUSING.METAL.SGLD',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '5b594d78-4ebf-11e9-bf58-0242ac110002',
//     item_name: 'SPTE',
//     path: 'HOUSING.METAL.SPTE',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '5b60e074-4ebf-11e9-bf58-0242ac110002',
//     item_name: 'Cu3604',
//     path: 'HOUSING.METAL.CU3604',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: '5b689792-4ebf-11e9-bf58-0242ac110002',
//     item_name: '低碳鋼18A',
//     path: 'HOUSING.METAL.LCS18A',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'aa6c4820-4ebf-11e9-bf58-0242ac110002',
//     item_name: '快削鋼',
//     path: 'HOUSING.METAL.FCS',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'aa84f604-4ebf-11e9-bf58-0242ac110002',
//     item_name: 'SUS410',
//     path: 'HOUSING.METAL.SUS410',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   },
//   {
//     id: 'd58e0304-4ebf-11e9-bf58-0242ac110002',
//     item_name: '磷青銅',
//     path: 'HOUSING.METAL.PHBRZ',
//     field_name: 'material_spec',
//     layout_name: 'bom_item'
//   }
// ];

const fakeParentlevel = [
  {
    id: 86,
    part_name: 'N0',
    path: '85.86'
  },
  {
    id: 84,
    part_name: 'N0',
    path: '82.84'
  }
];


const fakeBomItem = {
  id: null,
  bom_id: null,
  customer_pn: null,
  level: 'DC/65',
  sub_leve: false,
  parent_level: { label: '--', value: null },
  part_name: null,
  qty: 0,
  ref_part_num: null,
  rfq_pn: null,
  //
  func_ctgy: null,
  parts_ctgy_1: null,
  parts_ctgy_2: null,
  material_spec: null,
  supply_type: null,
  //
  part_size_l: null,
  part_size_w: null,
  part_size_h: null,
  part_size_ef: null,
  part_size_l2: null,
  part_size_w2: null,
  thickness: null,
  part_weight: null,
};

const fakeUploadFileResult = {
  upload_tmp_id: 'c5ac70a5-4b36-4be3-858d-128ee9a9a4d9',
  passCount: 160,
  failCount: 40,
  failMessage: [
    { item: 2, errorCode: 'C000108' },
    { item: 3, errorCode: 'C000108' },
  ]
};

const fakeMappingInfo = {
  uploadItemOwner: [
    {
      key: 'Kit Chen',
      value: 'Kit Chen'
    },
    {
      key: 'Test',
      value: 'Test'
    }
  ],
  bomDesignee: [
    {
      value: 'RICK CHEN',
      key: '3b715fa6-a7db-4c07-a5eb-16322038101f'
    },
    {
      value: 'PAUL CF CHEN',
      key: '15f11747-0dcd-480a-8f82-942789667767'
    },
    {
      value: 'IAN KUO',
      key: '2ed741e8-3436-4e6a-bc87-4a5f9e163169'
    },
    {
      value: 'ALLIE CHANG',
      key: '192b9ea1-6c00-411b-be18-1e4f4ff41ae9'
    },
    {
      value: 'TOMMY TSAI',
      key: 'f193b9d5-d06b-4c2b-8ece-9681a468244f'
    }
  ]
};

const fakeRes = {
  res: true
};

// 版本下拉
const fakeBomVersions = [
  {
    key: '855e55c3-1424-4e47-9c89-f0be7d95f7b0',
    value: '1.0'
  },
  {
    key: '94d5f3cf-1b96-4f93-914f-ae8d9b76941e',
    value: '2.0'
  },
  {
    key: 'CURRENT',
    value: '2.5'
  }
];


const fakeCopyList = {
  copyList: [
    {
      bom_id: 456455,
      label: '89_202002111058 -- Cost 2.0',
      stage: 'ENG1'
    },
    {
      bom_id: 456456,
      label: '90_202002111058 -- Cost 2.0',
      stage: 'ENG2'
    },
    {
      bom_id: 456457,
      label: '91_202002111058 -- Cost 0.7',
      stage: 'ENG2'
    },
    {
      bom_id: 456458,
      label: '91_202002111058 -- Cost 4.0',
      stage: 'ENG2'
    },
    {
      bom_id: 456458,
      label: '91_202002111058 -- Cost 4.0',
      stage: 'ENG2'
    },
    {
      bom_id: 456458,
      label: '91_202002111058 -- Cost 4.0',
      stage: 'ENG2'
    },
    {
      bom_id: 456458,
      label: '91_202002111058 -- Cost 4.0',
      stage: 'ENG2'
    },
    {
      bom_id: 456458,
      label: '91_202002111058 -- Cost 4.0',
      stage: 'ENG2'
    }
  ]
};
export default {
  fakeBomItem,
  fakeParentlevel,
  fakeInputBom,
  fakePartListContent,
  fakeBomAssignList,
  fakeDropdownvalue,
  fakeUploadFileResult,
  fakeMappingInfo,
  fakeRes,
  fakeBomVersions,
  fakeCopyList,
};

