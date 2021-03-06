import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _find from 'lodash/find';
import { InnerContainer } from '~~features/Database/DatabaseStyles';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as CableFfcCleanSheetActions from '~~features/Database/ME/CableFfcCleanSheet/CableFfcCleanSheetRedux';
import useCSDB from '~~features/Database/components/useCSDB';
import Columns from './ColumnSetting';
import SideTable from './SideTable';

const Parameters = (props) => {
  const {
    location,
    activeProductType,
    cableffcParameterList,
    date,
    setProductType,
    getCableFfcParameter,
    putCableFfcParameter,
  } = props;
  const [subItems, setSubItems] = useState([]);

  useEffect(() => {
    if (activeProductType) {
      getCableFfcParameter();
    }
  }, [JSON.stringify(activeProductType)]);

  const LeftExtendsCSDBPorps = {
    mainTable: cableffcParameterList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'type', keyword: '' },
    location,
    setProductType,
  };

  const RightExtendsCSDBPorps = {
    mainTable: subItems,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'item', keyword: '' }
  };
  const leftCsdb = useCSDB(LeftExtendsCSDBPorps);
  const rightCsdb = useCSDB(RightExtendsCSDBPorps);

  const leftColumnsProps = {
    ...leftCsdb
  };

  const rightColumnsProps = {
    date,
    ...rightCsdb
  };

  const leftColumns = Columns.left(leftColumnsProps);
  const rightColumns = Columns.right(rightColumnsProps);

  /**
   * 取得新的列表或是切換選擇的id, 會重新filter右邊的talbe
   */
  useEffect(() => {
    const selectedItem = _find(cableffcParameterList, obj => obj.id === leftCsdb.selectedRowId);
    const newSubItems = selectedItem ? selectedItem.items : [];
    setSubItems(newSubItems);
  }, [JSON.stringify(cableffcParameterList), leftCsdb.selectedRowId]);


  // 如果左邊選了別的rowId, 就把右邊的editMode關掉, 並清空checkbox
  useEffect(() => {
    rightCsdb.setCheckedList([]);
    rightCsdb.setEditMode(false);
  }, [leftCsdb.selectedRowId]);

  function handleRightSave(diffList) {
    const data = {
      nextId: date.nextId,
      items: diffList.map(item => ({ id: item.id,  next: item.next }))
    };
    putCableFfcParameter(data);
  }

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">FFC Parameters</div>
        </div>
        {/* 左邊 */}
        <div className="multi-table-row">
          <div className="multi-table-col">
            <SideTable
              columns={leftColumns}
              csdb={leftCsdb}
              placeholder="Enter Type Name"
            />
          </div>
          {/* 右邊 */}
          <div className="multi-table-col">
            <SideTable
              showEdit
              date={date}
              onSave={handleRightSave}
              columns={rightColumns}
              csdb={rightCsdb}
              placeholder="Enter Item Name"
            />
          </div>
        </div>
      </div>

    </InnerContainer>
  );
};


const mapStateToProps = (state) => {
  return {
    cableffcParameterList: state.cableffcCleanSheet.cableffcParameter.cableffcParameter,
    date: state.cableffcCleanSheet.cableffcParameter.date,
    activeProductType: state.dataBase.common.activeProductType,
  };
};

const mapDispatchToProps = {
  getCableFfcParameter: CableFfcCleanSheetActions.getCableFfcParameter,
  putCableFfcParameter: CableFfcCleanSheetActions.putCableFfcParameter,
  setProductType: DatabaseActions.setProductType,
};


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Parameters);
