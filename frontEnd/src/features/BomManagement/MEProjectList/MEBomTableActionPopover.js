import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import Icon from '~~elements/Icon';
import { EnhancePopover, PopoverBody } from '~~elements/Popover';

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

const DurationModeList = styled.div`
  text-align: left;
  padding: 0.2rem 1rem 0.2rem 0.2rem;
  .title {
    font-weight: 500;
    color: #333;
  }

  .content {
    color: #333333;
    margin-top: 0.5rem;
    word-wrap: break-word;
    word-break:break-all;
    line-height: 1.5;
  }
  .grid-cell-value {
    cursor: pointer;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function MEBomTableActionPopover(props) {
  const iconEl = useRef(null);
  const [durationMode, setDurationMode] = useState(false);
  const [toggle, setToggle] = useState(false);
  const {
    openEditBomModal = () => { },
    openParameterModal = () => { }
  } = props;

  const { record: { id, duration } } = props;
  // duration 列表
  const durationList = getDurationList(duration);

  function getDurationList(dur) {
    if (!Array.isArray(dur)) {
      return [];
    }
    let versionRegex = /^V\d+\.0$/g;
    let finalDuration = dur.filter(item => {
      if (item.version_name === 'V0.0') {
        return true;
      }
      return !versionRegex.test(item.version_name);
    });
    return finalDuration.slice(0, 3);
  }

  function handleSetDurationMode(newDurationMode) {
    setDurationMode(newDurationMode);
  }

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

  function handleClickDuration(e) {
    e.stopPropagation();
    handleSetDurationMode(true);
  }

  function handleClickParameters(e, bomId) {
    e.stopPropagation();
    openParameterModal(bomId);
    handleSetTogglePopover(false);
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

        {
          durationMode ?
            <DurationModeList>
              <div className="title">Duration for past three versions</div>
              <div className="content">
                {durationList.map((item, idx) => {
                  return (<div key={idx}>{item.version_name} &nbsp;&nbsp; lasting for &nbsp;&nbsp; {item.timeDiff}</div>);
                })}
              </div>
            </DurationModeList>
            :
            <ActionPopoverMenu>
              <div className="popover-option" onKeyDown={() => { }} onClick={(e) => handleClickProjectInfo(e, id)}>View Project Information</div>
              <div className="popover-option" onKeyDown={() => { }} onClick={(e) => handleClickDuration(e)}>Duration</div>
              <div
                className="popover-option"
                onKeyDown={() => { }}
                onClick={e => handleClickParameters(e, id)}
              >
                Set Project Parameters
              </div>
            </ActionPopoverMenu>
        }
      </EnhancePopover>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  openEditBomModal: BomManagementActions.openEditBomModal,
  openParameterModal: BomManagementActions.openParameterModal,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(MEBomTableActionPopover);
