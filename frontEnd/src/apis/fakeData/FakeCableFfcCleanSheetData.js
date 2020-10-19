const fakeGetCableFfcParameter = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    cableffcParameter: [
      {
        id: 'cable_ffc_components',
        type: '零件',
        items: [
          {
            id: '29309bb8-fbac-11e9-9e65-0242ac110002',
            item: 'AI Foil單價',
            unit: 'USD',
            last: 2.97,
            current: 2.97,
            next: 2.97,
          },
        ],
      },
    ],
  };
};

const fakeGetCableFfcConnectorPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    connectorPrice: [
      {
        id: 'c2d2934e-fc4b-11e9-b46a-0242ac110002',
        connectorName: 'HDD',
        vendorPN: 'HDD CN 062B-101-(7+15)P-802',
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
      },
    ],
  };
};

const fakeGetCableFfcConnector = () => {
  return {
    connector: [
      {
        id: '4f326e38-f0a6-11e9-a8a0-0242ac110002',
        connectorName: 'HDD',
        disable: false,
      },
      {
        id: '4f326e38-f0a6-11e9-a8a0-0242ac11000ˇ',
        connectorName: 'ODD',
        disable: false,
      },
    ],
  };
};

const fakeGetCableFfcMaterialPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    items: [{
      id: '1588-1684-54531',
      category: '皮膜RoHS 2.0',
      spec: '皮膜',
      legth: 1000,
      width: 120,
      thickness: 0.06,
      vendor: '樺晟',
      partNumber: null,
      last: 5.00,
      current: 2.5,
      next: 1.5
    }]
  };
};


const fakeGetCableFfcConnectorSpecPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    items: [{
      id: '1588-1684-54531',
      category: '壓接/刺破式',
      spec: 'FFC',
      pitch: 1,
      row: 1,
      pin: 30,
      vendor: 'QY',
      partNumber: 'FFC-30XZHL-A-03',
      last: 5.00,
      current: 2.5,
      next: 1.5
    }]
  };
};


const fakeGetCableFfcAccessoriesPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    items: [{
      id: '1588-1684-54531',
      category: '雙面膠',
      spec: '雙面膠0.1T',
      legth: 1000,
      width: 1000,
      thickness: 0.1,
      vendor: '滕藝',
      partNumber: 'DS 10B',
      last: 5.00,
      current: 2.5,
      next: 1.5
    }]
  };
};


const fakeGetCableFfcReinforcementBoardPrice = () => {
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    items: [{
      id: '1588-1684-54531',
      spec: '補強板HF',
      legth: 1000,
      width: 1000,
      thickness: 0.205,
      vendor: '樺晟',
      partNumber: null,
      last: 5.00,
      current: 2.5,
      next: 1.5
    }]
  };
};

export default {
  fakeGetCableFfcParameter,
  fakeGetCableFfcConnectorPrice,
  fakeGetCableFfcConnector,
  fakeGetCableFfcMaterialPrice,
  fakeGetCableFfcConnectorSpecPrice,
  fakeGetCableFfcAccessoriesPrice,
  fakeGetCableFfcReinforcementBoardPrice,
};
