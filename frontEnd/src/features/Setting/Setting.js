import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import checkingRbac from '~~hoc/CheckingRbac';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2.5rem 0rem;
  align-items: center;

  .subTitle{
    margin-bottom: 0.5rem;
    font-weight: 800;
    letter-spacing: 0.5px
  }
  .RedirectBtns{
    display: flex;
    flex-direction: column;
    width: 65%;
    margin: 1rem 0rem;
  }
  .arrow{
    border: 1px solid rgba(0, 0, 0, 0.8);
    width: 0.6rem;
    height: 0.6rem;
    border-left: none;
    border-top: none;
    position: absolute;
    transform: rotate(-45deg);
    top: 40%;
    right: 2rem;
  }
`;

const RedirectBtn = styled(NavLink)`
  display: block;
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.5);
  color: rgba(0,0,0,0.75);
  text-align: left;
  font-size: 0.9rem;
  border-radius: 4px;
  letter-spacing: 0.5px;
  width: 100%;
  position: relative;
  transition: .3s ease all;
  margin: 0.2rem 0rem;
  &:focus{
    box-shadow: none;
  }
  &:hover{
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    text-decoration: none;
    color: rgba(0,0,0,0.75);
  }
`;

const allowList = [
  ['List', 'allow', 'permission.all'],
  ['List', 'allow', 'setting.me'],
  ['List', 'allow', 'setting.ee']
];

const Infos = [
  {
    group: 'Permission',
    permission: ['List', 'allow', 'permission.all'],
    btns: [
      { title: 'All Accounts', path: '/g/setting/AllAccounts' },
      { title: 'Role Management', path: '/g/setting/RoleManagement' },
    ]
  },
  {
    group: 'Assignment',
    permission: ['View', 'allow', 'setting.ee'],
    btns: [
      { title: 'EEBOM Assignment', path: '/g/setting/EEbomAssignment' },
    ]
  },
  {
    group: 'Title Management',
    permission: ['View', 'allow', 'setting.me'],
    btns: [
      { title: 'X-Ray SPEC Title Management', path: '/g/setting/XraySpecTitle' },
    ]
  }
];

const Setting = (props) => {
  const { getRbacPath } = props;
  return (
    <Div>
      {
        Infos.map(item => {
          const isShow = getRbacPath(item.permission);
          return isShow && (
            <div className="RedirectBtns" key={item.group}>
              <div className="subTitle">
                {item.group}
              </div>
              {item.btns.map(btn => {
                  return (
                    <RedirectBtn to={btn.path} key={btn.title} e2e={btn.title}>
                      {btn.title}
                      <div className="arrow" />
                    </RedirectBtn>

                  );
                })
              }
            </div>
          );
        })
      }
    </Div>
  );
};

export default checkingRbac(allowList)(Setting);
