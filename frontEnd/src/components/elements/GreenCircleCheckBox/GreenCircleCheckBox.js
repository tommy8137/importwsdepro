import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';


function GreenCircleCheckBox(props) {
  const { isCheck, handleClick, disabled } = props;
  const extendProps = {
    onClick: disabled ? () => {} : handleClick
  };
  return (
    <Icon
      icon={isCheck ? IconName.Checked : IconName.Empty}
      {...extendProps}
    />
  );
}

GreenCircleCheckBox.propTypes = {
  isCheck: PropTypes.bool,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
};

GreenCircleCheckBox.defaultProps = {
  isCheck: false,
  handleClick: () => {},
  disabled: false
};


export default GreenCircleCheckBox;
