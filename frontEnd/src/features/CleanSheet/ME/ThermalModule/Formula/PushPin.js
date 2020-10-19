/**

  成品材料費 : 長度(L) * 寬度(W) * 材料每M²費用 /1000000 * 1.05
 */

const PushPin = {
  name: 'PushPin',
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
      defaultValue: 0.08
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
      label: '長度 (L)',
      key: 'length',
      fieldType: 'float',
      typeof: 'number',
    },
    {
      label: '頭徑(ø)',
      key: 'headDiameter',
      fieldType: 'float',
      typeof: 'number',
    },
  ],
};


export default PushPin;
