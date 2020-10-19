import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose, withHandlers, withState, lifecycle, withStateHandlers } from 'recompose';
import * as R from 'ramda';
import { connect } from 'react-redux';

import Checkbox from '~~elements/Checkbox';

import * as PlantSourcerSelectorActions from './PlantSourcerSelectorActions';


const ListCheckboxSelectorDiv = styled.div`
  height: 100%;
  .list-selector {
    &-header {
      height: 7%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      &--title {
        margin-left: 0.5rem;
      }
      &--tag-list {
        &--badge {
          cursor: pointer;
          margin-right: 0.5rem;
          /* padding: 1px 9px 2px; */
          padding: 1px 5px 1px;
          font-size: 0.7rem;
          font-weight: bold;
          white-space: nowrap;
          color: #ccc;
          background-color: #e6e6e6;
          border-radius: 0.5rem;
          &.active {
            color: #ffffff;
            background-color: #00a99d;
          }
          @media (max-width: 1440px) {
            margin-right: 0.1rem;
            font-size: 0.5rem;
            padding: 1px 3px 1px;
          }
        }
      }
    }

    &-content {
      height: 93%;
      overflow: auto;
      border: 1px solid #ccc;
      border-radius: 0.2rem;

      &--wrapper {
        /* margin: 0.5rem; */
        padding: 0.2rem;
        background-color: #e6e6e6;


        &.checked {
          background-color: #fff;
          border-bottom: 1px solid #ccc;
        }
      }
    }
  }
`;


export default class ListCheckboxSelector extends Component {
  // 取得目前 Spec 的勾選狀態
  getCheckState = (filteredDataList, selectedDataIdList) => {
    return {
      checked: selectedDataIdList.length > 0,
      // 有選了一些，但是沒有全部選完
      indeterminate: selectedDataIdList.length > 0 && filteredDataList.length !== selectedDataIdList.length
    };
  }

  // 全選或是全不選
  handleSelectAll = () => {
    const { filteredDataList, selectedDataIdList } = this.props;
    const oldSelectedDataIdList = [...selectedDataIdList];
    let newSelectedDataIdList = [];
    // 目前是打勾的，要改成沒打勾
    if (this.getCheckState(filteredDataList, selectedDataIdList).checked) {
      newSelectedDataIdList = [];
    } else {
      newSelectedDataIdList = filteredDataList.map(item => item.idCode);
    }
    this.props.onChangeSelectedOptions(oldSelectedDataIdList, newSelectedDataIdList);
  }

  handleChangeOption(idCode) {
    const { selectedDataIdList } = this.props;
    const oldSelectedDataIdList = [...selectedDataIdList];

    let newSelectedDataIdList = [];
    // 已經選了，要做取消
    if (selectedDataIdList.includes(idCode)) {
      // console.log('已經選了，要做取消');
      newSelectedDataIdList = selectedDataIdList.filter(item => item !== idCode);
    } else {
      // 還沒選過，要加進去
      // console.log('還沒選過，要加進去');
      newSelectedDataIdList = [
        ...selectedDataIdList,
        idCode
      ];
    }
    this.props.onChangeSelectedOptions(oldSelectedDataIdList, newSelectedDataIdList);
  }

  handleChangeSelectedPlants(item) {
    this.props.onFilterAvailableDataList(item);
  }

  render() {
    // console.log('ListCheckboxSelectorListCheckboxSelector;;;;;;;', this.props);
    const { filteredDataList, selectedDataIdList, dataBadgeGroupBy, selectedFilteredBagesList } = this.props;
    return (
      <ListCheckboxSelectorDiv>
        <div className="list-selector-header">
          <div className="list-selector-header--title">
            <Checkbox
              className="checkbox"
              onChange={this.handleSelectAll}
              {...this.getCheckState(filteredDataList, selectedDataIdList)}
            >
              {this.props.title}
              ({selectedDataIdList.length})
            </Checkbox>
          </div>
          <div className="list-selector-header--tag-list">
            {
              Object.keys(dataBadgeGroupBy).map(item => {
                return (
                  <span
                    key={item}
                    className={selectedFilteredBagesList.includes(item) ? 'list-selector-header--tag-list--badge active' : 'list-selector-header--tag-list--badge'}
                    onClick={() => this.handleChangeSelectedPlants(item)}
                    onKeyUp={() => {}}
                  >
                    {item}
                  </span>
                );
              })
            }
          </div>
        </div>
        <div className="list-selector-content">
          {filteredDataList.map(item => {
            return (
              <div
                className={selectedDataIdList.includes(item.idCode) ? 'list-selector-content--wrapper checked' : 'list-selector-content--wrapper'}
                key={item.idCode}
              >
                <Checkbox
                  className="list-selector-content--checkbox"
                  onChange={() => this.handleChangeOption(item.idCode)}
                  checked={selectedDataIdList.includes(item.idCode)}
                >
                  <span>{item.displayName}</span>
                </Checkbox>
              </div>
            );
          })}
        </div>
      </ListCheckboxSelectorDiv>
    );
  }
}
