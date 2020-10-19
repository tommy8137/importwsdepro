import React, { useRef } from 'react';
import styled from 'styled-components';
import { EnhanceTooltip } from '~~elements/Tooltip';

const Div = styled.div`
  &.header-wrapper {
    display: flex;
    transition: .3s ease all;
    &:hover {
      cursor: pointer;
      text-decoration: underline;
      transition: .3s ease all;
    }
  }
`;


function HeaderDropdownCell(props) {
  const {
    cellInfo: { key, style },
    value,
    onClick,
    children,
  } = props;
  const iconEl = useRef(null);


  return (
    <div className="grid-cell" key={key} style={style} onClick={onClick} onKeyUp={() => { }}>
      <Div className="header-wrapper" innerRef={iconEl}>
        <div className="header-wrapper__content">{value}</div>
      </Div>
      <EnhanceTooltip
        target={iconEl}
        placement="bottom"
      >
        {children}
      </EnhanceTooltip>
    </div>
  );
}

HeaderDropdownCell.defaultProps = {
  onClick: () => { },
};

export default HeaderDropdownCell;
