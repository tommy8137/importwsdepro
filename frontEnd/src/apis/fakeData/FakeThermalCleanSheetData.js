import uuidv4 from 'uuid/v4';
import moment from 'moment';
import _random from 'lodash/random';
import _merge from 'lodash/merge';
import _find from 'lodash/find';
import _get from 'lodash/get';

/* Thermal Parameters ------------------------------------------------------------------------------------------------------------------------------*/
const fakeParameters = () => {
  const list = ['加工', '零件', '管銷利潤', 'Fake Data'].map((item, i) => {
    return {
      id: uuidv4(),
      type: item,
      items: [{
        id: uuidv4(),
        item: 'Clip單價',
        unit: 'USD',
        last: 5.00,
        current: 2.5,
        next: 1.5
      }, {
        id: uuidv4(),
        item: 'Clip Loss Rate',
        unit: '%',
        last: 5.00,
        current: 2.5,
        next: 1.5
      }]
    };
  });
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    thermalParameter: list
  };
};

/* Fan Baseline Price ------------------------------------------------------------------------------------------------------------------------------*/

/* Fan Bearing -------------------------------------------------------------------------------------------------------------------------------------*/
const fakeFanBearing = () => {
  return [
    {
      id: '0',
      name: 'Fake Data',
      disable: false,
    },
    {
      id: '1',
      name: 'Sleeve+塑膠',
      disable: false,
    },
    {
      id: '2',
      name: 'FDB+金屬',
      disable: false,
    }
  ];
};

/* Fan Bearing Price -------------------------------------------------------------------------------------------------------------------------------*/
const fakeFanBearingPrice = () => {
  const list = [...Array(4).keys()].map((item, i) => {
    return {
      id: i,
      fanSize: `60x60x3.5${i}`,
      'Fake Data': {
        bearingId: 0,
        last: 1111,
        current: 2222,
        next: 3333,
      },
      'Sleeve+塑膠': {
        bearingId: 1,
        last: 5.00,
        current: 2.5,
        next: 1.5,
      },
      'FDB+金屬': {
        bearingId: 2,
        last: 5.00,
        current: 2.5,
        next: 1.5,
      },
    };
  });
  return {
    date: {
      last: '2019/01/25',
      lastId: 1,
      current: '2019/06/25',
      currentId: 2,
      next: '2019/12/25',
      nextId: 3,
    },
    fanBearingList: list
  };
};

/* Fan Material ------------------------------------------------------------------------------------------------------------------------------------*/
const fakeFanMaterial = () => {
  return [
    {
      id: '0',
      name: 'Fake Data',
      disable: false,
    },
    {
      id: '1',
      name: 'PBT',
      disable: false,
    },
    {
      id: '2',
      name: 'LCP',
      disable: false,
    }
  ];
};

/* Fan Material Price ------------------------------------------------------------------------------------------------------------------------------*/
const fakeFanMaterialPrice = () => {
  const list = [...Array(4).keys()].map((item, i) => {
    return {
      id: i,
      fanSize: `60x60x3.5${i}`,
      'Fake Data': {
        materialId: 0,
        last: 1111,
        current: 2222,
        next: 3333,
      },
      PBT: {
        materialId: 1,
        last: 5.00,
        current: 2.5,
        next: 1.5,
      },
      LCP: {
        materialId: 2,
        last: 5.00,
        current: 2.5,
        next: 1.5,
      }
    };
  });
  return {
    date: {
      last: '2019/01/25',
      lastId: 1,
      current: '2019/06/25',
      currentId: 2,
      next: '2019/12/25',
      nextId: 3,
    },
    fanMaterialList: list
  };
};

const magnetGroups = ['橡膠', 'MQ'];
/* Magnet Material ---------------------------------------------------------------------------------------------------------------------------------*/

const fakeMagnetMaterialList = () => {
  const list = magnetGroups.map((magnetName, i) => {
    return {
      magnetId: uuidv4(),
      magnetName,
      disable: false
    };
  });
  return {
    magnetMaterialList: list
  };
};


/* Magnet Material Price ---------------------------------------------------------------------------------------------------------------------------*/


const fakeMagnetMaterialPriceList = () => {
  const list = [...Array(15).keys()].map((item, i) => {
    return {
      id: uuidv4(),
      fanSize: `60x60x${i * 0.5}`,
      ..._merge(...magnetGroups.map(group => ({
        [group]: {
          magnetId: uuidv4(),
          last: _random(10, 100),
          current: _random(10, 100),
          next: _random(10, 100),
        }
      })))
    };
  });
  return {
    date: {
      last: '2019/01/01',
      lastId: 1,
      current: '2019/06/01',
      currentId: 2,
      next: '2019/12/01',
      nextId: 3,
    },
    magnetMaterialPriceList: list
  };
};

