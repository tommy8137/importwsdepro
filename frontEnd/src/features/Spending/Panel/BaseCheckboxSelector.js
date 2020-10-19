import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  InputGroup, InputGroupAddon, Input
} from 'reactstrap';
import * as R from 'ramda';
import { compose, withHandlers, withState } from 'recompose';

import Icon from '~~elements/Icon';
import Checkbox from '~~elements/Checkbox';
import {
  TypeSelectorDiv,
  CloseBtn,
  ArrowIcon,
  VerticalLine
} from './SelectorStyles';


const enhance = compose(
  withState('showCloseBtn', 'setShowCloseBtn', false),
  withState('showHint', 'setShowHint', false),
);

@enhance
export default class SupplyTypeSelector extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      term: '',
      dropdownOpen: false,
      selectedOptions: props.selectedOptions,
      options: props.options,
      filteredOptions: props.options,
    };
  }

  /* eslint camelcase: "off" */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!R.equals(nextProps.selectedOptions, this.props.selectedOptions) || !R.equals(nextProps.options, this.props.options)) {
      this.setState({
        selectedOptions: nextProps.selectedOptions,
        options: nextProps.options,
        filteredOptions: nextProps.options,
      });
    }
  }


  getCheckState = (options, selectedOptions) => {
    return {
      checked: selectedOptions.length > 0,
      // 有選了一些，但是沒有全部選完
      indeterminate: selectedOptions.length > 0 && options.length !== selectedOptions.length
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen,
      term: ''
    }), () => {
      if (!this.state.dropdownOpen) {
        this.props.updateSelectedOptions(this.state.selectedOptions);
      }
    });
  }

  handleSelectOne = (selectedItem) => {
    const selectedDataIdList = this.state.selectedOptions;
    const oldSelectedDataIdList = [...selectedDataIdList];

    const isSelectedItemInSelectedOptions = R.find(
      R.propEq('value', selectedItem.value) && R.propEq('label', selectedItem.label)
    )(selectedDataIdList);
    let newSelectedDataIdList = [];
    // 已經選了，要做取消
    if (isSelectedItemInSelectedOptions) {
      // console.log('已經選了，要做取消');
      newSelectedDataIdList = selectedDataIdList.filter(item => item.value !== selectedItem.value);
    } else {
      // 還沒選過，要加進去
      // console.log('還沒選過，要加進去');
      newSelectedDataIdList = [
        ...oldSelectedDataIdList,
        selectedItem
      ];
    }
    this.setState({
      selectedOptions: newSelectedDataIdList
    });
  }

  handleSelectAll = () => {
    const { options, selectedOptions } = this.state;
    // console.log('000001', options, selectedOptions);
    if (options.length === selectedOptions.length) {
      // console.log('目前是全選狀態，要改成非全選');
      // 目前是全選狀態，要改成非全選
      this.setState({
        selectedOptions: []
      });
    } else {
      // console.log('目前不是全選狀態，要改成全選');
      // 目前不是全選狀態，要改成全選
      this.setState({
        selectedOptions: options
      });
    }
  }

  handleSearch = (e) => {
    const term = e.target.value;
    this.setState((prevState) => {
      return {
        filteredOptions: term ? prevState.options.filter(item => item.label.toLowerCase().includes(term.toLowerCase())) : prevState.options,
        term
      };
    });
  }

  handleResetSearch = () => {
    this.setState((prevState) => {
      return {
        filteredOptions: prevState.options,
        term: ''
      };
    });
  }

  handleReset = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.setState(
      () => ({
        selectedOptions: []
      }),
      () => this.props.updateSelectedOptions([]));
  }

  renderHint = (selectedOptions) => {
    return `${selectedOptions.map(item => item.label).join(',')}`;
  }


  render() {
    const { filteredOptions, options, selectedOptions } = this.state;
    const { title } = this.props;
    return (
      <TypeSelectorDiv className="type-selector">
        <Dropdown
          direction="down"
          isOpen={this.state.dropdownOpen}
          toggle={this.toggle}
          onMouseEnter={() => this.props.setShowCloseBtn(() => true)}
          onMouseLeave={() => this.props.setShowCloseBtn(() => false)}
        >
          <DropdownToggle caret>
            <div className="type-selector--header">
              <div
                className={`type-selector--header--left-zone ${this.props.showCloseBtn ? 'hovered' : ''}`}
                onMouseEnter={() => this.props.setShowHint(() => true)}
                onMouseLeave={() => this.props.setShowHint(() => false)}
              >
                <div className="type-selector--header--name">{title}</div>
                <div className="type-selector--header--selected-options">
                  {
                    this.props.showSelectHelper &&
                    this.props.showHint && selectedOptions.length > 0 &&
                    <div className="type-selector--header--selected-options--tooltip">{this.renderHint(selectedOptions)}</div>
                  }
                  <div className="type-selector--header--selected-options--list">{this.renderHint(selectedOptions)}</div>
                  <div>{selectedOptions.length > 0 && `(${selectedOptions.length})`}</div>
                </div>
              </div>

              <div className="type-selector--header--right-zone">
                <Icon
                  icon="BtnDelete"
                  onClick={this.handleReset}
                  className={`${this.props.showCloseBtn && selectedOptions.length > 0 ? 'btn-delete' : 'btn-delete hidden'}`}
                />
                <div className="type-selector--header--right-zone--fix">
                  <VerticalLine />
                  <ArrowIcon down={!this.state.dropdownOpen} />
                </div>
              </div>
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <div className={this.props.showSelectHelper ? 'type-selector--select-helper' : 'type-selector--select-helper hide'}>
              <div className="type-selector--select-helper--select-all">
                <Checkbox
                  className="checkbox"
                  onChange={this.handleSelectAll}
                  {...this.getCheckState(options, selectedOptions)}
                >
                  <span>All</span>
                </Checkbox>
              </div>
              <div className="type-selector--select-helper--search">
                <Icon icon="IcoSearchBlack" className="type-selector--select-helper--search--icon" />
                <input
                  className="type-selector--select-helper--search--input"
                  type="text"
                  onChange={this.handleSearch}
                  value={this.state.term}
                />
                <div className="type-selector--select-helper--search--close-btn">
                  <Icon
                    icon="BtnDelete"
                    onClick={this.handleResetSearch}
                    className="btn-delete--search"
                  />
                </div>
              </div>
            </div>
            <div className="type-selector--select-options">
              {filteredOptions.map(item => {
                return (
                  <div className="type-selector--select-options--item" key={item.label}>
                    <Checkbox
                      className="type-selector--select-options--item-checkbox"
                      onChange={() => this.handleSelectOne(item)}
                      checked={selectedOptions.find(d => d.value === item.value) || false}
                    >
                      <span>{item.label}</span>
                    </Checkbox>
                  </div>
                );
              })}
            </div>
          </DropdownMenu>
        </Dropdown>
      </TypeSelectorDiv>
    );
  }
}
