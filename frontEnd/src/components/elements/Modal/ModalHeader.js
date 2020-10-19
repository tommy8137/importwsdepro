import React from 'react';
import styled from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';
import { ModalHeader } from 'reactstrap';

const HeaderWrapper = styled(ModalHeader)`
 /* modal標題 */
 .modal-title{
    color: #333333;
    width: 100%;
    display: flex;
    justify-content:center;
    align-items: center;
    position: relative;
  }

  .backwrapper{
    position: absolute;
    font-size: 1rem;
    text-align: center;
    left: -1.5rem;
    cursor: pointer;
    .icon{
      margin-right: 0.5rem
    }
    &:hover{
      opacity: 0.8
    }
  }

  .title-text{
    font-size: 1.375rem;
    text-align: center;
    font-weight: bolder;
  }
`;


const Header = (props) => {
  const { children, onClickBack, hasBack } = props;
  return (
    <HeaderWrapper>
      {hasBack &&
      <div className="backwrapper" onKeyUp={() => {}} onClick={onClickBack}>
        <Icon icon={IconName.IcoArrowLeftBlack} size="1rem" />
        Back
      </div>
      }
      <div className="title-text">
        {children}
      </div>
    </HeaderWrapper>
  );
};

Header.defaultProps = {
  /** 是否需要返回按鈕 */
  hasBack: false,
  /** 返回的function */
  onClickBack: () => {}
};

export default Header;
