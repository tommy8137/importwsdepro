const fakeEmcMagnetParameters = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    emcMagnetParameter: [
      {
        id: 1,
        type: '加工',
        items: [
          {
            id: 1,
            item: '裁切邊料損耗率',
            unit: '%',
            last: 5.0,
            current: 2.5,
            next: 1.5,
          },
        ],
      },
      {
        id: 'FakeFakeFake',
        type: 'Fake Data',
        items: [
          {
            id: 666,
            item: 'Fake item',
            unit: 'USD',
            last: 4.334,
            current: 42.523,
            next: 13.534,
          },
        ],
      },
    ],
  };
};

const fakeMaterialPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    materialPrice: [
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002',
        item: 'N48磁鐵',
        last: 0.09,
        current: 0.95,
        next: 0.1,
      },
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002Fake',
        item: 'Fake Data',
        last: 4.19,
        current: 0.54643,
        next: 2.12,
      },
    ],
  };
};

const fakeCuttingMaterialLossRate = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    cutLossRate: [
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002',
        item: '(成品尺寸L * 成品尺寸W * 成品尺寸H) < 60',
        last: 45,
        current: 46.784,
        next: 47,
      },
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002Fake',
        item: 'Fake Data',
        last: 46,
        current: 47,
        next: 48,
      },
    ],
  };
};

const fakeMagnetizingAndLaborPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    manPowerPrice: [
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002',
        item: '(成品尺寸L * 成品尺寸W * 成品尺寸H) < 200',
        last: 0.034,
        current: 0.003,
        next: 0.2359,
      },
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002Fake',
        item: 'Fake Data',
        last: 0.007,
        current: 0.008,
        next: 0.009,
      },
    ],
  };
};


export default {
  fakeEmcMagnetParameters,
  fakeMaterialPrice,
  fakeCuttingMaterialLossRate,
  fakeMagnetizingAndLaborPrice,
};
