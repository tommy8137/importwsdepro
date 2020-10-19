import React, { useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import checkingRbac from '~~hoc/CheckingRbac';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';
import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
import { comma } from '~~utils/Math';
import Info from '~~elements/Info';
import EditEEBomModal from '~~features/BomManagement/EEProjectList/Modal/ViewBomModal';
import Switch from '~~elements/Switch';
import { EnhancePopover } from '~~elements/Popover';

import ProjectHeader, { ProjectHeaderLeftZone, ProjectHeaderRightControl } from './ProjectHeader';


const OdmContent = styled.div`
  display: block;
  >.switch-container,
  >p {
    position: relative;
    display: inline-block;
    vertical-align: baseline;
    margin: 0;
    margin-right: 0.5rem;
    margin-bottom: -0.5rem;
    &:last-child{
      margin-right: 0;
    }
  }
  >p {
    font-size: 1rem;
    font-weight: bolder;
    &.hasPopover {
      pointer-events: cursor;
      cursor: pointer;
      &:hover {
        text-decoration: underline
      }
    }
  }
`;

function ProjectInfoSection(props) {
  const {
    viewallInfo,
    headerInfo,
    isEeEditOpen,
    openEditEEBomModal,
    eeBomProjectId,
    edmVersionID,
    eeBomData,
    avlSetting: { showAvl, disabledAvl, },
  } = props;

  const odmEl = useRef(null);

  const odmContent =
    (
      <OdmContent>
        <p>Full Part</p>
        <div className="switch-container"><Switch checked={props.isOdmParts} onChange={e => props.setIsOdmParts(!props.isOdmParts)} /></div>
        <p className="hasPopover" ref={odmEl}>ODM Parts</p>
        <EnhancePopover target={odmEl} closeBtn placement="bottom">
          <div>Supply Type</div>
          <div>W/AV/S/Empty</div>
        </EnhancePopover>
      </OdmContent>
    );

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
          <Info
            title="Total Cost Sum by"
            content={odmContent}
          />
          <Info
            title="Total Type II"
            content={viewallInfo.totalType2}
          />
          <Info
            title="Total Parts Count"
            content={viewallInfo.totalPartsCount}
          />
          <div className="group-info">
            <Info
              title="Total Suggestion Cost"
              content={`USD $${comma(viewallInfo.totalSuggestionCost)}`}
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
              content={comma(viewallInfo.totalLowestCost)}
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
              content={comma(viewallInfo.total2ndHighestCost)}
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
              content={comma(viewallInfo.totalCost)}
              textAlign="left"
            />
          </div>
          {/* <Info
            title="Total Suggestion Cost&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;Total Price (Lowest)/&nbsp;&nbsp;&nbsp;Total Price(MLCC 2nd Highest)/&nbsp;&nbsp;&nbsp;Total Price (Highest)"
            content={`${viewallInfo.totalSuggestionCost}\u00A0\u00A0/\u00A0\u00A0${viewallInfo.totalLowestCost}\u00A0\u00A0/\u00A0\u00A0${viewallInfo.total2ndHighestCost}\u00A0\u00A0/\u00A0\u00A0${viewallInfo.totalCost}`}
            textAlign="center"
          /> */}
        </ProjectHeaderLeftZone>
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
    viewallInfo: state.eeBom.viewallInfo,
    // edmVersionID: state.eeBom.edmVersionID,
    isEeEditOpen: state.bomManagement.isEeEditOpen,
    eeBomData: state.bomManagement.eeBomData,
    avlSetting: state.eeBom.avlSetting,
  };
};

const mapDispatchToProps = {
  toggleLoadingStatus,
  pushNotification,
  openEditEEBomModal: BomManagementActions.openEditEEBomModal,
  closeEditEEBomModal: BomManagementActions.closeEditEEBomModal,
};

export default checkingRbac()(connect(mapStateToProps, mapDispatchToProps)(ProjectInfoSection));
