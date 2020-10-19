import React, { createContext, useContext } from 'react';
import { Collapse } from 'reactstrap';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'recompose';
import Icon, { IconName } from '~~elements/Icon';
import * as EEBomActions from '../../EEBomActions';
import EdmVersionIdSelect from './EdmVersionIdSelect';


const context = createContext();


const ProjectHeaderWrapper = styled.div`
  &.project-header-wrapper {
    display:flex;
    justify-content: space-between;
    margin: 1rem 3rem;

    .right-control {
      align-self: flex-start;
      display: flex;
      align-items: center;
    }
    .left-zone, 
    .right-zone {
      display: flex;

      .group-info {
        display: flex;
        margin-right: 2rem;
        > .info > .info__box {
          margin: 0 0.2rem;
        }
      }
    }
  }
`;

const ProjectHeaderLeftZone = ({ children }) => {
  const { eeBomProjectCollapse } = useContext(context);
  return (
    <div className="left-zone">
      {!eeBomProjectCollapse && children}
    </div>
  );
};


const ProjectHeaderRightControl = ({ children }) => {
  const { setEEBomPorjectInfoCollapse, eeBomProjectCollapse } = useContext(context);
  return (
    <div className="right-control">
      {children}
      {/* edm version的下拉 */}
      <EdmVersionIdSelect />
      {/* 收合 project info的開關 */}
      <Icon
        icon={IconName.IcoCollapseInfoDown}
        size="2.5rem"
        onClick={() => setEEBomPorjectInfoCollapse(!eeBomProjectCollapse)}
      />
    </div>
  );
};

const ProjectHeaderRightZone = ({ children }) => {
  const { setEEBomPorjectInfoCollapse, eeBomProjectCollapse } = useContext(context);
  return (
    <div className="left-zone" >
      {!eeBomProjectCollapse && children}
    </div >
  );
};

/*
使用方式
<ProjectHeader>
    <ProjectHeaderLeftZone>
      Left
</ProjectHeaderLeftZone>
    <ProjectHeaderRightZone>
      Right
</ProjectHeaderRightZone>
  </ProjectHeader>
  */
function ProjectHeader(props) {
  return (
    <context.Provider value={props}>
      <ProjectHeaderWrapper className="project-header-wrapper">
        {props.children}
      </ProjectHeaderWrapper>
    </context.Provider>
  );
}

const mapStateToProps = (state) => {
  return {
    eeBomProjectCollapse: state.eeBom.eeBomProjectCollapse,
  };
};

const mapDispatchToProps = {
  setEEBomPorjectInfoCollapse: EEBomActions.setEEBomPorjectInfoCollapse
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(ProjectHeader);


export { ProjectHeaderLeftZone, ProjectHeaderRightZone, ProjectHeaderRightControl };
