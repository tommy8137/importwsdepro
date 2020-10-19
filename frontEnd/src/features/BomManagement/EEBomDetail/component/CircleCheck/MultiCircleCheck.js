import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { injectGlobal } from 'styled-components';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import Icon, { IconName } from '~~elements/Icon';

// import useOutsideClick from '~~hooks/useOutsideClick';

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  .multi-circle-popover {
    .multi-circle-popover-inner {
      background-color: black;
    }
    .multi-circle-popover__body {
      display: flex;
      width: 5rem;
      justify-content: space-between;

      &__btn {
        cursor: pointer;
        border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;
        background: transparent;
        color: inherit;
        font: inherit;
      }
    }
    /* .bs-popover-top > .arrow::after, .bs-popover-auto[x-placement^="top"] > .arrow::after */
    .arrow::after {
      border-top-color: black;
    }
  }
`;

const StyleDiv = styled.div`
  .icon {
    cursor: pointer;
  }
`;

function MultiCircleCheck(props) {
  const { checkedStatus, handleClick, id } = props;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const targetId = `PopoverFocus${id}`;

  function getIcon() {
    if (checkedStatus === 'approve') {
      return IconName.Checked;
    }
    if (checkedStatus === 'reject') {
      return IconName.Reject;
    }
    return IconName.Empty;
  }


  function handleChoose(option) {
    handleClick(option);
    setIsPopoverOpen(!isPopoverOpen);
  }

  return (
    <StyleDiv>
      <div id={targetId}><Icon icon={getIcon()} /></div>
      <UncontrolledPopover
        boundariesElement="window"
        trigger="legacy"
        placement="top"
        target={targetId}
        className="multi-circle-popover"
        innerClassName="multi-circle-popover-inner"
        isOpen={isPopoverOpen}
        toggle={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        <PopoverBody>
          <div className="multi-circle-popover__body">
            <button className="multi-circle-popover__body__btn" onClick={() => handleChoose('approve')}>
              <Icon icon={IconName.Checked} />
            </button>
            <button className="multi-circle-popover__body__btn" onClick={() => handleChoose('reject')} >
              <Icon icon={IconName.Reject} />
            </button>
            <button className="multi-circle-popover__body__btn" onClick={() => handleChoose(null)} >
              <Icon icon={IconName.Empty} />
            </button>
          </div>
        </PopoverBody>
      </UncontrolledPopover>
    </StyleDiv>
  );
}

MultiCircleCheck.propTypes = {
  checkedStatus: PropTypes.string,
  handleClick: PropTypes.func,
};

MultiCircleCheck.defaultProps = {
  checkedStatus: null,
  handleClick: () => { }
};


export default MultiCircleCheck;
