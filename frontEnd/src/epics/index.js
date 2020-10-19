import { combineEpics } from 'redux-observable';
import CostGeneratorDatabaseEpics from '~~features/CostGenerator/Database/CostGeneratorDatabaseEpics';
import AuthEpics from '~~features/Auth/AuthEpics';
import XrayEpics from '~~features/XRay/XrayEpics';
import PlantSourcerSelectorEpics from '~~features/Spending/Panel/PlantSourcerSelector/PlantSourcerSelectorEpics';
import PanelEpics from '~~features/Spending/Panel/PanelEpics';
import CalculatorEpics from '~~features/CostGenerator/Calculator/CalculatorEpics';
import BomManagementEpics from '~~features/BomManagement/BomManagementEpics';
import BomDetailEpics from '~~features/BomManagement/BomDetail/BomDetailActionsEpic';
import DashBoardEpics from '~~features/DashBoard/DashBoardEpics';
import SettingEpics from '~~features/Setting/SettingEpics';
import RoleManagementEpics from '~~features/Setting/RoleManagement/RoleManagementEpics';
import EEBomPersonalEpics from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalEpics';
import EEBomEpics from '~~features/BomManagement/EEBomDetail/EEBomEpics';
import PCBDetailEpics from '~~features/BomManagement/EEBomDetail/EEBomNextStage/PCBSection/SetPCBDetailModal/PCBDetailEpics';
import BackDoorEpics from '~~features/BackDoor/BackDoorEpics';
import PartlistEpic from '~~features/BomManagement/BomDetail/PartList/PartlistEpic';
import AllAccountsEpics from '~~features/Setting/AllAccounts/AllAccountsEpics';
import EEbomAssignmentEpics from '~~features/Setting/EEbomAssignment/EEbomAssignmentEpics';
import XraySpecTitleEpics from '~~features/Setting/XraySpecTitle/XraySpecTitleEpics';
import PcbCalculatorEpics from '~~features/CleanSheet/EE/Pcb/PCBCalculatorEpics';
import DatabaseEpics from '~~features/Database/DatabaseEpics';
import MetalCleanSheetEpics from '~~features/Database/ME/MetalCleanSheet/MetalCleanSheetEpics';
import PlasticCleanSheetEpics from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetEpics';
import ThermalCleanSheetEpics from '~~features/Database/ME/ThermalCleanSheet/ThermalCleanSheetEpics';
import { epics as CableWireCleanSheetEpics } from '~~features/Database/ME/CableWireCleanSheet/CableWireCleanSheetRedux';
import DieCutCleanSheetEpics from '~~features/Database/ME/DieCutCleanSheet/DieCutCleanSheetEpics';
import { epics as  CableFfcCleanSheetEpics } from '~~features/Database/ME/CableFfcCleanSheet/CableFfcCleanSheetRedux';
import { epics as CableFpcCleanSheetEpics } from '~~features/Database/ME/CableFpcCleanSheet/CableFpcCleanSheetRedux';
import { epics as EmcMagnetCleanSheetEpics } from '~~features/Database/ME/EmcMagnetCleanSheet/EmcMagnetCleanSheetRedux';
import { epics as ThermalGraphiteCleanSheetEpics } from '~~features/Database/ME/ThermalGraphiteCleanSheet/ThermalGraphiteCleanSheetRedux';
import { epics as RubberCleanSheetEpics } from '~~features/Database/ME/RubberCleanSheet/RubberCleanSheetRedux';
import { epics as TurningCleanSheetEpics } from '~~features/Database/ME/TurningCleanSheet/TurningCleanSheetRedux';

const rootEpic = combineEpics(
  ...AuthEpics,
  ...PlantSourcerSelectorEpics,
  ...PanelEpics,
  ...BackDoorEpics,

  // Xray
  ...XrayEpics,

  // Clean Sheet
  ...PcbCalculatorEpics,

  // Clean Sheet Old
  ...CostGeneratorDatabaseEpics,
  ...CalculatorEpics,

  // Dashboard
  ...DashBoardEpics,

  // BomManagement
  ...BomManagementEpics,
  ...BomDetailEpics,
  ...EEBomPersonalEpics,
  ...EEBomEpics,
  ...PCBDetailEpics,
  ...PartlistEpic,

  // Setting
  ...SettingEpics,
  ...RoleManagementEpics,
  ...AllAccountsEpics,
  ...EEbomAssignmentEpics,
  ...XraySpecTitleEpics,

  // Database
  ...DatabaseEpics,
  ...MetalCleanSheetEpics,
  ...PlasticCleanSheetEpics,
  ...ThermalCleanSheetEpics,
  ...CableWireCleanSheetEpics,
  ...DieCutCleanSheetEpics,
  ...CableFfcCleanSheetEpics,
  ...CableFpcCleanSheetEpics,
  ...EmcMagnetCleanSheetEpics,
  ...ThermalGraphiteCleanSheetEpics,
  ...RubberCleanSheetEpics,
  ...TurningCleanSheetEpics,
);

export default rootEpic;
