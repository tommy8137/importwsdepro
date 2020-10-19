import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Collapse } from 'reactstrap';
import _get from 'lodash/get';
import Icon, { IconName } from '~~elements/Icon';
import Button from '~~elements/Button';
import Table from '~~elements/Table';
import { InlineBtns, InnerContainer } from '~~features/Database/DatabaseStyles';
import SearchBar from '~~features/Database/components/SearchBar';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as MetalCleanSheetActions from '~~features/Database/ME/MetalCleanSheet/MetalCleanSheetActions';
import Select, { TARGET } from '~~elements/Select';
import useCSDB from '~~features/Database/components/useCSDB';
import ColumnSetting from './ColumnSetting';


const PaintAndTotalLaborCost = (props) => {
  const {
    location,
    // props
    list,
    date,
    hourList,
    productTypeList,
    // state
    selectedProductType,
    // action
    getPaintManPowerPriceList,
    putPaintManPowerPriceList,
    getPaintManPowerProductTypeList,
    setPaintManPowerSelectedProductType,
    setProductType,
  } = props;

  const [productTypeOptions, setProductTypeOptions] = useState([]);
  const [isOpenInfo, setOpenInfo] = useState(false);


  // 勾起來的list
  const [showArchive, setShowArchive] = useState(false);

  const extendsCSDBPorps = {
    location,
    setProductType,
    mainTable: list,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'name', keyword: '', },
  };

  const csdb = useCSDB(extendsCSDBPorps);


  // 一開始進來先拿到product type list
  useEffect(() => {
    getPaintManPowerProductTypeList();
  }, []);

  // 先拿到product type list, 把selectedProductType預設為列表的第一個
  useEffect(() => {
    const newProductTypeOptions = productTypeList.map(obj => ({ label: obj.type_name, value: obj.id }));
    const firstOption = _get(newProductTypeOptions, '0', false);
    setProductTypeOptions(newProductTypeOptions);
    if (!selectedProductType.value && firstOption) {
      setPaintManPowerSelectedProductType(firstOption);
    }
  }, [JSON.stringify(productTypeList)]);

  // 當productTypeId改變時, 取得PaintManPowerPrice list
  useEffect(() => {
    const { value: productTypeId } = selectedProductType;
    if (productTypeId) {
      getPaintManPowerPriceList(productTypeId);
    }
  }, [selectedProductType.value]);

  // 需要丟給ColumnSetting的props
  const extendsPorps = {
    ...props,
    date,
    // 工時資訊
    hourList,
    checkboxColumn: csdb.checkboxColumn,
    isEditMode: csdb.isEditMode,
    handleOnEditItem: csdb.handleOnEditItem,
    isTableEmpty: csdb.mainTableList.length === 0,
    idColumn: csdb.idColumn
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
    const productTypeId = _get(selectedProductType, 'value', false);
    const differenceList = _get(csdb, 'differenceList', []);
    if (productTypeId && differenceList.length) {
      const data = {
        nextId: date.nextId,
        productTypeId,
        paintManPowerPriceList: differenceList.map(obj =>
          ({
            id: obj.id,
            next: obj.next
          })
        )
      };
      putPaintManPowerPriceList(data);
    }
    csdb.setEditMode(false);
  }

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">
            噴漆線人力及總人工費用表
            <div className="description">Unit: USD</div>
          </div>
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
            <p>View By Product Type</p>
            <div className="select-container">
              <Select
                options={productTypeOptions}
                value={selectedProductType}
                target={TARGET.BOX}
                onChange={setPaintManPowerSelectedProductType}
                disabled={csdb.isEditMode}
              />
            </div>

            {/* 頁面資訊 */}
            <div className="info-container">
              <Icon icon="BtnInstruction" onClick={e => setOpenInfo(!isOpenInfo)} />
              <Collapse isOpen={isOpenInfo} className="info">
                <p><strong>噴塗人力單價及工時</strong></p>
                {date.last && <p>{date.last} USD/min: {_get(hourList, 'last.price', '-')} 工時: {_get(hourList, 'last.manHour', '-')}</p>}
                <p>{date.current} USD/min: {_get(hourList, 'current.price', '-')} 工時: {_get(hourList, 'current.manHour', '-')}</p>
                {date.next && <p>{date.next} USD/min: {_get(hourList, 'next.price', '-')} 工時: {_get(hourList, 'next.manHour', '-')}</p>}
              </Collapse>
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
    date: state.metalCleanSheet.paintManPowerPrice.date,
    list: state.metalCleanSheet.paintManPowerPrice.list,
    hourList: state.metalCleanSheet.paintManPowerPrice.hourList,
    productTypeList: state.metalCleanSheet.paintManPowerPrice.productTypeList,
    selectedProductType: state.metalCleanSheet.paintManPowerPrice.selectedProductType,
  };
};

const mapDispatchToProps = {
  setPaintManPowerSelectedProductType: MetalCleanSheetActions.setPaintManPowerSelectedProductType,
  getPaintManPowerProductTypeList: MetalCleanSheetActions.getPaintManPowerProductTypeList,
  getPaintManPowerPriceList: MetalCleanSheetActions.getPaintManPowerPriceList,
  putPaintManPowerPriceList: MetalCleanSheetActions.putPaintManPowerPriceList,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PaintAndTotalLaborCost);

