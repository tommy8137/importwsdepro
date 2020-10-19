import CommonUtils from '~~utils/CommonUtils';
import reducer from '../PanelReducer';
import { actionPrefix } from '../PanelActions';

describe('測試GET_TYPES情境', () => {
  beforeEach(() => {
  });

  it('當selectedType1List是空的時候，就要預設給第一個選項', () => {
    /* ********** PREPARE ********* */
    let typeList = [
      { type1: 'EMC', type2: 'EMI Spring' },
      { type1: 'Housing', type2: 'Aluminum' },
      { type1: 'Housing', type2: 'Metal' },
      { type1: 'Housing', type2: 'Plastic' },
      { type1: 'MOSFET', type2: 'Small Signal' },
    ];
    let initialState = {
      isFirstTime: true,
      typeList: [],
      filterTypeList: [],
      selectedType1List: [],
      selectedType2List: [],
      type1OptionsList: [],
      type2OptionsList: [],
    };
    /* ********** PREPARE END ********* */
    const data = reducer(initialState, {
      type: [CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_TYPES').BASE],
      typeList
    });

    expect(data.typeList).toMatchObject(typeList);
    expect(data.filterTypeList).toMatchObject(typeList);
    // 當selectedType1List是空的時候，就要預設給第一個選項
    expect(data.selectedType1List).toMatchObject([{ label: 'EMC', value: 'EMC' }]);
    // type1的選項
    expect(data.type1OptionsList).toMatchObject([
      { label: 'EMC', value: 'EMC' },
      { label: 'Housing', value: 'Housing' },
      { label: 'MOSFET', value: 'MOSFET' }
    ]);
    // type2的選項會根據type1調整
    expect(data.type2OptionsList).toMatchObject([{ label: 'EMI Spring', value: 'EMI Spring' }]);
    // 已經選取的type2
    expect(data.selectedType2List).toMatchObject([]);
  });

  it('當selectedType1List有選項，就不需要預設給第一個選項', () => {
    /* ********** PREPARE ********* */
    let typeList = [
      { type1: 'EMC', type2: 'EMI Spring' },
      { type1: 'Housing', type2: 'Aluminum' },
      { type1: 'Housing', type2: 'Metal' },
      { type1: 'Housing', type2: 'Plastic' },
      { type1: 'MOSFET', type2: 'Small Signal' },
    ];
    let initialState = {
      isFirstTime: true,
      typeList: [],
      filterTypeList: [],
      selectedType1List: [{ label: 'EMC', value: 'EMC' }],
      selectedType2List: [],
      type1OptionsList: [],
      type2OptionsList: [],
    };
    /* ********** PREPARE END ********* */
    const data = reducer(initialState, {
      type: [CommonUtils.getTemplateActionTypes(actionPrefix, 'GET_TYPES').BASE],
      typeList
    });
    console.log('data', data);
    expect(data.typeList).toMatchObject(typeList);
    expect(data.filterTypeList).toMatchObject(typeList);
    // // 當selectedType1List是空的時候，就要預設給第一個選項
    expect(data.selectedType1List).toMatchObject(initialState.selectedType1List);
    // // type1的選項
    expect(data.type1OptionsList).toMatchObject([
      { label: 'EMC', value: 'EMC' },
      { label: 'Housing', value: 'Housing' },
      { label: 'MOSFET', value: 'MOSFET' }
    ]);
    // // type2的選項會根據type1調整
    expect(data.type2OptionsList).toMatchObject([
      { label: 'EMI Spring', value: 'EMI Spring' },
    ]);
    // // 已經選取的type2
    expect(data.selectedType2List).toMatchObject([]);
  });
});

