import * as R from 'ramda';

import Cable from './Cable';
import EMC from './EMC';
import ElectroMechanical from './ElectroMechanical';
import Housing from './Housing';
import MEOthers from './MEOthers';
import Medical from './Medical';
import Packing from './Packing';
import RACK from './RACK';
import Thermal from './Thermal';


/*
Medical 後端沒有
ME-others 後端叫做 ME-Others
*/
const allConfig = [
  ...Cable,
  ...EMC,
  ...ElectroMechanical,
  ...Housing,
  ...MEOthers,
  ...Medical,
  ...Packing,
  ...RACK,
  ...Thermal,
];


function convertMapping(productType) {
  let getByProductType = allConfig.map(item => {
    return {
      type1: item.type1,
      type2: item.type2,
      value: R.find(R.propEq('productType', productType), item.productInfo).value
    };
  });
  return getByProductType;
}


function convertAvaliableType1List(productType, avaliableType1OptionList) {
  // 找出EXCEL所有的type1對應的type2都要隱藏
  let getByProductType = convertMapping(productType);
  let groupByType1 = R.groupBy(R.prop('type1'))(getByProductType);
  let needHideType1 = Object.keys(groupByType1).reduce((prev, item) => {
    return groupByType1[item].every(i => i.value === 'N') ? [...prev, item] : prev;
  }, []);

  // 把需要隱藏的選項移除
  let res = avaliableType1OptionList.filter(x => !needHideType1.includes(x));
  console.log('後端說可以選的type1選項是：', avaliableType1OptionList);
  console.log('需要隱藏的type1有：', needHideType1);
  console.log('type1可以看得的選項是：', res);
  return res;
}

function convertAvaliableType2List(productType, type1, avaliableType2OptionList) {
  let getByProductType = convertMapping(productType);

  const needHideList = getByProductType.filter(x => x.type1 === type1 && x.value === 'N').map(x => x.type2);
  // console.log('[convertAvaliableType2List]後端說可以看type2有：', avaliableType1OptionList);
  // console.log('[convertAvaliableType2List]需要隱藏的type2有：', needHideList);
  // console.log('[convertAvaliableType2List]type2可以看得的選項是：', avaliableType2OptionList.filter(x => !needHideList.includes(x)));

  return avaliableType2OptionList.filter(x => !needHideList.includes(x));
}


export default {
  convertAvaliableType1List,
  convertAvaliableType2List
};
