import React, { useState, useEffect } from 'react';
import Icon, { IconName } from '~~elements/Icon';
import DropdownInput from '~~elements/DropdownInput';
import FilterBarPanel, { FilterBarGroup } from '~~elements/FilterBarPanel';


const ByReference = (props) => {
  const {
    value,
    handleValueChange,
    handleSearchPcbSpec,
    resetAllData,
  } = props;

  // 輸入Input時
  function handleOnChange(val) {
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
      <FilterBarGroup icon={<Icon icon="IcoFilterBarSearch" />}>
        <DropdownInput
          title="Wistron P/N"
          onChange={handleOnChange}
          value={value}
        />
      </FilterBarGroup>
    </FilterBarPanel>
  );
};

export default ByReference;
