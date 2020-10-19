import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import FileSaver from 'file-saver';

import Resource from '~~apis/resource';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import Icon from '~~elements/Icon';
import RoundButton from '~~elements/RoundButton';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';

import ExportSpaceModal from './ExportSpaceModal';


const StyledDiv = styled.div`
  .icon {
      width: 0.93125rem;
      margin-right: 0.3125rem;
  }
`;

function ExportSpaceBtn(props) {
  const [exportOpen, setExportOpen] = useState(false);
  const { currentVersion: { value: versionid } } = props;

  const handleClickExport = async (product, customer, stage, dateFrom, dateTo) => {
    props.toggleLoadingStatus(true);
    try {
      const response =
        await Resource.BomManagementResource.downloadSpaceRate(product, customer, stage, dateFrom, dateTo);
      // 檔名的取得 要靠後端
      const { 'content-type': type, 'content-disposition': disposition } = response.headers;
      const regexResult = /attachment; filename="(.*)"$/g.exec(disposition);
      const filename = !!regexResult && regexResult.length > 0 ? regexResult[1] : 'Eprocurement_MEBOM_Template.xlsx';
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
          Space Rate
        </StyledDiv>
      </RoundButton.TransparentButton>
      {exportOpen ? <ExportSpaceModal
        isOpen={exportOpen}
        onCancelExport={() => setExportOpen(false)}
        onClickExport={handleClickExport}
      /> : null}
    </Fragment>
  );
}


export default connect(
  (state) => {
    return {
      currentVersion: state.bomDetail.currentVersion,
    };
  },
  {
    toggleLoadingStatus,
    pushNotification,
    downloadSpaceRate: BomManagementActions.downloadSpaceRate,
  }
)(ExportSpaceBtn);
