/**
 * formular type: 給schedule new使用
 */
export const FORMULA_TYPE = {
  metal: 'housing_metal',
  plastic: 'housing_plastic',
  thermal: 'thermal_module',
  diecut: 'die_cut',
  cablewire: 'cable_wire',
  ffc: 'cable_ffc',
  fpc: 'cable_fpc',
  magnet: 'emc_magnet',
  common: 'common',
  material: 'material',
  thermalgraphite: 'thermal_graphite',
  rubber: 'me_others_rubber',
  turning: 'me_others_screw',
};


export const PARTCATE = {
  PLASTIC: 'plastic',
  METAL: 'metal',
  DIECUT: 'diecut',
  TURNING: 'turning',
  RUBBER: 'rubber',
};


export const PARTCATE_OPTIONS = [
  { label: 'Metal', value: PARTCATE.METAL },
  { label: 'Plastic', value: PARTCATE.PLASTIC },
  { label: 'Diecut', value: PARTCATE.DIECUT },
  { label: 'Rubber', value: PARTCATE.RUBBER },
  { label: 'Turning', value: PARTCATE.TURNING },
];

// 預設選擇metal
export const INITIAL_SELECTED_PARTCATE = PARTCATE_OPTIONS[0];

export default {
  FORMULA_TYPE,
  PARTCATE,
  PARTCATE_OPTIONS
};

