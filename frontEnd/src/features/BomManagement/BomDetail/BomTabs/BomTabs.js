import React, { Component, useState, useEffect, useRef, useContext, createContext } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as BomDetailActions from '../BomDetailActions';


const Tab = styled.button`
  cursor: pointer;
  flex: 0 auto;;
  padding: 0.375rem 0rem;
  /* border-bottom: 4px solid transparent; */
  margin-right: 4rem;
  background-color: transparent;
  border: none;
  border-bottom: ${({ active }) => (active ? '6px solid #f5c910' : 'transparent')};
  &:last-child {
    margin-right: 0px;
  }
  p {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    font-size: 1rem;
    font-weight: normal;
    color: ${({ active }) => (active ? '#333333' : '#808080')};
    /* opacity: ${({ active }) => (active ? '1' : '0.2')}; */
    font-weight: ${({ active }) => (active ? 'bolder' : '')};
  }
  .unread {
    display: inline-block;
    vertical-align: middle;
    background-color: red;
    font-size: 0.4rem;
    color: white;
    padding: 2px 4px;
    border-radius: 1rem;
    margin-left: 0.5rem;
    line-height: 1;
  }
`;

const BomTabs = (props) => {
  const { activeTab, unEditCount } = props;
  const handleChangeTab = (val) => {
    props.setActiveTabAction(val);
    const { bomID, assignItem: { bomDesigneeID } } = props;
    props.getBomItemList({ bomID, assign: bomDesigneeID });
  };

  return (
    <React.Fragment>
      <Tab active={activeTab === 0} onClick={() => handleChangeTab(0)}>
        <p>ME Input BOM</p>
      </Tab>
      <Tab active={activeTab === 1} onClick={() => handleChangeTab(1)}>
        <p>PartList</p>
        <span className="unread">{unEditCount || 0}</span>
      </Tab>
    </React.Fragment>
  );
};

export default connect(
  (state) => {
    return {
      activeTab: state.bomDetail.activeTab,
      bomID: state.bomDetail.bomID,
      assignItem: state.bomDetail.assignItem,
    };
  },
  {
    getBomDetailActions: BomDetailActions.getBomDetail,
    setActiveTabAction: BomDetailActions.setActiveTab,
    getBomItemList: BomDetailActions.getBomItemList,
  }
)(BomTabs);
