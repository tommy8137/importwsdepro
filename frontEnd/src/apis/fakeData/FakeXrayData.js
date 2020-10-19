import uuidv4 from 'uuid/v4';
import _ from 'lodash';


// Fake spa Form Data
const fakeSpaParams = {
  block: false,
  dateFrom: null,
  dateTo: null,
  mrp: false,
  type1: 'Memory"',
  type2: 'Memory Module',
  spec: {
    spec01: ['SODIMM'],
    spec02: ['DDR3'],
    spec03: [],
    spec04: ['2GB', '1GB', '4GB'],
    spec05: [],
    spec06: [],
    spec07: [],
    spec08: [],
    spec09: [],
    spec10: [],
    spec11: [],
    spec12: [],
    spec13: [],
    spec14: [],
    spec15: [],
    spec16: [],
    spec17: [],
    spec18: [],
    spec19: [],
    spec20: [],
  }
};

// Fake add specGroup
const fakeAddSpec = {
  specGroupName: uuidv4(),
  sourcerList: ['S57'],
  type1: 'Memory"',
  type2: 'Memory Module',
  spec: {
    spec01: ['SODIMM'],
    spec02: ['DDR3'],
    spec03: [],
    spec04: ['2GB', '1GB', '4GB'],
    spec05: [],
    spec06: [],
    spec07: [],
    spec08: [],
    spec09: [],
    spec10: [],
    spec11: [],
    spec12: [],
    spec13: [],
    spec14: [],
    spec15: [],
    spec16: [],
    spec17: [],
    spec18: [],
    spec19: [],
    spec20: [],
  }
};

// test: fake Filter

const fakeFilter = {
  sourcer: 'S87',
  type1: 'Memory',
  type2: 'Memory Module'
};

// test: Fake specGroupId responese
const fakeSpecIdResponse = {
  data: {
    specGroupID: 'abcd-1111-feca-4444'
  }
};

// test: Fake Fail payload
const fakeFailedPayload = {
  response: {
    status: 400
  }
};

const rndWord = () => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < _.random(5, 10); i++) {
    text += possible.charAt(_.random(0, possible.length));
  }
  return text;
};

const rndBool = () => _.random(0, 1) === 1;
const rounding = (val) => Number((parseFloat(val)).toFixed(6));
const rndFloat = () => rounding(_.random(1.000000, 1000.000000, true));
const minPrice = rndFloat();
const maxPrice = minPrice + rndFloat();
const getRndPrice = () => rounding(_.random(minPrice, maxPrice, false));
// Fake spec-01~30 property
const fakeSpecProperty = [...[...Array(30).keys()].map((t, i) => (`spec${((i + 1 < 10) ? `0${i + 1}` : i + 1)}`))];

// Fake SPA infoList property
const fakeInfoProperty = [
  'partNumber',
  'partDesc',
  'vendor',
  'vendorPN',
  'manufacturer',
  'scode',
  'plant',
  'supplyType',
  'mrp',
  'currency',
  'originalCurrency',
  'exchangeRate',
  'unitPrice',
  'priceDiff',
  'datab',
];

