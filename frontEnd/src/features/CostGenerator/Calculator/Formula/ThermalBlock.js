const ThermalBlock = {
  name: 'ThermalBlock',
  // store: {
  //   materialDensityTable,
  //   thermalBlockTable
  // },
  fields: [
    {
      label: '運檢包費',
      key: 'inspectionPackageFee',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      defaultValue: 0.2
    },
    {
      label: '管消費',
      key: 'managementFee',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      // defaultValue: 0.2,
      formulaConfig: {
        neededFormItems: ['stampingFee', 'secondaryProcessingFee'],
        formulaString: '({0} + {1}) * 0.1',
        calcMethodName: 'calcNumberFomulaBase',
      },
    },
    {
      label: 'Loss Rate',
      key: 'lossRate',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      defaultValue: 1.03
    },
    {
      label: '二次加工費',
      key: 'secondaryProcessingFee',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      defaultValue: 0.0004
    },
    {
      label: '沖壓費',
      key: 'stampingFee',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      defaultValue: 0.018
    },
    {
      label: '材料密度',
      key: 'density',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'materialDensityTable',
        neededTableItems: ['material', 'density'],
        neededFormItems: ['material'],
        formulaString: '根據table: {0} 的 {1} 找出 {2}',
        calcMethodName: 'searchOneLevelTable',
      }
    },
    {
      label: '材料每公斤費用',
      key: 'materialCostPerKilogram',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'thermalBlockTable',
        neededTableItems: ['material', 'materialThickness', 'materialCostPerKilogram'],
        neededFormItems: ['material', 'materialThickness'],
        formulaString: '根據table: {0} 的 {1}, {2} 找出 {3}',
        calcMethodName: 'searchTwoLevelTable',
      },
    },
    {
      label: '成品材料費',
      key: 'finishedMaterialFee',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededFormItems: ['length', 'width', 'materialThickness', 'density', 'materialCostPerKilogram', 'lossRate'],
        formulaString: '( {0} * {1} * {2} * {3} * {4} ) / 1000000 * {5}',
        calcMethodName: 'calcNumberFomulaBase',
      },
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
        // 成品總價=沖壓費+二次加工費+運檢包費+管銷費
        neededFormItems: ['finishedMaterialFee', 'stampingFee', 'secondaryProcessingFee', 'inspectionPackageFee', 'managementFee'],
        formulaString: '{0} + {1} + {2} + {3} + {4}',
        calcMethodName: 'calcNumberFomulaBase',
      },
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
      label: '長度(L)',
      key: 'length',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '寬度(W)',
      key: 'width',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '材料',
      key: 'material',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'thermalBlockTable',
        // father, child 是指field
        father: null,
        child: 'materialThickness',
        // levelRelated 指得是table的key, level0 = material, level1 = materialThickness
        levelRelated: ['material', 'materialThickness']
      }
    },
    {
      label: '材料厚度(t)',
      key: 'materialThickness',
      fieldType: 'selector',
      typeof: 'number',
      selectorConfig: {
        level: 1,
        tableKey: 'thermalBlockTable',
        father: 'material',
        child: null,
        levelRelated: ['material', 'materialThickness']
      }
    },
  ],
};


export default ThermalBlock;
