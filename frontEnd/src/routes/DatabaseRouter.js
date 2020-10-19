import React, { Fragment } from 'react';
import { PartlistContextProvider } from '~~elements/PartListForm';

import { Route, Switch, } from 'react-router-dom';

import loadable from '@loadable/component';

import Layout from '~~elements/Layout';


const PlasticComponents = {
  Parameters: loadable(() => import(/* webpackChunkName: "PlasticParameters" */ '~~features/Database/ME/PlasticCleanSheet/Parameters')),

  LossRate: loadable(() => import(/* webpackChunkName: "PlasticLossRate" */ '~~features/Database/ME/PlasticCleanSheet/LossRate')),

  MachineModuleList: loadable(() => import(/* webpackChunkName: "PlasticMachineModuleList" */ '~~features/Database/ME/PlasticCleanSheet/MachineModuleList')),
  MachineTonnagePrice: loadable(() => import(/* webpackChunkName: "PlasticMachineTonnagePrice" */ '~~features/Database/ME/PlasticCleanSheet/MachineTonnagePrice')),

  LaborUnitPriceAndWorkSheet: loadable(() => import(/* webpackChunkName: "PlasticLaborUnitPriceAndWorkSheet" */ '~~features/Database/ME/PlasticCleanSheet/LaborUnitPriceAndWorkSheet')),
  PaintAndTotalLaborCost: loadable(() => import(/* webpackChunkName: "PlasticPaintAndTotalLaborCost" */ '~~features/Database/ME/PlasticCleanSheet/PaintAndTotalLaborCost')),
  PaintMachinePrice: loadable(() => import(/* webpackChunkName: "PlasticPaintMachinePrice" */ '~~features/Database/ME/PlasticCleanSheet/PaintMachinePrice')),
  PaintVendorList: loadable(() => import(/* webpackChunkName: "PlasticPaintVendorList" */ '~~features/Database/ME/PlasticCleanSheet/PaintVendorList')),
  PaintTypeList: loadable(() => import(/* webpackChunkName: "PlasticPaintTypeList" */ '~~features/Database/ME/PlasticCleanSheet/PaintTypeList')),
  PaintGroupList: loadable(() => import(/* webpackChunkName: "PlasticPaintGroupList" */ '~~features/Database/ME/PlasticCleanSheet/PaintGroupList')),
  PaintTypePrice: loadable(() => import(/* webpackChunkName: "PlasticPaintTypePrice" */ '~~features/Database/ME/PlasticCleanSheet/PaintTypePrice')),

  PrintingProcessPrice: loadable(() => import(/* webpackChunkName: "PlasticPrintingProcessPrice" */ '~~features/Database/ME/PlasticCleanSheet/PrintingProcessPrice')),
  EmbeddedNailPrice: loadable(() => import(/* webpackChunkName: "PlasticEmbeddedNailPrice" */ '~~features/Database/ME/PlasticCleanSheet/EmbeddedNailPrice')),
  ProductPolishDetail: loadable(() => import(/* webpackChunkName: "PlasticProductPolishDetail" */ '~~features/Database/ME/PlasticCleanSheet/ProductPolishDetail')),
  EmiSputteringList: loadable(() => import(/* webpackChunkName: "PlasticEmiSputteringList" */ '~~features/Database/ME/PlasticCleanSheet/EmiSputteringList')),
  EmiSputteringBaseList: loadable(() => import(/* webpackChunkName: "PlasticEmiSputteringBaseList" */ '~~features/Database/ME/PlasticCleanSheet/EmiSputteringBaseList')),
  EmiSputteringSiteGroup: loadable(() => import(/* webpackChunkName: "PlasticEmiSputteringSiteGroup" */ '~~features/Database/ME/PlasticCleanSheet/EmiSputteringSiteGroup')),
  EmiSputteringPrice: loadable(() => import(/* webpackChunkName: "PlasticEmiSputteringPrice" */ '~~features/Database/ME/PlasticCleanSheet/EmiSputteringPrice')),
};

