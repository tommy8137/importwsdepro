

const Screw = {
  name: 'Screw',
  // store: {
  //   polishedRodTable
  // },
  fields: [
    {
      label: '常數一',
      key: 'constant1',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      defaultValue: 0.0025
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
        neededFormItems: ['constant1'],
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
      label: '牙徑 (M)',
      key: 'toothpath',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '頭徑(ø)',
      key: 'headDiameter',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '頭厚(t)',
      key: 'headThickness',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '長度 (L)',
      key: 'length',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '光桿',
      key: 'polishedRod',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'polishedRodTable',
        // father, child 是指field
        father: null,
        child: null,
        // levelRelated 指得是table的key,
        levelRelated: ['type']
      },
      optionalConfig: {
        dependencyCondition: [
          {
            rootField: 'polishedRod',
            influencesField: ['neckDiameter', 'neckLength'],
          }
        ]
      },
    },
    {
      label: '頸徑',
      key: 'neckDiameter',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        isDisabled: true,
        // 如果符合下面的條件，readOnly變成false
        isNotDisabledCondition: [
          { baseOnField: 'polishedRod', checkValue: 'Yes' }
        ],
      },
    },
    {
      label: '頸長',
      key: 'neckLength',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        isDisabled: true,
        // 如果符合下面的條件，readOnly變成false
        isNotDisabledCondition: [
          { baseOnField: 'polishedRod', checkValue: 'Yes' }
        ]
      },
    },
  ],
};


export default Screw;
