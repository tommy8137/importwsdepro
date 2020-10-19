import React, { useState, Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import FileSaver from 'file-saver';
import _uniq from 'lodash/uniq';

import Resource from '~~apis/resource';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import Icon from '~~elements/Icon';
import RoundButton from '~~elements/RoundButton';

import ExportModal from './ExportModal';
import { PARTLIST_ITEMS, QUOTATION_ITEMS } from './ExportConstant';


const StyledDiv = styled.div`
  .icon {
      width: 0.93125rem;
      margin-right: 0.3125rem;
  }
`;


function ExportBtn(props) {
  const [exportOpen, setExportOpen] = useState(false);
  const [avaiableFormat, setAvaiableFormat] = useState([]);
  const { exportType = 'default' } = props;
  const resourceObject = {
    quotation: Resource.BomDetailResource.exportQuotationCleansheetExcel,
    default: Resource.BomDetailResource.exportMEBomCleansheetExcel,
  }[exportType];
  const modalContent = {
    default: {
      btn: 'Export',
      itemList: PARTLIST_ITEMS,
    },
    quotation: {
      btn: 'Quotation',
      itemList: QUOTATION_ITEMS,
    }
  }[exportType];
  useEffect(() => {
    setAvaiableFormat(_uniq(props.bomData.partItems.reduce((acc, item) => acc.concat(item.partlist.map(i => i.formate)), [])));
  }, []);

  const handleClickExport = async (partlistFormat) => {
    props.toggleLoadingStatus(true);
    try {
      const { currentVersion: { value: versionid } } = props;
      const response = await resourceObject(props.bomId, versionid, partlistFormat);
      // 檔名的取得 要靠後端
      const { 'content-type': type, 'content-disposition': disposition } = response.headers;
      const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
      const filename = !!regexResult && regexResult.length > 0 ? decodeURIComponent(regexResult[1]) : 'Eprocurement_CleanSheet_ME.zip';
      FileSaver.saveAs(
        new Blob([response.data], { type }),
        filename
      );
      setExportOpen(false);
    } catch (err) {
      props.pushNotification({
        message: '下載檔案失敗，請稍後再試',
        level: 'error'
      });
    }
    props.toggleLoadingStatus(false);
  };

  return (
    <Fragment>
      <RoundButton.TransparentButton onClick={() => setExportOpen(true)} disabled={props.disabled}>
        <StyledDiv>
          <Icon className="icon" icon="IcoExport" />
          {modalContent.btn}
        </StyledDiv>
      </RoundButton.TransparentButton>
      {exportOpen ? <ExportModal
        isOpen={exportOpen}
        // isSingleChoose={exportType === 'quotation'}
        itemList={modalContent.itemList}
        onCancelExport={() => setExportOpen(false)}
        onClickExport={handleClickExport}
        avaiableFormat={avaiableFormat}
      /> : null}
    </Fragment>
  );
}


export default connect(
  (state) => {
    return {
      currentVersion: state.bomDetail.currentVersion,
      bomData: state.bomDetail.bomData,
    };
  }, {
    toggleLoadingStatus,
    pushNotification,
  }
)(ExportBtn);

