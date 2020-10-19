import uuidv4 from 'uuid/v4';
import moment from 'moment';
import _random from 'lodash/random';
import _merge from 'lodash/merge';
import _find from 'lodash/find';
import _get from 'lodash/get';

// Parameters

// MaterialSizeAdderPrice

// ReleasePaperPrice
const fakeReleasePaperPrice = () => {
  return {
    date: {
      last: '2019/01/25',
      lastId: uuidv4(),
      current: '2019/06/25',
      currentId: uuidv4(),
      next: '2019/12/25',
      nextId: uuidv4(),
    },
    releasePaperPrice: [...Array(20).keys()].map((item, i) => {
      return {
        id: uuidv4(),
        name: `離型紙/透明離型膜-----${i}`,
        last: _random(10, 100),
        current: _random(10, 100),
        next: _random(10, 100),
        disable: false
      };
    })
  };
};

const fakeGetMaterialSizeAdderPrice = () => {
  return (
    {
      date: {
        last: '2019/01/01',
        lastId: 1,
        current: '2019/06/01',
        currentId: 2,
        next: '2019/12/01',
        nextId: 3,
      },
      materialSizeAdderPrice: [{
        id: 'cb1eba32-fab1-11e9-a4c6-0242ac110002',
        size: '0.1 <= size <= 5',
        last: 6,
        current: 6,
        next: 6,
        disable: false
      }, {
        id: 'cb1eccf2-fab1-11e9-a4c6-0242ac110002',
        size: '6 <= size <= 50',
        last: 7,
        current: 7,
        next: 7,
        disable: false
      }]
    }
  );
};
// TypePrice

// AreaTimesPrice

export default {
  fakeReleasePaperPrice,
  fakeGetMaterialSizeAdderPrice
};