/* Motor Diff --------------------------------------------------------------------------------------------------------------------------------------*/
const fakeMotorDiff = () => {
  return  {
    motorDiffList: [
      {
        motorId: '0',
        item: 'Fake Data',
        disable: false,
      },
      {
        motorId: 'e0dcb59c-fa2d-11e9-957f-0242ac110002',
        item: '單相',
        disable: false,
      },
      {
        motorId: 'e0dcc0c8-fa2d-11e9-957f-0242ac110002',
        item: '三相',
        disable: false,
      }
    ]
  };
};

/* Motor Diff Price --------------------------------------------------------------------------------------------------------------------------------*/
const fakeMotorDiffPrice = () => {
  const list = [...Array(4).keys()].map((item, i) => {
    return {
      id: i,
      fanSize: `60x60x3.5${i}`,
      'Fake Data': {
        motorId: 'e0dd6f82-fa2d9-97f-0242ac110002',
        last: 9.324,
        current: 1,
        next: 9.432
      },
      三相: {
        motorId: 'e0dd6f8-fa2d-11e9-957f-0242ac1002',
        last: 3.2,
        current: 1,
        next: 5.3
      },
      單相: {
        motorId: 'e0dcc0-fa2-11e9-957f-0242a0002',
        last: 5.2,
        current: 0.5,
        next: 8.23
      },
    };
  });
  return {
    date: {
      last: '2019/01/25',
      lastId: 1,
      current: '2019/06/25',
      currentId: 2,
      next: '2019/12/25',
      nextId: 3,
    },
    motorDiffPriceList: list
  };
};

/* Grease Price ------------------------------------------------------------------------------------------------------------------------------------*/
const fakeGreasePrice = () => {
  return {
    date: {
      last: '2019/01/25',
      lastId: 1,
      current: '2019/06/25',
      currentId: 2,
      next: '2019/12/25',
      nextId: 3,
    },
    greaseList: [
      {
        id: 666,
        greaseName: '7783',
        last: 5.00,
        current: 2.5,
        next: 1.5,
        disable: false
      },
      {
        id: 777,
        greaseName: 'Fake Data',
        last: 4.34532,
        current: 3.4543,
        next: 1.5,
        disable: false
      },
    ]
  };
};

/* Pipe Price --------------------------------------------------------------------------------------------------------------------------------------*/
const fakePipePrice = () => {
  return {
    date: {
      last: '2019/01/25',
      lastId: 1,
      current: '2019/06/25',
      currentId: 2,
      next: '2019/12/25',
      nextId: 3,
    },
    pipeList: [
      {
        id: 666,
        pipeName: 'Complex(複合管)',
        diameterName: 'D6',
        pipeLength: '0 <= L < 150',
        thinkess: 'T <= 1.0',
        last: 5.00,
        current: 2.5,
        next: 1.5,
      },
      {
        id: 7777,
        pipeName: 'Fake data',
        diameterName: 'Fake data',
        pipeLength: 'Fake data',
        thinkess: 'Fake data',
        last: 5.333,
        current: 2.532,
        next: 1.5,
      },
    ]
  };
};

/* Thermal Pad Price -------------------------------------------------------------------------------------------------------------------------------*/
const fakeThermalPadPrice = () => {
  return {
    date: {
      last: '2019/01/25',
      lastId: 1,
      current: '2019/06/25',
      currentId: 2,
      next: '2019/12/25',
      nextId: 3,
    },
    thermalPadList: [
      {
        id: '2eb48fc0-e5bf-11e9-af51-0242ac110002',
        heatTransfer: 13,
        hardness: 24,
        thickness: 0.5,
        last: 5.00,
        current: 2.5,
        next: 1.5,
      },
      {
        id: '2eb48fc0-e5bf-11e9-af51-0242ac102',
        heatTransfer: 'Fake data',
        hardness: 'Fake data',
        thickness: 'Fake data',
        last: 5.00,
        current: 2.5,
        next: 1.5,
      },
    ]
  };
};

export default {
  // Thermal Parameters
  fakeParameters,

  // Fan Baseline Price

  // Fan Bearing
  fakeFanBearing,

  // Fan Bearing Price
  fakeFanBearingPrice,

  // Fan Material
  fakeFanMaterial,

  // Fan Material Price
  fakeFanMaterialPrice,

  // Magnet Material
  fakeMagnetMaterialList,
  // Magnet Material Price
  fakeMagnetMaterialPriceList,
  // Motor Diff
  fakeMotorDiff,

  // Motor Diff Price
  fakeMotorDiffPrice,

  // Grease Price
  fakeGreasePrice,

  // Pipe Price
  fakePipePrice,

  // Thermal Pad Price
  fakeThermalPadPrice,
};
