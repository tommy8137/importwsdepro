import CostGeneratorResource from './CostGeneratorResource';
import AuthResource from './AuthResource';
import XrayResource from './XrayResource';
import PanelResource from './PanelResource';
import BomManagementResource from './BomManagementResource';
import BomDetailResource from './BomDetailResource';
import DashBoardResource from './DashBoardResource';
import EEBomResource from './EEBomResource';
import SettingResource from './SettingResource';
import BackDoorResource from './BackDoorResource';
import PartlistResource from './PartlistResource';
import AllAccountResource from './AllAccountResource';
import PCBCalculatorResource from './PCBCalculatorResource';
import DatabaseResources from './DatabaseResources';

export default {
  AuthResource,
  PanelResource,
  BackDoorResource,

  // Xray
  XrayResource,

  // Clean Sheet
  PCBCalculatorResource,

  // Clean Sheet Old
  CostGeneratorResource,

  // Bom Management
  BomManagementResource,
  BomDetailResource,
  EEBomResource,
  PartlistResource,

  // Dashboard
  DashBoardResource,

  // Setting
  SettingResource,
  AllAccountResource,

  // Database (含 plastic, metal, ...etc)
  ...DatabaseResources,
};
