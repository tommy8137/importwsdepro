import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import Icon from '~~elements/Icon';
import { EnhancePopover } from '~~elements/Popover';
import * as BomManagementActions from '~~features/BomManagement/BomManagementActions';

const ActionPopoverMenu = styled.div`
  .popover-option {
    cursor: pointer;
    margin: 0;
    transition: 0.3s ease all;
    padding: 0.125rem;
    &:hover {
      background-color: #e3e3e3;
    }
    &:last-child {
      margin-bottom: 0rem;
    }
  }
`;

function EMDMBomTableActionPopover(props) {
  const iconEl = useRef(null);
  const [durationMode, setDurationMode] = useState(false);
  const [toggle, setToggle] = useState(false);
  const {
    userInfo = {},
    openEditBomModal = () => { },
    openParameterModal = () => { },
    togglePermissionModal = () => { },
    record: { id, archive_id: archiveId }, record
  } = props;


  const { role_group: roleGroup } = userInfo;

  const isCe = roleGroup === 'CE';

  function handleOnTogglePopover() {
    setToggle(!toggle);
  }
  function handleClosePopover() {
    setToggle(!toggle);
    handleSetTogglePopover(false);
  }
  function handleSetTogglePopover(newToggle) {
    setToggle(newToggle);
    setDurationMode(false);
  }

  function handleClickProjectInfo(e, bomId) {
    e.stopPropagation();
    openEditBomModal({ id: bomId });
    handleSetTogglePopover(false);
  }

  function handleClickParameters(e, bomId) {
    e.stopPropagation();
    openParameterModal(bomId);
    handleSetTogglePopover(false);
  }

  function handleClickArchive(e) {
    e.stopPropagation();
    if (!archiveId) { // 未封存要封存
      props.archiveEmdmBom(record);
    } else { // 已封存要解封存
      props.unarchiveEmdmBom(archiveId);
    }
  }

  function handleClickSetPermissions(e, bomId) {
    e.stopPropagation();
    handleSetTogglePopover(false);
    togglePermissionModal({ isOpen: true, bomId });
  }

  return (
    <React.Fragment>
      {/* Action icon 按鈕 */}
      <Icon
        onClick={e => {
          e.stopPropagation();
          handleSetTogglePopover(true);
        }}
        icon="IcoMore"
        innerRef={iconEl}
      />
      {/* Icon 的 popover */}
      <EnhancePopover
        placement="bottom-end"
        isOpen={toggle}
        onClickClose={handleClosePopover}
        toggle={handleOnTogglePopover}
        onClickOutside={() => handleSetTogglePopover(false)}
        target={iconEl}
        closeBtn={durationMode}
      >
        <ActionPopoverMenu>
          {/* view information */}
          <div
            className="popover-option"
            onKeyDown={() => { }}
            onClick={(e) => handleClickProjectInfo(e, id)}
          >
            View Project Information
          </div>
          {/* set parameters */}
          <div
            className="popover-option"
            onKeyDown={() => { }}
            onClick={e => handleClickParameters(e, id)}
          >
            Set Project Parameters
          </div>
          {/* archive */}
          <div
            className="popover-option"
            onKeyDown={() => { }}
            onClick={handleClickArchive}
          >
            {(archiveId ? 'Unarchive' : 'Archive')}
          </div>
          {
            isCe && (
              <div
                className="popover-option"
                onKeyDown={() => { }}
                onClick={e => handleClickSetPermissions(e, id)}
              >
                Set Permissions
              </div>
            )
          }
        </ActionPopoverMenu>
      </EnhancePopover>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo
  };
};

const mapDispatchToProps = {
  openEditBomModal: BomManagementActions.openEditBomModal,
  openParameterModal: BomManagementActions.openParameterModal,
  togglePermissionModal: BomManagementActions.togglePermissionModal,
  archiveEmdmBom: BomManagementActions.archiveEmdmBom,
  unarchiveEmdmBom: BomManagementActions.unarchiveEmdmBom,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(EMDMBomTableActionPopover);
