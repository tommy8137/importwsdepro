
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import useResource from '~~hooks/useResource';
import Icon, { IconName } from '~~elements/Icon';
import BomManagementResource from '~~apis/resource/BomManagementResource';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';

const PinStar = styled(Icon)`
&:hover {
  cursor: pointer;
  path {
    fill: #fff1b9;
  }
  g {
    stroke: ${({ pinned }) => (pinned ? 'none' : '#fff1b9')};
    stroke-width: 2;
  }
}
path {
  fill: ${({ pinned }) => (pinned ? '#f5c910' : 'none')};
}
g {
  stroke: ${({ pinned }) => (pinned ? 'none' : '#f5c910')};
  stroke-width: 2;
}
`;


function EmdmPinStar(props) {
  const {
    // for pin
    data,
    pinId,
    // for search BOM
    table: role,
    sortInfo: orderBy,
    currentPage: pages,
    filterType: column,
    filterValue: keyword,
    searchValue: project,
    pageSize: items,
  } = props;

  /* APIs */
  const pinBomProject = useResource(
    BomManagementResource.pinBomProject,
    '',
    null,
    { message: '修改失敗，請稍後再試', level: 'error' }
  );
  const unpinBomProject = useResource(
    BomManagementResource.unpinBomProject,
    '',
    null,
    { message: '修改失敗，請稍後再試', level: 'error' }
  );

  const handleClick = (e) => {
    e.stopPropagation();
    if (!pinId) { // call 加最愛API
      pinBomProject.exec({
        ...data,
      });
    } else { // call 移除最愛API
      unpinBomProject.exec(pinId);
    }
    props.getBomList({
      role,
      orderBy,
      pages,
      column,
      keyword,
      project,
      items,
    });
  };
  return (
    <PinStar
      onClick={handleClick}
      icon={IconName.IcoStar}
      pinned={!!pinId}
    />

  );
}


const mapStateToProps = (state) => {
  return {
    table: state.bomManagement.table,
    sortInfo: state.bomManagement.sortInfo,
    currentPage: state.bomManagement.currentPage,
    pageSize: state.bomManagement.pageSize,
    filterType: state.bomManagement.filterType,
    filterValue: state.bomManagement.filterValue,
    searchValue: state.bomManagement.searchValue,
  };
};
const mapDispatchToProps = {
  getBomList: BomManagementActions.getBomList,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(EmdmPinStar);
