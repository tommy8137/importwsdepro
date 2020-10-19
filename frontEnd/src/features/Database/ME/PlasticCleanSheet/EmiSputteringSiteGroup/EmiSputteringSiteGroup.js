import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as R from 'ramda';
import _concat from 'lodash/concat';
import _uniq from 'lodash/uniq';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import Icon, { IconName } from '~~elements/Icon';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import useCSDB from '~~features/Database/components/useCSDB';
import AddModal from './AddModal';
import getcolumns from './ColumnSetting';

const EMISputteringSiteGroup = (props) => {
  const {
    location,
    // state
    list,
    dropdown,
    activeProductType,
    // action
    getEmiSputteringSite,
    updateEmiSputteringSite,
    pushNotification,
    setProductType,
  } = props;

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    if (activeProductType) {
      getEmiSputteringSite();
    }
  }, [JSON.stringify(activeProductType)]);


  // 需要丟給use CSDB的props
  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: mapSearchableData(list),
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { keyword: '', dataIndex: 'siteForSearch' },
  };
  const csdb = useCSDB(extendsCSDBPorps);
  const {
    // For table
    isEditMode,
    mainTableList,
    editModeList,
    handleTableChange,
    handleSetEditMode,
    handleOnEditItem,
    // For search bar
    keyword,
    setKeyword,
    handleSearch,
    handleResetSearchBar,
    // For checkbox
    checkboxColumn,
    // 流水號
    idColumn,
  } = csdb;

  // 需要丟給ColumnSetting的props
  const extendsColumnPorps = {
    ...props,
    isEditMode,
    handleOnEditItem,
    allSite: dropdown,
    checkboxColumn,
    idColumn,
  };

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            EMI Sputtering Site Group
          </div>
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="25rem"
              placeholder="Search..."
              value={keyword}
              onInputChange={setKeyword}
              onSearch={handleSearch}
              onReset={handleResetSearchBar}
              disabled={isEditMode}
            />
          </InlineBtns>
          {isEditMode ?
            /* 編輯狀態的Btns */
            <InlineBtns>
              <Button
                round
                color="black"
                onClick={() => handleSetEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                round
                color="green"
                onClick={handleSave}
              >
                Save
              </Button>
            </InlineBtns> :
            /* 非編輯狀態的Btns */
            <InlineBtns>
              {/* 新增 */}
              {/* <Icon
                icon={IconName.BtnAddGroup}
                size="2rem"
                onClick={() => csdb.setAddModal(true)}
                disabled
              /> */}
              {/* 修改 */}
              <Icon
                icon={IconName.BtnEditGroup}
                size="2rem"
                onClick={() => csdb.handleSetEditMode(true)}
                disabled={csdb.mainTableList.length === 0}
              />
              {/* 封存 */}
              {/* <Icon
                icon={IconName.BtnArchive}
                size="2rem"
                onClick={() => handleArchive()}
                // disabled={selectedIdList.length === 0}
                disabled={true}
              /> */}
            </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          columns={getcolumns(extendsColumnPorps)}
          dataSource={isEditMode ? editModeList : mainTableList}
          pagination={false}
          onChange={handleTableChange}
        // scroll={{ y: 500 }}
        />
      </div>

      {/* Modal  */}
      <AddModal
        isOpen={csdb.isAddModalOpen}
        setAddModal={csdb.setAddModal}
      />
    </InnerContainer>
  );

  /**
  * 當按下封存時
  */
  function handleArchive() {
    console.log('handleArchive >>>', csdb.checkedList);
  }

  /**
   * 檢查全部group有沒有重複的site (true = 沒有重複)
   */
  function validUniq() {
    const validList = editModeList.reduce((prev, curr) => _concat(prev, curr.siteList.map(({ siteId }) => siteId)), []);
    const valid = validList.length === _uniq(validList).length;

    return valid;
  }

  /**
   * 檢查是否有空的值 (true = 沒有空的group)
   */
  function validEmpty(ls) {
    const valid = ls.reduce((prev, curr) => (prev && curr.siteList.length > 0), true);

    return valid;
  }

  function handleSave() {
    const diff = R.difference(editModeList, mainTableList);
    const emiSputteringSiteGroupList = {
      emiSputteringSiteGroupList: diff.map(({ id, siteList: opts }) => ({
        id,
        siteList: opts.map(({ siteId }) => siteId),
      }))
    };
    if (!validUniq()) {
      pushNotification({
        message: '同一個Site不得在兩個Group中出現',
        level: 'error',
      });
    } else if (!validEmpty(diff)) {
      pushNotification({
        message: 'Group不可為空',
        level: 'error',
      });
    } else {
      handleSetEditMode(false);
      updateEmiSputteringSite(emiSputteringSiteGroupList);
    }
  }

  /**
   * 在原本的每一個group資料加上 siteForSearch的欄位 供搜尋功能使用
   * @param {*} data
   */
  function mapSearchableData(data) {
    const result = data.map((group) => {
      const { siteList } = group;
      const siteForSearch = siteList.map(({ siteName }) => siteName).join(', ');
      return {
        ...group,
        siteForSearch,
      };
    });

    return result;
  }
};

const mapStateToProps = (state) => {
  return {
    list: state.plasticCleanSheet.emiSputteringSite.list,
    dropdown: state.plasticCleanSheet.emiSputteringSite.dropdown,
    activeProductType: state.dataBase.common.activeProductType,
  };
};

const mapDispatchToProps = {
  getEmiSputteringSite: PlasticCleanSheetActions.getEmiSputteringSite,
  updateEmiSputteringSite: PlasticCleanSheetActions.updateEmiSputteringSite,
  pushNotification: NotificationSystemActions.pushNotification,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EMISputteringSiteGroup);
