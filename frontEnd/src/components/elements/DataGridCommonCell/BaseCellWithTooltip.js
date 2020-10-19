import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EnhanceTooltip } from '~~elements/Tooltip';

const Div = styled.div`
  .grid-cell-value {
    cursor: ${p => (p.hasLabel ? 'pointer' : 'default')};
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hoverUnderline{
    &:hover{ text-decoration: underline; }
  }
`;

function BaseCellWithTooltip(props) {
  const { value, cellInfo, label, helperInfo, onClick } = props;
  const textEl = useRef(null);
  return (
    <Div onClick={onClick} onKeyUp={() => { }} hasLabel={label ? 1 : 0}>
      <div
        className="grid-cell"
        style={{ ...cellInfo.style }}
        ref={textEl}
      >
        <div className="grid-cell-value">{value || '-'}</div>
      </div>
      {/* label,value 兩者都有才顯示 */}
      {
        label && value
          ? (
            <EnhanceTooltip target={textEl} placement="bottom">
              {label}
            </EnhanceTooltip>
          ) : null
      }
    </Div>
  );
}

BaseCellWithTooltip.propTypes = {
  label: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  value: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onClick: PropTypes.func,
  cellInfo: PropTypes.shape({
    style: PropTypes.shape({})
  }),
};

BaseCellWithTooltip.defaultProps = {
  onClick: () => { },
  label: null,
  value: null,
  cellInfo: { style: {} },
};


export default BaseCellWithTooltip;
