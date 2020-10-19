import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';
import _get from 'lodash/get';
import checkingRbac from '~~hoc/CheckingRbac';

import { ContextProvider, useContextValue } from '~~hooks/useContextProvider';

import { toggleLoadingStatus } from '~~redux/Loading/LoadingActions';
import { pushNotification } from '~~hoc/NotificationSystem/NotificationSystemActions';
// import Portal from '~~elements/Portal';
import * as EEBomPersonalActions from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import * as EEBomActions from './EEBomActions';

import EEBomGoBackModal from './component/EEBomGoBackModal';
import EEBomTabs from './component/EEBomTabs';
import EEBomTabPanels from './component/EEBomTabPanels';
import PersonalPage from './EEBomNextStage/Personal';
import ViewAll from './EEBomNextStage/ViewAll';
import Approver from './EEBomNextStage/Approver';

const initialState = {
  highlightIndex: 0,
  operator: null,
  operatorId: null,
  projectCode: null,
  isPersonalSubmit: false,
  tabsList: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_HIGHLIGHT':
      return {
        ...state,
        highlightIndex: action.highlightIndex
      };
    case 'INCREMENT_HIGHLIGHT':
      return {
        ...state,
        highlightIndex: state.highlightIndex + 1
      };
    case 'DECREMENT_HIGHLIGHT':
      return {
        ...state,
        highlightIndex: state.highlightIndex - 1
      };
    case 'UPDATE_OPERATOR_AND_PROJECTCODE_AND_TABS_INFO':
      return {
        ...state,
        operator: action.operator,
        operatorId: action.operatorId,
        projectCode: action.projectCode,
        isPersonalSubmit: action.isPersonalSubmit,
        tabsList: action.tabsList,
      };
    case 'UPDATE_BASE':
      return {
        ...state,
        ...action
      };
    default:
      return state;
  }
};


/**
 *
 * @param {*} info ['personal', 'personal_with_pcb']
 * @param {*} operator ['Joe']
 */
function generateTabList(info) {
  let tabList = info.map(item => {
    const headerInfo = {
      projectName: item.project_name,
      projectCode: item.project_code,
      versionRemark: item.version_remark
    };
    switch (item.type) {
      case 'personal':
        return {
          name: item.user_name,
          render: () => <PersonalPage key={item.type} tabType={item.type} tabInfo={item} headerInfo={headerInfo} />
        };
      case 'approver':
        return {
          name: 'Approver',
          render: () => <Approver key={item.type} tabType={item.type} tabInfo={item} headerInfo={headerInfo} />
        };
      case 'proxy':
        return {
          name: 'Proxy',
          render: () => <PersonalPage key={item.type} tabType={item.type} tabInfo={item} headerInfo={headerInfo} />
        };
      case 'viewAll':
        return {
          name: 'View All',
          render: () => <ViewAll key={item.type} tabType={item.type} tabInfo={item} headerInfo={headerInfo} />
        };

      default:
        return {
          name: 'null',
          render: () => <div />
        };
    }
  });
  return tabList;
}


function EEBom(props) {
  const { edmVersionID, eeBomProjectID, } = props.match.params;
  const { eeBomDetailTab, activeTab } = props;

  const edmVersion = R.path(['edm_version'], activeTab);
  const [contextValue, dispatch] = useContextValue();
  const { tabsList, highlightIndex } = contextValue;

  // did-mounted時, 用router的params來取得eebom detail.
  useEffect(() => {
    const params = { eeBomProjectID, edmVersionID };
    /** 用 eeBomProjectID, edmVersionID來取得目前頁面上的eebom detail data */
    props.getTypesList();
    props.getEEBomDetailTab({ eeBomProjectID, edmVersionID });
    return () => {
      props.resetEEBomDetailData();
      props.EEBomDetailReset();
    };
  }, [JSON.stringify(props.match.params)]);


  /**
   * 當按下back時，把前一個存在location.state的search string 傳回去
   */
  function handleClickGoBack() {
    const prevSearch = _get(props, ['location', 'state', 'prevSearch'], '');
    props.history.push({
      pathname: '/s/bomManagement/ee',
      search: prevSearch
    });
  }
  return (
    <EEBomGoBackModal
      goBack={handleClickGoBack}
      tabsComponent={
        <EEBomTabs
          highlightIndex={highlightIndex}
          tabsList={generateTabList(eeBomDetailTab)}
          EEBomDetailReset={props.EEBomDetailReset}
        />
      }
      contentComponent={
        <EEBomTabPanels
          highlightIndex={highlightIndex}
          tabsList={generateTabList(eeBomDetailTab)}
        />
      }
    />
  );
}


function EEBomWithProvider(props) {
  return (
    <ContextProvider initialState={initialState} reducer={reducer}>
      <EEBom {...props} />
    </ContextProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    activeTab: state.eeBom.activeTab,
    eeBomProjectID: state.bomManagement.eeBomProjectID,
    eeBomDetailTab: state.eeBom.eeBomDetailTab,
  };
};
const mapDispatchToProps = {
  toggleLoadingStatus,
  pushNotification,
  getTypesList: EEBomActions.getTypesList,
  getEEBomDetailTab: EEBomActions.getEEBomDetailTab,
  resetEEBomDetailData: EEBomActions.resetEEBomDetailData,
  EEBomDetailReset: EEBomPersonalActions.EEBomDetailReset,
  getEdmVersionIdList: EEBomActions.getEdmVersionIdList
};

export default connect(mapStateToProps, mapDispatchToProps)(checkingRbac([['List', 'allow', 'ee_bom_projects']])(EEBomWithProvider));