const MetalComponents = {
  Parameters: loadable(() => import(/* webpackChunkName: "MetalParameters" */ '~~features/Database/ME/MetalCleanSheet/Parameters')),

  MachineModuleList: loadable(() => import(/* webpackChunkName: "MetalMachineModuleList" */ '~~features/Database/ME/MetalCleanSheet/MachineModuleList')),
  MachineTonnagePrice: loadable(() => import(/* webpackChunkName: "MetalMachineTonnagePrice" */ '~~features/Database/ME/MetalCleanSheet/MachineTonnagePrice')),

  AnodeColorPrice: loadable(() => import(/* webpackChunkName: "MetalAnodeColorPrice" */ '~~features/Database/ME/MetalCleanSheet/AnodeColorPrice')),
  PaintingTypePrice: loadable(() => import(/* webpackChunkName: "MetalPaintingTypePrice" */ '~~features/Database/ME/MetalCleanSheet/PaintingTypePrice')),
  GlueSyringeInnerDeameter: loadable(() => import(/* webpackChunkName: "MetalGlueSyringeInnerDeameter" */ '~~features/Database/ME/MetalCleanSheet/GlueSyringeInnerDeameter')),
  GlueModelPrice: loadable(() => import(/* webpackChunkName: "MetalGlueModelPrice" */ '~~features/Database/ME/MetalCleanSheet/GlueModelPrice')),
  DrillPrice: loadable(() => import(/* webpackChunkName: "MetalDrillPrice" */ '~~features/Database/ME/MetalCleanSheet/DrillPrice')),

  LaborUnitPriceAndWorkSheet: loadable(() => import(/* webpackChunkName: "MetalLaborUnitPriceAndWorkSheet" */ '~~features/Database/ME/MetalCleanSheet/LaborUnitPriceAndWorkSheet')),
  PaintAndTotalLaborCost: loadable(() => import(/* webpackChunkName: "MetalPaintAndTotalLaborCost" */ '~~features/Database/ME/MetalCleanSheet/PaintAndTotalLaborCost')),
  PaintMachinePrice: loadable(() => import(/* webpackChunkName: "MetalPaintMachinePrice" */ '~~features/Database/ME/MetalCleanSheet/PaintMachinePrice')),
  PaintVendorList: loadable(() => import(/* webpackChunkName: "MetalPaintVendorList" */ '~~features/Database/ME/MetalCleanSheet/PaintVendorList')),
  PaintTypeList: loadable(() => import(/* webpackChunkName: "MetalPaintTypeList" */ '~~features/Database/ME/MetalCleanSheet/PaintTypeList')),
  PaintGroupList: loadable(() => import(/* webpackChunkName: "MetalPaintGroupList" */ '~~features/Database/ME/MetalCleanSheet/PaintGroupList')),
  PaintTypePrice: loadable(() => import(/* webpackChunkName: "MetalPaintTypePrice" */ '~~features/Database/ME/MetalCleanSheet/PaintTypePrice')),

};

const ThermalComponents = {
  Parameters: loadable(() => import(/* webpackChunkName: "ThermalParameters" */ '~~features/Database/ME/ThermalCleanSheet/Parameters')),

  // 零件
  FanBaselinePrice: loadable(() => import(/* webpackChunkName: "FanBaselinePrice" */ '~~features/Database/ME/ThermalCleanSheet/FanBaselinePrice')),
  FanBearing: loadable(() => import(/* webpackChunkName: "FanBearing" */ '~~features/Database/ME/ThermalCleanSheet/FanBearing')),
  FanBearingPrice: loadable(() => import(/* webpackChunkName: "FanBearingPrice" */ '~~features/Database/ME/ThermalCleanSheet/FanBearingPrice')),
  FanMaterial: loadable(() => import(/* webpackChunkName: "FanMaterial" */ '~~features/Database/ME/ThermalCleanSheet/FanMaterial')),
  FanMaterialPrice: loadable(() => import(/* webpackChunkName: "FanMaterialPrice" */ '~~features/Database/ME/ThermalCleanSheet/FanMaterialPrice')),
  MagnetMaterial: loadable(() => import(/* webpackChunkName: "MagnetMaterial" */ '~~features/Database/ME/ThermalCleanSheet/MagnetMaterial')),
  MagnetMaterialPrice: loadable(() => import(/* webpackChunkName: "MagnetMaterialPrice" */ '~~features/Database/ME/ThermalCleanSheet/MagnetMaterialPrice')),
  MotorDiff: loadable(() => import(/* webpackChunkName: "MotorDiff" */ '~~features/Database/ME/ThermalCleanSheet/MotorDiff')),
  MotorDiffPrice: loadable(() => import(/* webpackChunkName: "MotorDiffPrice" */ '~~features/Database/ME/ThermalCleanSheet/MotorDiffPrice')),
  GreasePrice: loadable(() => import(/* webpackChunkName: "GreasePrice" */ '~~features/Database/ME/ThermalCleanSheet/GreasePrice')),
  PipePrice: loadable(() => import(/* webpackChunkName: "PipePrice" */ '~~features/Database/ME/ThermalCleanSheet/PipePrice')),
  ThermalPadPrice: loadable(() => import(/* webpackChunkName: "ThermalPadPrice" */ '~~features/Database/ME/ThermalCleanSheet/ThermalPadPrice')),
};

