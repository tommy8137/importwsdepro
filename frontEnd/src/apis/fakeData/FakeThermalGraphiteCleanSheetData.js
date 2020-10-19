const fakeGraphitePrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/24',
      currentId: 2,
      next: '2019/12/15',
      nextId: 3,
    },
    thicknessPrice: [
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002fake',
        type: '--- FAKE DATA ---',
        thickness: 0.745,
        last: 0.9,
        current: 4.54,
        next: 6.125,
      },
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002',
        type: '合成石墨(K=500)',
        thickness: 0.045,
        last: 0.09,
        current: 0.95,
        next: 0.1,
      },
    ],
  };
};

const fakeGluePrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/24',
      currentId: 2,
      next: '2019/12/15',
      nextId: 3,
    },
    gluePrice: [
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002fake',
        thickness: '--- FAKE DATA ---',
        last: 0.3434,
        current: 6.594,
        next: 9.1435,
      },
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002',
        thickness: 0.045,
        last: 0.09,
        current: 0.95,
        next: 0.1,
      },
    ],
  };
};

const fakePetPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/24',
      currentId: 2,
      next: '2019/12/15',
      nextId: 3,
    },
    petPrice: [
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002fake',
        thickness: '--- FAKE DATA ---',
        last: 0.3434,
        current: 6.594,
        next: 9.1435,
      },
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002',
        thickness: 0.045,
        last: 0.09,
        current: 0.95,
        next: 0.1,
      },
    ],
  };
};

const fakeProcessingPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/24',
      currentId: 2,
      next: '2019/12/15',
      nextId: 3,
    },
    processPrice: [
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002fake',
        item: '--- FAKE DATA ---',
        last: 40.3434,
        current: 46.594,
        next: 39.1435,
      },
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110002',
        item: '單封邊',
        last: 40.09,
        current: 50.95,
        next: 30.1,
      },
    ],
  };
};


export default {
  fakeGraphitePrice,
  fakeGluePrice,
  fakePetPrice,
  fakeProcessingPrice,
};
