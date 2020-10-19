import React from 'react';
import styled from 'styled-components';
import Icon from '~~elements/Icon';

const OutBox = styled.div`
  height: ${props => (props.height)};
  width: ${props => (props.width)};
  border-radius: .25rem;
  border: 0.5px solid #adadad;
  background-color: #ffffff;
  color: #333;
  display: flex;
  align-items: center;
  justify-items: flex-start;
`;

const ResetIcon = styled.div`
  display: flex;
  height: 100%;
 .btn-reset{
    width: 1.2rem;
    display: flex;
    align-items: center;
    margin: 0rem 0.8rem;
  }
`;

const SearchBtn = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: .25rem;
  border-bottom-right-radius: .25rem;
  transition: 0.3s ease all;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  padding: 0 0.8rem;
  border: none;
  background: #333333;
  color: white;
  letter-spacing: 1px;
  font-size: 0.8rem;
  white-space: nowrap;
  .icon{
    margin: 0 0.5rem
  }
`;

const FilterBarPanel = (props) => {
  const {
    children,
    resetDisabled,
    onReset,
    filterDisabled,
    onFilter,
    width,
    height,
    customClickIcon
  } = props;

  const extendsProps = {
    resetIcon: {
      onClick: onReset,
      className: 'btn-reset',
      disabled: resetDisabled
    },
    filterBtn: {
      onClick: onFilter,
      onKeyDown: () => { },
      disabled: filterDisabled
    },
  };

  if (resetDisabled) {
    extendsProps.resetIcon.onClick = () => { };
  }

  if (filterDisabled) {
    extendsProps.filterBtn.onClick = () => { };
  }

  return (
    <OutBox width={width} height={height}>
      {children}
      <ResetIcon>
        <Icon
          icon="BtnReset2"
          {...extendsProps.resetIcon}
        />
      </ResetIcon>
      <SearchBtn {...extendsProps.filterBtn} className="e2e_searchBtn">
        {customClickIcon}
      </SearchBtn>
    </OutBox>
  );
};

FilterBarPanel.defaultProps = {
  /** 放<Dropdown /> 可以隨意放幾個都可以 */
  children: null,
  /** FilterBar的寬度 */
  width: '100%',
  /** FilterBar的高度 */
  height: '3rem',
  /** Filter按鈕是否disable */
  filterDisabled: false,
  /** Filter按鈕的function */
  onFilter: () => { },
  /** Reset Btn 是否disable */
  resetDisabled: false,
  /** Reset的function */
  onReset: () => { },
  /**  */
  customClickIcon: 'Search'
};

export default FilterBarPanel;
