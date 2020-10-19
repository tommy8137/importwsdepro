import React, { Component, useState, useEffect, useRef, useContext, createContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Resource from '~~apis/resource';
import * as NotificationSystemActions from '~~hoc/NotificationSystem/NotificationSystemActions';
import Button from '~~elements/Button';
import { dispatchNotification, dispatchLoading } from '~~utils/CommonUtils';
import _get from 'lodash/get';
import * as BomDetailActions from './BomDetailActions';
import EmdmInputBom from './EmdmInputBom';
import PartList from './PartList';


const DebugBlock = styled.div`
  position: fixed;
  top: 0;
  right:0;
  z-index: 999;
  .button {
    display: inline-block;
  }

`;

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
  const [emdmDebugMode, toggleEmdmDebugMode] = useState(false);

  /* debug section */
  useEffect(() => {
    if (!window.toggleEmdmDebugMode) {
      window.toggleEmdmDebugMode = toggleEmdmDebugMode;
    }

    return () => {
      window.toggleEmdmDebugMode = undefined;
      // 離開這個頁面時reset store
      props.resetBomDetail();
    };
  }, []);

  function handleUpdateLastPrice() {
    Resource.BomDetailResource.updateMEBomLastPrice(meBomId)
      .then(res => {
        props.pushNotification({ message: '更新成功', level: 'success' });
        // 從新取得表單
        props.getBomItemList({ bomID: meBomId, assign: 'all' });
      })
      .catch(err => props.pushNotification({ message: '更新失敗，請稍後再試', level: 'error' }));
  }
  /* debug section */


  /**
   * 重新收這張emdm Bom
   */
  async function handleReReceive() {
    dispatchLoading(true);
    try {
      const { data: { ppchIds = [] } } = await Resource.BomDetailResource.removeEmdmBom([meBomId]);
      const ppchId = _get(ppchIds, ['0'], false);
      if (ppchId) {
        const { data: { bomIds = [] } } = await Resource.BomDetailResource.syncEmdmBom([ppchId]);
        const newBomId = _get(bomIds, ['0'], false);
        if (newBomId) {
          props.history.push({
            pathname: `/g/emdmBomDetail/${newBomId}`,
          });
        }
      }
    } catch (e) {
      console.log('handleReReceive error >>>', e);
      dispatchNotification({ message: '僅供開發使用' });
    }
    dispatchLoading(false);
  }
  /* ********************************* debug section ********************************* */

  useEffect(() => {
    props.getBomDetailActions({ bomID: meBomId });
  }, [meBomId]);

  return (
    <BomContainer>
      {
        emdmDebugMode &&
        <DebugBlock className="debug-block">
          <Button
            round
            color="black"
            onClick={handleReReceive}
          >
            重收此bom
          </Button>
          <Button
            round
            color="green"
            onClick={handleUpdateLastPrice}
          >
            算價錢
          </Button>
        </DebugBlock>
      }
      {activeTab === 0 ? <EmdmInputBom meBomId={meBomId} /> : <PartList meBomId={meBomId} />}
    </BomContainer>
  );
};

export default connect(
  (state) => {
    return {
      activeTab: state.bomDetail.activeTab,
      selectedSkuNum: state.bomDetail.selectedSkuNum
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
