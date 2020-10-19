import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import xray from '~~features/XRay/XrayReducer';
import auth from '~~features/Auth/AuthReducer';
import intl from '~~hoc/intlUniversal/intlUniversalReducer';
import plantSourcerSelector from '~~features/Spending/Panel/PlantSourcerSelector/PlantSourcerSelectorReducer';
import spendingPanel from '~~features/Spending/Panel/PanelReducer';
import calculator from '~~features/CostGenerator/Calculator/CalculatorReducer';
import loading from '~~redux/Loading/LoadingReducer';
import notificationSystem from '~~hoc/NotificationSystem/NotificationSystemReducer';
import costgeneratorDatabase from '~~features/CostGenerator/Database/CostGeneratorDatabaseReducer';
import bomManagement from '~~features/BomManagement/BomManagementReducer';
import bomDetail from '~~features/BomManagement/BomDetail/BomDetailActionsReducer';
import dashBoard from '~~features/DashBoard/DashBoardReducer';
import eeBomPersonalReducer from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalReducer';
import eeBom from '~~features/BomManagement/EEBomDetail/EEBomReducer';
import pcbDetail from '~~features/BomManagement/EEBomDetail/EEBomNextStage/PCBSection/SetPCBDetailModal/PCBDetailReducer';
import backDoor from '~~features/BackDoor/BackDoorReducer';
import partlist from '~~features/BomManagement/BomDetail/PartList/PartlistReducer';
import setting from '~~features/Setting/SettingReducer';
import roleManagement from '~~features/Setting/RoleManagement/RoleManagementReducer';
import allAccount from '~~features/Setting/AllAccounts/AllAccountsReducer';
import eebomAssignment from '~~features/Setting/EEbomAssignment/EEbomAssignmentReducer';
import xraySpecTitle from '~~features/Setting/XraySpecTitle/XraySpecTitleReducer';
import pcbCalculator from '~~features/CleanSheet/EE/Pcb/PCBCalculatorReducer';
import dataBase from '~~features/Database/DatabaseReducer';
import metalCleanSheet from '~~features/Database/ME/MetalCleanSheet/MetalCleanSheetReducer';
import plasticCleanSheet from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetReducer';
import thermalCleanSheet from '~~features/Database/ME/ThermalCleanSheet/ThermalCleanSheetReducer';
import { reducer as cablewireCleanSheet } from '~~features/Database/ME/CableWireCleanSheet/CableWireCleanSheetRedux';
import diecutCleanSheet from '~~features/Database/ME/DieCutCleanSheet/DieCutCleanSheetReducer';
import { reducer as cableffcCleanSheet } from '~~features/Database/ME/CableFfcCleanSheet/CableFfcCleanSheetRedux';
import { reducer as cablefpcCleanSheet } from '~~features/Database/ME/CableFpcCleanSheet/CableFpcCleanSheetRedux';
import { reducer as emcMagnetCleanSheet } from '~~features/Database/ME/EmcMagnetCleanSheet/EmcMagnetCleanSheetRedux';
import { reducer as thermalGraphiteCleanSheet } from '~~features/Database/ME/ThermalGraphiteCleanSheet/ThermalGraphiteCleanSheetRedux';
import { reducer as rubberCleanSheet } from '~~features/Database/ME/RubberCleanSheet/RubberCleanSheetRedux';
import { reducer as turningCleanSheet } from '~~features/Database/ME/TurningCleanSheet/TurningCleanSheetRedux';


const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  // state: (state = {}) => state,
  auth,
  intl,
  // form: formReducer,
  spendingPanel,
  plantSourcerSelector,
  loading,
  notificationSystem,
  backDoor,

  // Xray
  xray,

  // Clean Sheet
  pcbCalculator,

  // Clean Sheet Old
  costgeneratorDatabase,
  calculator,

  // Dashboard
  dashBoard,

  // BomManagment
  bomManagement,
  bomDetail,
  eeBomPersonalReducer,
  eeBom,
  pcbDetail,
  partlist,

  // Setting
  setting,
  allAccount,
  roleManagement,
  eebomAssignment,
  xraySpecTitle,

  // database
  dataBase,
  metalCleanSheet,
  plasticCleanSheet,
  thermalCleanSheet,
  cablewireCleanSheet,
  diecutCleanSheet,
  cableffcCleanSheet,
  cablefpcCleanSheet,
  emcMagnetCleanSheet,
  thermalGraphiteCleanSheet,
  rubberCleanSheet,
  turningCleanSheet
});

export default rootReducer;
