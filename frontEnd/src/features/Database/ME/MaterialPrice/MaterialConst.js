import React from 'react';
import MetalLeftAddModal from '~~features/Database/ME/MaterialPrice/AddModal/Metal/LeftAddModal';
import MetalRightAddModal from '~~features/Database/ME/MaterialPrice/AddModal/Metal/RightAddModal';
import AddMaterialSpecModal from '~~features/Database/ME/MaterialPrice/AddModal/AddMaterialSpecModal';
import AddMaterialModal from '~~features/Database/ME/MaterialPrice/AddModal/AddMaterialModal';
import TurningAddModal from '~~features/Database/ME/MaterialPrice/AddModal/Turning/AddModal';
import DiecutAddModal from '~~features/Database/ME/MaterialPrice/AddModal/Diecut/AddModal';
import RubbercutAddModal from '~~features/Database/ME/MaterialPrice/AddModal/Rubber/AddModal';

export const PARTCATE = {
  PLASTIC: 'plastic',
  METAL: 'metal',
  DIECUT: 'diecut',
  TURNING: 'turning',
  RUBBER: 'rubber',
};

export const ADD_MODAL = {
  [PARTCATE.METAL]: {
    left: {
      render: (props) => <MetalLeftAddModal {...props} />
    },
    right: {
      render: (props) => <MetalRightAddModal {...props} />
    },
  },
  [PARTCATE.PLASTIC]: {
    left: {
      render: (props) => <AddMaterialSpecModal {...props} />
    },
    right: {
      render: (props) => <AddMaterialModal {...props} />
    },
  },
  [PARTCATE.DIECUT]: {
    left: {
      render: (props) => <DiecutAddModal {...props} />
    },
    right: {
      render: (props) => <AddMaterialModal {...props} />
    },
  },
  [PARTCATE.TURNING]: {
    render: (props) => <TurningAddModal {...props} />
  },
  [PARTCATE.RUBBER]: {
    left: {
      render: (props) => <RubbercutAddModal {...props} />
    },
    right: {
      render: (props) => <AddMaterialModal {...props} />
    },
  },
};

/* 給封存和新增的payload用的 ------------------------------ */
export const TABLE_NAME = {
  MATERIAL: 'material',
  MATERIAL_SPEC: 'materialSpec',
  MATERIAL_THICKNESS: 'materialThickness',
};

export const API_KEY_NAME = {
  MATERIAL: 'material',
  MATERIAL_NAME: 'materialName',
  MATERIAL_ID: 'materialId',
  MATERIAL_SPEC: 'materialSpec',
  MATERIAL_SPEC_ID: 'materialSpecId',
  THICKNESS: 'thickness',
  THICKNESS_ID: 'thicknessId',
  PRICE: 'price',
  DENSITY: 'density',
  REMARK: 'remark',
};
/* END ----------------------------------------------------- */

export default {};

