import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import * as R from 'ramda';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import TableUtils from '~~features/Database/utils/TableUtils';
import AddProductTypeModal from './AddProductTypeModal';
import columns from './ColumnSetting';


const initialSortInfo = { dataIndex: '', sortOrder: 'ascend', };
const initialFilterInfo = { dataIndex: 'type_name', keyword: '', };

function ProductTypeList(props) {
  const {
    // state
    productTypeList,
    // actions
    setProductTypeAddModal } = props;
  const [editMode, setEditMode] = useState(false);
  const [tableData, setTableData] = useState('');
  const [oriTableData, setOriTableData] = useState('');
  // 暫存的keyword, 按下搜尋之後才會更新到filter
  const [keyword, setKeyword] = useState('');
  // filter sort存在state
  const [sortInfo, setSortInfo] = useState(initialSortInfo);
  const [filterInfo, setFilterInfo] = useState(initialFilterInfo);
  // 從網址的回來的參數
  const querys = new URLSearchParams(props.location.search);
  const params = {
    paramsKeyword: querys.get('keyword') || ''
  };
  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    props.getProductTypeList();
    return () => { };
  }, []);


  // 當網址的keyword改變時
  useEffect(() => {
    const { paramsKeyword = '' } = params;
    if (paramsKeyword.length) {
      setKeyword(paramsKeyword);
      setFilterInfo({ ...filterInfo, keyword: paramsKeyword });
    } else {
      setKeyword('');
      setFilterInfo(initialFilterInfo);
    }
    return () => { };
  }, [JSON.stringify(params)]);


  // 統一處理filter/sort： 把 productTypeList 轉成 tableData
  useEffect(() => {
    const newTableData = TableUtils.getFiltedTableData(productTypeList, sortInfo, filterInfo);
    setTableData(newTableData);

    return () => { };
  }, [
    editMode,
    JSON.stringify(productTypeList),
    JSON.stringify(sortInfo),
    JSON.stringify(filterInfo),
  ]);

  /**
   * handle on click filter search btn
   */
  function handleOnSearch() {
    setFilterInfo({
      ...filterInfo,
      keyword
    });
  }
  /**
   * handle on keyword input onChange
   */
  function handleOnInputChange(value) {
    setKeyword(value);
  }


  /**
   * 當按下filter的reset時
   */
  function handleOnReset() {
    setKeyword('');
    setFilterInfo(initialFilterInfo);
  }

  /**
   * 當sorter/filter改變時會進來這裡
   * @param {*} pagination 頁碼
   * @param {*} filters filter info
   * @param {*} sorter sortInfo
   */
  function handleSorterChange(pagination, filters, sorter) {
    const { columnKey, order } = sorter;
    const { dataIndex } = sortInfo;
    // 沒有指定排序(同一個欄位連續按三下)，使用最後一次排序的欄位和'ascend'排序的方法
    if (sorter.columnKey) {
      setSortInfo({
        dataIndex: columnKey,
        sortOrder: order,
      });
    } else {
      setSortInfo({
        dataIndex,
        sortOrder: 'ascend',
      });
    }
  }


  /**
   * 當點擊取消時
   */
  function handleOnClickCancel() {
    // setTableData(oriTableData);
    setEditMode(false);
  }

  /**
   * 當點擊save時
   */
  function handleOnClickSave() {
    setEditMode(false);
    const data = R.difference(oriTableData, tableData);
    props.putProductTypeList({ productTypeList: data });
  }

  /**
   * TODO: 新增product type
   */
  function handleOnClickAdd() {
    console.log('add new item');
    setProductTypeAddModal(true);
  }

  /**
   * 點擊編輯模式的icon
   */
  function handleOnClickEdit() {
    // 先存一份到目前版本的tableData
    setOriTableData(tableData);
    setEditMode(true);
  }

  /**
   * @param {*} value input 傳回來的 e.target.value
   * @param {*} record  整條row的資訊
   * @param {*} keyName 要修改的key名稱
   */
  function handleOnEditItem(value, record, keyName) {
    const newTableData = oriTableData.map(item => {
      if (item.id === record.id) {
        return {
          ...item,
          [keyName]: value
        };
      }
      return item;
    });
    setOriTableData(newTableData);
  }

  // 需要丟給ColumnSetting的props
  const extendsPorps = {
    ...props,
    editMode,
    sortInfo,
    filterInfo,
    handleOnEditItem
  };
  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">Product Type</div>
        </div>
        <div className="content-row">
          <SearchBar
            width="25rem"
            placeholder="Enter Product Type"
            onInputChange={handleOnInputChange}
            value={keyword}
            onSearch={handleOnSearch}
            onReset={handleOnReset}
            disabled={editMode}
          />
          {
            editMode ?
              <InlineBtns>
                <Button
                  color="black"
                  border={false}
                  round
                  onClick={handleOnClickCancel}
                >Cancel
                </Button>
                <Button
                  color="green"
                  border={false}
                  round
                  onClick={handleOnClickSave}
                >Save
                </Button>
              </InlineBtns> :
              <InlineBtns>
                {/* <Icon
                  icon={IconName.BtnAddGroup}
                  size="2rem"
                  onClick={handleOnClickAdd}
                  disabled={true}
                /> */}
                <Icon
                  icon={IconName.BtnEditGroup}
                  size="2rem"
                  onClick={handleOnClickEdit}
                />
              </InlineBtns>
          }
        </div>
        {/* table */}
        <Table
          onChange={handleSorterChange}
          headerColor="blue"
          dataSource={editMode ? oriTableData : tableData}
          columns={columns(extendsPorps)}
          pagination={false}
          rowKey={record => record.id}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => () => { },
            };
          }}
        />
        {/* 新增prodcut type 的 modal */}
        <AddProductTypeModal />
      </div>
    </InnerContainer>
  );
}

ProductTypeList.defaultProps = {
  productTypeList: []
};

const mapStateToProps = (state) => {
  return {
    productTypeList: state.dataBase.productType.productTypeList
  };
};

const mapDispatchToProps = {
  putProductTypeList: DatabaseActions.putProductTypeList,
  getProductTypeList: DatabaseActions.getProductTypeList,
  setProductTypeAddModal: DatabaseActions.setProductTypeAddModal,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(ProductTypeList);
