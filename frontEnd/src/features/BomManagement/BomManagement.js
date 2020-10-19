import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import _get from 'lodash/get';
import { Tabs, Tab } from '~~elements/Tabs';
import CheckingRbac from '~~hoc/CheckingRbac';
import {
  BOM_MANAGMENT_URL_PARAM_TYPES,
  BOM_MANAGMENT_TABLE_TYPES,
  BOM_MANAGMENT_PARAM_TO_TABLE_TYPE
} from '~~features/BomManagement/BomManagementConst';
import Div from '~~features/BomManagement/ProjectListStyles';
import MEBomMainPage from './MEProjectList/MEBomMainPage';
import EEBomMainPage from './EEProjectList/EEBomMainPage';
import EMDMBomMainPage from './EMDMProjectList/EMDMBomMainPage';
import * as BomManagementActions from './BomManagementActions';

function ProjectList(props) {
  const { table } = props;

  switch (table) {
    case BOM_MANAGMENT_TABLE_TYPES.ME:
      return <MEBomMainPage {...props} />;
    case BOM_MANAGMENT_TABLE_TYPES.EE:
      return <EEBomMainPage {...props} />;
    case BOM_MANAGMENT_TABLE_TYPES.EMDM:
      return <EMDMBomMainPage {...props} />;
    default:
      return null;
  }
}

function BomManagement(props) {
  const {
    // for search
    table,
    match,
    getRbacPath,
    switchTable,
  } = props;

  const roleType = _get(match, ['params', 'roleType'], '');
  const isME = getRbacPath(['List', 'allow', 'me_bom_projects']);
  const isEE = getRbacPath(['List', 'allow', 'ee_bom_projects']);

  const showMEEETab = isME;

  useEffect(() => {
    const tableName = BOM_MANAGMENT_PARAM_TO_TABLE_TYPE[roleType];
    switchTable(tableName);
  }, [roleType]);

  function handleClickTab(type) {
    props.history.push(`/s/bomManagement/${type}`);
  }

  return (
    <Div>
      {
        showMEEETab &&
        <Tabs>
          {
            isME &&
            (
              <React.Fragment>
                <Tab
                  className="tabEMDM"
                  active={table === BOM_MANAGMENT_TABLE_TYPES.EMDM}
                  onClick={() => handleClickTab(BOM_MANAGMENT_URL_PARAM_TYPES.EMDM)}
                >eMDM
                </Tab>
                <Tab
                  className="tabME"
                  active={table === BOM_MANAGMENT_TABLE_TYPES.ME}
                  onClick={() => handleClickTab(BOM_MANAGMENT_URL_PARAM_TYPES.ME)}
                >ePro
                </Tab>
              </React.Fragment>
            )
          }
          {
            isEE &&
            (
              <Tab
                className="tabEE"
                active={table === BOM_MANAGMENT_TABLE_TYPES.EE}
                onClick={() => handleClickTab(BOM_MANAGMENT_URL_PARAM_TYPES.EE)}
              >EE
              </Tab>
            )
          }
        </Tabs>
      }
      <ProjectList {...props} />
    </Div>
  );
}

const allowList = [
  ['List', 'allow', 'me_bom_projects'],
  ['List', 'allow', 'ee_bom_projects']
];


const mapStateToProps = (state) => {
  return {
    table: state.bomManagement.table,
    filterType: state.bomManagement.filterType,
    filterValue: state.bomManagement.filterValue,
    filterTypeList: state.bomManagement.filterTypeList,
    filterValueList: state.bomManagement.filterValueList,
    searchValue: state.bomManagement.searchValue,
  };
};

const mapDispatchToProps = {
  getFilterType: BomManagementActions.getFilterType,
  getFilterValue: BomManagementActions.getFilterValue,
  updateFilterType: BomManagementActions.updateFilterType,
  updateFilterValue: BomManagementActions.updateFilterValue,
  updateSearchKeyword: BomManagementActions.updateSearchKeyword,
  switchTable: BomManagementActions.switchTable,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  CheckingRbac(allowList)
)(BomManagement);
