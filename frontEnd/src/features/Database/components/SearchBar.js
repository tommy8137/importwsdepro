import React from 'react';
import Icon, { IconName } from '~~elements/Icon';
import FilterBarPanel, { FilterBarGroup, FilterBarBox } from '~~elements/FilterBarPanel';
import Field from '~~elements/Field';


const SearchBar = (props) => {
  const {
    width,
    placeholder,
    value,
    onInputChange,
    onSearch,
    onReset,
    disabled
  } = props;


  /**
   * 輸入關鍵字時
   */
  function handleInputChange(e) {
    const { target: { value: val } } = e;
    onInputChange(val);
  }

  /**
   * 按下Func Btn時
   */
  function handleSearch() {
    onSearch();
  }

  /**
   * 按下Reset Btn時
   */
  function handleReset() {
    onReset();
  }

  function checkingDisabled() {
    if (disabled) {
      return true;
    } else if (!disabled && !value) {
      return true;
    }
    return false;
  }

  function handleKeyPress(e) {
    if (e.key.toUpperCase() === 'ENTER' && !checkingDisabled()) {
      handleSearch();
    }
  }

  return (
    <FilterBarPanel
      width={width}
      onReset={handleReset}
      onFilter={handleSearch}
      filterDisabled={checkingDisabled()}
      resetDisabled={disabled}
    >
      <FilterBarGroup icon={<Icon icon={IconName.IcoFilterBarSearch} />}>
        <FilterBarBox>
          <Field.Input
            styledType="filterBar"
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
        </FilterBarBox>
      </FilterBarGroup>
    </FilterBarPanel>
  );
};

SearchBar.defaultProps = {
  /* search bar的長度 */
  width: '30%',
  value: '',
  placeholder: '',
  onInputChange: () => {},
  onSearch: () => {},
  onReset: () => {},
  disabled: false
};

export default SearchBar;
