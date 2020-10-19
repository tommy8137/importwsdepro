import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import RoundButton from '~~elements/RoundButton';
import { connect } from 'react-redux';
import TypeMenu from './TypeMenu';
import TypeScode from './TypeScode';

import * as AllAccountsActions from '../../AllAccountsActions';
import { USER_MODAL_TYPE, USER_MODAL_STEP, USER_MODAL_HEADER_TEXT, USER_MODAL_MODE } from '../../AllAccountConst';

const TypeContainer = styled.div`
  /* display: ${({ active }) => (active ? 'block' : 'none')}; */
  .type-control {
    display: block;
    margin-bottom: 1.5rem;
    span,
    button {
      vertical-align: middle;
      display: inline-block;
      margin-right: 1rem;
      &:last-child {
        margin-right: 0;
      }
    }
    button {
      height: auto;
      width: auto;
      padding: 0.4rem 0.8rem;
      border-radius: 2rem;
      margin-right: 1rem;
      font-size: 0.85rem;
      &.active {
        background-color: #333;
        color: white;
      }
    }
  }
`;

const TypeForm = props => {
  // type 0: set by ME/EE
  // type 1: set by SCODE
  const [type, setType] = useState(USER_MODAL_TYPE.MEEE);

  const {
    // state
    selected,
    // action
    setSelected,
    resetType1Menus,
    // props
    active,
  } = props;

  const onChangeType = (val) => {
    setType(val);
  };

  useEffect(() => {
    // 切換set typeI時清空下面的typeI menu
    resetType1Menus();
  }, [type]);

  const MeEeButton = type === USER_MODAL_TYPE.MEEE ? RoundButton.BlackButton : RoundButton.TransparentButton;
  const ScodeButton = type === USER_MODAL_TYPE.SCODE ? RoundButton.BlackButton : RoundButton.TransparentButton;

  return (
    <TypeContainer active={active}>
      <div className="type-control">
        <span>Set TypeI by</span>
        <MeEeButton
          onClick={() => onChangeType(USER_MODAL_TYPE.MEEE)}
        >
          ME/EE
        </MeEeButton>
        <ScodeButton
          onClick={() => onChangeType(USER_MODAL_TYPE.SCODE)}
        >
          Sourcer Code
        </ScodeButton>
      </div>
      {
        type === USER_MODAL_TYPE.MEEE &&
        <TypeMenu
          onChangeSelected={setSelected}
          selected={selected}
        />
      }
      {
        type === USER_MODAL_TYPE.SCODE &&
        <TypeScode
          onChangeSelected={setSelected}
          selected={selected}
        />
      }
    </TypeContainer>
  );
};


const mapStateToProps = state => {
  return {
    selected: state.allAccount.selected,
    userInfo: state.allAccount.userInfo,
    userModalMode: state.allAccount.userModalMode
  };
};

const mapDispatchToProps = {
  setSelected: AllAccountsActions.setSelected,
  setModalStep: AllAccountsActions.setModalStep,
  resetType1Menus: AllAccountsActions.resetType1Menus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TypeForm);

