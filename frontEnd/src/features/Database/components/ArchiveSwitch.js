import React, { useEffect } from 'react';
import styled from 'styled-components';
import Switch from '~~elements/Switch';
import Field from '~~elements/Field';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .switch{
    margin: 0rem
  }
  .duck-field--label-zone--label{
    margin: 0rem
  }
`;

const ArchiveSwitch = (props) => {
  const {
    width,
    isChecked,
    onChange,
    disabled
  } = props;


  return (
    <Wrapper>
      <Field.Label title="顯示封存項目" />
      <Switch
        checked={isChecked}
        onChange={onChange}
        disabled={disabled}
      />
    </Wrapper>
  );
};

ArchiveSwitch.defaultProps = {
  isChecked: false,
  onChange: () => {},
  disabled: false
};

export default ArchiveSwitch;
