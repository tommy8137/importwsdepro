import React from 'react';
import styled from 'styled-components';

import Button, { BTN_COLOR } from '~~elements/Button';
import Icon, { IconName } from '~~elements/Icon';


const StyledButton = styled(Button)`
  width: 100%;
  min-height: 2.5rem;
  margin-bottom: 0.125rem;
  border-bottom: 1px solid #333;
  padding: 0.125rem 0.5rem;
  .icon {
    margin-left: 0.5rem;
  }
`;
function ButtonComponent(props) {
  return (
    <StyledButton
      round
      border={true}
      color={BTN_COLOR.TRANSPARENT}
      onClick={props.onClick}
      disabled={props.disabled}
      className={props.className}
    >
      {props.label}

      {props.isOpen
        ? <Icon icon={IconName.IconArrowUpBlack} size="0.85rem" />
        : <Icon icon={IconName.IconArrowDownBlack} size="0.85rem" />}
    </StyledButton>
  );
}

ButtonComponent.defaultProps = {
  label: '',
  onClick: e => console.log('Select Target onClick'),
  value: null,
  isOpen: false,
};

export default ButtonComponent;
