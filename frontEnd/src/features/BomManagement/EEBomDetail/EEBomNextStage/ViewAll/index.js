import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as R from 'ramda';
import Button from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';
import FileSaver from 'file-saver';

import { comma } from '~~utils/Math';
import checkingRbac from '~~hoc/CheckingRbac';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import { setEEBomCurrentTabInfo, setEEBomViewallInfo, getEdmVersionIdList } from '~~features/BomManagement/EEBomDetail/EEBomActions';

import Resource from '~~apis/resource';
import CommonUtils from '~~utils/CommonUtils';

import Div from './DivStyle';
import ByModule from './ByModule';
import ProjectSection from '../ProjectSection/ViewAllProjectSection';
import PNDataGrid from '../DataGrid/ViewAllDataGrid/PNDataGrid';

import ProjectHeader, { ProjectHeaderLeftZone, ProjectHeaderRightZone, ProjectHeaderRightControl } from '../ProjectSection/ProjectHeader';

const TableGridWrapper = styled.div`
  padding: 0.5rem 1rem;
`;

const initialSortInfo = [{
  sortOrder: 'asc',
  dataIndex: 'type1'
}];

/**
 * component EEBom View all
 * @param {*} props
 */
function ViewAllPage(props) {
  // "pn", "module"
  const [isOdmParts, setIsOdmParts] = useState(true);
  const [columnType, setColumnType] = useState('pn');
  const [tabledata, setTable] = useState([]);
  const [listdata, setList] = useState([]);
  const [sortInfo, setSortInfo] = useState(initialSortInfo);
  const [pcbtotal, setPcbTotal] = useState('-');
  const { edmVersionID, tabInfo } = props;

  /**
   * 取得PN的列表
   */
  const fetchPNData = async () => {
    props.toggleLoadingStatus(true);
    // 會把 { dataIndex: type1, order: 'desc' } 轉成 "-type1" 給後端排序
    const orderBy = CommonUtils.genOrderByFormat(sortInfo);

    const params = {
      columnType: 'pn',
      edmVersionID,
      isOdmParts,
      orderBy
    };
    await Resource.EEBomResource.getViewAllData(params)
      .then((res) => {
        const { data: { infos, pcbInfo: { pcbTotalPrice } } } = res;
        props.setEEBomViewallInfo(res.data);
        setTable(infos);
        setPcbTotal(pcbTotalPrice);
        setColumnType('pn');
        props.toggleLoadingStatus(false);
      })
      .catch((error) => {
        props.pushNotification({ message: '取得資料有誤，請稍後再試', level: 'error' });
        props.toggleLoadingStatus(false);
      });
  };

  /**
   * 取得Module的列表
   */
  const fetchModuleData = async () => {
    props.toggleLoadingStatus(true);
    const params = {
      columnType: 'module',
      edmVersionID,
      isOdmParts
    };
    await Resource.EEBomResource.getViewAllData(params)
      .then((res) => {
        const { data: { infos, pcbInfo: { pcbTotalPrice } } } = res;
        props.setEEBomViewallInfo(res.data);
        setList(infos);
        setPcbTotal(pcbTotalPrice);
        setColumnType('module');
        props.toggleLoadingStatus(false);
      })
      .catch((error) => {
        props.pushNotification({ message: '取得資料有誤，請稍後再試', level: 'error' });
        props.toggleLoadingStatus(false);
      });
  };

  // componentDidMount
  useEffect(() => {
    // 一進來先去set 目前在哪個tab
    props.setEEBomCurrentTabInfo(props.tabInfo);
    // get edmVersion的下拉
    const edmVersion = R.path(['edm_version'], tabInfo);
    const eeBomProjectID = tabInfo.eebom_project_id;
    if (edmVersion) {
      props.getEdmVersionIdList({ eeBomProjectID, edmVersion });
    }
    handleFetchData();

    return (() => {
      // TODO: reset data?
    });
  }, []);


  /**
   * 當切換 OdmParts, PN/Module, sortInfo的時候，都會重call api取得新列表
   */
  useEffect(() => {
    handleFetchData();
  }, [
    isOdmParts,
    columnType,
    JSON.stringify(sortInfo)]
  );

  /**
   * 統一處理pn/module兩種不同的fetch
   */
  function handleFetchData() {
    switch (columnType) {
      case 'pn':
        fetchPNData();
        break;
      case 'module':
        fetchModuleData();
        break;
      default:
        break;
    }
  }

  const renderTableGridWrapper = () => {
    if (columnType === 'pn') {
      return (
        <PNDataGrid
          rows={tabledata}
          sortInfo={sortInfo}
          updateSortInfo={(sortObj) => {
            let newSortInfo = [].concat(sortObj);
            setSortInfo(newSortInfo);
          }}
        />
      );
    }
    if (columnType === 'module') {
      return <ByModule infos={listdata} />;
    }
    return <div />;
  };
  const canExport = props.getRbacPath(['Export', 'allow', 'ee_bom_projects.detail']);
  const handleClickExportBom = async () => {
    props.toggleLoadingStatus(true);
    try {
      const response = await Resource.EEBomResource.exportEEBomExcel(props.edmVersionID);
      // 檔名的取得 要靠後端
      const { 'content-type': type, 'content-disposition': disposition } = response.headers;
      const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
      const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : 'Eprocurement_.xlsx';
      FileSaver.saveAs(
        new Blob([response.data], { type }),
        filename
      );
    } catch (err) {
      props.pushNotification({ message: '下載檔案失敗，請稍後再試', level: 'error' });
    }
    props.toggleLoadingStatus(false);
  };

  const handleClickExportAlternative = async () => {
    props.toggleLoadingStatus(true);
    try {
      const response = await Resource.EEBomResource.exportEEAlternativeExcel(props.edmVersionID);
      // 檔名的取得 要靠後端
      const { 'content-type': type, 'content-disposition': disposition } = response.headers;
      const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
      const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : 'Eprocurement_Alternative.xlsx';
      FileSaver.saveAs(
        new Blob([response.data], { type }),
        filename
      );
    } catch (err) {
      props.pushNotification({ message: '下載檔案失敗，請稍後再試', level: 'error' });
    }
    props.toggleLoadingStatus(false);
  };

  return (
    <Div>
      <ProjectSection
        headerInfo={props.headerInfo}
        edmVersionID={edmVersionID}
        eeBomProjectId={tabInfo.eebom_project_id}
        isOdmParts={isOdmParts}
        setIsOdmParts={setIsOdmParts}
      />
      <div className="functions">
        <div className="pcb">
          PCB
          <div className="title">PCB Total Cost <span>USD ${pcbtotal == null ? '-' : comma(pcbtotal)}</span></div>
        </div>
        <div className="tab-buttons">
          View by
          <button className={columnType === 'pn' ? 'active' : null} onClick={() => setColumnType('pn')}>P/N</button>
          <button className={columnType === 'module' ? 'active' : null} onClick={() => setColumnType('module')}>Module</button>
          <Button
            round
            color="transparent"
            onClick={handleClickExportAlternative}
            disabled={!canExport}
            style={{
              float: 'right',
            }}
          >
            <Icon icon={IconName.IcoExport} size="1rem" />
            Alternative
          </Button>
          <Button
            round
            color="transparent"
            onClick={handleClickExportBom}
            disabled={!canExport}
            style={{
              float: 'right',
            }}
          >
            <Icon icon={IconName.IcoExport} size="1rem" />
            BOM
          </Button>
          <div
            style={{
              float: 'right',
              marginTop: '2px',
            }}
          >
            Export By
          </div>
        </div>
      </div>
      <TableGridWrapper>{renderTableGridWrapper()}</TableGridWrapper>
    </Div>
  );
}


const mapStateToProps = (state) => {
  return {
    edmVersionID: state.eeBom.edmVersionID,
    PCBInfo: state.eeBomPersonalReducer.PCBInfo,
  };
};
const mapDispatchToProps = {
  toggleLoadingStatus,
  pushNotification,
  setEEBomViewallInfo,
  setEEBomCurrentTabInfo,
  getEdmVersionIdList
};

export default checkingRbac([['List', 'allow', 'ee_bom_projects.detail']])(connect(mapStateToProps, mapDispatchToProps)(ViewAllPage));
