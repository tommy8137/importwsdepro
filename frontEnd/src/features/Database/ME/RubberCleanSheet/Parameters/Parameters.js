import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _find from 'lodash/find';
import { InnerContainer } from '~~features/Database/DatabaseStyles';
import * as RubberCleanSheetActions from '~~features/Database/ME/RubberCleanSheet/RubberCleanSheetRedux';
import useCSDB from '~~features/Database/components/useCSDB';
import Columns from './ColumnSetting';
import SideTable from './SideTable';

const RubberParameter = props => {
  const { rubberParameterList, date, getRubberParameter, putRubberParameter } = props;
  const [subItems, setSubItems] = useState([]);

  useEffect(() => {
    getRubberParameter();
  }, []);

  const LeftExtendsCSDBPorps = {
    mainTable: rubberParameterList,
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
    const selectedItem = _find(rubberParameterList, obj => obj.id === leftCsdb.selectedRowId);
    const newSubItems = selectedItem ? selectedItem.items : [];
    setSubItems(newSubItems);
  }, [JSON.stringify(rubberParameterList), leftCsdb.selectedRowId]);

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
    putRubberParameter(data);
  }

  return (
    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">Rubber Parameters</div>
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
    rubberParameterList: state.rubberCleanSheet.rubberParameter.rubberParameter,
    date: state.rubberCleanSheet.rubberParameter.date,
  };
};

const mapDispatchToProps = {
  getRubberParameter: RubberCleanSheetActions.getRubberParameter,
  putRubberParameter: RubberCleanSheetActions.putRubberParameter,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(RubberParameter);
