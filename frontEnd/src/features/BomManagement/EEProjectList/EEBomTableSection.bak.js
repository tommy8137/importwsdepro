import React, { useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { connect } from 'react-redux';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Table from '~~elements/DataTable';
import Button from '~~elements/Button';
import Icon from '~~elements/Icon';
import TableHeaderColumn from '~~elements/DataTable/TableHeaderColumn';
import CommonUtils from '~~utils/CommonUtils';
import CheckingRbac from '~~hoc/CheckingRbac';

import TableBodyRow from '../TableBodyRow';
import * as BomManagementActions from '../BomManagementActions';
import * as EEBomActions from '../EEBomDetail/EEBomActions';


const headerFormat = [
  { dataIndex: 'customer', key: 'customer', title: 'Customer', sortable: true, sortOrder: null },
  { dataIndex: 'product_type', key: 'product_type', title: 'Product Type', sortable: true, sortOrder: null, config: { isHint: true } },
  { dataIndex: 'project_code', key: 'project_code', title: 'Project Code', sortable: true, sortOrder: null },
  { dataIndex: 'project_name', key: 'project_name', title: 'Project Name', sortable: true, sortOrder: null, config: { isHint: true } },
  { dataIndex: 'stage', key: 'stage', title: 'PCB Stage', sortable: true, sortOrder: null },
  { dataIndex: 'version', key: 'version', title: 'Ver. Status', sortable: true, sortOrder: null },
  { dataIndex: 'sku', key: 'sku', title: 'SKU', sortable: true, sortOrder: null },
  { dataIndex: 'version_remark', key: 'version_remark', title: 'Version Remark', sortable: true, sortOrder: null, config: { isHint: true, }  },
  // { dataIndex: 'project_leader', key: 'project_leader', title: 'Project Leader', sortable: true, sortOrder: null },
  { dataIndex: 'approve_time', key: 'approve_time', title: 'Approve Date', sortable: true, sortOrder: null },
  { dataIndex: 'create_time', key: 'create_time', title: 'Create Date', sortable: true, sortOrder: null, config: { isDatetime: true, format: 'YYYYMMDD HH:mm' } },
];

const EEBomTableSection = (props) => {
  let initialHintInfo = {
    hintRow: -1,
    hintColumn: ''
  };

  const [hintInfo, setHintInfo] = useState(initialHintInfo);

  const { getRbacPath } = props;
  const canEEViewDetailPage = getRbacPath(['List', 'allow', 'ee_bom_projects.detail']);
  const canEEViewInfo = getRbacPath(['View', 'allow', 'ee_bom_projects']);
  const canEEViewNextStage = getRbacPath(['List', 'allow', 'ee_bom_projects.version']);


  const handleClickHint = (hintRow, hintColumn) => {
    setHintInfo({
      hintRow,
      hintColumn,
    });
  };

  const handleEeClickInfo = (e, id) => {
    e.stopPropagation();
    props.openEditEEBomModal(id);
  };

  const handleEeClicNextStage = (e, id) => {
    e.stopPropagation();
    props.openChooseVersionModal(id);
  };

  const handleClickEEBom = (e, row) => {
    // 沒有edmVersionID，就不做事
    const { id: eeBomProjectID, edm_version_id: edmVersionID } = row;
    if (edmVersionID) {
      props.history.push(`${props.match.url}/detail/${eeBomProjectID}/${edmVersionID}`);
    }
  };

  const onSortChange = (sortOrder, dataIndex) => {
    const tmpSortedInfo = R.map(
      R.when(R.propEq('dataIndex', dataIndex), R.assoc('sortOrder', sortOrder)),
    )(props.sortInfo);
    let updatedSortedInfo = [];
    if (!tmpSortedInfo.find(item => item.dataIndex === dataIndex)) {
      updatedSortedInfo = [
        {
          sortOrder,
          dataIndex
        }
      ];
    } else {
      updatedSortedInfo = tmpSortedInfo;
    }

    //  update reducer and get sorting list
    props.updateSortInfo(updatedSortedInfo);
    props.getBomList({
      pages: props.currentPage,
      items: props.pageSize,
      orderBy: CommonUtils.genOrderByFormat(updatedSortedInfo),
      column: props.filterType.value,
      keyword: props.filterValue,
      role: 'EE',
    });

    setHintInfo(initialHintInfo);
  };


  return (
    <div className="table-area">
      <Table rows={props.bomList} headers={props.getHeaderFormat(headerFormat)}>
        {({ rows, headers, ...rest }) => {
          return (
            <div>
              <div className="table">
                <div className="table-thead">
                  <div className="table-tr">
                    {headers.map(item => {
                      return (
                        <TableHeaderColumn
                          data={item}
                          onSortChange={onSortChange}
                          key={item.key}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="table-tbody">
                  {
                    rows.map(row => (
                      <TableBodyRow
                        column={headerFormat}
                        row={row}
                        key={uuid.v4()}
                        onClick={(e) => { handleClickEEBom(e, row); }}
                        style={(canEEViewDetailPage && row.edm_version_id) ? { cursor: 'pointer' } : { cursor: 'not-allowed' }}
                        onClickHint={handleClickHint}
                        hint={row.id === hintInfo.hintRow ? hintInfo.hintColumn : ''}
                      >
                        {/* icon 功能們 */}
                        {canEEViewInfo ? <Icon
                          icon="BtnInfo"
                          onClick={e => handleEeClickInfo(e, row.id)}
                          disabled
                        /> : <div />}
                        {
                          (row.is_next_stage && canEEViewNextStage) ?
                            <Button
                              border={true}
                              color="white"
                              className="nextBtn"
                              style={{ width: '7rem' }}
                              onClick={(e) => handleEeClicNextStage(e, row.id)}
                            >
                              Next Stage/Ver.
                            </Button> : <div />
                        }
                      </TableBodyRow>))
                  }
                </div>
              </div>
            </div>
          );
        }}
      </Table>
    </div>
  );
};


// const allowList = [
//   ['List', 'allow', 'me_bom_projects'],
//   ['List', 'allow', 'ee_bom_projects']
// ];


const mapStateToProps = (state) => {
  return {
    bomList: state.bomManagement.bomList,

    sortInfo: state.bomManagement.sortInfo,
    currentPage: state.bomManagement.currentPage,
    pageSize: state.bomManagement.pageSize,
    total: state.bomManagement.total,
    filterType: state.bomManagement.filterType,
    filterValue: state.bomManagement.filterValue,
  };
};

const mapDispatchToProps = {
  openEditEEBomModal: BomManagementActions.openEditEEBomModal,
  openChooseVersionModal: BomManagementActions.openChooseVersionModal,
  getEEBomDetailTab: EEBomActions.getEEBomDetailTab,
  updateSortInfo: BomManagementActions.updateSortInfo,
  getBomList: BomManagementActions.getBomList,
};


export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  CheckingRbac([['List', 'allow', 'ee_bom_projects']])
)(EEBomTableSection);
