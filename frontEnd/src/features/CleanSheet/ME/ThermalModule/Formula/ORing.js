

const ORing = {
  name: 'ORing',
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
      defaultValue: 0.002
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
      label: '外徑(ø)',
      key: 'outerDiameter',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '內徑(ø)',
      key: 'insideDiameter',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '厚度 (t)',
      key: 'thickness',
      fieldType: 'float',
      typeof: 'number',
    },
  ],
};


export default ORing;
