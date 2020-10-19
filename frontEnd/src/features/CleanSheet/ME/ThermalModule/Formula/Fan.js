
const Fan = {
  name: 'Fan',
  // store: {
  //   fanTypeTable,
  //   fanSizeTable,
  //   motorArchitectureTable,
  //   bearingAndSleeveTable,
  //   fanBladeMaterialTable,
  //   magnetMaterialAndSizeTable,
  //   materialTable
  // },
  fields: [
    {
      label: 'fanSize價格',
      key: 'fanSizePrice',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'fanSizeTable',
        neededTableItems: ['fanSize', 'price'],
        neededFormItems: ['fanSize'],
        formulaString: '根據table: {0} 的 {1} 找出 {2}',
        calcMethodName: 'searchOneLevelTable',
      }
    },
    {
      label: '馬達架構價格',
      key: 'motorArchitecturePrice',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'motorArchitectureTable',
        neededTableItems: ['type', 'price'],
        neededFormItems: ['motorArchitecture'],
        formulaString: '根據table: {0} 的 {1} 找出 {2}',
        calcMethodName: 'searchOneLevelTable',
      }
    },
    {
      label: '軸承+套筒類別價格',
      key: 'bearingAndSleevePrice',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'bearingAndSleeveTable',
        neededTableItems: ['type', 'price'],
        neededFormItems: ['bearingAndSleeve'],
        formulaString: '根據table: {0} 的 {1} 找出 {2}',
        calcMethodName: 'searchOneLevelTable',
      }
    },
    {
      label: '扇葉材料價格',
      key: 'fanBladeMaterialPrice',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'fanBladeMaterialTable',
        neededTableItems: ['type', 'price'],
        neededFormItems: ['fanBladeMaterial'],
        formulaString: '根據table: {0} 的 {1} 找出 {2}',
        calcMethodName: 'searchOneLevelTable',
      }
    },
    {
      label: '磁石材料價格',
      key: 'magnetMaterialAndSizePrice',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'magnetMaterialAndSizeTable',
        neededTableItems: ['type', 'price'],
        neededFormItems: ['magnetMaterialAndSize'],
        formulaString: '根據table: {0} 的 {1} 找出 {2}',
        calcMethodName: 'searchOneLevelTable',
      }
    },

    {
      label: '單價',
      key: 'unitPrice',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededFormItems: ['fanSizePrice', 'motorArchitecturePrice', 'bearingAndSleevePrice', 'fanBladeMaterialPrice', 'magnetMaterialAndSizePrice'],
        formulaString: '{0} + {1} + {2} + {3} + {4}',
        calcMethodName: 'calcNumberFomulaBase',
      }
    },
    {
      label: '計算結果',
      key: 'finalPrice',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededFormItems: ['unitPrice', 'amount'],
        formulaString: '{0} * {1}',
        calcMethodName: 'calcNumberFomulaBase',
      },
    },
    {
      label: '用量',
      key: 'amount',
      fieldType: 'int',
      typeof: 'number',
    },
    {
      label: '風扇型式',
      key: 'fanType',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'fanTypeTable',
        // father, child 是指field
        father: null,
        child: null,
        // levelRelated 指得是table的key,
        levelRelated: ['fanType']
      }
    },
    {
      label: 'Size',
      key: 'fanSize',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'fanSizeTable',
        // father, child 是指field
        father: null,
        child: null,
        // levelRelated 指得是table的key,
        levelRelated: ['fanSize']
      }
    },
    {
      label: '馬達架構',
      key: 'motorArchitecture',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'motorArchitectureTable',
        // father, child 是指field
        father: null,
        child: null,
        // levelRelated 指得是table的key,
        levelRelated: ['type']
      }
    },
    {
      label: '軸承和套筒',
      key: 'bearingAndSleeve',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'bearingAndSleeveTable',
        // father, child 是指field
        father: null,
        child: null,
        // levelRelated 指得是table的key,
        levelRelated: ['type']
      }
    },
    {
      label: '扇葉材料',
      key: 'fanBladeMaterial',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'fanBladeMaterialTable',
        // father, child 是指field
        father: null,
        child: null,
        // levelRelated 指得是table的key,
        levelRelated: ['type']
      }
    },
    {
      label: '磁石材料及尺寸',
      key: 'magnetMaterialAndSize',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'magnetMaterialAndSizeTable',
        // father, child 是指field
        father: null,
        child: null,
        // levelRelated 指得是table的key,
        levelRelated: ['type']
      }
    },
    {
      label: '材質',
      key: 'material',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'materialTable',
        // father, child 是指field
        father: null,
        child: null,
        // levelRelated 指得是table的key,
        levelRelated: ['type']
      }
    },
  ]
};


export default Fan;