const CableWireComponents = {
  Parameters: loadable(() => import(/* webpackChunkName: "CableWireParameters" */ '~~features/Database/ME/CableWireCleanSheet/Parameters')),

  MaterialPrice: loadable(() => import(/* webpackChunkName: "CableWireMaterialPrice" */ '~~features/Database/ME/CableWireCleanSheet/MaterialPrice')),
  ConnectorPrice: loadable(() => import(/* webpackChunkName: "CableWireConnectorPrice" */ '~~features/Database/ME/CableWireCleanSheet/ConnectorPrice')),
};

const DieCutComponents = {
  Parameters: loadable(() => import(/* webpackChunkName: "DieCutParameters" */ '~~features/Database/ME/DieCutCleanSheet/Parameters')),

  MaterialSizeAdderPrice: loadable(() => import(/* webpackChunkName: "MaterialSizeAdderPrice" */ '~~features/Database/ME/DieCutCleanSheet/MaterialSizeAdderPrice')),
  ReleasePaperPrice: loadable(() => import(/* webpackChunkName: "ReleasePaperPrice" */ '~~features/Database/ME/DieCutCleanSheet/ReleasePaperPrice')),

  TypePrice: loadable(() => import(/* webpackChunkName: "TypePrice" */ '~~features/Database/ME/DieCutCleanSheet/TypePrice')),
  AreaTimesPrice: loadable(() => import(/* webpackChunkName: "AreaTimesPrice" */ '~~features/Database/ME/DieCutCleanSheet/AreaTimesPrice')),

};

const CableFfcComponents = {
  Parameters: loadable(() => import(/* webpackChunkName: "CableFfcParameters" */ '~~features/Database/ME/CableFfcCleanSheet/Parameters')),

  Connector: loadable(() => import(/* webpackChunkName: "CableFfcConnector" */ '~~features/Database/ME/CableFfcCleanSheet/Connector')),
  ConnectorPrice: loadable(() => import(/* webpackChunkName: "CableFfcConnectorPrice" */ '~~features/Database/ME/CableFfcCleanSheet/ConnectorPrice')),
  // DT / AIO
  ConnectorSpecPrice: loadable(() => import(/* webpackChunkName: "CableFfcConnectorSpecPrice" */ '~~features/Database/ME/CableFfcCleanSheet/ConnectorSpecPrice')),
  MaterialPrice: loadable(() => import(/* webpackChunkName: "CableFfcMaterialPrice" */ '~~features/Database/ME/CableFfcCleanSheet/MaterialPrice')),
  AccessoriesPrice: loadable(() => import(/* webpackChunkName: "CableFfcAccessoriesPrice" */ '~~features/Database/ME/CableFfcCleanSheet/AccessoriesPrice')),
  ReinforcementBoardPrice: loadable(() => import(/* webpackChunkName: "CableFfcReinforcementBoardPrice" */ '~~features/Database/ME/CableFfcCleanSheet/ReinforcementBoardPrice')),
};

const CableFpcComponents = {
  Parameters: loadable(() => import(/* webpackChunkName: "CableFpcParameters" */ '~~features/Database/ME/CableFpcCleanSheet/Parameters')),

  MaterialUnitPrice: loadable(() => import(/* webpackChunkName: "CableFpcMaterialUnitPrice" */ '~~features/Database/ME/CableFpcCleanSheet/MaterialUnitPrice')),

  ShieldingPrice: loadable(() => import(/* webpackChunkName: "CableFpcShieldingPrice" */ '~~features/Database/ME/CableFpcCleanSheet/ShieldingPrice')),
};

const EmcMagnetComponents = {
  Parameters: loadable(() => import(/* webpackChunkName: "EmcMagnetParameters" */ '~~features/Database/ME/EmcMagnetCleanSheet/Parameters')),

  MaterialPrice: loadable(() => import(/* webpackChunkName: "EmcMagnetMaterialPrice" */ '~~features/Database/ME/EmcMagnetCleanSheet/MaterialPrice')),

  CuttingMaterialLossRate: loadable(() => import(/* webpackChunkName: "EmcMagnetMaterialPrice" */ '~~features/Database/ME/EmcMagnetCleanSheet/CuttingMaterialLossRate')),
  MagnetizingAndLaborPrice: loadable(() => import(/* webpackChunkName: "EmcMagnetMagnetizingAndLaborPrice" */ '~~features/Database/ME/EmcMagnetCleanSheet/MagnetizingAndLaborPrice')),
};

