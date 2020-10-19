import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import Icon, { IconName } from '~~elements/Icon';
import Modal from '~~elements/Modal';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import TableUtils from '~~features/Database/utils/TableUtils';
import columns from './ColumnSetting';
import AddModal from './AddModal';


const initialSortInfo = { dataIndex: '', sortOrder: 'ascend' };
const initialFilterInfo = { dataIndex: 'site_name', keyword: '' };

const SiteListComponent = (props) => {
  const {
    // state
    siteList,
    // actions
    getSiteList,
    updateSiteList,
    createSite,
  } = props;

  const [editMode, setEditMode] = useState(false);
  const [tableData, setTableData] = useState('');
  const [oriTableData, setOriTableData] = useState('');
  const [isAddModalOpen, setAddModal] = useState(false);
  // 暫存的keyword, 按下搜尋之後才會更新到filter
  const [keyword, setKeyword] = useState('');
  // filter sort存在state
  const [sortInfo, setSortInfo] = useState(initialSortInfo);
  const [filterInfo, setFilterInfo] = useState(initialFilterInfo);

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    getSiteList();
    return () => { };
  }, []);

  // 統一處理filter/sort： 把 siteList 轉成 tableData
  useEffect(() => {
    const newTableData = TableUtils.getFiltedTableData(siteList, sortInfo, filterInfo);
    setTableData(newTableData);
  }, [
    editMode,
    JSON.stringify(siteList),
    JSON.stringify(sortInfo),
    JSON.stringify(filterInfo),
  ]);
  // 需要丟給ColumnSetting的props
  const extendsPorps = {
    ...props,
    editMode,
    handleOnEditItem,
  };
  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            Site List
          </div>
        </div>
        <div className="content-row">
          <SearchBar
            width="25rem"
            placeholder="Enter Site Name"
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
                  onClick={() => handleSetEditMode(false)}
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
                {/* 新增 */}
                {/* <Icon
                  icon={IconName.BtnAddGroup}
                  size="2rem"
                  onClick={() => setAddModal(true)}
                  disabled={true}
                /> */}
                {/* 修改 */}
                <Icon
                  icon={IconName.BtnEditGroup}
                  size="2rem"
                  onClick={() => handleSetEditMode(true)}
                  disabled={tableData.length === 0}
                />
              </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          columns={columns(extendsPorps)}
          dataSource={editMode ? oriTableData : tableData}
          pagination={false}
          onChange={handleSorterChange}
          scroll={{ y: 500 }}
        />
      </div>

      {/* Add Modal  */}
      <AddModal
        isOpen={isAddModalOpen}
        setAddModal={setAddModal}
        handleAddItem={handleAddItem}
      />
    </InnerContainer>
  );

  function handleSetEditMode(status) {
    setEditMode(status);
    if (status) {
      setOriTableData(tableData);
    } else {
      setOriTableData([]);
    }
  }

  function handleAddItem(siteName, remark) {
    console.log(' handleAddModal >>> ', siteName, remark);
    const data = {
      siteName,
      remark
    };
    // createSite(data);
  }

  /**
   * handle on keyword input onChange
   */
  function handleOnInputChange(value) {
    setKeyword(value);
  }

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
   * 當點擊save時
   */
  function handleOnClickSave() {
    setEditMode(false);
    const list = R.difference(oriTableData, tableData);
    const data = {
      siteList: list,
    };
    updateSiteList(data);
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
   * 當按下filter的reset時
   */
  function handleOnReset() {
    setKeyword('');
    setFilterInfo(initialFilterInfo);
  }
};


const mapStateToProps = (state) => {
  return {
    siteList: state.dataBase.site.siteList
  };
};

const mapDispatchToProps = {
  getSiteList: DatabaseActions.getSiteList,
  updateSiteList: DatabaseActions.updateSiteList,
  createSite: DatabaseActions.createSite,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(SiteListComponent);

