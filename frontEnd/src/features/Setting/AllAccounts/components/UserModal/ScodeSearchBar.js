import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import Icon from '~~elements/Icon';

const Div = styled.div`
  position: relative;
  display: inline-block;
  margin-bottom: 0.5rem;
  .btn-search {
    background-color: #333333;
    border-radius: 0px 5px 5px 0px;
    width: 3.2rem;
    padding: 10px 12px;
    position: absolute;
    right: 0;
    cursor: pointer;
    &.disabled{
      cursor: not-allowed;
      opacity: .7;
    }
  }

  .search-bar {
    display: flex;
    align-items: center;
    .input {
      display: inline-block;
      width: 17rem;
      height: 3rem;
      font-size: 15px;
      letter-spacing: 1px;
      background-color: #ffffff;
      border-radius: 5px ;
      border: 1px solid #cccccc;
      ::placeholder {
        color: rgba(0, 0, 0,0.3);
        font-size: 0.8rem;
      }
      &:focus {
        box-shadow: none;
      }
    }

    .btn-delete {
      cursor: pointer;
      width: 1.2rem;
      position: absolute;
      right: 4rem;
    }
  }

  .message {
    color: red;
    position: absolute;
    font-size: 0.87rem;
    width: 100%;
    text-align: left;
    padding: 0.25rem;
    bottom: 0;
    left: 100%;
    margin-left: 1rem;
    line-height: 1;
    .icon {
      width: 0.8rem;
    }
  }
`;


const SearchBar = (props) => {
  const [term, setTerm] = useState('');
  const {
    onChange,
    handleSearchScode,
    isFailed
  } = props;

  useEffect(() => {
    setTerm(props.value);
  }, [props.value]);


  const handleKeywordChange = (e) => {
    const { target: { value } } = e;
    onChange(value);
  };

  const handleClickSearch = (e) => {
    onChange(term);
    handleSearchScode(term);
  };

  const handleReset = () => {
    onChange('');
  };

  return (
    <Div>
      <div className="search-bar">
        <Input
          type="text"
          placeholder="請輸入 Sourcer Code"
          onChange={handleKeywordChange}
          value={term}
          className="input"
        />
        {term &&
          <Icon
            icon="BtnReset2"
            onClick={handleReset}
            className="btn-delete"
          />}
        <Icon
          icon="IcoSearchWhite"
          className={`btn-search ${!term ? 'disabled' : ''}`}
          onClick={handleClickSearch}
        />
      </div>
      {isFailed &&
        <div className="message">
        查無此 Sourcer Code <Icon icon="IcoAlarmRed" />
        </div>
      }
    </Div>
  );
};

export default SearchBar;
