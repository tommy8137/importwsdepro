import React, { Component, useState, useEffect, useRef, useContext, createContext } from 'react';
import styled from 'styled-components';
import * as R from 'ramda';
import { PartlistFormContext } from '~~elements/PartListForm';


const SideMenu = styled.div`
  height: 100%;
  display: block;
  overflow: hidden;
  overflow-y: auto;
  background-color: #e5e5e5;
  .side-menu-item {
    display: block;
    padding: 0.6rem 1rem;
    transition: 0.3s ease all;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    &:hover {
      opacity: 0.6;
    }
    &.active {
      background-color: #d3d3d3;
    }
  }
`;

const PartlistMenu = () => {
  const [contextValue, dispatch] = useContext(PartlistFormContext);
  const { tabs, selectTab } = contextValue;
  const groups = R.path(['items'], R.find(t => t.key === selectTab, tabs)) || [];
  const getClassName = (groupKey, index) => {
    if (!contextValue.menuAnchor && index === 0) {
      return 'side-menu-item active';
    }
    if (contextValue.menuAnchor === groupKey) {
      return 'side-menu-item active';
    }
    return 'side-menu-item';
  };

  const fn = R.pipe(
    R.filter(g => (
      !Object.prototype.hasOwnProperty.call(g, 'display') ||
      (Object.prototype.hasOwnProperty.call(g, 'display') && g.display))),
    R.uniqBy(g => g.label)
  );

  const groupList = fn(groups);

  return (
    <SideMenu className="side-menu">
      {
        groupList.map((group, index) => {
          return (
            <div
              className={getClassName(group.key, index)}
              key={group.key}
              onKeyUp={() => { }}
              onClick={() => {
                // 找到id是`#part-list-anchor--${group.key}`，讓右邊的form移到top
                const el = document.querySelector(`#part-list-anchor--${group.key}`);
                if (el) {
                  dispatch({ type: 'SET_MENU_ANCHOR', menuAnchor: group.key });
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {group.label}
            </div>
          );
        })}
    </SideMenu>
  );
};

export default PartlistMenu;

