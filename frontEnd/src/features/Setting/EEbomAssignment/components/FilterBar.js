import React, { useState, useEffect } from 'react';
import uniq from 'lodash/uniq';
import _find from 'lodash/find';
import compact from 'lodash/compact';
import Icon from '~~elements/Icon';
import Select from '~~elements/Select';
import FilterBarPanel, { FilterBarGroup, FilterBarBox } from '~~elements/FilterBarPanel';
import { FILTER_INFO } from '../EEbomAssignmentConst';

const menu1Options = [
  { label: 'Type I', value: 'type1' },
  { label: 'PIC', value: 'pic' },
  { label: 'Proxy', value: 'proxy' },
];


const FilterBar = (props) => {
  const [menu2Options, setMenu2Options] = useState([]);
  const {
    eeBomList,
    filterInfo,
    getFilteredEEBomList,
    updateFilterInfo,
    resetFilterBar
  } = props;

  const filterItem = filterInfo[FILTER_INFO.FILTER_ITEM];
  const filterValue = filterInfo[FILTER_INFO.FILTER_VALUE];

  useEffect(() => {
    return () => resetFilterBar();
  }, []);

  // 當選擇Menu1時
  function onMenu1Change(value) {
    const { value: val } = value;
    updateFilterInfo(FILTER_INFO.FILTER_ITEM, val);
    // reset Menu2欄位
    updateFilterInfo(FILTER_INFO.FILTER_VALUE, '');
    setMenu2Options([]);
    //  取得Menu2的下拉清單
    let filterdData = compact(uniq(eeBomList.map(item => item[val])));
    const options = filterdData.map(data => {
      return { label: data, value: data };
    });
    setMenu2Options(options);
  }

  // 當選擇Menu2時
  function onMenu2Change(value) {
    const { value: val } = value;
    updateFilterInfo(FILTER_INFO.FILTER_VALUE, val);
  }

  // 按下搜尋按鈕時
  function handleFilter() {
    getFilteredEEBomList();
  }

  function handleReset() {
    resetFilterBar();
  }

  return (
    <FilterBarPanel
      width="50%"
      resetDisabled={!filterItem}
      onReset={handleReset}
      filterDisabled={!(filterItem && filterValue)}
      onFilter={handleFilter}
    >
      <FilterBarGroup icon={<Icon icon="IcoFilterBarFilter" />}>
        <FilterBarBox>
          <Select
            placeholder="ITEM"
            value={_find(menu1Options, (o) => o.value === filterItem)}
            options={menu1Options}
            onChange={onMenu1Change}
            target="box"
            border={false}
          />
        </FilterBarBox>
        <FilterBarBox>
          <Select
            placeholder="BY ITEM"
            value={{ label: filterValue, value: filterValue }}
            options={menu2Options}
            onChange={onMenu2Change}
            disabled={!filterItem}
            target="box"
            border={false}
          />
        </FilterBarBox>
      </FilterBarGroup>
    </FilterBarPanel>
  );
};

export default FilterBar;
