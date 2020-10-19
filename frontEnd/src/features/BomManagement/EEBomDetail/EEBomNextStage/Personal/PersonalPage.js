import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';


import { useContextValue } from '~~hooks/useContextProvider';
import checkingRbac from '~~hoc/CheckingRbac';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import { getTableData } from '~~features/BomManagement/EEBomDetail/EEBomNextStage/Personal/EEBomPersonalActions';
import PersonalPCBRow from '~~features/BomManagement/EEBomDetail/EEBomNextStage/PCBSection/PersonalPCBRow';
import { setEEBomCurrentTabInfo } from '../../EEBomActions';
import TableSection from '../TableSection/TableSection';
import ProjectInfoSection from '../ProjectSection/PersonalAndProxyProjectSection';


const AlertModal = styled.div`
>div{
  &.active{
    top: 3.875rem;
    background: rgba(229,229,229,0.9);
  }
  .row{
    text-align: center;
    .text{
      line-height: 2rem;
    }
  }
}
`;

/**
 * component EEBom personal proxy
 * @param {*} props
 */
function PersonalPageDemo(props) {
  const {
    PCBInfo,
    tabInfo,
    headerInfo
  } = props;
  const [isAlert, handleAlert] = useState(false);
  const [contextValue, dispatch] = useContextValue();
  // console.log('現在的tabType是', tabType, contextValue.highlightIndex);

  useEffect(() => {
    if (props.tabType === 'proxy') {
      handleAlert(true);
    } else {
      props.setEEBomCurrentTabInfo(tabInfo);
      props.getTableData();
    }
  }, []);

  return (
    <div>
      <ProjectInfoSection
        headerInfo={headerInfo}
        eeBomProjectId={tabInfo.eebom_project_id}
        edmVersionID={props.edmVersionID}
      />
      {PCBInfo.isPCB ? <PersonalPCBRow tabInfo={tabInfo} /> : (null)}
      <TableSection />
      <AlertModal>
        <Alert isOpen={isAlert} type="alarm">
          <div className="row">
            <div className="text">
              開啟代理人頁面後，您可對PIC的項目做修改，但與PIC同時編輯一個項目時同時編輯一個項目時，會有覆寫問題。
            </div>
            <div className="text">
              是否仍要開啟代理人頁面？
            </div>
          </div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={(e) => {
                e.stopPropagation();
                handleAlert(false);
                props.setEEBomCurrentTabInfo(tabInfo);
                props.getTableData();
              }}
            >
              開啟代理人頁面
            </Button>
            <Button
              color="black"
              onClick={(e) => {
                e.stopPropagation();
                handleAlert(false);
                dispatch({ type: 'UPDATE_HIGHLIGHT', highlightIndex: contextValue.highlightIndex - 1 });
              }}
            >
              取消
            </Button>
          </div>
        </Alert>
      </AlertModal>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    PCBInfo: state.eeBomPersonalReducer.PCBInfo,
    edmVersionID: state.eeBom.edmVersionID
  };
};

const mapDispatchToProps = {
  getTableData,
  setEEBomCurrentTabInfo,
};

export default checkingRbac([['Edit', 'allow', 'ee_bom_projects.detail']])(connect(mapStateToProps, mapDispatchToProps)(PersonalPageDemo));
