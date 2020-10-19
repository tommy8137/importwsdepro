import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import RoundButton from '~~elements/RoundButton';
import { connect } from 'react-redux';
import ProductMenu from './ProductMenu';

import * as AllAccountsActions from '../../AllAccountsActions';
import { USER_MODAL_TYPE, USER_MODAL_STEP, USER_MODAL_HEADER_TEXT, USER_MODAL_MODE } from '../../AllAccountConst';

const ProductContainer = styled.div`
  /* display: ${({ active }) => (active ? 'block' : 'none')}; */
  .product-control {
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

const ProductForm = props => {
  // type 0: set by ME/EE
  // type 1: set by SCODE
  const [productType, setProduct] = useState(USER_MODAL_TYPE.MEEE);

  const {
    // state
    selectPT,
    // action
    setSelectProductType,
    resetProductTypeMenus,
    // props
    active,
  } = props;
  const onChangeProductType = (val) => {
    setProduct(val);
  };

  useEffect(() => {
    // 切換set typeI時清空下面的typeI menu
    resetProductTypeMenus();
  }, [productType]);

  const MeEeButton = productType === USER_MODAL_TYPE.MEEE ? RoundButton.BlackButton : RoundButton.TransparentButton;
  // const ScodeButton = type === USER_MODAL_TYPE.SCODE ? RoundButton.BlackButton : RoundButton.TransparentButton;

  return (
    <ProductContainer active={active}>
      {
        productType === USER_MODAL_TYPE.MEEE &&
        <ProductMenu
          onChangeProductType={setSelectProductType}
          selectPT={selectPT}
        />
      }
    </ProductContainer>
  );
};


const mapStateToProps = state => {
  return {
    selectPT: state.allAccount.selectPT,
    userInfo: state.allAccount.userInfo,
    userModalMode: state.allAccount.userModalMode
  };
};

const mapDispatchToProps = {
  setSelectProductType: AllAccountsActions.setSelectProductType,
  setModalStep: AllAccountsActions.setModalStep,
  resetProductTypeMenus: AllAccountsActions.resetProductTypeMenus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm);

