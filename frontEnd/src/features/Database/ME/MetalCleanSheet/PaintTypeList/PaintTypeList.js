import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import _get from 'lodash/get';
import _find from 'lodash/find';
import { InnerContainer } from '~~features/Database/DatabaseStyles';
import * as DatabaseActions from '~~features/Database/DatabaseActions';
import * as MetalCleanSheetActions from '~~features/Database/ME/MetalCleanSheet/MetalCleanSheetActions';
import useCSDB from '~~features/Database/components/useCSDB';
import Columns from './ColumnSetting';
import SideTable from './SideTable';

const PaintTypeList = (props) => {
  const {
    location,
    // state
    list,
    // actions
    getPaintTypeList,
    setProductType,
  } = props;

  const [subItems, setSubItems] = useState([]);

  useEffect(() => {
    getPaintTypeList();
  }, []);

  const LeftExtendsCSDBPorps = {
    location,
    setProductType,
    mainTable: list,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'paintTypeName', keyword: '' },
    selectedDataIndex: 'paintTypeId',
    checkBoxDataIndex: 'paintTypeId',
  };

  const RightExtendsCSDBPorps = {
    mainTable: subItems,
    initialSortInfo: { dataIndex: '', sortOrder: 'ascend' },
    initialFilterInfo: { dataIndex: 'colorName', keyword: '' },
  };
  const leftCsdb = useCSDB(LeftExtendsCSDBPorps);
  const rightCsdb = useCSDB(RightExtendsCSDBPorps);

  const leftColumnsProps = {
    ...leftCsdb
  };

  const rightColumnsProps = {
    ...rightCsdb
  };

  const leftColumns = Columns.left(leftColumnsProps);
  const rightColumns = Columns.right(rightColumnsProps);


  /**
   * 取得新的列表或是切換選擇的id, 會重新filter右邊的talbe
   */
  useEffect(() => {
    const selectedItem = _find(list, obj => obj.paintTypeId === leftCsdb.selectedRowId);
    const newSubItems = selectedItem ? selectedItem.color : [];
    setSubItems(newSubItems);
  }, [JSON.stringify(list), leftCsdb.selectedRowId]);


  return (

    <InnerContainer>
      <div className="inner-content">
        <div className="content-header">
          <div className="title">噴漆類型及顏色清單</div>
        </div>
        {/* 左邊 */}
        <div className="multi-table-row">
          <div className="multi-table-col">
            <SideTable
              columns={leftColumns}
              csdb={leftCsdb}
              placeholder="Search paint type"
            />
          </div>
          <div className="multi-table-col">
            <SideTable
              columns={rightColumns}
              csdb={rightCsdb}
              placeholder="Search color"
            />
          </div>
        </div>
      </div>
    </InnerContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    list: state.metalCleanSheet.paintTypeList.list,
  };
};

const mapDispatchToProps = {
  getPaintTypeList: MetalCleanSheetActions.getPaintTypeList,
  setProductType: DatabaseActions.setProductType,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(PaintTypeList);
