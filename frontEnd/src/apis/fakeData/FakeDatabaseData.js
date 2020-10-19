import uuidv4 from 'uuid/v4';
import moment from 'moment';
import _random from 'lodash/random';
import _merge from 'lodash/merge';
import _find from 'lodash/find';
import _get from 'lodash/get';
import _sample from 'lodash/sample';


// Site
const fakeSiteList = () => {
  const list = [...Array(15).keys()].map((item, i) => {
    return {
      id: uuidv4(),
      site_name: `site-${i}${i}`,
      remark: `remark-${i}`,
    };
  });
  return {
    siteList: list
  };
};

const fakeSchedule = () => ({
  nextId: uuidv4(),
  next: moment().add(_random(1, 30), 'days').format('YYYY/MM/DD'),
});

// Common Parameters
const fakeParameters = () => ({
  date: {
    last: '2019/01/01',
    lastId: 1,
    current: '2019/06/01',
    currentId: 2,
    next: '2019/12/01',
    nextId: 3,
  },
  commonParameterList: [
    {
      id: 1,
      item: '組立1',
      unit: 'K',
      last: 0.11,
      current: 0.2,
      next: 0.3,
    },
    {
      id: 2,
      item: '組立2',
      unit: '%',
      last: 0.35,
      current: 2.2,
      next: 0.29,
    },
  ]
});


/*  Metal Clean Sheet -------------------------------------------------- */
// PaintingTypePrice

const fakePaintingTypePriceList = () => {
  const fakeDate = {
    last: '2019/01/01',
    lastId: 1,
    current: '2019/06/01',
    currentId: 2,
    next: '2019/12/01',
    nextId: 3,
  };
  const list = [...Array(5).keys()].map((item, i) => {
    return {
      id: uuidv4(),
      color: `一般素色(粉體漆)-${i}${i}`,
      last: _random(0, 10, true),
      current: _random(0, 10, true),
      next: _random(0, 10, true),
    };
  });
  return {
    date: fakeDate,
    sprayPaintPriceList: list,
  };
};

// Metal Parameters
const fakeMetalParameters = {
  date: {
    last: '2019/01/01',
    lastId: 1,
    current: '2019/06/01',
    currentId: 2,
    next: '2019/12/01',
    nextId: 3,
  },
  metalParameter: [
    {
      id: 1,
      type: '材料1',
      items: [{
        id: 1,
        itemName: '超音波清洗單價',
        unit: 'USD',
        last: 5.11,
        current: 2.15,
        next: 1.15,
      }, {
        id: 2,
        itemName: '超音波清洗單價1',
        unit: 'USD',
        last: 5.22,
        current: 2.25,
        next: 1.25,
      }, {
        id: 3,
        itemName: '超音波清洗單價2',
        unit: '%',
        last: 35.00,
        current: 32.35,
        next: 13.35,
      }]
    },
    {
      id: 2,
      type: '材料2',
      items: [{
        id: 1,
        itemName: '超音波清洗單價',
        unit: 'USD',
        last: 5.00,
        current: 2.5,
        next: 1.5,
      }]
    },
  ],
};


const fakeMachineTonnagePrice = {
  date: {
    last: '2019/01/01',
    lastId: 1,
    current: '2019/06/01',
    currentId: 2,
    next: '2019/12/01',
    nextId: 3,
  },
  machineTonnesList: Array.from({ length: 6 }, (item, i) => ({
    id: uuidv4(),
    // ton: `${_random(0, 20)}T`,
    ton: `${i % 2 === 0 ? 5 + i : 10 + i}T`,
    bloster: `${_random(300, 400)}mm*${_random(400, 600)}mm`,
    remark: `Remark_${_random(0, 5)}`,
    pressTypeId: i % 2 === 0 ? '22222' : '88888',
    pressTypeName: i % 2 === 0 ? '工程模' : '連續模',
    module_1: {
      moduleMetalId: 'c1cd9a76-e642-11e9-9d04-0242ac110001',
      last: i % 2 === 0 ? 5 + i : 10 + i,
      current: _random(10, 100),
      next: _random(10, 100),
    },
    module_2: {
      moduleMetalId: 'c2cd9a76-e642-11e9-9d04-0242ac110002',
      last: _random(10, 100),
      current: _random(10, 100),
      next: _random(10, 100),
    },
    module_3: {
      moduleMetalId: 'c3cd9a76-e642-11e9-9d04-0242ac110002',
      last: _random(10, 100),
      current: _random(10, 100),
      next: _random(10, 100),
    },
    // module_4: {
    //   moduleMetalId: 'c4cd9a76-e642-11e9-9d04-0242ac110002',
    //   last: _random(10, 100),
    //   current: _random(10, 100),
    //   next: _random(10, 100),
    // },
    // module_5: {
    //   moduleMetalId: 'c5cd9a76-e642-11e9-9d04-0242ac110002',
    //   last: _random(10, 100),
    //   current: _random(10, 100),
    //   next: _random(10, 100),
    // },
  }))
};

