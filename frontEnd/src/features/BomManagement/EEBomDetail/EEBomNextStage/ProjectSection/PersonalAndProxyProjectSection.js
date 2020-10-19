import React, { useState } from 'react';
import { connect } from 'react-redux';

import Info from '~~elements/Info';
import EditEEBomModal from '~~features/BomManagement/EEProjectList/Modal/ViewBomModal';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';
import ProjectHeader, { ProjectHeaderLeftZone, ProjectHeaderRightZone, ProjectHeaderRightControl } from './ProjectHeader';


function ProjectInfoSection(props) {
  const {
    analysisData,
    headerInfo,
    isEeEditOpen,
    openEditEEBomModal,
    eeBomProjectId,
    edmVersionID,
    eeBomData,
    avlSetting: { showAvl, disabledAvl, },
  } = props;

  function handleOpenEditEEBomModal() {
    openEditEEBomModal(eeBomProjectId, edmVersionID);
  }

  return (
    <div>
      <ProjectHeader>
        <ProjectHeaderLeftZone>
          <Info
            title="Project Info"
            content={headerInfo.projectName || '-'}
            onContentClick={handleOpenEditEEBomModal}
          />
        </ProjectHeaderLeftZone>
        <ProjectHeaderRightZone>
          <div className="group-info">
            <Info
              title="Rejected"
              content={analysisData.rejectCount}
              textAlign="center"
            />
            <Info
              title="/"
              content="/"
              textAlign="center"
            />
            <Info
              title="Checked"
              content={analysisData.checkedCount}
              textAlign="center"
            />
            <Info
              title="/"
              content="/"
              textAlign="center"
            />
            <Info
              title="P.N. Count"
              content={analysisData.itemTypeCount}
              textAlign="center"
            />
          </div>
          {/* <Info
            title="Rejected&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;Checked&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;P.N. Count"
            content={`${analysisData.rejectCount}\u00A0\u00A0/\u00A0\u00A0${analysisData.checkedCount}\u00A0\u00A0/\u00A0\u00A0${analysisData.itemTypeCount}`}
            textAlign="center"
          /> */}
          <Info
            title="PIC Parts Count"
            content={analysisData.PICPartsCount}
          />
        </ProjectHeaderRightZone>
        <ProjectHeaderRightControl />
      </ProjectHeader>

      <EditEEBomModal
        isOpen={isEeEditOpen}
        bomData={eeBomData}
        onClickCancel={props.closeEditEEBomModal}
        showAvl={showAvl}
        disabledAvl={disabledAvl}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    analysisData: state.eeBomPersonalReducer.analysisData,
    PCBInfo: state.eeBomPersonalReducer.PCBInfo,
    isEeEditOpen: state.bomManagement.isEeEditOpen,
    eeBomData: state.bomManagement.eeBomData,
    avlSetting: state.eeBom.avlSetting,
  };
};

const mapDispatchToProps = {
  openEditEEBomModal: BomManagementActions.openEditEEBomModal,
  closeEditEEBomModal: BomManagementActions.closeEditEEBomModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfoSection);
