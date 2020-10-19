import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import * as DatabaseActions from '~~features/Database/DatabaseActions';

import {
  BlueListBoxWrap,
  BlueListBoxTitle,
  BlueListBoxSearchbar,
} from '~~elements/BlueListBox';

import PartCategoryTree from './PartCategoryTree';

// todo: 處理多層的情況
const PartCateContainer = styled.div`
  display: block;
  margin: 0 auto;
  /* width: 24rem; */
  max-width: 100%;
`;

function LinkModal(props) {
  const [keyword, setKeyword] = useState('');

  const {
    data,
    // state
    // actions
    onCheck
  } = props;


  function handleChangeKeyword(val) {
    setKeyword(val);
  }

  /**
   * 當勾選newPartCategory的值的時候，更新state
   * @param {} newPartCategory 新的partCategory
   */
  function handleOnCheck(newPartCategory) {
    onCheck(newPartCategory);
  }

  return (
    <PartCateContainer>
      <BlueListBoxWrap>
        <BlueListBoxTitle>
          Part Category
        </BlueListBoxTitle>
        <BlueListBoxSearchbar
          placeholder="Enter Part Category"
          onChange={handleChangeKeyword}
          value={keyword}
        />
        <PartCategoryTree
          keyword={keyword}
          data={data}
          onCheck={handleOnCheck}
        />
      </BlueListBoxWrap>
    </PartCateContainer >
  );
}

LinkModal.defaultProps = {
};

const mapStateToProps = (state) => {
  return {
    linkItem: state.dataBase.materialPrice.linkItem,
    isLinkModalOpen: state.dataBase.materialPrice.isLinkModalOpen,
    partCategory: state.dataBase.materialPrice.partCategory,
  };
};

const mapDispatchToProps = {
  getMaterialPricePartCategory: DatabaseActions.getMaterialPricePartCategory,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
)(LinkModal);
