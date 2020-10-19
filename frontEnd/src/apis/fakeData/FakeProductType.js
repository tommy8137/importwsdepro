import uuidv4 from 'uuid/v4';
import _ from 'lodash';
// import _find from 'lodash/fp/find';

const productTypes = ['NB', 'DT', 'Others'];


let productTypesList = {
  productTypesList:
    productTypes.map(type => {
      return {
        id: uuidv4(),
        type_name: type,
        remark: 'remark'
      };
    })
};


/**
 * 取得product type 列表
 */
function fakeGetProductTypeList() {
  return  productTypesList;
}


/**
 * 假的put list item
 * @param {} data api回傳有更動的部分array
 */
function fakePutProductTypeList(data = []) {
  const { values } = productTypesList;
  productTypesList = {
    values:
      values.map(item => {
        const modifiedItem = _.find(data, { id: item.id });
        if (modifiedItem) {
          return modifiedItem;
        }
        return item;
      })
  };
}


/**
 * 假的put list item
 * @param {} data api回傳有更動的部分array
 */
function fakePostProductTypeList(data = { item: '', remark: '' }) {
  const { values } = productTypesList;
  productTypesList = {
    values: values.concat({ ...data, id: uuidv4() })
  };
}

export default {
  fakeGetProductTypeList,
  fakePutProductTypeList,
  fakePostProductTypeList
};

