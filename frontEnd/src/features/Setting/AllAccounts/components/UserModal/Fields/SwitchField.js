import React, { Component } from 'react';
import styled from 'styled-components';
import Switch from '~~elements/Switch';

const SwitchField = (props) => {
  const {
    value,
    name,
    onChange,
    disabled
  } = props;


  const handleOnChange = () => {
    onChange(name, !value);
  };

  return (
    <Switch
      checked={value}
      onChange={handleOnChange}
      disabled={disabled}
    />
  );
};


export default SwitchField;
