import React, { useState } from 'react';
import styled from 'styled-components';
import { ContextProvider, useContextValue } from '~~hooks/useContextProvider';
import RoundButton from '~~elements/RoundButton';
import Icon, { IconName } from '~~elements/Icon';
/*
Usage:
<BaseCell
  value={rows[rowIndex][Columns[columnIndex]['key']]}
  cellInfo={{ columnIndex, key, rowIndex, style: extendStyle }}
/>

*/

const SeeMoreButton = styled(RoundButton.BlackButton)`
  span,
  .icon {
    display:inline-block;
    vertical-align: middle;
  }
  span {
    margin-right: 0.5rem;
  }
  &.active {
    .icon {
      transform: rotate(180deg);
    }
  }
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    transform-origin: center center;
  }
`;


function SeeMoreCell(props) {
  const {
    cellInfo: { columnIndex, key, rowIndex, style },
    value,
    onClick
  } = props;

  const [contextValue, dispatch] = useContextValue();
  const { seeMore } = contextValue;

  const toggleSeeMore = () => {
    dispatch({ type: 'SET_SEEMORE', seeMore: !seeMore });
  };

  return (
    <div className="grid-cell" key={key} style={style}>
      <SeeMoreButton className={`${seeMore ? 'active' : ''}`} color="black" border="false" onClick={toggleSeeMore} >
        <span>{seeMore ? 'Close' : 'See Full Spec'}</span>
        <Icon icon={IconName.IconArrowRight} size="12px" />
      </SeeMoreButton>
    </div>
  );
}

SeeMoreCell.defaultProps = {
  onClick: () => { },
};

export default SeeMoreCell;
