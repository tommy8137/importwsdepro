import { useEffect } from 'react';
import _get from 'lodash/get';
import CommonUtils from '~~utils/CommonUtils';
import { BOM_MANAGMENT_SORTER } from '~~features/BomManagement/BomManagementConst';


const useSearch = (props) => {
  const {
    table = 'ME',
    location,
    pageSize,
    // actions
    updateSortInfo = () => { },
    getBomList = () => { },
    updatePageInfo = () => { },
    updateSearchKeyword = () => { },
    updateFilterType = () => { },
    updateFilterValue = () => { },
    toggleShowArchive = () => { },
  } = props;


  const searchStr = _get(location, 'search', '');
  const DEFAULT_SORTER = BOM_MANAGMENT_SORTER[table] || [];
  const urlParams = Array.from(new URLSearchParams(searchStr)).reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});

  const defaultSearchParams = {
    orderBy: CommonUtils.genOrderByFormat(DEFAULT_SORTER),
    searchValue: '',
    filterType: '',
    filterValue: '',
    pages: 1,
    disable: false,
  };

  useEffect(() => {
    return () => {
      props.resetAllData();
    };
  }, []);

  useEffect(() => {
    // console.log('urlParams: %o', urlParams);
    // 一開始進來的時候，先用網址上面的參數
    getTableData(urlParams);
  }, [table]);

  function getTableData(obj) {
    const {
      filterType: column = '',
      filterValue: keyword = '',
      searchValue: project = '',
      pages: currentPage = 1,
      orderBy: newOrderBy,
      disable = false,
    } = obj;

    updatePageInfo(Number(currentPage), props.pageSize);
    updateSearchKeyword(project);
    updateFilterType(column);
    updateFilterValue(keyword);
    toggleShowArchive(disable);

    const bomListParams = {
      role: table,
      orderBy: newOrderBy,
      column,
      keyword,
      project,
      pages: currentPage,
      items: pageSize,
      disable,
    };
    getBomList(bomListParams);
  }

  /**
   * 傳json 進來之後會把新的key加到search後面
   * @param {Object} obj 需要加在後面的search
   */
  function pushSearchParams(searchData) {
    const searchParams = Object.keys(searchData).reduce((prev, curr) => {
      if (searchData[curr]) { prev.set(curr, searchData[curr]); }
      return prev;
    }, new URLSearchParams());

    props.history.push({
      search: `?${searchParams.toString()}`
    });
  }

  /**
   * 當sorter改變時
   * @param {Object} sorter table會回傳sorter的array進來
   */
  function handleSorterChange(sorter = []) {
    const paramsData = {
      ...urlParams,
      orderBy: CommonUtils.genOrderByFormat(sorter) || '',
    };
    updateSortInfo(sorter);
    pushSearchParams(paramsData);
    getTableData(paramsData);
  }

  /**
   * 當按下搜尋按鈕時, 可以丟進一個新的array取代原本的search
   * @param {Object} searchData 可以丟進去一個新的object來取代目前的url
   */
  function handleOnFilter(searchData = {}) {
    const paramsData = { ...urlParams, ...searchData, pages: 1 };
    pushSearchParams(paramsData);
    getTableData(paramsData);
  }

  /**
   * 改變頁碼時
   * @param {Number} currentPage currentPage
   */
  const handlePageChange = (currentPage) => {
    const paramsData = {
      ...urlParams,
      pages: currentPage
    };
    pushSearchParams(paramsData);
    getTableData(paramsData);
  };

  /**
   * 改變是否顯示封存
   * @param {Number} isShowArchive isShowArchive
   */
  const handleToggleArchive = ({ target: { checked: isShowArchive } }) => {
    // 切換封存時把判斷條件清空
    const paramsData = {
      ...defaultSearchParams,
      disable: isShowArchive,
    };
    toggleShowArchive(isShowArchive);
    pushSearchParams(paramsData);
    getTableData(paramsData);
  };


  /**
   * 按下reset時, 把所有的url params清空
   * @param {Number} currentPage currentPage
   */
  const handleReset = () => {
    pushSearchParams({});
    getTableData(defaultSearchParams);
  };

  return {
    handleOnFilter,
    handleSorterChange,
    handlePageChange,
    handleReset,
    handleToggleArchive,
    pushSearchParams,
    getBomList
  };
};

export default useSearch;
