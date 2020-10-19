import React from 'react';
import styled from 'styled-components';
import Checkbox from '~~elements/Checkbox';


const CustomizeCheckbox = styled.div`
  /* height: 2.5rem; */
  padding: .5rem;
  color: #333333;
  background-color: #FFFFFF;
  &:hover {
    color: #FFFFFF;
    background-color: #00A99D;
    cursor: pointer;
  }
`;

const CheckboxOption = ({
  innerProps,
  innerRef,
  isDisabled,
  isSelected,
  data,
  className,
  getStyles,
  ...restProps,
}) => {
  let checkboxRef = React.createRef();
  const handleClick = (e) => {
    innerProps.onClick(e);
  };
  return (
    <CustomizeCheckbox
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
        handleClick(checkboxRef);
      }}
    >
      <Checkbox
        checked={isSelected}
        ref={e => { checkboxRef = e; }}
        onChange={handleClick}
      >
        {data.label}
      </Checkbox>
    </CustomizeCheckbox>
  );
};

export default CheckboxOption;
