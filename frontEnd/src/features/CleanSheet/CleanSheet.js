import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Icon, { IconName } from '~~elements/Icon';
import checkingRbac from '~~hoc/CheckingRbac';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;

  .groupTitle{
    margin-bottom: 0.5rem;
    font-weight: 800;
    letter-spacing: 0.5px
  }
  .groupBox{
    display: flex;
    flex-direction: column;
    width: 65%;
    margin: 1rem 0rem;
  }
`;

const Tabs = styled.div`
width: 100%;
display: flex;
padding: 1rem 3rem 0rem;
font-size: 1.25rem;
color: #404040;
.tab-name {
  opacity: 0.3;
  margin-right: 1.5rem;
  cursor: pointer;
  &.active {
    opacity: 1;
    border-bottom: 5px solid #f5c910;
    cursor: default;
  }
}
`;

const RedirectBtn = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.5rem;
  background: rgba(255, 255, 255, 0.5);
  color: rgba(0,0,0,0.75);
  font-size: 0.9rem;
  border-radius: 4px;
  letter-spacing: 0.5px;
  margin: 0.2rem 0rem;
  transition: .3s ease all;
  &:focus{
    box-shadow: none;
  }
  &:hover{
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    text-decoration: none;
    color: rgba(0,0,0,0.75);
  }
`;


const Content = {
  me: [
    {
      group: 'Clean sheet list',
      permission: ['Edit', 'allow', 'cleansheet.me.cal.thermal-module'],
      btns: [
        { title: 'Thermal Module', path: '/g/cleanSheet/thermalModuleCalculator' },
      ]
    },
  ],
  ee: [
    {
      group: 'Clean sheet list',
      permission: ['Edit', 'allow', 'cleansheet.ee.cal.pcb'],
      btns: [
        { title: 'PCB', path: '/g/cleanSheet/pcbCalculator', info: { isReset: true } },
      ]
    },
  ]
};

const CleanSheet = (props) => {
  const { getRbacPath, fuzzyCompareRbac } = props;
  const [activeTab, setActiveTab] = useState(null);
  const [showMeEeTab, setShowMeEeTab] = useState(false);

  useEffect(() => {
    const isME = fuzzyCompareRbac(['Edit', 'allow'], 'cleansheet.me');
    const isEE = fuzzyCompareRbac(['Edit', 'allow'], 'cleansheet.ee');
    if (isME && isEE) {
      setActiveTab('me');
      setShowMeEeTab(true);
    } else if (isME) {
      setActiveTab('me');
    } else if (isEE) {
      setActiveTab('ee');
    }
  }, []);

  return (
    <Fragment>
      {showMeEeTab &&
        <Tabs>
          <div
            className={activeTab === 'me' ? 'tab-name active' : 'tab-name'}
            onClick={() => handleTabSwitch('me')}
            onKeyUp={() => {}}
          >
            ME
          </div>
          <div
            className={activeTab === 'ee' ? 'tab-name active' : 'tab-name'}
            onClick={() => handleTabSwitch('ee')}
            onKeyUp={() => {}}
          >EE
          </div>
        </Tabs>}
      <Wrapper>
        {activeTab && Content[activeTab].map(item => {
          const isShow = getRbacPath(item.permission);
          return isShow && (
          <div className="groupBox" key={item.group}>
            <div className="groupTitle">
              {item.group}
            </div>
            {item.btns.map(btn => {
                return (
                  <RedirectBtn
                    to={{
                    pathname: btn.path,
                    state: btn.info
                  }}
                    key={btn.title}
                  >
                    {btn.title}
                    <Icon icon={IconName.IcoArrowRightBlack} size="0.6rem" />
                  </RedirectBtn>

                  );
                })
              }
          </div>
          );
        })
      }
      </Wrapper>
    </Fragment>
  );

  function handleTabSwitch(tabName) {
    setActiveTab(tabName);
  }
};


const allowList = [
  ['Edit', 'allow', 'cleansheet.me.cal.thermal-module'],
  ['Edit', 'allow', 'cleansheet.ee.cal.pcb'],
];

export default checkingRbac(allowList)(CleanSheet);
