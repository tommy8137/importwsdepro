import React from 'react';
import Icon, { IconName } from '~~elements/Icon';
import Select from '~~elements/Select';
import FilterBarPanel, { FilterBarGroup, FilterBarBox } from '~~elements/FilterBarPanel';


const ByCatergory = (props) => {
  const {
    type2Options,
    value,
    handleValueChange,
    handleSearchPcbSpec,
    resetAllData
  } = props;

  // 當選擇Type II時
  function onTypeIIChange(selected) {
    const { value: val } = selected;
    handleValueChange(val);
  }

  // 按下搜尋按鈕時
  function handleFilter() {
    handleSearchPcbSpec();
  }

  function handleReset() {
    resetAllData();
  }

  return (
    <FilterBarPanel
      width="25%"
      customClickIcon="Set SPEC"
      resetDisabled={!value}
      onReset={handleReset}
      filterDisabled={!value}
      onFilter={handleFilter}
    >
      <FilterBarGroup icon={<Icon icon={IconName.IcoFilterBarSearch} />}>
        <FilterBarBox>
          <Select
            placeholder="Type II"
            value={{ label: value, value }}
            options={type2Options}
            onChange={onTypeIIChange}
            target="box"
            border={false}
          />
        </FilterBarBox>
      </FilterBarGroup>
    </FilterBarPanel>
  );
};

export default ByCatergory;
