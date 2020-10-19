import React, { Component, useState, useEffect, useRef, useContext, createContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Resource from '~~apis/resource';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import RoundButton from '~~elements/RoundButton';
import * as BomDetailActions from './BomDetailActions';
import InputBom from './InputBom';
import PartList from './PartList';

const BomContainer = styled.div`
  padding: 1rem;
  .btn-ok {
    position: absolute;
    width: 12rem;
    height: 2.5rem;
    background: transparent;
    color: #fff;
    font-size: 0.95rem;
    &:focus {
      box-shadow: none;
      outline: 0;
    }
    &:hover {
      border: 1px solid #fff;
    }
  }
`;

const BomDetail = (props) => {
  const { activeTab, selectedSkuNum } = props;
  const { meBomId } = props.match.params;

  /* ********************************* debug section ********************************* */
  const [showUpdateLastPriceBtn, setShowUpdateLastPriceBtn] = useState(false);


  /* debug section */
  useEffect(() => {
    if (!window.toggleUpdateLastPriceBtn) {
      window.toggleUpdateLastPriceBtn = setShowUpdateLastPriceBtn;
    }
    return () => {
      window.toggleUpdateLastPriceBtn = undefined;
      // 離開這個頁面時reset store
      props.resetBomDetail();
    };
  }, []);
  function handleUpdateLastPrice() {
    console.log('props', props);
    Resource.BomDetailResource.updateMEBomLastPrice(meBomId)
      .then(res => {
        props.pushNotification({ message: '更新成功', level: 'success' });
        // 從新取得表單
        props.getBomItemList({ bomID: meBomId, assign: 'all' });
      })
      .catch(err => props.pushNotification({ message: '更新失敗，請稍後再試', level: 'error' }));
  }
  /* debug section */
  /* ********************************* debug section ********************************* */

  useEffect(() => {
    props.getBomDetailActions({ bomID: meBomId, });
  }, [meBomId]);

  return (
    <BomContainer>
      {showUpdateLastPriceBtn ? <RoundButton.GreenButton onClick={handleUpdateLastPrice}>算價錢</RoundButton.GreenButton> : null}
      {activeTab === 0 ? <InputBom meBomId={meBomId} /> : <PartList meBomId={meBomId} />}
    </BomContainer>
  );
};

export default connect(
  (state) => {
    return {
      activeTab: state.bomDetail.activeTab,
      selectedSkuNum: state.bomDetail.selectedSkuNum,
    };
  },
  {
    getBomItemList: BomDetailActions.getBomItemList,
    getBomDetailActions: BomDetailActions.getBomDetail,
    setActiveTabAction: BomDetailActions.setActiveTab,
    resetBomDetail: BomDetailActions.resetBomDetail,
    pushNotification: NotificationSystemActions.pushNotification,
  }
)(BomDetail);