const fakeAnodeColorPriceList = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    anodeColorPrice: [...Array(20).keys()].map((item, i) => {
      return {
        id: uuidv4(),
        item: '鋁本色',
        last: {
          price: _random(10, 100),
          lossRate: _random(10, 100),
        },
        current: {
          price: _random(10, 100),
          lossRate: _random(10, 100),
        },
        next: {
          price: _random(10, 100),
          lossRate: _random(10, 100),
        },
      };
    }),
  };
};

const fakeMaterialLossRate = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: uuidv4(),
      current: '2019/06/01',
      currentId: uuidv4(),
      next: '2019/12/01',
      nextId: uuidv4(),
    },
    materialLossRate: [...Array(20).keys()].map((item, i) => {
      return {
        id: uuidv4(),
        item: `NORMAL(咬花)-${i}`,
        remark: '',
        NB: {
          productTypeId: uuidv4(),
          last: _random(10, 100),
          current: _random(10, 100),
          next: _random(10, 100),
        },
        DT: {
          productTypeId: uuidv4(),
          last: _random(10, 100),
          current: _random(10, 100),
          next: _random(10, 100),
        },
        AB: {
          productTypeId: uuidv4(),
          last: _random(10, 100),
          current: _random(10, 100),
          next: _random(10, 100),
        },
      };
    }),
  };
};
/*  Plastic Clean Sheet -------------------------------------------------- */
// Machine module

const fakeCategoryOptions = [
  {
    id: uuidv4(),
    name: 'Metal'
  },
  {
    id: uuidv4(),
    name: 'Aluminum'
  },
];

const fakeProductTypeList = ['NB', 'DT', 'Others'];

const fakeMachineModuleList = () => {
  return {
    machineModule: [...Array(20).keys()].map((item, i) => {
      return {
        moduleId: uuidv4(),
        moduleName: `Module_${i}`,
        remark: `remark-${i}`,
        ..._merge(...fakeProductTypeList.map(productType => {
          const fakeModuleData = _sample(fakeCategoryOptions);
          return {
            [productType]: {
              productTypeId: uuidv4(),
              metalTypeId: fakeModuleData.id,
              metalTypeName: fakeModuleData.name,
            }
          };
        })
        )
      };
    }),
    category2: fakeCategoryOptions
  };
};


const fakePaintManPowerPriceList = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: uuidv4(),
      current: '2019/06/01',
      currentId: uuidv4(),
      next: '2019/12/01',
      nextId: uuidv4(),
    },
    paintManPowerPriceList: [...Array(20).keys()].map((item, i) => {
      return {
        id: uuidv4(),
        name: 'Plastic',
        last: _random(10, 100),
        current: _random(10, 100),
        next: _random(10, 100),
      };
    }),
    paintManPowerHourList: {
      last: {
        price: _random(0.1, 1.0),
        manHour: _random(10, 100),
      },
      current: {
        price: _random(0.1, 1.0),
        manHour: _random(10, 100),
      },
      next: {
        price: _random(0.1, 1.0),
        manHour: _random(10, 100),
      },
    }
  };
};

const fakeGrindingPriceList = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: uuidv4(),
      current: '2019/06/01',
      currentId: uuidv4(),
      next: '2019/12/01',
      nextId: uuidv4(),
    },
    grindingPriceList: [...Array(20).keys()].map((item, i) => {
      return {
        id: uuidv4(),
        item: `自動+手工-${i}`,
        remark: 'remark',
        last: _random(10, 100),
        current: _random(10, 100),
        next: _random(10, 100),
      };
    }),
  };
};


const fakeSites = [
  {
    siteGroupId: uuidv4(),
    siteGroupName: 'WKS/WZS'
  },
  {
    siteGroupId: uuidv4(),
    siteGroupName: 'WCQ/WCD'
  },
];

const fakeSputeringGroups = {
  ..._merge(...fakeSites.map(({ siteGroupName }) => ({
    [siteGroupName]: [`${siteGroupName} PC+ABS`, `${siteGroupName} PC+FG<=25%`, `${siteGroupName} PC+FG>25%`]
  })))
};

