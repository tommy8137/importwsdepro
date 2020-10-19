const common = require('./cleansheetDatabase/example/part_list/plCommon')
const metal_common = require('./cleansheetDatabase/housing_metal/part_list/metal_common')
const metalAnode = require('./cleansheetDatabase/housing_metal/part_list/metal_anode')
const metalGlue = require('./cleansheetDatabase/housing_metal/part_list/metal_glue')
const metalMaterial = require('./cleansheetDatabase/housing_metal/part_list/metal_material')
const plasticCommon = require('./cleansheetDatabase/housing_plastic/part_list/plastic_common')
const plasticMaterial = require('./cleansheetDatabase/housing_plastic/part_list/plastic_material')
const plasticMachine = require('./cleansheetDatabase/housing_plastic/part_list/plastic_machine')
const plasticEmi =  require('./cleansheetDatabase/housing_plastic/part_list/plastic_emi')
const plasticGrinding =  require('./cleansheetDatabase/housing_plastic/part_list/plastic_grinding')
const plasticPaint = require('./cleansheetDatabase/housing_plastic/part_list/plastic_paint')
const plasticCNCProcess = require('./cleansheetDatabase/housing_plastic/part_list/plastic_cnc_process')
const plasticEmbedNail = require('./cleansheetDatabase/housing_plastic/part_list/plastic_embed_nail')
const plasticPrinting = require('./cleansheetDatabase/housing_plastic/part_list/plastic_print')
const metalPaint =  require('./cleansheetDatabase/housing_metal/part_list/metal_paint')
const cableWireConnector = require('./cleansheetDatabase/cable_wire/part_list/cableWire_connector')
const cableWireGuage = require('./cleansheetDatabase/cable_wire/part_list/cableWire_guage')
const cableCommon = require('./cleansheetDatabase/cable_wire/part_list/cableWire_common')
const ffcCommon = require('./cleansheetDatabase/cable_ffc/part_list/cable_ffc_common')
const ffcConnector = require('./cleansheetDatabase/cable_ffc/part_list/cable_ffc_connector')
const fpcCommon = require('./cleansheetDatabase/cable_fpc/part_list/cable_fpc_common')
const fpcMaterial = require('./cleansheetDatabase/cable_fpc/part_list/cable_fpc_material')
const metalDrill = require('./cleansheetDatabase/housing_metal/part_list/metal_drill')
const diecutCommon  = require('./cleansheetDatabase/die_cut/part_list/die_cut_common')
const diecutMaterial  = require('./cleansheetDatabase/die_cut/part_list/die_cut_material')
const thermalCommon = require('./cleansheetDatabase/thermal_module/part_list/thermal_common')
const thermalFan = require('./cleansheetDatabase/thermal_module/part_list/thermal_fan')
const thermalMaterial = require('./cleansheetDatabase/thermal_module/part_list/thermal_material')
const thermalGrease = require('./cleansheetDatabase/thermal_module/part_list/thermal_grease')
const thermalPipe = require('./cleansheetDatabase/thermal_module/part_list/thermal_pipe')
const thermalPad = require('./cleansheetDatabase/thermal_module/part_list/thermal_pad')
const thermalGraphiteCommon = require('./cleansheetDatabase/thermal_graphite/part_list/graphite_common')
const thermalGraphiteGlue = require('./cleansheetDatabase/thermal_graphite/part_list/graphite_glue')
const thermalGraphiteLayer = require('./cleansheetDatabase/thermal_graphite/part_list/graphite_layer')
const thermalGraphiteProcess = require('./cleansheetDatabase/thermal_graphite/part_list/graphite_process')
const rubberPrinting = require('./cleansheetDatabase/meOthers_rubber/part_list/rubber_printing')
const rubberAdhesive = require('./cleansheetDatabase/meOthers_rubber/part_list/rubber_adhesive')
const rubberStamping = require('./cleansheetDatabase/meOthers_rubber/part_list/rubber_stamping')
const rubberMaterial = require('./cleansheetDatabase/meOthers_rubber/part_list/rubber_material')
const rubberMachine = require('./cleansheetDatabase/meOthers_rubber/part_list/rubber_machine')
const rubberCommon = require('./cleansheetDatabase/meOthers_rubber/part_list/rubber_common')
const magnetCommon = require('./cleansheetDatabase/emc_magnet/part_list/magnet_common')
const magnetMaterial = require('./cleansheetDatabase/emc_magnet/part_list/magnet_material')
const turningCommon = require('./cleansheetDatabase/meOthers_turning/part_list/turning_common')
const turningProcess =  require('./cleansheetDatabase/meOthers_turning/part_list/turning_process')
const cleansheetCommon = require('./cleansheetDatabase/cleansheet_common/part_list/cleansheet_common')
const rubberMachineRate = require('./cleansheetDatabase/meOthers_rubber/part_list/rubber_machine_rate')
module.exports = {
  ...common.route,
  ...metal_common,
  ...metalAnode,
  ...metalGlue,
  ...metalMaterial,
  ...plasticCommon,
  ...plasticMaterial,
  ...plasticMachine,
  ...plasticEmi,
  ...plasticGrinding,
  ...plasticPaint,
  ...plasticCNCProcess,
  ...plasticEmbedNail,
  ...plasticPrinting,
  ...metalPaint,
  ...cableWireConnector,
  ...cableWireGuage,
  ...cableCommon,
  ...ffcCommon,
  ...ffcConnector,
  ...fpcCommon,
  ...fpcMaterial,
  ...metalDrill,
  ...diecutMaterial,
  ...diecutCommon,
  ...thermalCommon,
  ...thermalFan,
  ...thermalMaterial,
  ...thermalGrease,
  ...thermalPipe,
  ...thermalPad,
  ...thermalGraphiteCommon,
  ...thermalGraphiteGlue,
  ...thermalGraphiteLayer,
  ...thermalGraphiteProcess,
  ...rubberPrinting,
  ...rubberAdhesive,
  ...rubberStamping,
  ...rubberMaterial,
  ...magnetMaterial,
  ...magnetCommon,
  ...rubberMachine,
  ...rubberCommon,
  ...turningCommon,
  ...turningProcess,
  ...cleansheetCommon,
  ...rubberMachineRate,
}