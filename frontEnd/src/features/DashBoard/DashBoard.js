import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _get from 'lodash/get';

import Select from '~~elements/Select';
import checkingRbac from '~~hoc/CheckingRbac';
import { comma } from '~~utils/Math';
import ExportButton from './component/ExportButton';
import * as DashBoardActions from './DashBoardActions';
import Summarize from './component/Summarize';
import ModuleDetail from './ModuleDetail';
import ExportModal from './component/ExportModal';

const Div = styled.div`
display: flex;
flex-direction: column;
align-items: center;
.upper-zone{
  width: 95%;
  margin: 0.9375rem 0rem 1.25rem;
  display: flex;
  align-items: center;
  flex-direction: column;

  /* 匯出鈕 */
  .function {
    align-self: flex-end;
  }

  /* project name, project code... etc */
  .project-info {
    display: flex;
    flex-direction: row;
    background: #fff;
    height: 6rem;
    width: 100%;
    margin-top: 0.9375rem;
    border-radius: 4px;
    align-items: center;
    /* 每一個格子 ex: project name */
    >div{
      display: flex;
      height: 3.75rem;
      flex: 1;
      padding: 0 1.84375rem;
      flex-direction: column;
      justify-content: center;
      &:not(:last-of-type) {
        border-right: solid 1px #d7d7d7;
      }
      .label{
        font-size: 0.875rem;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1rem;
        letter-spacing: 0px;
        color: #808080;
        height: 1rem;
      }
      .data{
        margin-top: 0.75rem;
        font-size: 1.25rem;
        font-weight: 500;
        color: #333333;
        line-height: 1.5rem;
        height: 1.5rem;
        &.warn {
          color: #D64A3C
        }
        &.health {
          color: #00A99D;
        }
      }
    }
  }
}

.lists-zone {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 3rem;
  align-items: flex-start;
  width: 95%;
  margin: 0.9375rem 0rem 1.25rem;
  justify-content: space-between;
}
`;


const DashBoard = (props) => {
  const {
    lists,
    info,
    moduleList,
    moduleName,
    columnType,
    toggleModuleDetail,
    isModuleDetailOpen,
    match: { params: { id } },
    // location: { search },
    exportModuleExcel,
    filterList,
    summarizeCondition,
  } = props;

  /**
   * 頁面網址列帶的資訊 2019-06-26 已改為用version的id取資料
  const querys = new URLSearchParams(search);
  const paramsInfo = {
    edmVersion: querys.get('e') || '',
    projectId: querys.get('m') || '',
    sku: querys.get('s') || '',
  };
  */

  useEffect(() => {
    // /dashboard/:edm_version/:project_id/:sku
    props.getSummarizeFilter();
  }, []);

  useEffect(() => {
    const { supplyType, manufacturer } = filterList;
    props.setSummarizeFilter({ supplyType, manufacturer });
    props.getListDetail({ id });
  }, [filterList]);

  const handleToggleModule = (data) => {
    props.getModuleLists(data);
  };

  const handleClickExport = () => {
    const querydata = {
      id,
    };
    props.exportDashboardExcel(querydata);
  };

  const handleFilterChange = (condition) => {
    props.setSummarizeFilter(condition);
    props.getListDetail({ id });
  };

  const last = _get(info, 'total_last', null);
  const suggestion = _get(info, 'total_suggestion', null);

  return (
    <Div>
      <div className="upper-zone">
        <div className="function">
          <ExportButton onClick={() => handleClickExport()} />
        </div>
        <div className="project-info">
          <div>
            <div className="label">Project Name</div>
            <div className="data">
              {_get(info, 'project_name', null) || '-'}
            </div>
          </div>
          <div>
            <div className="label">Project Code</div>
            <div className="data">
              {_get(info, 'project_code', null) || '-'}
            </div>
          </div>
          <div>
            <div className="label">EE SKU/ME SKU</div>
            <div className="data">
              {_get(info, 'sku.ee', null) || '-'}/{_get(info, 'sku.me', null) || '-'}
            </div>
          </div>
          <div>
            <div className="label">Total Last (SAP)</div>
            <div className={`data ${last > suggestion ? 'warn' : ''} ${last < suggestion ? 'health' : ''}`}>
              USD${last == null ? '-' : comma(last, 5)}
            </div>
          </div>
          <div>
            <div className="label">Total Suggestion</div>
            <div className="data">
              USD${suggestion == null ? '-' : comma(suggestion, 5)}
            </div>
          </div>
        </div>
      </div>
      <div className="lists-zone">
        {lists.map(list => (
          <Summarize
            key={list.id}
            list={list}
            paramsInfo={{
              id,
              edmVersion: _get(info, 'edm_version_id', ''),
              meVersion: _get(info, 'me_version_id', ''),
              sku: _get(info, 'sku.me', '')
            }}
            getModuleLists={handleToggleModule}
            filterList={filterList}
            onFilterClose={handleFilterChange}
            summarizeCondition={summarizeCondition}
          />
        ))}
      </div>
      <ModuleDetail
        moduleList={moduleList}
        moduleName={moduleName}
        columnType={columnType}
        isOpen={isModuleDetailOpen}
        toggleModuleDetail={toggleModuleDetail}
        onExport={exportModuleExcel}
      />
    </Div>
  );
};

const allowList = [
  ['List', 'allow', 'dashboard']
];

export default checkingRbac(allowList)(connect(
  (state) => {
    return {
      lists: state.dashBoard.lists,
      info: state.dashBoard.info,
      moduleList: state.dashBoard.moduleList,
      moduleName: state.dashBoard.moduleName,
      columnType: state.dashBoard.columnType,
      isModuleDetailOpen: state.dashBoard.isModuleDetailOpen,
      filterList: state.dashBoard.filterList,
      summarizeCondition: state.dashBoard.summarizeCondition,
    };
  },
  {
    getModuleLists: DashBoardActions.getModuleLists,
    getListDetail: DashBoardActions.getListDetail,
    toggleModuleDetail: DashBoardActions.toggleModuleDetail,
    exportDashboardExcel: DashBoardActions.exportDashboardExcel,
    exportModuleExcel: DashBoardActions.exportModuleExcel,
    setSummarizeFilter: DashBoardActions.setSummarizeFilter,
    getSummarizeFilter: DashBoardActions.getSummarizeFilter,
  }
)(DashBoard));

