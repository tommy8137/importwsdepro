import React from 'react';
import styled from 'styled-components';
import LoadingIcon from '~~elements/LoadingIcon';

const BoxWrapper = styled.div`
  display: flex;
  justify-content:center;
  align-items: center;
  width: ${props => (props.width)};
  height: 100%;
  min-width: 0;
  flex-direction: column;
  position: relative;
  .loadingIcon{
    position: absolute;
    right: 1rem;
  }
`;

const FilterBarBox = (props) => {
  const { children, width, isLoading } = props;
  return (
    <BoxWrapper width={width} >
      {children}
      {isLoading && <LoadingIcon className="loadingIcon" />}
    </BoxWrapper>
  );
};

FilterBarBox.defaultProps = {
  children: null,
  width: '100%',
  isLoading: false,
};
export default FilterBarBox;
