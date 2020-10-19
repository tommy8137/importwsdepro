import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import * as BomDetailActions from '../BomDetailActions';

const BomMenu = styled.div`
  width: calc(100% - 10rem);
  /* margin-left: 10rem; */
  height: 100%;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  overflow-x: overlay;
  position: relative;
  .pager {
    position: absolute;
    right: 2rem;
    top: 50%;
    transform: translate(0, -50%);
    .prev, .next {
      margin: 0;
      &:after {
        margin: 0;
        display: block;
        width: 0;
        height: 0;
        border-style: solid;
      }
    }
    .next {
      &:after {
        content:'';
        border-width:  9px 0 9px 15.6px;
        border-color: transparent transparent transparent #c5c5c5;
      }
    }
    .prev {
      margin-right: 18px;
      &:after {
        content:'';
        border-width: 9px 15.6px 9px 0;
        border-color: transparent #c5c5c5 transparent transparent;
      }
    }
  }
  .tab {
    margin: 0 4rem 0 0;
    padding-bottom: 0.375rem;
    flex: 0 auto;;
    cursor: pointer;
    border-bottom: 6px solid transparent;
    transition: 0.3s ease all;
    &:last-child {
      margin-right: 0px;
    }
    &.active {
      border-bottom: 6px solid #f5c910;
      p {
        color: #333333;
      }
    }
    span {
      color: #aaa;
      font-size: 0.6rem;
      display: block;
      line-height: 1;
    }
    p {
      display: block;
      margin: 0;
      font-size: 1rem;
      font-weight: normal;
      white-space: nowrap;
      color: #808080;
    }
  }

`;

@connect(
  (state) => {
    return {
      bomID: state.bomDetail.bomID,
      assignData: state.bomDetail.assignData,
      assignItem: state.bomDetail.assignItem
    };
  },
  {
    setBomAssignAction: BomDetailActions.setBomAssignItem,
    getBomItemListAction: BomDetailActions.getBomItemList,
  }
)


export default class BomMenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() { }
  onAssignItemClick = (assignItem) => {
    const { bomID } = this.props;
    const assignID = assignItem ? assignItem.bomDesigneeID : '';
    this.props.setBomAssignAction(assignItem);
    this.props.getBomItemListAction({ bomID, assign: assignID });
  }
  render() {
    const { assignData: { assignList }, assignItem, assignItem: { bomDesigneeID } } = this.props;
    return (
      <BomMenu>
        <label className={`tab ${!bomDesigneeID ? 'active' : ''}`} onClick={() => this.onAssignItemClick()}>
          <p>ALL</p>
        </label>
        {
          assignList.map((item, i) => {
            return (
              <label key={i} className={`tab ${bomDesigneeID === item.bomDesigneeID ? 'active' : ''}`} onClick={() => this.onAssignItemClick(item)}>
                <span>{item.assign}</span>
                <p>{item.employeeName}</p>
              </label>
            );
          })
        }
      </BomMenu>
    );
  }
}