const fakeSourcerList = { sourcerList: [{ scode: 'S46', sourcer: 'EVE WANG', deptid: 'MH2200', groupname: 'CPBG02-ME', type: [{ type1: 'Add-on card', type2: 'F-IO' }, { type1: 'Cable', type2: 'External Cable' }, { type1: 'Cable', type2: 'FFC' }, { type1: 'Cable', type2: 'FIO' }, { type1: 'Cable', type2: 'FPC' }, { type1: 'Cable', type2: 'Handset cord' }, { type1: 'Cable', type2: 'Lan cable' }, { type1: 'Cable', type2: 'Other' }, { type1: 'Cable', type2: 'Power Cord' }, { type1: 'Cable', type2: 'RF Cable' }, { type1: 'Cable', type2: 'SAS/Mini SAS' }, { type1: 'Cable', type2: 'SATA' }, { type1: 'Cable', type2: 'Wire/Harness' }, { type1: 'Module', type2: 'LED Module' }] }, { scode: 'SH3', sourcer: 'GUCCI YU', deptid: 'MH1100', groupname: 'CPBG01-ME', type: [{ type1: 'EMC', type2: 'AL Foil' }, { type1: 'Thermal', type2: 'Cu Foil' }, { type1: 'Thermal', type2: 'Graphite Sheet' }, { type1: 'Thermal', type2: 'Module' }, { type1: 'Thermal', type2: 'Pad' }] }, { scode: 'S87', sourcer: 'SANDY HUNG', deptid: 'MGSN00', groupname: 'MM-EE', type: [{ type1: 'Add-on card', type2: 'Add-on card' }, { type1: 'Antenna', type2: 'Antenna' }, { type1: 'Memory', type2: 'Memory Chip' }, { type1: 'Memory', type2: 'Memory Module' }, { type1: 'NAND Flash', type2: 'DOM' }, { type1: 'NAND Flash', type2: 'MCP' }, { type1: 'NAND Flash', type2: 'Raw NAND' }, { type1: 'NAND Flash', type2: 'eMCP' }, { type1: 'NAND Flash', type2: 'eMMC' }, { type1: 'NOR Flash', type2: 'DataFlash' }, { type1: 'NOR Flash', type2: 'ISA' }, { type1: 'NOR Flash', type2: 'SPI' }, { type1: 'Packing', type2: 'Label' }, { type1: 'Power Supply', type2: 'ADP' }, { type1: 'Power Supply', type2: 'PSU' }] }, { scode: 'S08', sourcer: 'ANYA TSAI', deptid: 'MGS300', groupname: 'MM-EE', type: [{ type1: 'ASIC', type2: 'SOC' }, { type1: 'ASIC', type2: 'Scalar' }, { type1: 'CPU', type2: 'CPU' }, { type1: 'EMI', type2: 'Others' }, { type1: 'LED', type2: 'LED' }, { type1: 'Opto', type2: 'IR receiver' }, { type1: 'PCB', type2: 'PCB' }, { type1: 'PCB', type2: 'PTH' }, { type1: 'Xformer', type2: 'Inverter' }, { type1: 'Xformer', type2: 'Lan' }, { type1: 'Xformer', type2: 'Power' }] }, { scode: 'SE9', sourcer: 'ANGELA SS LIN', deptid: 'MGS300', groupname: 'MM-EE', type: [{ type1: 'ASIC', type2: 'Others' }, { type1: 'Connector', type2: 'AC INLET' }, { type1: 'Connector', type2: 'Audio Jack' }, { type1: 'Connector', type2: 'Card reader' }, { type1: 'Connector', type2: 'D-SUB' }, { type1: 'Connector', type2: 'DC Jack' }, { type1: 'Connector', type2: 'DP' }, { type1: 'Connector', type2: 'DVI' }, { type1: 'Connector', type2: 'FPC' }, { type1: 'Connector', type2: 'HDMI' }, { type1: 'Connector', type2: 'HEADER' }, { type1: 'Connector', type2: 'LVDS' }, { type1: 'Connector', type2: 'MINI PCI' }, { type1: 'Connector', type2: 'Mini DP' }, { type1: 'Connector', type2: 'Mini USB' }, { type1: 'Connector', type2: 'Others' }, { type1: 'Connector', type2: 'RCA Jack' }, { type1: 'Connector', type2: 'RJ' }, { type1: 'Connector', type2: 'RJ+XFORM' }, { type1: 'Connector', type2: 'Switch' }, { type1: 'Connector', type2: 'USB 2.0' }, { type1: 'Connector', type2: 'USB 3.0' }, { type1: 'Connector', type2: 'WTB' }, { type1: 'Discrete', type2: 'ESD/TVS' }, { type1: 'EEPROM', type2: 'EEPROM' }, { type1: 'Fuse/Polyswitch', type2: 'Fuse' }, { type1: 'Fuse/Polyswitch', type2: 'Polyswitch' }, { type1: 'Logic', type2: 'Bus Switch' }, { type1: 'Logic', type2: 'Full/Dual Gate' }, { type1: 'Logic', type2: 'Single Gate' }, { type1: 'MLCC', type2: 'SMD' }, { type1: 'MOSFET', type2: 'N CHANNEL' }, { type1: 'MOSFET', type2: 'NN CHANNEL' }, { type1: 'MOSFET', type2: 'NP CHANNEL' }, { type1: 'MOSFET', type2: 'Others' }, { type1: 'MOSFET', type2: 'P CHANNEL' }, { type1: 'MOSFET', type2: 'SOT23' }, { type1: 'MOSFET', type2: 'Small Signal' }, { type1: 'Power IC', type2: 'LED Driver' }, { type1: 'Power IC', type2: 'OP Amp' }, { type1: 'Power IC', type2: 'Others' }, { type1: 'Power IC', type2: 'Reset IC' }, { type1: 'Wireless Connectivit', type2: 'PA' }, { type1: 'Wireless Connectivit', type2: 'RF Switch' }] }] };
// fake SupplyType list
const fakeSupplyTypeList = ['A', 'M', 'C'];
const fakeSpecTitle = { specTitle: fakeSpecProperty };
// Fake specGroup list
const fakeSpecGroupList = [...Array(30).keys()].map(index => ({
  specGroupName: `${index}-${rndWord()}`,
  specGroupID: uuidv4(),
  owner: 'TEST',
  ownerScode: _.sample(fakeSourcerList.sourcerList).scode,
  productType: 'NB',
  type1: 'EEPROM',
  type2: 'EEPROM',
  sourcer: ['SK2'],
  specGroup: {
    ..._.merge(...fakeSpecProperty.map((spec, i) => {
      return {
        [spec]: [...Array(99).keys()].map(j => rndWord())
      };
    }))
  },
  specTitle: [
    ...fakeSpecProperty.map(spec => {
      return null;
    })
  ],
}));

