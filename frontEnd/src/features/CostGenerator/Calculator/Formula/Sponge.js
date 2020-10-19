

const Sponge = {
  name: 'Sponge',
  // store: {
  //   // materialTable
  // },
  fields: [
    {
      label: '材料每mm費用',
      key: 'materialCostPerMM',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'materialTable',
        neededTableItems: ['material', 'materialThickness', 'materialCostPerMM'],
        neededFormItems: ['material', 'materialThickness'],
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
        neededFormItems: ['length', 'width', 'materialCostPerMM', 'lossRate'],
        formulaString: '{0} * {1} * {2} / 1000000 * {3}',
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
        neededFormItems: ['finishedMaterialFee', 'inspectionPackageFee'],
        formulaString: '{0} + {1}',
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
      label: 'Loss Rate',
      key: 'lossRate',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      defaultValue: 1.05
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
      label: '厚度(t)',
      key: 'materialThickness',
      fieldType: 'selector',
      typeof: 'number',
      selectorConfig: {
        level: 1,
        table: 'materialTable',
        father: 'material',
        child: null,
        levelRelated: ['material', 'materialThickness']
      }
    },
    {
      label: '材料',
      key: 'material',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'materialTable',
        father: null,
        child: 'materialThickness',
        levelRelated: ['material', 'materialThickness']
      }
    },
  ],
};


export default Sponge;
