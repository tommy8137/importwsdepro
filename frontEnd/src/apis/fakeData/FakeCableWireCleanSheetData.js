const fakeGetMaterialPrice = () => {
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
        id: '64621ebe-fa1c-11e9-8153-0242ac110002',
        item: '同軸線',
        gauge: 24,
        last: 0.09,
        current: 0.95,
        next: 0.1,
      },
      {
        id: '64621ebe-fa1c-11e9-8153-0242ac110302',
        item: '鐵氟龍線',
        gauge: 24,
        last: 0.19,
        current: 0.54,
        next: 0.12,
      },
    ],
  };
};

const fakeConnectorPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    connectorPrice: [{
      id: 1,
      type: 'CCD Connector',
      items: [{
        id: 'c2d2934e-fc4b-11e9-b46a-0242ac110002',
        type: 'Panel connector(with pull bar/30 pin)',
        vendorPN: 'LWC：LV03130-21201',
        last: {
          price: 0.1124,
          processTime: 44,
        },
        current: {
          price: 0.2246,
          processTime: 33,
        },
        next: {
          price: 0.3368,
          processTime: 22,
        },
      }]
    }]
  };
};

export default {
  fakeGetMaterialPrice,
  fakeConnectorPrice
};
