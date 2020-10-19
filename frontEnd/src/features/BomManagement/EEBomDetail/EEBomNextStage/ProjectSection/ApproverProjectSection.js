import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { comma } from '~~utils/Math';
import Info from '~~elements/Info';
import EditEEBomModal from '~~features/BomManagement/EEProjectList/Modal/ViewBomModal';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';

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
    doEditEEBom,
    getTableData,
    avlSetting: { showAvl, disabledAvl, },
  } = props;

  function handleOpenEditEEBomModal() {
    openEditEEBomModal(eeBomProjectId, edmVersionID);
  }

  return (
    <div>
      <ProjectHeader>
        <ProjectHeaderLeftZone>
          <div className="group-info">
            <Info
              title="Project Info"
              content={headerInfo.projectName || '-'}
              onContentClick={handleOpenEditEEBomModal}
            />
          </div>
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
              title="Approved"
              content={analysisData.approvedCount}
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
              title="Total Type II"
              content={analysisData.totalType2Count}
              textAlign="center"
            />
          </div>
          <Info
            title="Total Parts Count"
            content={analysisData.totalPartsCount}
          />
          <div className="group-info">
            <Info
              title="Total Suggestion Cost"
              content={`USD $${comma(analysisData.totalSuggestionCost)}`}
              textAlign="left"
            />
            <Info
              title="/"
              content="/"
              textAlign="center"
            />
            <Info
              title={
                <Fragment>
                  <p>Total Price</p>
                  <p>(Lowest)</p>
                </Fragment>
              }
              content={comma(analysisData.totalLowestCost)}
              textAlign="left"
            />
            <Info
              title="/"
              content="/"
              textAlign="center"
            />
            <Info
              title={
                <Fragment>
                  <p>Total Price</p>
                  <p>(MLCC 2nd Highest)</p>
                </Fragment>
              }
              content={comma(analysisData.total2ndHighestCost)}
              textAlign="left"
            />
            <Info
              title="/"
              content="/"
              textAlign="center"
            />
            <Info
              title={
                <Fragment>
                  <p>Total Price</p>
                  <p>(Highest)</p>
                </Fragment>
              }
              content={comma(analysisData.totalCost)}
              textAlign="left"
            />
          </div>
          {/* <Info
            title="Total Suggestion Cost&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;Total Cost"
            content={`${analysisData.totalSuggestionCost}\u00A0\u00A0/\u00A0\u00A0${analysisData.totalCost}`}
            textAlign="center"
          /> */}
        </ProjectHeaderRightZone>
        <ProjectHeaderRightControl />
      </ProjectHeader>

      <EditEEBomModal
        isOpen={isEeEditOpen}
        bomData={eeBomData}
        onClickCancel={props.closeEditEEBomModal}
        showAvl={showAvl}
        disabledAvl={disabledAvl}
        onClickSave={data => {
          doEditEEBom(data, eeBomProjectId, edmVersionID);
          getTableData();
        }}
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
  doEditEEBom: BomManagementActions.doEditEEBom,
  getTableData: EEBomPersonalActions.getTableData,
  openEditEEBomModal: BomManagementActions.openEditEEBomModal,
  closeEditEEBomModal: BomManagementActions.closeEditEEBomModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectInfoSection);
