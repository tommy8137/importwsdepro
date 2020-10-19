
/*

疑點：

1. 密度有每公斤材料費用嗎？

*/


const Fin = {
  name: 'Fin',
  // store: {
  //   densityTable,
  //   materialCostPerKilogramTable
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
      defaultValue: 0
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
      label: '二次加工費',
      key: 'secondaryProcessingFee',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      defaultValue: 0.0002
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
      label: 'FinQuantity',
      key: 'FinQuantity',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededFormItems: ['finishedProductSizeLength', 'pitch'],
        formulaString: '{0} / {1}',
        calcMethodName: 'calcNumberFomulaBase',
      },
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
        neededTableName: 'densityTable',
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
        neededTableName: 'materialCostPerKilogramTable',
        neededTableItems: ['material', 'materialThickness', 'materialCostPerKilogram'],
        neededFormItems: ['material', 'materialThickness'],
        formulaString: '根據table: {0} 的 {1}, {2} 找出 {3}',
        calcMethodName: 'searchTwoLevelTable',
      },
    },

    {
      label: '用量',
      key: 'amount',
      fieldType: 'int',
      typeof: 'number',
    },
    {
      label: '成品尺寸 長度(L)',
      key: 'finishedProductSizeLength',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '成品尺寸 寬度(W)',
      key: 'finishedProductSizeWidth',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '成品尺寸 高度(H)',
      key: 'finishedProductSizeHeight',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '成品展開尺寸_長度(L)',
      key: 'finishedProductExpansionSizeLength',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: false
      },
      formulaConfig: {
        neededFormItems: ['finishedProductSizeHeight', 'pitch'],
        formulaString: '{0} + ({1} * 2) + 5',
        calcMethodName: 'calcNumberFomulaBase',
      },
    },
    {
      label: '成品展開尺寸_寬度(L)',
      key: 'finishedProductExpansionSizeWidth',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: false
      },
      formulaConfig: {
        neededFormItems: ['finishedProductSizeWidth'],
        formulaString: '{0} + 10',
        calcMethodName: 'calcNumberFomulaBase',
      },
    },
    {
      label: '材料厚度(t)',
      key: 'materialThickness',
      fieldType: 'selector',
      typeof: 'number',
      selectorConfig: {
        level: 1,
        tableKey: 'materialCostPerKilogramTable',
        // father, child 是指field
        father: 'material',
        child: null,
        // levelRelated 指得是table的key, level0 = material, level1 = materialThickness
        levelRelated: ['material', 'materialThickness']
      }
    },
    {
      label: 'Pitch',
      key: 'pitch',
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
        tableKey: 'materialCostPerKilogramTable',
        // father, child 是指field
        father: null,
        child: 'materialThickness',
        // levelRelated 指得是table的key, level0 = material, level1 = materialThickness
        levelRelated: ['material', 'materialThickness']
      }
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
        neededFormItems: [
          'finishedProductExpansionSizeLength',
          'finishedProductExpansionSizeWidth',
          'materialThickness',
          'density',
          'materialCostPerKilogram',
          'lossRate',
          'FinQuantity'
        ],
        formulaString: '( {0} * {1} * {2} * {3} * {4} ) / 1000000 * {5} * {6}',
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
  ],
};


export default Fin;
