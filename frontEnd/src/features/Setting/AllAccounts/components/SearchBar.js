import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import Icon from '~~elements/Icon';

const Div = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
align-items: center;
margin: 0rem 0.5rem;
position: relative;
.btn-search {
  background-color: #333333;
  border-radius: 0px 5px 5px 0px;
  width: 3rem;
  padding: 12px;
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
    &.lock{
      border-color: red
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
    height: 20px;
    line-height: 20px;
    color: red;
    position: absolute;
    font-size: 0.65rem;
    width: 100%;
    text-align: left;
    padding: 0.25rem;
    bottom: -1rem;
    .icon {
      width: 0.8rem;
    }
  }
`;

const SearchBar = (props) => {
  const [isLock, setLock] = useState(false);
  const { keyword, onKeywordSearch, updateKeyword } = props;

  useEffect(() => {
    // reset key word
    return () => updateKeyword('');
  }, []);

  const verifyInput = (val) => {
    const regex = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9_@.\- ]+$/);
    const isvalid = val.match(regex);
    return isvalid || !val;
  };

  const handleKeywordChange = (e) => {
    const { target: { value } } = e;
    updateKeyword(value);
    const isValid = verifyInput(value);
    if (!isValid) {
      setLock(true);
    } else {
      setLock(false);
    }
  };

  const handleClickSearch = () => {
    // do not call api when user input invalid character.
    if (isLock || !keyword) {
      return;
    }
    // keyword is valid, call api.
    onKeywordSearch(keyword);
  };

  const handleReset = () => {
    updateKeyword('');
    onKeywordSearch('');
    setLock(false);
  };

  return (
    <Div>
      <div className="search-bar">
        <Input
          type="text"
          placeholder="請輸入人名、工號或分機"
          onChange={handleKeywordChange}
          value={keyword}
          className={isLock ? 'input lock' : 'input'}
        />
        {keyword &&
        <Icon
          icon="BtnReset2"
          onClick={handleReset}
          className="btn-delete"
        />}
        <Icon
          icon="IcoSearchWhite"
          disabled={isLock}
          className={`btn-search ${isLock || !keyword ? 'disabled' : ''}`}
          onClick={handleClickSearch}
        />
      </div>
      {isLock &&
      <div className="message">
          格式錯誤 <Icon icon="IcoAlarmRed" />
      </div>}
    </Div>
  );
};

export default SearchBar;
