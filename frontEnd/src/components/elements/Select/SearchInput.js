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

.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  input {
    display: inline-block;
    width: 100%;
    height: 2.5rem;
    font-size: 1rem;
    background-color: #ffffff;
    border-radius: 5px;
    border: 1px solid #cccccc;
    &:focus {
      box-shadow: none;
      border: 1px solid #00A99D;
    }
  }
  .icon {
    display: block;
    cursor: pointer;
    width: 1.2rem;
    background: none;
    border: none;
    text-align: center;
    color: #808080;
    margin-left: -1.5rem;
    border-radius: 0px 5px 5px 0px;
  }
}
`;
export default class SearchBar extends Component {
  handleKeywordChange = (e) => {
    const { target: { value } } = e;
    this.props.onChange(value);
  }

  handleReset = () => {
    this.props.onChange('');
  }
  render() {
    const { value } = this.props;
    return (
      <Div>
        <div
          className="search-bar"
        >
          <Input
            {...this.props}
            type="text"
            placeholder="Search"
            onChange={this.handleKeywordChange}
            value={value}
          />
          {value.length > 0 ?
            <Icon
              icon="BtnReset2"
              onClick={this.handleReset}
              size="2rem"
            /> :
            <Icon
              icon="IcoSearchBlack"
              size="2rem"
            />}
        </div>
      </Div>
    );
  }
}
