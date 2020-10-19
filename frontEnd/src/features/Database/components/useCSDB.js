import React, { useState, useEffect } from 'react';
import TableUtils from '~~features/Database/utils/TableUtils';
import * as R from 'ramda';
import _get from 'lodash/get';
import _head from 'lodash/head';
import _find from 'lodash/find';
import Icon, { IconName } from '~~elements/Icon';
import Checkbox from '~~elements/Checkbox';


function getIsCheckable(record) {
  const checkKeyNames = ['materialSpec', 'material', 'item'];
  const hasOtherFillMe = checkKeyNames.some(k => {
    const val = _get(record, [k]);
    if (val && val === 'Other_Fill_ME_Remark') {
      return true;
    }
    return false;
  });
  return !hasOtherFillMe;
}

export default function useCSDB(props) {
  const {
    location,
    //  Table -----------------------------------------------------------------------------------------------*/
    mainTable = [],
    initialSortInfo = { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo = { keyword: '', dataIndex: '' },
    initialDropdownInfo = { dataIndex: '' },
    // 更新table list的
    mainTableUpdater,
    // Schedule  -----------------------------------------------------------------------------------------------*/
    scheduleUpdater,
    // Checkbox -----------------------------------------------------------------------------------------------*/
    // 要用哪個key來當checkbox的 unique key
    checkBoxDataIndex = 'id',
    selectedDataIndex = 'id',
    // 存下product type (NB/DT/AOI)
    setProductType = () => { },
    onUnArchive,
  } = props;

  /* 基本的state -----------------------------------------------------------------------------------------------*/
  /* Dropdown -----------------------------------------------------------------------------------------------*/
  const [dropdownValue, setDropdownValue] = useState([]);
  const [dropdownlist, setDropdownlist] = useState([]);
  const [dropdownInfo, setDropdownInfo] = useState(initialDropdownInfo);
  /* Table  -----------------------------------------------------------------------------------------------*/
  const [isEditMode, setEditMode] = useState(false);
  const [mainTableList, setMainTableList] = useState(mainTable);
  const [editModeList, setEditModeList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [sortInfo, setSortInfo] = useState(initialSortInfo);
  const [filterInfo, setFilterInfo] = useState(initialFilterInfo);

  /* Schedule Modal的State ------------------------------------------------------------------------------------*/
  const [openSchedule, setOpenSchedule] = useState(false);
  /* Add Modal的State -----------------------------------------------------------------------------------------*/
  const [isAddModalOpen, setAddModal] = useState(false);
  /* Archive 的State ------------------------------------------------------------------------------------------*/
  const [showArchive, setShowArchive] = useState(false);
  /* Checkbox & Selected ------------------------------------------------------------------------------------------*/
  const [checkedList, setCheckedList] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState('');
  /* Router Menu 的State ------------------------------------------------------------------------------------------*/
  const [isMenuOpen, setMenu] = useState(false);

  const isEmpty = mainTableList.length <= 0;


  useEffect(() => {
    setSortInfo(initialSortInfo);
    setFilterInfo(initialFilterInfo);
    setDropdownInfo(initialDropdownInfo);
  }, [
    JSON.stringify(initialFilterInfo),
    JSON.stringify(initialSortInfo),
    JSON.stringify(initialDropdownInfo)
  ]);

  // 為了在重整頁面的時候保存product type
  useEffect(() => {
    const searchStr = _get(location, 'search', '');
    const urlParams = Array.from(new URLSearchParams(searchStr)).reduce((prev, [key, value]) => ({ ...prev, [key]: value }), {});
    setProductType(urlParams);
  }, [JSON.stringify(location)]);

  useEffect(() => {
    setSelectedRowId(props.selectedRowId);
  }, [props.selectedRowId]);


  useEffect(() => {
    const dropdownArray = TableUtils.getDropdownArray(mainTable, dropdownInfo);
    const newDropdownList = dropdownArray.map(key => ({ label: key, value: key }));
    // 預設全選，所以把新的list都丟進去
    setDropdownValue(newDropdownList);
    // dropdown的options
    setDropdownlist(newDropdownList);
  }, [
    JSON.stringify(mainTable),
    JSON.stringify(dropdownInfo)
  ]);

  // 當 mainTable 改變時，利用filter跟sorter產生新的table
  useEffect(() => {
    const newTableData = TableUtils.getFiltedTableData(mainTable, sortInfo, filterInfo, showArchive);
    setMainTableList(newTableData);
  }, [
    isEditMode,
    showArchive,
    JSON.stringify(sortInfo),
    JSON.stringify(filterInfo),
    JSON.stringify(mainTable)
  ]);

  useEffect(() => {
    // mainTableList 改變時， checklist 也要一起同步更新
    if (checkedList.length > 0) {
      // 現在table裡的所有ID
      const existIds = mainTableList.reduce((prev, curr) => {
        const keyValue = _get(curr, checkBoxDataIndex, false);
        if (keyValue) { return prev.concat(keyValue); }
        return prev;
      }, []);

      // 從已勾選的名單內，移除已經沒有在table上的ID
      const newCheckedList = checkedList.filter(id => existIds.includes(id));
      setCheckedList(newCheckedList);
    }
    // 如果user還沒選過，預設選第一筆
    const isInclude = _find(mainTableList, { [selectedDataIndex]: selectedRowId });
    if (!selectedRowId || !isInclude) {
      setSelectedRowId(_get(_head(mainTableList), selectedDataIndex, ''));
    }
  }, [
    JSON.stringify(mainTableList)
  ]);


  // mainTable 跟 editTable 差異的array
  const differenceList = R.difference(editModeList, mainTableList);

  // dropdownValue是多選, 會用在columns setting裡面
  const dropdownColumns = dropdownValue.map(({ value: keyName }) => ({
    dataIndex: keyName,
    title: keyName,
    path: keyName,
  }));


  /**
  * 把所有有改過的item，分別放在每個row裡面的[groupKey]做成一個array
   * @param {*} groupKey groups的key
   */
  function getDropdownDifference(groupKey = 'modules') {
    const config = {
      mainTable: mainTableList,
      editable: editModeList,
      dropdownInfo,
      groupKey
    };
    const diffenceData = TableUtils.getDropdownDifference(config);
    return diffenceData;
  }


  /**
  * 把所有有改過的item通通放在一個aray裏
  */
  function getSeparateDropdownDifference() {
    const config = {
      mainTable: mainTableList,
      editable: editModeList,
      dropdownInfo
    };
    const diffenceData = TableUtils.getSeparateDropdownDifference(config);
    return diffenceData;
  }

  // Checkbox 相關 =========================================================
  const tableList = mainTableList.filter(item => {
    const isCheckable = getIsCheckable(item);
    return isCheckable;
  });
  const isHeaderCheckedAll = tableList.every(item => checkedList.includes(_get(item, checkBoxDataIndex)));
  const isHeaderCheckedIndeterminate = checkedList.length > 0 && !isHeaderCheckedAll;
  const isHeaderChecked = checkedList.length > 0;


  /**
   * 全選所有的checkbox
   */
  function handleCheckedAll() {
    if (isHeaderCheckedAll) {
      setCheckedList([]);
    } else {
      const allCheckedList = tableList.map(item => item[checkBoxDataIndex]);
      setCheckedList(allCheckedList);
    }
  }

  /**
   * table的checkbox
   * @param {*} id row id
   */
  function handleChecked(id) {
    const findIndex = R.findIndex((value => value === id))(checkedList);
    const newArr = findIndex > -1 ? R.remove(findIndex, 1, checkedList) : checkedList.concat(id);
    setCheckedList(newArr);
  }


  // 處理解封
  function handleUnArchive(unArchiveList) {
    if (typeof onUnArchive === 'function') {
      onUnArchive(unArchiveList.map(obj => obj[checkBoxDataIndex]));
    }
  }
  // 已經被封存的個數
  const disabledCount = mainTable.filter(obj => obj.disable).length;
  // 是否顯示解除封存
  const showUnArchive = typeof onUnArchive === 'function';

  // 解封專用column
  const unArchiveColumn = {
    title: (
      (disabledCount > 0 && showUnArchive) && <Icon
        size="1rem"
        icon={IconName.IconUnArchive}
        onClick={() => handleUnArchive(tableList)}
      />
    ),
    dataIndex: checkBoxDataIndex,
    align: 'center',
    className: 'bold-border-right',
    width: '6%',
    render: (val, record) => {
      return (
        showUnArchive &&
        <Icon
          size="1rem"
          icon={IconName.IconUnArchive}
          onClick={() => handleUnArchive([record])}
        />
      );
    }
  };

  const checkboxColumn = {
    title: (
      <Checkbox
        indeterminate={isHeaderCheckedIndeterminate}
        checked={isHeaderChecked}
        onChange={handleCheckedAll}
        disabled={isEditMode || isEmpty}
      />),
    dataIndex: checkBoxDataIndex,
    align: 'center',
    className: 'bold-border-right',
    width: '6%',
    render: (val, record) => {
      const id = _get(record, checkBoxDataIndex, '');
      const isChecked = checkedList.includes(id);
      const isCheckable = getIsCheckable(record);

      if (!isCheckable) {
        return null;
      }
      return (
        <div onClick={(e) => e.stopPropagation()} onKeyUp={() => { }}>
          <Checkbox
            checked={isChecked}
            onChange={() => handleChecked(id)}
            disabled={isEditMode}
          />
        </div>
      );
    }
  };

  const selectedColumn = {
    title: '',
    dataIndex: '',
    width: '10%',
    align: 'center',
    render: (val, record) => {
      const id = _get(record, checkBoxDataIndex, ''); // FIXME: 這個可能要改成拿 selectedDataIndex
      return (selectedRowId === id && <Icon icon={IconName.IcoArrowRightBlack} size="0.6rem" />);
    }
  };

  const idColumn = {
    dataIndex: checkBoxDataIndex,
    title: 'ID',
    width: '5%',
    align: 'center',
    render: (val, record, index) => index + 1,
  };


  /**
   * 切換編輯模式， 原本在畫面上的table也會被複製一份替換成editTable
   * @param {} status editMode
   */
  function handleSetEditMode(status) {
    setEditMode(status);
    if (status) {
      setEditModeList(mainTableList);
    } else {
      setEditModeList([]);
    }
  }

  /**
   * 當antd table改變時
   * @param {} pagination 頁碼改變
   * @param {*} filters filter
   * @param {*} sorter sorter 點擊箭頭之後
   */
  function handleTableChange(pagination, filters, sorter) {
    const { columnKey, order } = sorter;
    const { dataIndex } = sortInfo;
    if (sorter.columnKey) {
      setSortInfo({
        dataIndex: columnKey,
        sortOrder: order,
      });
    } else {
      // 按第三下(沒有排序)
      setSortInfo({
        dataIndex,
        sortOrder: '',
      });
    }
  }

  function handleSave(keyNameOfList, payload = {}) {
    const data = {
      ...payload,
      [keyNameOfList]: differenceList,
    };
    mainTableUpdater(data);
    handleSetEditMode(false);
  }

  function handleOnEditItem(val, id, keyName) {
    const newList = editModeList.map(item => {
      if (_get(item, checkBoxDataIndex, false) === id) {
        const newItem = R.set(R.lensPath(keyName.split('.')), val, item);
        // console.log('newItem >>>>', newItem);
        return newItem;
      }
      return item;
    });
    // console.log('new list', newList, val, id, keyName);
    setEditModeList(newList);
  }

  /* Search Bar會用到的function START-------------------------------------------------------------*/
  function handleSearch() {
    setFilterInfo({
      ...filterInfo,
      keyword
    });
  }

  function handleResetSearchBar() {
    setMainTableList(mainTableList);
    setCheckedList([]);
    setKeyword('');
    setFilterInfo(initialFilterInfo);
  }

  /* Schedule會用到的function START-------------------------------------------------------------*/
  function handleSaveSchedule(value) {
    setOpenSchedule(false);
    scheduleUpdater(value);
  }

  /* Add Modal會用到的function START-------------------------------------------------------------*/
  function isSaveBtnInvalid(data) {
    let isInValid = true;

    // 全部都有值才可以送出
    const hasNull = Object.keys(data).some(key => data[key] === null || data[key] === '');
    if (!hasNull) {
      isInValid = false;
      return isInValid;
    }

    return isInValid;
  }

  return {
    isEditMode,
    setEditMode,
    openSchedule,
    setOpenSchedule,
    mainTable,
    mainTableList,
    setMainTableList,
    editModeList,
    setEditModeList,
    keyword,
    setKeyword,
    sortInfo,
    setSortInfo,
    showArchive,
    setShowArchive,


    filterInfo,
    setFilterInfo,
    // for put: 比對修改前後不同的list
    differenceList,

    // For Table
    handleSetEditMode,
    handleTableChange,
    handleSave,
    handleOnEditItem,

    // For search bar
    handleSearch,
    handleResetSearchBar,

    // For Schedule
    handleSaveSchedule,

    // checkbox 相關
    checkboxColumn,
    selectedColumn,
    checkedList,
    setCheckedList,

    // selected 相關
    selectedRowId,
    setSelectedRowId,

    // add modal相關
    isAddModalOpen,
    setAddModal,

    // dropdown相關
    dropdownlist,
    dropdownValue,
    setDropdownValue,
    dropdownColumns,
    // 用來moudo
    getDropdownDifference,
    getSeparateDropdownDifference,

    // Router Menu
    isMenuOpen,
    setMenu,

    // 流水號的cloumn
    idColumn,
    // 解封的 columns
    unArchiveColumn,
    // Add Modal會用到的
    isSaveBtnInvalid,
  };
}
