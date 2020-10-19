const fakeGetRubberMaterialPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    materialPriceList: [
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac1100111',
        materialSpec: 'TPU',
        remark: 'remark',
        disable: false,
        subMaterial: [
          {
            id: '6462bc8e-fa1c-11e9-8153-0242ac110222',
            material: 'Covestro_8785A',
            last: 0.63823529,
            current: 0.63823529,
            next: 0.63823529,
            disable: false,
          },
        ],
      },
    ],
  };
};

const fakeGetRubberParameter = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    rubberParameter: [
      {
        id: 188,
        type: '材料',
        items: [
          {
            id: 4,
            item: '成品沖型 Loss Rate',
            unit: '%',
            last: 5.0,
            current: 2.5,
            next: 1.5,
          },
        ],
      },
    ],
  };
};

const fakeGetRubberMachinePrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    machinePrice: [
      {
        id: '2eb48fc0-e5bf-11e9-af51-0242ac110002',
        ton: '290T',
        disable: false,
        NB: {
          productTypeId: 1,
          last: 5.0,
          current: 2.5,
          next: 1.5,
        },
        DT: {
          productTypeId: 2,
          last: 5.0,
          current: 2.5,
          next: 1.5,
        },
      },
    ],
  };
};


const fakeGetStampingPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    stampingPrice: [
      {
        id: 'c2d2934e-fc4b-11e9-b46a-0242ac110002',
        item: '大版下料',
        last: {
          unitPrice: 5,
          cycleTime: 50,
          usageAmount: 5,
        },
        current: {
          unitPrice: 5,
          cycleTime: 50,
          usageAmount: 5,
        },
        next: {
          unitPrice: 5,
          cycleTime: 50,
          usageAmount: 5,
        },
        disable: false,
      },
    ],
  };
};

const fakeGetAdhesivePrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    adhesivePrice: [
      {
        id: 'c2d2934e-fc4b-11e9-b46a-0242ac110002',
        item: 'N/A',
        disable: false,
        last: {
          unitPrice: 5,
          cycleTime: 50,
          usageAmount: 5,
        },
        current: {
          unitPrice: 5,
          cycleTime: 50,
          usageAmount: 5,
        },
        next: {
          unitPrice: 5,
          cycleTime: 50,
          usageAmount: 5,
        },
      },
    ],
  };
};

const fakeGetPrintingPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    printingPrice: [
      {
        id: 'c2d2934e-fc4b-11e9-b46a-0242ac110002',
        item: 'N/A',
        disable: false,
        last: {
          unitPrice: 5,
          usageAmount: 5,
        },
        current: {
          unitPrice: 5,
          usageAmount: 5,
        },
        next: {
          unitPrice: 5,
          usageAmount: 5,
        },
      },
    ],
  };
};

const fakeGetMachineRate = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    machineRate: [
      {
        id: '2eb48fc0-e5bf-11e9-af51-0242ac110002', // rubber_machine_ton 的 id
        'item:': '300T',
        last: {
          cost: 5,
          l: 50,
          w: 50,
        },
        current: {
          cost: 5,
          l: 87,
          w: 50,
        },
        next: {
          cost: 5,
          l: 87,
          w: 50,
        },
        disable: false,
      }
    ]
  };
};

export default {
  fakeGetRubberMaterialPrice,
  fakeGetRubberParameter,
  fakeGetRubberMachinePrice,
  fakeGetStampingPrice,
  fakeGetAdhesivePrice,
  fakeGetPrintingPrice,
  fakeGetMachineRate,
};
