const Pipe = {
  name: 'Pipe',
  // store: {
  //   // pipeTypeTable,
  //   // outerDiameterFlatteningThicknessTable,
  //   // outerDiameterLengthTable
  // },
  fields: [
    {
      label: '直徑打扁厚度成本',
      key: 'outerDiameterFlatteningThicknessCost_F',
      fieldType: 'float',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'outerDiameterFlatteningThicknessTable',
        neededTableItems: ['outerDiameter', 'flatteningThickness', 'cost'],
        neededFormItems: ['outerDiameter', 'flatteningThickness'],
        formulaString: '根據table: {0} 的 {1}, {2} 找出 {3}',
        calcMethodName: 'customSearchTwoLevelTable',
      }
    },
    {
      label: '直徑長度成本',
      key: 'outerDiameterLengthCost_F',
      fieldType: 'int',
      typeof: 'number',
      optionalConfig: {
        readOnly: true,
        isHidden: true
      },
      formulaConfig: {
        neededTableName: 'outerDiameterLengthTable',
        neededTableItems: ['outerDiameter', 'lengthRange', 'cost'],
        neededFormItems: ['outerDiameter', 'length'],
        formulaString: '根據table: {0} 的 {1}, {2} 找出 {3}',
        calcMethodName: 'customSearchTwoLevelTable',
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
        neededFormItems: ['outerDiameterFlatteningThicknessCost_F', 'outerDiameterLengthCost_F'],
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
      label: '用量',
      key: 'amount',
      fieldType: 'int',
      typeof: 'number',
    },
    {
      label: 'Pipe型式',
      key: 'pipeType',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'pipeTypeTable',
        father: null,
        child: null,
        levelRelated: ['pipeType']
      }
    },
    {
      label: '寬度(W)',
      key: 'outerDiameter',
      fieldType: 'selector',
      typeof: 'string',
      selectorConfig: {
        level: 0,
        tableKey: 'outerDiameterTable',
        father: null,
        child: null,
        levelRelated: ['outerDiameter']
      },
      optionalConfig: {
        dependencyCondition: [
          {
            rootField: 'outerDiameter',
            influencesField: ['flatteningThickness'],
          }
        ]
      },
    },
    {
      label: '長度(L)',
      key: 'length',
      fieldType: 'float',
      typeof: 'number',
      validateConfig: {
        validateRule: 'int',
        validateOptions: {
          range: [1, 1000]
        }
      }
    },
    {
      label: '打扁厚度',
      key: 'flatteningThickness',
      fieldType: 'float',
      typeof: 'number',
      // validateConfig: {
      //   validateRule: 'dynamic',
      //   validateOptions: {
      //     validateRuleName: 'dynamic_1',
      //     refTable: 'outerDiameterFlatteningThicknessTable',
      //   }
      // },
      // validateConfig: {
      //   validateRule: 'float',
      //   validateOptions: {
      //     range: [0.1, 100000]
      //   }
      // },
      optionalConfig: {
        // customInputRule: {
        //   type: 'number',
        //   step: 0.1
        // },
        isDisabled: true,
        // 如果符合下面的條件，readOnly變成false
        isNotDisabledCondition: [
          {
            baseOnField: 'outerDiameter',
            checkValue: null
          }
        ]
      },
    },
  ],
};

export default Pipe;
