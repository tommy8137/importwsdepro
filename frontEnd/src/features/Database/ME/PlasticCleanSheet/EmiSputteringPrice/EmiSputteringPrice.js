import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import Select, { TARGET } from '~~elements/Select';
import useCSDB from '~~features/Database/components/useCSDB';
import RouterMenu from '~~features/Database/components/RouterMenu';
import ColumnSetting from './ColumnSetting';


const PaintAndTotalLaborCost = (props) => {
  const {
    location,
    // props
    list,
    date,
    siteList = [],
    activeProductType,
    // state
    selectedSite,
    // action
    getEmiSputteringPriceList,
    putEmiSputteringPriceList,
    getEmiSputteringSiteList,
    setEmiSputteringPriceSeletedSite,
    setProductType,
  } = props;

  const [siteOptions, setSiteOptions] = useState([]);

  // 勾起來的list
  const [showArchive, setShowArchive] = useState(false);

  // 一開始進來的時候先call api取得列表
  useEffect(() => {
    if (activeProductType) {
      getEmiSputteringSiteList();
    }
  }, [JSON.stringify(activeProductType)]);


  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: list,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'name', keyword: '', },
    initialDropdownInfo: { dataIndex: 'sputteringId' }
  };

  const csdb = useCSDB(extendsCSDBPorps);


  // 先拿到product type list, 把selectedSite預設為列表的第一個
  useEffect(() => {
    const newProductTypeOptions = siteList.map(obj => ({ label: obj.siteList, value: obj.id }));
    const firstOption = _get(newProductTypeOptions, '0', false);
    setSiteOptions(newProductTypeOptions);
    if (!selectedSite.value || firstOption) {
      setEmiSputteringPriceSeletedSite(firstOption);
    }
  }, [JSON.stringify(siteList)]);

  // 當siteGroupId改變時, 取得emiSputteringPrice list
  useEffect(() => {
    const { value: siteGroupId } = selectedSite;
    if (siteGroupId) {
      getEmiSputteringPriceList(siteGroupId);
    }
  }, [selectedSite.value]);

  // 需要丟給ColumnSetting的props
  const extendsPorps = {
    ...props,
    date,
    checkboxColumn: csdb.checkboxColumn,
    isEditMode: csdb.isEditMode,
    handleOnEditItem: csdb.handleOnEditItem,
    dropdownColumns: csdb.dropdownColumns,
    idColumn: csdb.idColumn,
  };

  /**
  * 當按下封存時
  */
  function handleArchive() {
    console.log('handleArchive >>>', csdb.checkedList);
  }
  /**
   * 更新table的api
   */
  function handleSave() {
    const diffence = csdb.getSeparateDropdownDifference();
    const data = {
      nextId: date.nextId,
      emiSputteringPriceList: diffence
    };
    console.log(data);
    putEmiSputteringPriceList(data);
    csdb.setEditMode(false);
  }

  // 路徑設定
  const routerList = [
    { name: 'Emi Sputtering 清單', routerName: '/g/database/plastic/EmiSputteringList' },
    { name: 'EMI Sputtering Base 本體材質清單', routerName: '/g/database/plastic/EmiSputteringBaseList' },
    { name: 'EMI Sputtering Site Group', routerName: '/g/database/plastic/EmiSputteringSiteGroup' },
  ];

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            EMI Sputtering 價目表
          </div>
          <RouterMenu
            isMenuOpen={csdb.isMenuOpen}
            setMenu={csdb.setMenu}
            routerList={routerList}
          />
        </div>
        <div className="content-row">
          <InlineBtns>
            <SearchBar
              width="30rem"
              placeholder="Enter Item name"
              value={csdb.keyword}
              onInputChange={csdb.setKeyword}
              onSearch={csdb.handleSearch}
              onReset={csdb.handleResetSearchBar}
              disabled={csdb.isEditMode}
            />
            <p>View By Site Group:</p>
            <div className="select-container">
              <Select
                options={siteOptions}
                value={selectedSite}
                target={TARGET.BOX}
                onChange={setEmiSputteringPriceSeletedSite}
              />
            </div>
          </InlineBtns>
          {csdb.isEditMode ?
            /* 編輯狀態的Btns */
            <InlineBtns>
              <Button
                round
                color="black"
                onClick={() => csdb.handleSetEditMode(false)}
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
              {/* 修改 */}
              <Icon
                icon={IconName.BtnEditGroup}
                size="2rem"
                onClick={() => csdb.handleSetEditMode(true)}
                disabled={csdb.mainTableList.length === 0 || !date.next}
              />
            </InlineBtns>
          }
        </div>
        <Table
          headerColor="blue"
          hoverColor="blue"
          columns={ColumnSetting(extendsPorps)}
          dataSource={csdb.isEditMode ? csdb.editModeList : csdb.mainTableList}
          pagination={false}
          onChange={csdb.handleTableChange}
          scroll={{ y: 500, x: '100%' }}
        />
      </div>
    </InnerContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    date: state.plasticCleanSheet.emiSputteringPrice.date,
    list: state.plasticCleanSheet.emiSputteringPrice.list,
    siteList: state.plasticCleanSheet.emiSputteringPrice.siteList,
    selectedSite: state.plasticCleanSheet.emiSputteringPrice.selectedSite,
    activeProductType: state.dataBase.common.activeProductType,
  };
};

const mapDispatchToProps = {
  setEmiSputteringPriceSeletedSite: PlasticCleanSheetActions.setEmiSputteringPriceSeletedSite,
  getEmiSputteringSiteList: PlasticCleanSheetActions.getEmiSputteringSiteList,
  getEmiSputteringPriceList: PlasticCleanSheetActions.getEmiSputteringPriceList,
  putEmiSputteringPriceList: PlasticCleanSheetActions.putEmiSputteringPriceList,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PaintAndTotalLaborCost);