const ThermalGraphiteComponents = {
  GraphitePrice: loadable(() => import(/* webpackChunkName: "ThermalGraphiteGraphitePrice" */ '~~features/Database/ME/ThermalGraphiteCleanSheet/GraphitePrice')),
  GluePrice: loadable(() => import(/* webpackChunkName: "ThermalGraphiteGluePrice" */ '~~features/Database/ME/ThermalGraphiteCleanSheet/GluePrice')),
  PetPrice: loadable(() => import(/* webpackChunkName: "ThermalGraphitePetPrice" */ '~~features/Database/ME/ThermalGraphiteCleanSheet/PetPrice')),
  ProcessingPrice: loadable(() => import(/* webpackChunkName: "ThermalGraphiteProcessingPrice" */ '~~features/Database/ME/ThermalGraphiteCleanSheet/ProcessingPrice')),

};

const RubberComponents = {
  Parameters: loadable(() => import(/* webpackChunkName: "RubberParameters" */ '~~features/Database/ME/RubberCleanSheet/Parameters')),

  MachinePrice: loadable(() => import(/* webpackChunkName: "RubberMachinePrice" */ '~~features/Database/ME/RubberCleanSheet/MachinePrice')),
  // MaterialPrice: loadable(() => import(/* webpackChunkName: "RubberMaterialPrice" */ '~~features/Database/ME/RubberCleanSheet/MaterialPrice')),
  StampingPrice: loadable(() => import(/* webpackChunkName: "RubberStampingPrice" */ '~~features/Database/ME/RubberCleanSheet/StampingPrice')),
  AdhesivePrice: loadable(() => import(/* webpackChunkName: "RubberAdhesivePrice" */ '~~features/Database/ME/RubberCleanSheet/AdhesivePrice')),
  PrintingPrice: loadable(() => import(/* webpackChunkName: "RubberPrintingPrice" */ '~~features/Database/ME/RubberCleanSheet/PrintingPrice')),
  MachineRate: loadable(() => import(/* webpackChunkName: "RubberPrintingPrice" */ '~~features/Database/ME/RubberCleanSheet/MachineRate')),
};

const TurningComponents = {
  Parameters: loadable(() => import(/* webpackChunkName: "TurningParameters" */ '~~features/Database/ME/TurningCleanSheet/Parameters')),

  ToothPath: loadable(() => import(/* webpackChunkName: "TurningToothPath" */ '~~features/Database/ME/TurningCleanSheet/ToothPath')),
  HeatTreatmentUnitPrice: loadable(() => import(/* webpackChunkName: "TurningHeatTreatmentUnitPrice" */ '~~features/Database/ME/TurningCleanSheet/HeatTreatmentUnitPrice')),
  ElectroplatingUnitPrice: loadable(() => import(/* webpackChunkName: "TurningElectroplatingUnitPrice" */ '~~features/Database/ME/TurningCleanSheet/ElectroplatingUnitPrice')),
  NylokUnitPrice: loadable(() => import(/* webpackChunkName: "TurningNylokUnitPrice" */ '~~features/Database/ME/TurningCleanSheet/NylokUnitPrice')),
};

const LoadableComponent = {
  // Clean Sheet Database
  CommonParameters: loadable(() => import(/* webpackChunkName: "CommonParameters" */ '~~features/Database/ME/CommonParameters')),
  ProductTypeList: loadable(() => import(/* webpackChunkName: "ProductTypeList" */ '~~features/Database/ME/ProductTypeList')),
  SiteList: loadable(() => import(/* webpackChunkName: "SiteList" */ '~~features/Database/ME/SiteList')),
  MaterialPrice: loadable(() => import(/* webpackChunkName: "MeMaterialPrice" */ '~~features/Database/ME/MaterialPrice')),
};

/** Database Clean Sheet */
const cleanSheetDatabase = (props) => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path={`${props.match.url}/CommonParameter`}
          render={p => <LoadableComponent.CommonParameters {...p} />}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path={`${props.match.url}/ProductTypeList`}
          render={p => <LoadableComponent.ProductTypeList {...p} />}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path={`${props.match.url}/SiteList`}
          render={p => <LoadableComponent.SiteList {...p} />}
        />
      </Switch>
      <Switch>
        <Route
          exact
          path={`${props.match.url}/MaterialPrice`}
          render={p => <LoadableComponent.MaterialPrice {...p} />}
        />
      </Switch>
    </div>
  );
};

