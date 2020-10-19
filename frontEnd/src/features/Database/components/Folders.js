import React, { Component } from 'react';
import styled from 'styled-components';
import Icon from '~~elements/Icon';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-family: Roboto;
  margin: 1.5rem 1.95rem 0rem 1.95rem;
  position: relative;
  top: 0.2rem;

  .folder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 9rem;
    width: 10rem;
    padding-top: 0.8rem;
    transition: .3s ease all;
    .icon {
      width: 6rem;
      &:hover {
        box-shadow: 0px 15px 25px -12px rgba(0,0,0,0.5);
      }
    }

    &.active {
      transition: .3s ease all;
      background: #f7f7f7;
      cursor: auto;
      border-radius: 0.8rem 0.8rem 0rem 0rem;
      .icon {
        box-shadow: none;
        &:hover {
          box-shadow: none;
        }
      }
    }

    .icon {
      width: 6rem;
      &:hover {
        box-shadow: 0px 15px 25px -12px rgba(0,0,0,0.5);
      }
    }

    > span {
      display:block;
      text-align: center;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      color: #333333;
    }
  }
`;

export default class Folders extends Component {
  render() {
    const { activeFolder, folderList, onForderClick } = this.props;
    return (
      <Div>
        { folderList.map(item => {
          return (
            <div
              key={item}
              className={`${activeFolder === item ? 'folder active' : 'folder'}`}
              onClick={() => {
                onForderClick(item);
              }}
              onKeyUp={() => {}}
            >
              {activeFolder === item ? <Icon icon="BtnFolder" type="press" /> : <Icon icon="BtnFolder" />}
              <span>{item}</span>
            </div>
          );
        }) }
      </Div>
    );
  }
}
