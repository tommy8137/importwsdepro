const Grease = {
  name: 'Grease',
  store: {
    // materialTable
  },
  fields: [
    {
      label: '材料成本',
      key: 'materialCost',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'materialTable',
        neededTableItems: ['material', 'materialCost'],
        neededFormItems: ['material'],
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
        neededFormItems: ['length', 'width', 'thickness', 'materialCost'],
        formulaString: '{0} * {1} * {2} / 1000 * {3} / 1000',
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
      key: 'thickness',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '材質',
      key: 'material',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'materialTable',
        father: null,
        child: null,
        levelRelated: ['material']
      }
    },
  ],
};


export default Grease;
