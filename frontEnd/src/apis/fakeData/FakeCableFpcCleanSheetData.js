const fakeGetFpcParameters = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    cablefpcParameter: [
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110006',
        type: '輔料',
        items: [
          {
            id: '6462bc8e-fa1c-11e9-8153-0242ac110002',
            item: '材料 Lose Rate',
            unit: '%',
            last: 3,
            current: 3,
            next: 3,
          },
          {
            id: '6462bc8e-fa1c-11e9-8153-0242ac110004',
            item: '邊料',
            unit: null,
            last: 1,
            current: 1,
            next: 1,
          },
        ],
      },
    ],
  };
};

const fakeGetCableFpcMaterialUnitPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    materialUnitPrice: [
      {
        id: 'cb1df6d8-fab1-11e9-a4c6-0242ac110012',
        name: 'Single slide',
        last: 170,
        current: 170,
        next: 170,
        disable: false,
      },
      {
        id: 'cb1df6d8-fab1-11e9-a4c6-0242ac110002',
        name: 'Double slide',
        last: 170,
        current: 170,
        next: 170,
        disable: false,
      },
    ],
  };
};

const fakeGetCableFpcShieldingPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    shieldingPrice: [
      {
        id: 'cb1df6d8-fab1-11e9-a4c6-0242ac110012',
        name: 'NA',
        last: 0,
        current: 0,
        next: 0,
        disable: false,
      },
      {
        id: 'cb1df6d8-fab1-11e9-a4c6-0242ac110002',
        name: '銀漿+mask',
        last: 70,
        current: 70,
        next: 70,
        disable: false,
      },
    ],
  };
};


export default {
  fakeGetFpcParameters,
  fakeGetCableFpcMaterialUnitPrice,
  fakeGetCableFpcShieldingPrice,
};
