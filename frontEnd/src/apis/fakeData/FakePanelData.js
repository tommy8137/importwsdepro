const fakePlantList = () => {
  const data = [...Array(10).keys()].map((item) => {
    const bg = {
      0: 'CBG',
      1: 'CSBG',
      2: 'EBG',
      3: 'WIH',
    };
    return {
      plantName: `${bg[item % 4]}-${item}`,
      plant: `F${item}-`,
      bg: bg[item % 4],
      plantCode: item
    };
  });
  return {
    plantList: [
      ...data
    ]
  };
};

const fakeSourcerList = () => {
  const data = [...Array(10).keys()].map((item) => {
    const role = {
      0: 'EE',
      1: 'ME',
    };
    return {
      name: `${role[item % Object.keys(role).length]}-${item}`,
      role: role[item % Object.keys(role).length],
      scode: item
    };
  });
  return {
    userList: [
      ...data
    ]
  };
};

const fakeProcureTypes = () => {
  const data = [...Array(10).keys()].map((item) => {
    const type1Candidate = {
      0: 'Bty',
      1: 'Connector',
      2: 'ASIC'
    };
    const type1 = type1Candidate[item % Object.keys(type1Candidate).length];
    return {
      type1,
      // type1: `1-${type1}-${item}`,
      type2: `two-${type1}-${item}`,
    };
  });

  // {"typeList":[{"type1":"Capacitor","type2":null},{"type1":"EMI","type2":null},{"type1":"ASIC","type2":null},{"type1":"Capacitor","type2":"Polymer"}]}
  return {
    typeList: [
      ...data
    ]
  };
};

const fakeGetSupplyTypes = () => {
  return {
    supplyList: [
      {
        typeID: 'S',
        category: 'ODM',
        sapID: 15
      },
      {
        typeID: 'W',
        category: 'ODM',
        sapID: 14
      },
      {
        typeID: 'V-ODM',
        category: 'ODM',
        sapID: 13
      },
      {
        typeID: 'V-OEM',
        category: 'OEM',
        sapID: 12
      },
    ]
  };
};

const fakeGetWaterfallAnalysis = () => {
  return {
    categeory: 'type1',
    requestData: {
      type1: ['Bty'],
      type2: [],
      supplyType: [15, 14, 13, 12],
      from: '2018-10-29',
      to: '2018-11-02'
    },
    waterfall: [{ categeory: 'total', quantity: 0, percentage: '0%', suppliers: 0, pn: 0 }]
  };
};

const fakeGetMonthAnalysis = () => {
  /* eslint quote-props: "off" */
  /* eslint quotes: "off" */
  return { "query": { "plants": ["F0-", "F1-", "F2-", "F3-", "F4-", "F5-", "F6-", "F7-", "F8-", "F9-"], "scodes": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "dateFrom": "2018-10-28T00:00:00.000Z", "dateTo": "2018-11-01T00:00:00.000Z", "type1": ["Bty"], "type2": null, "supplyType": [15, 14, 13, 12], "selection": "base" }, "data": [] };
};


export default {
  fakePlantList,
  fakeProcureTypes,
  fakeSourcerList,
  fakeGetSupplyTypes,
  fakeGetWaterfallAnalysis,
  fakeGetMonthAnalysis
};
