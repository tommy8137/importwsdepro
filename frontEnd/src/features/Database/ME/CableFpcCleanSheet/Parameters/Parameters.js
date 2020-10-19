import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _find from 'lodash/find';
import { InnerContainer } from '~~features/Database/DatabaseStyles';
import * as CableFpcCleanSheetActions from '~~features/Database/ME/CableFpcCleanSheet/CableFpcCleanSheetRedux';
import useCSDB from '~~features/Database/components/useCSDB';
import Columns from './ColumnSetting';
import SideTable from './SideTable';

const CablefpcParameter = props => {
  const { cablefpcParameterList, date, getFpcParameters, putFpcParameters } = props;
  const [subItems, setSubItems] = useState([]);

  useEffect(() => {
    getFpcParameters();
  }, []);

  const LeftExtendsCSDBPorps = {
    mainTable: cablefpcParameterList,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'type', keyword: '' },
  };

  const RightExtendsCSDBPorps = {
    mainTable: subItems,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'item', keyword: '' },
  };
  const leftCsdb = useCSDB(LeftExtendsCSDBPorps);
  const rightCsdb = useCSDB(RightExtendsCSDBPorps);

  const leftColumnsProps = {
    ...leftCsdb,
  };

  const rightColumnsProps = {
    date,
    ...rightCsdb,
  };

  const leftColumns = Columns.left(leftColumnsProps);
  const rightColumns = Columns.right(rightColumnsProps);

  /**
   * 取得新的列表或是切換選擇的id, 會重新filter右邊的talbe
   */
  useEffect(() => {
    const selectedItem = _find(cablefpcParameterList, obj => obj.id === leftCsdb.selectedRowId);
    const newSubItems = selectedItem ? selectedItem.items : [];
    setSubItems(newSubItems);
  }, [JSON.stringify(cablefpcParameterList), leftCsdb.selectedRowId]);

  // 如果左邊選了別的rowId, 就把右邊的editMode關掉, 並清空checkbox
  useEffect(() => {
    rightCsdb.setCheckedList([]);
    rightCsdb.setEditMode(false);
  }, [leftCsdb.selectedRowId]);

  function handleRightSave(diffList) {
    const data = {
      nextId: date.nextId,
      items: diffList.map(item => ({ id: item.id, next: item.next })),
    };
    putFpcParameters(data);
  }

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">FPC parameters</div>
        </div>
        {/* 左邊 */}
        <div className="multi-table-row">
          <div className="multi-table-col">
            <SideTable columns={leftColumns} csdb={leftCsdb} placeholder="Enter Type Name" />
          </div>
          {/* 右邊 */}
          <div className="multi-table-col">
            <SideTable showEdit date={date} onSave={handleRightSave} columns={rightColumns} csdb={rightCsdb} placeholder="Enter Item Name" />
          </div>
        </div>
      </div>
    </InnerContainer>
  );
};

const mapStateToProps = state => {
  return {
    cablefpcParameterList: state.cablefpcCleanSheet.cablefpcParameter.cablefpcParameter,
    date: state.cablefpcCleanSheet.cablefpcParameter.date,
  };
};

const mapDispatchToProps = {
  getFpcParameters: CableFpcCleanSheetActions.getFpcParameters,
  putFpcParameters: CableFpcCleanSheetActions.putFpcParameters,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(CablefpcParameter);
