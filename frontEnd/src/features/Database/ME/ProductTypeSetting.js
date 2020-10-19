
const ProductTypeSetting = {
  NB: 1,
  DT: 2,
  AIO: 3,
  CONFERENCE_PHONE: 4,
  IPC: 5,
  LCM: 6,
  MONITOR: 7,
  PD: 8,
  SERVER: 9,
  TC: 10,
  VOIP_PHONE: 11,
  VOIP: 12,
  // new product as NB
  VAD: 13,
  VAD_ACC: 14,
  SMART_DEVICE: 15
};

const { NB, VAD, VAD_ACC, SMART_DEVICE } = ProductTypeSetting;

//  這些新的product 都套 nb 的 cleansheet
export const NB_GROUP = [NB, VAD, VAD_ACC, SMART_DEVICE];

export default ProductTypeSetting;
