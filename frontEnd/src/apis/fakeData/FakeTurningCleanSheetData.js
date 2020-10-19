const fakeGetTurningParameter = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    turningParameter: [
      {
        id: 1,
        type: '成型費',
        items: [
          {
            id: 1,
            item: '成型加工費單價',
            unit: 'USD',
            last: 5.0,
            current: 2.5,
            next: 1.5,
          },
        ],
      },
    ],
  };
};

const fakeGetToothPath = () => {
  return {
    items: [
      {
        id: 1,
        outterDiameter: 16,
        innerDiameter: 125,
      },
    ],
  };
};

const fakeGetHeatTreatmentUnitPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    heatTreatmentPrice: [
      {
        id: 'c2d2934e-fc4b-11e9-b46a-0242ac110002',
        item: '低碳銅 18A',
        last: 0.1124,
        current: 0.2246,
        next: 0.3368,
      },
    ],
  };
};

const fakeGetElectroplatingUnitPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    platingPrice: [
      {
        id: 'c2d2934e-fc4b-11e9-b46a-0242ac110002',
        item: '鍍黑鋅',
        last: 0.1124,
        current: 0.2246,
        next: 0.3368,
      },
    ],
  };
};

const fakeGetNylokUnitPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    nylokPrice: [{
      id: '64621ebe-fa1c-11e9-8153-0242ac110002',
      material: '低碳銅 18A',
      color: 'Blue',
      diameter: 'M <= 2',
      length: null,
      last: 0.09,
      current: 0.95,
      next: 0.1,
    }],
  };
};


export default {
  fakeGetTurningParameter,
  fakeGetToothPath,
  fakeGetHeatTreatmentUnitPrice,
  fakeGetElectroplatingUnitPrice,
  fakeGetNylokUnitPrice,
};
