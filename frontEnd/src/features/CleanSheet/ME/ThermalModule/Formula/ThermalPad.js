const ThermalPad = {
  name: 'ThermalPad',
  // store: {
  //   heatTransferCoefficientTable,
  //   thicknessTable
  // },
  fields: [
    {
      label: '最低價格',
      key: 'theLowestPrice',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'thicknessTable',
        neededTableItems: ['heatTransferCoefficient', 'thickness', 'price'],
        neededFormItems: ['heatTransferCoefficient', 'thickness'],
        formulaString: '根據table: {0} 的 {1}, {2} 找出 {3}',
        calcMethodName: 'searchTwoLevelTable',
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
        neededFormItems: ['length', 'width', 'theLowestPrice'],
        formulaString: '( {0} * {1} * {2} ) / 1000000',
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
        neededFormItems: ['finishedMaterialFee'],
        formulaString: '{0}',
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
      label: '熱傳係數(K值)',
      key: 'heatTransferCoefficient',
      fieldType: 'selector',
      typeof: 'number',
      selectorConfig: {
        level: 0,
        tableKey: 'thicknessTable',
        // father, child 是指field
        father: null,
        child: 'thickness',
        // levelRelated 指得是table的key
        levelRelated: ['heatTransferCoefficient', 'thickness']
      }
    },
    {
      label: '厚度(t)',
      key: 'thickness',
      fieldType: 'selector',
      typeof: 'number',
      selectorConfig: {
        level: 1,
        tableKey: 'thicknessTable',
        // father, child 是指field
        father: 'heatTransferCoefficient',
        child: null,
        // levelRelated 指得是table的key
        levelRelated: ['heatTransferCoefficient', 'thickness']
      }
    },
    {
      label: '硬度(Shore)',
      key: 'shore',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: false
      },
      formulaConfig: {
        neededTableName: 'heatTransferCoefficientTable',
        neededTableItems: ['heatTransferCoefficient', 'shore'],
        neededFormItems: ['heatTransferCoefficient'],
        formulaString: '根據table: {0} 的 {1} 找出 {2}',
        calcMethodName: 'searchOneLevelTable',
      }
    },
  ],
};


export default ThermalPad;