const fakeGroupItemPartNumber = () => {
  const groupItem = _.sample(fakeSpecGroupList);
  const temp = {
    ...groupItem,
    specGroup: {
      ..._.merge(...fakeSpecProperty.map((spec, i) => {
        return {
          [spec]: [...Array(30).keys()].map(j => ({ item_name: rndWord(), value: rndBool() }))
        };
      }))
    },
  };
  return temp;
};

const fakeGroupItem = (specGroupID) => {
  const groupItem = _.find(fakeSpecGroupList, s => s.specGroupID === specGroupID);
  const temp = {
    ...groupItem,
    specGroup: {
      ..._.merge(...fakeSpecProperty.map((spec, i) => {
        return {
          [spec]: [...Array(30).keys()].map(j => ({ item_name: rndWord(), value: rndBool() }))
        };
      }))
    },
    specTitle: ['MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM#', 'Stepping code', 'Ordering p/n', 'Package', 'SKU Name', 'MOQ', 'CRP/N-CPR', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  };
  return temp;
};

// 假的filter後的空spec
const fakeSpecGroupItemList = {
  spec: {
    ..._.merge(...fakeSpecProperty.map((spec, i) => {
      return {
        [spec]: [...Array(30).keys()].map(j => rndWord())
      };
    }))
  },
};

const fakeMeSpecGroupItemList = (count) => {
  return {
    spec: [...Array(30).keys()].map(j => rndWord()),
    key: fakeSpecProperty[count - 1]
  };
};

const specProperty = _.sampleSize(fakeSpecProperty, _.random(0, fakeSpecProperty.length));
const specOthers = _.without(fakeSpecProperty, ...specProperty);

// 假的SPA分析資料
const fakeSpaData = {
  infoProperty: fakeInfoProperty,
  specProperty,
  specOthers,
  materialList: [
    ...[...Array(100).keys()].map(i => {
      return {
        specList: {
          ..._.merge(...specProperty.map(spec => {
            return {
              [spec]: i + rndWord()
            };
          }))
        },
        moreSpec: {
          ..._.merge(...specOthers.map(spec => {
            return {
              [spec]: i + rndWord()
            };
          }))
        },
        infoList: {
          ..._.merge(...fakeInfoProperty.map(info => {
            switch (info) {
              case 'supplyType':
                return {
                  [info]: _.sample(fakeSupplyTypeList)
                };
              case 'unitPrice':
                return {
                  [info]: minPrice + i
                };
              case 'exchangeRate':
                return {
                  [info]: i + rounding(minPrice + getRndPrice())
                };
              case 'priceDiff':
                return {
                  [info]: `${i}%`
                };
              case 'datab':
                return {
                  [info]: `${new Date()}`
                };
              default:
                return {
                  [info]: i + info + rndWord()
                };
            }
          }))
        }
      };
    })
  ],
  minUnitPrice: minPrice,
  maxUnitPrice: maxPrice,
  supplyTypeList: fakeSupplyTypeList,
  specTitle: {
    ..._.merge(...fakeSpecProperty.map((spec, i) => {
      return {
        [spec]: rndWord()
      };
    }))
  }
};

// 空的SPA分析資料
const emptySpaData = {
  specProperty: [],
  infoProperty: [],
  materialList: [],
  minUnitPrice: 0,
  maxUnitPrice: 0,
  supplyTypeList: []
};

// 空的LPP分析資料
const emptyLppData = {
  materialPriceList: [],
  supplyTypeList: []
};
// 假的LPP Analysis data
const fakeLppData = {
  materialPriceList: [
    ...[...Array(50).keys()].map(i => {
      const lowest = getRndPrice();
      const average = lowest + getRndPrice();
      return {
        specCombination: [...Array(_.random(1, 5)).keys()].map(j => j + rndWord()),
        lowestPrice: lowest,
        averageValue: average,
        materialList: [
          ...[...Array(10).keys()].map(j => {
            return {
              partNumber: j + rndWord(),
              price: lowest + getRndPrice(),
              supplyType: _.sample(fakeSupplyTypeList),
            };
          })
        ],
      };
    })
  ],
  supplyTypeList: fakeSupplyTypeList
};

// 空白spec
const getEmptySpec = () => {
  return {
    owner: '',
    ownerScode: '',
    specTitle: [],
    sourcer: [],
    specGroup: {
      ..._.merge(...[...Array(30).keys()].map(i => {
        const pad = d => ((d < 10) ? `0${d.toString()}` : d.toString());
        return {
          [`spec${pad(i + 1)}`]: []
        };
      }))
    },
    specGroupID: '',
    specGroupName: '',
    type1: '',
    type2: '',
  };
};

// 將specItemsList轉成空spec
const getFilterSpec = (specItemsList, specTitle, filter) => {
  const emptySpec = getEmptySpec();
  const { sourcer, type1, type2 } = filter;
  return {
    ...emptySpec,
    specTitle,
    sourcer,
    type1,
    type2,
    specGroup: {
      ..._
        .chain(_.cloneDeep(specItemsList))
        .keys()
        .map((k) => {
          return {
            [k]: specItemsList[k].map(v => { return { item_name: v, value: false }; })
          };
        })
        .thru(result => _.merge(...result))
        .value()
    },
  };
};

// 清空所有spec裡面的value
const getEmptyFilterSpec = (spec) => {
  const tempSpec = _.cloneDeep(spec);
  const emptySpec = getEmptySpec();
  const { specGroup, sourcer, type1, type2 } = tempSpec;

  return {
    ...emptySpec,
    sourcer,
    type1,
    type2,
    specGroup: {
      ..._
        .chain(specGroup)
        .keys()
        .thru(keys => { _.each(keys, k => { _.each(specGroup[k], s => { s.value = false; }); }); return specGroup; })
        .value()
    },
  };
};

// 假的spaForm data
const fakeSpaForm = {
  dateFrom: null,
  dateTo: null,
  mrp: false,
  block: false,
  type1: 'CONVERTER',
  type2: 'CONVERTER',
  spec: {
    spec01: [],
    spec02: [],
    spec03: [],
    spec04: [],
    spec05: [
      'MIPI I/F',
      'GaAs'
    ],
    spec06: [],
    spec07: [],
    spec08: [],
    spec09: [],
    spec10: [],
    spec11: [],
    spec12: [],
    spec13: [],
    spec14: [],
    spec15: [],
    spec16: [],
    spec17: [],
    spec18: [],
    spec19: [],
    spec20: []
  }
};

// 假的LPP form data
const fakeLppForm = {
  mrp: false,
  type1: 'CONVERTER',
  type2: 'CONVERTER',
  spec: {
    spec01: [],
    spec02: [],
    spec03: [],
    spec04: [],
    spec05: [
      'MIPI I/F',
      'GaAs'
    ],
    spec06: [],
    spec07: [],
    spec08: [],
    spec09: [],
    spec10: [],
    spec11: [],
    spec12: [],
    spec13: [],
    spec14: [],
    spec15: [],
    spec16: [],
    spec17: [],
    spec18: [],
    spec19: [],
    spec20: []
  }
};

// test: 假的spa analysis response
const fakeSpaResponseData = {
  specProperty: [
    'spec1',
    'spec2',
    'spec3',
    'spec4'
  ],
  infoProperty: [
    'partNumber',
    'partDesc',
    'vendorName',
    'manufacturer',
    'scode',
    'plant',
    'supplyType',
    'mrp',
    'currency',
    'originalCurrency',
    'exchangeRate',
    'unitPrice'
  ],
  materialList: [
    {
      infoList: {
        partNumber: '020.80054.009',
        partDesc: 'FOXCONN',
        vendorName: '200706',
        manufacturer: 'FOXCONN',
        scode: 'S51',
        plant: 'F220-WCD',
        supplyType: 'M',
        mrp: 20,
        currency: 'USD',
        originalCurrency: 'JPY',
        exchangeRate: 0.27,
        unitPrice: 0.32
      },
      specList: {
        spec1: '8bit AVR MCU',
        spec2: '1K bytes Flash',
        spec3: '1-Kbyte SRAM',
        spec4: '512 Byte EEPROM'
      }
    }
  ],
  minUnitPrice: 0.001,
  maxUnitPrice: 3.52,
  supplyTypeList: [
    'A',
    'M',
    'C'
  ]
};


const fakeProductTypeList = [
  'Hand Held',
  'LCM Business',
  'Audio',
  'Storage',
  'Industrial PC',
];

const fakeType1List = [
  'Cable',
  'Electro-Mechanical',
  'Housing',
  'ME-Others',
  'Packing',
  'Thermal'
];

const fakeType2List = [
  'External Cable',
  'FFC',
  'Power Cord',
  'Wire/Harness',
];

const fakeDeleteSpecGroup = (id) => {
  _.remove(fakeSpecGroupList, spec => spec.specGroupID === id);
  return { specGroupID: id };
};

const fakeAddSpecGroup = spec => {
  fakeSpecGroupList.push({
    ...spec,
    specGroup: _.mapValues(spec.specGroup, sp => sp.filter(o => o.value).map(o => o.item_name))
  });
  return { specGroupID: uuidv4() };
};

export default {
  fakeAddSpecGroup,
  fakeProductTypeList,
  fakeType1List,
  fakeType2List,
  //
  fakeSourcerList,
  fakeSpecGroupItemList,
  fakeMeSpecGroupItemList,
  fakeSpecGroupList,
  fakeSpaResponseData,
  fakeSpaForm,
  fakeLppForm,
  fakeFilter,
  fakeFailedPayload,
  fakeAddSpec,
  fakeSpecIdResponse,
  fakeSpaParams,
  fakeSpaData,
  fakeLppData,
  emptySpaData,
  emptyLppData,
  getEmptySpec,
  getFilterSpec,
  getEmptyFilterSpec,
  fakeGroupItem,
  fakeSpecTitle,
  fakeDeleteSpecGroup,
  fakeGroupItemPartNumber
};
