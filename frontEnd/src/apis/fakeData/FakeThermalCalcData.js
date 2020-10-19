// import Grease from './Calculator/Thermal/Grease';
// import Pipe from './Calculator/Thermal/Pipe';
// import Screw from './Calculator/Thermal/Screw';
// import Sponge from './Calculator/Thermal/Sponge';
// import ThermalBlock from './Calculator/Thermal/ThermalBlock';
// import Fin from './Calculator/Thermal/Fin';
// import Fan from './Calculator/Thermal/Fan';
// import ThermalPlate from './Calculator/Thermal/ThermalPlate';
// import ThermalPad from './Calculator/Thermal/ThermalPad';

import fakeThermalJSON from './Calculator/Thermal/fakeThermal.json';

const fakeGetThermalTables = () => {
  console.log('res', fakeThermalJSON);
  return fakeThermalJSON;
  // return {
  //   Grease,
  //   Pipe,
  //   Screw,
  //   Sponge,
  //   ThermalBlock,
  //   Fin,
  //   Fan,
  //   ThermalPlate,
  //   ThermalPad
  // };
};


const fakeExportThermalCalculatorReport = () => {
  return 'OK';
};

export default {
  fakeGetThermalTables,
  fakeExportThermalCalculatorReport
};