function getSwitchRoutes(LoadComponent) {
  return (props) => {
    return (
      <div>
        {Object.keys(LoadComponent).map(key => {
          const Component = LoadComponent[key];
          return (
            <Switch>
              <Route
                exact
                path={`${props.match.url}/${key}`}
                render={p => <Component {...p} />}
              />
            </Switch>);
        }
        )}
      </div>
    );
  };
}

const CleanSheetDatabase = Layout('goBackHeader', {
  backLink: '/s/database',
  render: (
    null
  )
})(cleanSheetDatabase);

const DatabasePlastic = Layout('goBackHeader', {
  backLink: '/s/database/me/plastic', // TODO: 改成吃history
  render: (
    null
  )
})(getSwitchRoutes(PlasticComponents));

const DatabaseMetal = Layout('goBackHeader', {
  backLink: '/s/database/me/metal',
  render: (
    null
  )
})(getSwitchRoutes(MetalComponents));

const DatabaseThermal = Layout('goBackHeader', {
  backLink: '/s/database/me/thermal',
  render: (
    null
  )
})(getSwitchRoutes(ThermalComponents));

const DatabaseCableWire = Layout('goBackHeader', {
  backLink: '/s/database/me/cablewire',
  render: (
    null
  )
})(getSwitchRoutes(CableWireComponents));

const DatabaseDieCut = Layout('goBackHeader', {
  backLink: '/s/database/me/diecut',
  render: (
    null
  )
})(getSwitchRoutes(DieCutComponents));

const DatabaseCableFfc = Layout('goBackHeader', {
  backLink: '/s/database/me/cableffc',
  render: (
    null
  )
})(getSwitchRoutes(CableFfcComponents));

const DatabaseCableFpc = Layout('goBackHeader', {
  backLink: '/s/database/me/cablefpc',
  render: (
    null
  )
})(getSwitchRoutes(CableFpcComponents));

const DatabaseEmcMagnet = Layout('goBackHeader', {
  backLink: '/s/database/me/emcmagnet',
  render: (
    null
  )
})(getSwitchRoutes(EmcMagnetComponents));

const DatabaseThermalGraphite = Layout('goBackHeader', {
  backLink: '/s/database/me/thermalgraphite',
  render: (
    null
  )
})(getSwitchRoutes(ThermalGraphiteComponents));

const DatabaseRubber = Layout('goBackHeader', {
  backLink: '/s/database/me/rubber',
  render: (
    null
  )
})(getSwitchRoutes(RubberComponents));

const DatabaseTurning = Layout('goBackHeader', {
  backLink: '/s/database/me/turning',
  render: (
    null
  )
})(getSwitchRoutes(TurningComponents));


const DatabaseRouter = (props) => {
  const { match: { url } } = props;
  return (
    <Fragment>
      <Route
        path={url}
        render={p => <CleanSheetDatabase {...p} />}
      />
      <Route
        path={`${url}/plastic`}
        render={p => <DatabasePlastic {...p} />}
      />
      <Route
        path={`${url}/metal`}
        render={p => <DatabaseMetal {...p} />}
      />
      <Route
        path={`${url}/thermal`}
        render={p => <DatabaseThermal {...p} />}
      />
      <Route
        path={`${url}/cablewire`}
        render={p => <DatabaseCableWire {...p} />}
      />
      <Route
        path={`${url}/diecut`}
        render={p => <DatabaseDieCut {...p} />}
      />
      <Route
        path={`${url}/cableffc`}
        render={p => <DatabaseCableFfc {...p} />}
      />
      <Route
        path={`${url}/cablefpc`}
        render={p => <DatabaseCableFpc {...p} />}
      />
      <Route
        path={`${url}/emcmagnet`}
        render={p => <DatabaseEmcMagnet {...p} />}
      />
      <Route
        path={`${url}/thermalgraphite`}
        render={p => <DatabaseThermalGraphite {...p} />}
      />
      <Route
        path={`${url}/rubber`}
        render={p => <DatabaseRubber {...p} />}
      />
      <Route
        path={`${url}/turning`}
        render={p => <DatabaseTurning {...p} />}
      />
    </Fragment>
  );
};


export default DatabaseRouter;
