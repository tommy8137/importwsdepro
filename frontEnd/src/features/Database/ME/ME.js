import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';
import Content from './ContentSetting';

const Btns = styled.div`
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
  cursor: pointer;
  &:hover{
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
    text-decoration: none;
    color: rgba(0,0,0,0.75);
  }
`;

function ME(props) {
  function handleRedirect(info) {
    props.history.push(info.routerName);
  }
  return (
    <Fragment>
      {Content.groups.map(item => {
      return (
        <div className="groupBox" key={item.group}>
          {/* <div className="groupTitle">
            {item.group}
          </div> */}
          {item.btns.filter(info => info.routerName !== '').map(btn => {
            return (
              <Btns
                onClick={() => handleRedirect(btn)}
                onKeyUp={() => { }}
              >
                {btn.title}
                <Icon icon={IconName.IcoArrowRightBlack} size="0.6rem" />
              </Btns>

            );
          })
          }
        </div>
      );
    })
    }
    </Fragment>
  );
}


export default ME;
