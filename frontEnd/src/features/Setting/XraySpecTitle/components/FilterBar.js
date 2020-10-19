import React, { useEffect } from 'react';
import Icon from '~~elements/Icon';
import Select from '~~elements/Select';
import FilterBarPanel, { FilterBarGroup, FilterBarBox } from '~~elements/FilterBarPanel';
import { FILTER_INFO, LOADING_STATUS } from '../XraySpecTitleConst';

const FilterBar = (props) => {
  const {
    filterInfo,
    getSpecTitleList,
    getProductTypeOptions,
    getTypeIOptions,
    getTypeIIOptions,
    loadingStatus,
    updateLoadingStatus,
    updateFilterInfo,
    resetFilterBar
  } = props;

  const typeI = filterInfo[FILTER_INFO.TYPE_I];
  const typeIOptions = filterInfo[FILTER_INFO.TYPE_I_OPTIONS];
  const typeII = filterInfo[FILTER_INFO.TYPE_II];
  const typeIIOptions = filterInfo[FILTER_INFO.TYPE_II_OPTIONS];
  const productType = filterInfo[FILTER_INFO.PRODUCT_TYPE];
  const productTypeOptions = filterInfo[FILTER_INFO.PRODUCT_TYPE_OPTIONS];


  useEffect(() => {
    getTypeIOptions();
    updateLoadingStatus(LOADING_STATUS.TYPE_I, true);

    return () => resetFilterBar();
  }, []);

  // 當選擇Type I時
  function onMenu1Change(value) {
    const { value: val } = value;
    updateFilterInfo(FILTER_INFO.TYPE_I, val);
    //  取得Type II的下拉清單
    const data = {
      type1: encodeURIComponent(val),
    };
    getTypeIIOptions(data);
    updateLoadingStatus(LOADING_STATUS.TYPE_II, true);
  }

  // 當選擇Type II時
  function onMenu2Change(value) {
    const { value: val } = value;
    updateFilterInfo(FILTER_INFO.TYPE_II, val);
    //  取得Product Type的下拉清單
    const data = {
      type1: encodeURIComponent(typeI),
      type2: encodeURIComponent(val),
    };
    getProductTypeOptions(data);
    updateLoadingStatus(LOADING_STATUS.PRODUCT_TYPE, true);
  }

  // 當選擇Product Type時
  function onMenu3Change(value) {
    const { value: val } = value;
    updateFilterInfo(FILTER_INFO.PRODUCT_TYPE, val);
  }

  // 按下搜尋按鈕時
  function handleSearch() {
    const data = {
      spec1: productType,
      type1: typeI,
      type2: typeII
    };
    getSpecTitleList(data);
  }

  function handleReset() {
    resetFilterBar();
  }

  return (
    <FilterBarPanel
      width="60%"
      resetDisabled={!typeI}
      onReset={handleReset}
      filterDisabled={!(productType)}
      onFilter={handleSearch}
    >
      <FilterBarGroup icon={<Icon icon="IcoFilterBarFilter" />}>
        <FilterBarBox isLoading={loadingStatus[LOADING_STATUS.TYPE_I]}>
          <Select
            placeholder="Type I"
            value={{ label: typeI, value: typeI }}
            options={typeIOptions}
            onChange={onMenu1Change}
            target="box"
            border={false}
          />
        </FilterBarBox>
        <FilterBarBox isLoading={loadingStatus[LOADING_STATUS.TYPE_II]}>
          <Select
            placeholder="Type II"
            value={{ label: typeII, value: typeII }}
            options={typeIIOptions}
            onChange={onMenu2Change}
            disabled={!typeI}
            target="box"
            border={false}
          />
        </FilterBarBox>
        <FilterBarBox isLoading={loadingStatus[LOADING_STATUS.PRODUCT_TYPE]}>
          <Select
            placeholder="產品別"
            value={{ label: productType, value: productType }}
            options={productTypeOptions}
            onChange={onMenu3Change}
            disabled={!typeII}
            target="box"
            border={false}
          />
        </FilterBarBox>
      </FilterBarGroup>
    </FilterBarPanel>
  );
};

export default FilterBar;
