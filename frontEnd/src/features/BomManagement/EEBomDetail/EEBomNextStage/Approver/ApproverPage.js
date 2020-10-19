import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import checkingRbac from '~~hoc/CheckingRbac';
import ApproverPCBRow from '~~features/BomManagement/EEBomDetail/EEBomNextStage/PCBSection/ApproverPCBRow';
import { getTableData } from '../Personal/EEBomPersonalActions';
import { setEEBomCurrentTabInfo } from '../../EEBomActions';
import TableSection from '../TableSection/TableSection';
import ProjectInfoSection from '../ProjectSection/ApproverProjectSection';

/**
 *
 * @param {*} props
 */
function ApproverPageDemo(props) {
  const {
    PCBInfo,
    tabInfo,
    headerInfo
  } = props;

  useEffect(() => {
    props.setEEBomCurrentTabInfo(tabInfo);
    props.getTableData();
  }, []);

  return (
    <div>
      <ProjectInfoSection
        headerInfo={headerInfo}
        eeBomProjectId={tabInfo.eebom_project_id}
        edmVersionID={props.edmVersionID}
      />
      {PCBInfo.isPCB ? <ApproverPCBRow tabInfo={tabInfo} /> : (null)}
      <TableSection />
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    PCBInfo: state.eeBomPersonalReducer.PCBInfo,
    isBomApproved: state.eeBomPersonalReducer.isBomApproved,
    isPCBApproved: state.eeBomPersonalReducer.isPCBApproved,
    edmVersionID: state.eeBom.edmVersionID
  };
};

const mapDispatchToProps = {
  getTableData,
  setEEBomCurrentTabInfo,
};

export default checkingRbac([['Approve', 'allow', 'ee_bom_projects.detail']])(connect(mapStateToProps, mapDispatchToProps)(ApproverPageDemo));
