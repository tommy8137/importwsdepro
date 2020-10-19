import React from 'react';
import styled from 'styled-components';

const GroupBox = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  width: ${props => (props.width)};
  height: 100%;
  border-right: 1px solid #adadad;
  min-width: 0;
  .icon-box{
    display: flex;
    justify-content:center;
    align-items: center;
    height: 65%;
    padding: 0 0.5rem;
    .icon{
      width: 1.5rem;
    }
  }

  &:div {
    border-right: 1px solid #adadad;
  }

  > div:not(:first-child)::after {
    content: '';
    display: inline-block;
    width: 0;
    height: 70%;
    border: 0.5px solid #ccc;
    position: absolute;
    left: 0px;
  }

`;

const FilterBarGroup = (props) => {
  const { children, icon, width } = props;
  return (
    <GroupBox width={width}>
      {icon &&
      <div className="icon-box">
        {icon}
      </div>}
      {children}
    </GroupBox>
  );
};

FilterBarGroup.defaultProps = {
  children: null,
  width: '100%',
  icon: null
};
export default FilterBarGroup;
