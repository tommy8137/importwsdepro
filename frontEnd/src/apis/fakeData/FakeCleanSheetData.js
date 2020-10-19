import uuidv4 from 'uuid/v4';

const fakePCBCalculatorList = () => {
  const items = [...Array(20).keys()].map(item => {
    return {
      type1: `TypeI${item}`,
      type2: 'HDI',
      wistron_pn: `448.0FD10.001${item}`,
      description: `PCB 17934-${item} LS730WH_MB 10L HANNSTA`,
      pcb_no_stage: `17934_-${item}`,
      vendor_name: 'HANNSTAR',
      vendor_pn: '448.0FD10.0011HANNSTAR',
      price_spa: `3.0${item}`,
      spec01: 'NM',
      spec12: `GAHFPF${item}`,
      spec18: '106MR/108MR',
    };
  });
  return {
    list: items
  };
};


export default {
  fakePCBCalculatorList,
};
