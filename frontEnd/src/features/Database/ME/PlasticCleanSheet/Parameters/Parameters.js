import React, { Fragment, useState, useEffect } from 'react';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _head from 'lodash/head';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as PlasticCleanSheetActions from '~~features/Database/ME/PlasticCleanSheet/PlasticCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import { InnerContainer } from '~~features/Database/DatabaseStyles';
import Columns from './ColumnSetting';
import SideTable from './SideTable';

const Parameters = (props) => {
  const {
    location,
    // state
    list,
    date,
    activeProductType,
    // actions
    getPlasticParameters,
    putPlasticParameters,
    setProductType,
  } = props;
  const [subItems, setSubItems] = useState([]);

  useEffect(() => {
    if (activeProductType) {
      getPlasticParameters();
    }
  }, [JSON.stringify(activeProductType)]);

  const LeftExtendsCSDBPorps = {
    location,
    setProductType,
    mainTable: list,
    date,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'type', keyword: '' },
  };

  const RightExtendsCSDBPorps = {
    mainTable: subItems,
    date,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'item', keyword: '' },
  };
  const leftCsdb = useCSDB(LeftExtendsCSDBPorps);
  const rightCsdb = useCSDB(RightExtendsCSDBPorps);

  const leftColumnsProps = {
    date,
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
    const selectedItem = _find(list, obj => obj.id === leftCsdb.selectedRowId);
    const newSubItems = selectedItem ? selectedItem.items : [];
    setSubItems(newSubItems);
  }, [JSON.stringify(list), leftCsdb.selectedRowId]);


  // 如果左邊選了別的rowId, 就把右邊的editMode關掉, 並清空checkbox
  useEffect(() => {
    rightCsdb.setCheckedList([]);
    rightCsdb.setEditMode(false);
  }, [leftCsdb.selectedRowId]);


  function handleRightSave(diffList) {
    const data = {
      typeId: leftCsdb.selectedRowId,
      datas: diffList
    };
    putPlasticParameters(data);
  }

  return (

    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">Plastic Parameters</div>
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
          <div className="multi-table-col">
            <SideTable
              onSave={handleRightSave}
              columns={rightColumns}
              showEdit={date.nextId}
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
    list: state.plasticCleanSheet.parameter.list,
    date: state.plasticCleanSheet.parameter.date,
    activeProductType: state.dataBase.common.activeProductType,
  };
};

const mapDispatchToProps = {
  getPlasticParameters: PlasticCleanSheetActions.getPlasticParameters,
  putPlasticParameters: PlasticCleanSheetActions.putPlasticParameters,
  setProductType: DatabaseActions.setProductType,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(Parameters);
