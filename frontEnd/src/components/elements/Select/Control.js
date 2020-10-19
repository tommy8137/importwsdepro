import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Checkbox from '~~elements/Checkbox';
import Search from './SearchInput';

const Wrapper = styled.div`
  .checkbox {
    line-height: 2rem;
  }
`;

const Control = ({
  selectProps: {
    onMenuInputFocus,
    onInputChange,
    isOpen,
    styles,
    controlSetting: {
      indeterminate,
      onSelectAll,
      selectAll,
      inputValue,
    },
    ...restSelect,
  },
  ...restProps,
}) => {
  let searchRef = React.createRef();

  useEffect(() => {
    if (searchRef) {
      searchRef.current.focus();
    }
  }, [isOpen]);

  const handleChange = (value) => {
    onInputChange(value);
    // onInputChange(value, {
    //   action: 'input-change',
    // });
  };


  return (
    <Wrapper style={{ ...styles.control() }}>
      <Search
        onChange={handleChange}
        innerRef={searchRef}
        onMouseDown={e => e.target.focus()}
        onTouchEnd={e => e.target.focus()}
        onFocus={onMenuInputFocus}
        value={inputValue}
      />
      {restSelect.isMulti &&
      <Checkbox
        onChange={e => onSelectAll(e.target.checked)}
        checked={selectAll || indeterminate}
        indeterminate={indeterminate}
      >
          Select all
      </Checkbox>}
    </Wrapper>);
};

export default Control;
