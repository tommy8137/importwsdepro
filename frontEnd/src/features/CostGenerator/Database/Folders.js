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
    .icon {
      width: 6rem;
      &:hover {
        box-shadow: 0px 15px 25px -12px rgba(0,0,0,0.5);
      }
    }

    &.active {
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
      font-size: 0.8rem;
      margin-top: 0.5rem;
      color: #333333;
      letter-spacing: 1px;
    }
  }
`;

export default class Folders extends Component {
  render() {
    const { activeTableType } = this.props;
    return (
      <Div>
        { this.props.tableTypeList.map(item => {
          return (
            <div
              key={item}
              className={`${activeTableType === item ? 'folder active' : 'folder'}`}
              onClick={() => {
                this.props.handleTableTypeChange(item);
              }}
              onKeyUp={() => {}}
            >
              {activeTableType === item ? <Icon icon="BtnFolder" type="press" /> : <Icon icon="BtnFolder" />}
              <span>{item}</span>
            </div>
          );
        }) }
      </Div>
    );
  }
}
