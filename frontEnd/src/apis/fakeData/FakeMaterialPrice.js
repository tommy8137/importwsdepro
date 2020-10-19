import uuidv4 from 'uuid/v4';
import _ from 'lodash';
import { plastic, metal, diecut } from './FakeMaterialSpecList';


const getArray = (length) => [...Array(_.random(1, length)).keys()];

let metalList = metal.map(
  item => ({
    id: uuidv4(),
    materialSpec: item.materialSpec,
    density: _.random(0, 10, true),
    subMaterial:
      getArray(10).map(m => ({
        id: uuidv4(),
        thickness: m,
        last: _.random(0, 10, true),
        current: _.random(0, 10, true),
        next: _.random(0, 10, true),
      }))
  })
);

let plasticList = plastic.map(
  item => ({
    id: uuidv4(),
    materialSpec: item.materialSpec,
    remark: 'remark',
    subMaterial:
      item.material.map(m => ({
        id: uuidv4(),
        material: m,
        density: _.random(0, 10, true),
        last: _.random(0, 10, true),
        current: _.random(0, 10, true),
        next: _.random(0, 10, true),
      }))
  })
);

let diecutList = diecut.map(
  item => ({
    id: uuidv4(),
    materialSpec: item.materialSpec,
    remark: 'remark',
    subMaterial:
      item.material.map(m => ({
        id: uuidv4(),
        material: m,
        last: _.random(0, 10, true),
        current: _.random(0, 10, true),
        next: _.random(0, 10, true),
      }))
  })
);


let fakeDate = {
  date: {
    last: '2019/01/01',
    lastId: uuidv4(),
    current: '2019/06/01',
    currentId: uuidv4(),
    next: '2019/12/01',
    nextId: uuidv4()
  },
};

function fakeGetMaterialPriceList(partCate) {
  switch (partCate) {
    case 'metal':
      return { ...fakeDate, materialPriceList: metalList };
    case 'plastic':
      return { ...fakeDate, materialPriceList: plasticList };
    case 'diecut':
      return { ...fakeDate, materialPriceList: diecutList };
    default:
      return { ...fakeDate, materialPriceList: metalList };
  }
}

function fakeGetPartCategory() {
  return {
    partCategory: [{
      id: uuidv4(),
      name: 'Housing',
      items: [{
        id: uuidv4(),
        name: 'Metal',
        items: [{
          id: uuidv4(),
          name: 'abc',
          isSelected: false,
        }, {
          id: uuidv4(),
          name: 'ddd',
          isSelected: true,
        }]
      }, {
        id: uuidv4(),
        name: 'Alumium',
        items: [{
          id: uuidv4(),
          name: 'eee',
          isSelected: false,
        }, {
          id: uuidv4(),
          name: 'fff',
          isSelected: true,
        }]
      }]
    }]
  };
}

export default {
  fakeGetMaterialPriceList,
  fakeGetPartCategory
};