const fakeEmiSputteringPriceList = (siteGroupId) => {
  const groupItem = _find(fakeSites, obj => obj.siteGroupId === siteGroupId);
  const groupKey = _get(groupItem, 'siteGroupName', '');
  const groups = fakeSputeringGroups[groupKey];

  return {
    date: {
      last: '2019/01/01',
      lastId: uuidv4(),
      current: '2019/06/01',
      currentId: uuidv4(),
      next: '2019/12/01',
      nextId: uuidv4(),
    },
    emiSputteringPriceList: [...Array(20).keys()].map((item, i) => {
      return {
        id: uuidv4(),
        name: `${i}"`,
        ..._merge(...groups.map(group => ({
          [group]: {
            sputteringId: uuidv4(),
            last: _random(10, 100),
            current: _random(10, 100),
            next: _random(10, 100),
          }
        })))

      };
    }),
  };
};
const fakeUploadFileResult = {
  uploadId: 'c5ac70a5-4b36-4be3-858d-128ee9a9a4d9',
  passCount: 190,
  failCount: 20,
  failMessage: [
    {
      sheetName: 'Sponge',
      material: 'ABC',
      materialSpec: 'DEF',
      modify: null,
      errorCode: 'F000204'
    },
    {
      sheetName: 'Sponge',
      material: 'ABC',
      materialSpec: 'DEF',
      modify: null,
      errorCode: 'F000204'
    },
  ]
};


function fakeEmiSiteGroupList() {
  return {
    siteGroupList: fakeSites
  };
}

function fakePaintFormulaPirce() {
  return {
    paintId: uuidv4(),
    vendorId: uuidv4(),
    paintFormulaPirce: [
      {
        key: 'main_unit_price',
        label: '主劑單價(USD/Kg)',
        fieldType: 'input',
        dataType: 'float',
        value: _random(10, 100),
      },
      {
        key: 'main_amount',
        label: '主劑比例',
        fieldType: 'input',
        dataType: 'float',
        value: _random(10, 100),
      },
      {
        key: 'hardener_unit_price',
        label: '硬化劑/固化劑單價(USD/Kg)',
        fieldType: 'input',
        dataType: 'float',
        value: _random(10, 100),
      },
      {
        key: 'hardener_amount',
        label: '硬化劑/固化劑比例',
        fieldType: 'input',
        dataType: 'float',
        value: _random(10, 100),
      }, {
        key: 'solvent_unit_price',
        label: '溶劑/稀釋劑單價(USD/Kg)',
        fieldType: 'input',
        dataType: 'float',
        value: _random(10, 100),
      }, {
        key: 'solvent_amount',
        label: '溶劑/稀釋劑比例',
        fieldType: 'input',
        dataType: 'float',
        value: _random(10, 100),
      },
    ]
  };
}


const fakeNutTypeList = () => [{
  nutTypeId: '64621ebe-fa1c-11e9-8153-0242a1324',
  nutTypeName: 'Insert NUT'
}, {
  nutTypeId: '64621ebe-fa1c-11e9-8153-0222222',
  nutTypeName: 'Bracket NUT'
}];

const fakePartCategoryList = () =>
  [{
    partCategory2Id: '73fda832-5a91-11e9-8606-0242ac110002',
    partCategory2Name: 'Nut'
  }, {
    partCategory2Id: '73fdb412-5a91-11e9-8606-0242ac110002',
    partCategory2Name: 'Standoff'
  }, {
    partCategory2Id: '73fsw131-5a91-11e9-8606-0242ac110002',
    partCategory2Name: 'Screw'
  }];


const fakePartCategoryMaterialMapping = () => [{
  materialName: 'ABC',
  materialId: 'd11571d6-0756-11ea-aac6-0242ac110002',
  partCategory2Id: [
    '73fda832-5a91-11e9-8606-0242ac110002',
    '73fdb412-5a91-11e9-8606-0242ac110002',
    '73fsw131-5a91-11e9-8606-0242ac110002',
  ]
}, {
  materialName: '快削鋼-1215',
  materialId: 'd11571d6-0756-11ea-aac6-0242ac110002',
  partCategory2Id: [
    '73fda832-5a91-11e9-8606-0242ac110002',
    '73fdb412-5a91-11e9-8606-0242ac110002'
  ]
}, {
  materialName: '黃銅-C3604',
  materialId: '1ab34754-31f1-11ea-ace4-0242ac110002',
  partCategory2Id: [
    '73fdb412-5a91-11e9-8606-0242ac110002'
  ]
}];

export default {
  // Site
  fakeSiteList,
  fakeSchedule,
  fakeParameters,
  /* Metal Clean Sheet ----*/
  // PaintingTypePrice
  fakePaintingTypePriceList,
  fakeMetalParameters,
  fakeMachineTonnagePrice,
  // AnodeColorPrice
  fakeAnodeColorPriceList,

  /* Plastic Clean Sheet ----*/
  // Machine module
  fakeMachineModuleList,
  // loss rate
  fakeMaterialLossRate,
  // Paint ManPower
  fakePaintManPowerPriceList,
  // Grinding Price
  fakeGrindingPriceList,
  // Emi Sputtering Price
  fakeEmiSputteringPriceList,
  fakeEmiSiteGroupList,
  fakePaintFormulaPirce,
  fakeUploadFileResult,

  fakeNutTypeList,
  fakePartCategoryList,
  fakePartCategoryMaterialMapping,
};
