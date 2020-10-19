import React, { Component } from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import Icon from '~~elements/Icon';

const Div = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
position: relative;
.btn-search {
  background-color: #333333;
  border-radius: 0px 5px 5px 0px;
  width: 3.2rem;
  padding: 5px 12px;
  height: 2.5rem;
  &.lock {
    cursor: not-allowed;
    opacity: .7;
  }
}

.search-bar {
  display: flex;
  align-items: center;
  margin-left: 1.875rem;
  input {
    display: inline-block;
    width: 15rem;
    height: 2.5rem;
    font-size: 1rem;
    background-color: #ffffff;
    border-radius: 5px 0px 0px 5px;
    border: 1px solid #cccccc;
    border-right: none;

    &:focus {
      box-shadow: none;
    }

    /* 移除驗證失敗時 input會出現紅色叉叉導致跑版 */
    &.is-invalid {
      background: none;
    }
  }

  .btn-delete {
    display: block;
    cursor: pointer;
    width: 1.2rem;
    background: none;
    border: none;
    text-align: center;
    color: #808080;
    margin-left: -2.2rem;
    margin-right: 1rem;

    &.hidden {
      display: none;
    }
  }
}

  .message {
    height: 20px;
    line-height: 20px;
    color: red;
    position: absolute;
    font-size: 0.65rem;
    width: 101%;
    text-align: left;
    padding: 0.25rem;
    margin-left: 1.875rem;
    bottom: -1.5rem;
    .icon {
      width: 0.8rem;
    }
  }
`;

export default class SearchBar extends Component {
  state = {
    toggleDelBtn: false,
    isLock: false,
  }
  onMouseLeave = () => {
    this.setState(() => ({ toggleDelBtn: false }));
  }
  onMouseEnter = () => {
    this.setState(() => ({ toggleDelBtn: true }));
  }

  verifyInput = (val) => {
    const regex = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9_@.\- ]+$/);
    const isvalid = val.match(regex);
    return isvalid || !val;
  }

  handleKeywordChange = (e) => {
    const { target: { value: keyword } } = e;
    this.props.onKeywordChange(keyword);
    // const isValid = this.verifyInput(keyword);
    // if (!isValid) {
    //   this.setState({ isLock: true });
    // } else {
    //   this.setState({ isLock: false });
    // }
  }

  handleClickSearch = () => {
    // do not call api when user input invalid character.
    const { isLock } = this.state;
    const { value } = this.props;
    if (isLock) {
      return;
    }
    // keyword is valid, call api.
    this.props.onClickSearch(value);
  }

  handleKeyPress = (e) => {
    if (e.key.toUpperCase() === 'ENTER') {
      this.handleClickSearch();
    }
  }

  handleReset = () => {
    this.props.onKeywordChange('');
    this.props.onClickSearch('');
  }
  render() {
    const { isLock } = this.state;
    const { value, placeholder = 'Search' } = this.props;
    return (
      <Div>
        <div
          className="search-bar"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <Input
            type="text"
            placeholder={placeholder}
            onChange={this.handleKeywordChange}
            onKeyPress={this.handleKeyPress}
            value={value}
            invalid={isLock}
          />
          <Icon
            icon="BtnReset2"
            onClick={this.handleReset}
            className={`${value ? 'btn-delete' : 'btn-delete hidden'}`}
          />
          <Icon
            icon="IcoSearchWhite"
            className={`btn-search ${isLock ? 'lock' : ''}`}
            onClick={this.handleClickSearch}
          />
        </div>
        {isLock &&
          <div className="message">
            格式錯誤，特殊字元僅接受at、空格、底線、句號及減號 <Icon icon="IcoAlarmRed" />
          </div>}
      </Div>
    );
  }
}
