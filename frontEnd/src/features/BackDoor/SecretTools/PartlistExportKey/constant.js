/**
 * export全部資料
 * {
 *  NB: {
 *    cable-ffc: { cleansheet, partlist },
 *    housing-metal: { cleansheet, partlist },
 *    ...
 *  },
 *  DT: {
 *    cable-ffc: { cleansheet, partlist },
 *    housing-metal: { cleansheet, partlist },
 *    ...
 *  },
 *  AIO: {
 *    cable-ffc: { cleansheet, partlist },
 *    housing-metal: { cleansheet, partlist },
 *    ...
 *  },
 * }
 */

export const PRODUCT_TYPE = {
  NB: 'NB',
  DT: 'DT',
  AIO: 'AIO',
};
/*
export const PARTLIST_NAME = {
  metal: 'housing-metal',
  plastic: 'housing-plastic',
  module: 'thermal-module',
  ffc: 'cable-ffc',
  fpc: 'cable-fpc',
  wire: 'cable-wire',
  cut: 'die-cut',
  magnet: 'emc-magnet',
  graphite: 'thermal-graphite',
  rubber: 'meothers-rubber',
  nut: 'meothers-nut',
  standoff: 'meothers-standoff',
  screw: 'meothers-screw',
};
*/

export default {
  PRODUCT_TYPE,
  // PARTLIST_NAME,
};
