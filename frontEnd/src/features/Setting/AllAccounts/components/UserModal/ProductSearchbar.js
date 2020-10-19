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
  position: relative;
  height: 2.5rem;
  .btn-search {
    /* background-color: #333333; */
    border-radius: 0px 5px 5px 0px;
    width: 2.5rem;
    height: 100%;
    padding: 0.4rem;
    position: absolute;
    right: 0;
    height: 100%;
    cursor: pointer;
    svg {
      width: 80%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50% , -50%);
    }
    &.disabled{
      cursor: not-allowed;
      opacity: .7;
    }
  }

.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  .input {
    display: inline-block;
    width: 100%;
    height: 100%;
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
    width: 1rem;
    position: absolute;
    right: 3rem;
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

const ProductSearchbar = (props) => {
  const [isLock, setLock] = useState(false);
  const [term, setTerm] = useState('');

  useEffect(() => {
    setTerm(props.value);
  }, [props.value]);

  const verifyInput = (val) => {
    const regex = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9_@.\- ]+$/);
    const isvalid = val.match(regex);
    return isvalid || !val;
  };

  const handleKeywordChange = (e) => {
    const { target: { value } } = e;
    props.onChange(value);
    // const isValid = verifyInput(value);
    // if (!isValid) {
    //   setLock(true);
    // } else {
    //   setLock(false);
    // }
  };

  const handleClickSearch = (e) => {
    // do not call api when user input invalid character.
    // if (isLock) {
    //   return;
    // }
    // keyword is valid, call api.
    props.onChange(term);
  };

  const handleReset = () => {
    // setLock(false);
    props.onChange('');
  };

  return (
    <Div>
      <div className="search-bar">
        <Input
          type="text"
          placeholder="請輸入 Product Type"
          onChange={e => handleKeywordChange(e)}
          value={term}
          className={isLock ? 'input lock' : 'input'}
        />
        {term &&
          <Icon
            icon="BtnReset2"
            onClick={handleReset}
            className="btn-delete"
          />}
        <Icon
          icon="IcoSearchBlack"
          disabled={isLock}
          className={`btn-search ${isLock || !term ? 'disabled' : ''}`}
          onClick={handleClickSearch}
        />
      </div>
      {/* {isLock &&
        <div className="message">
          格式錯誤 <Icon icon="IcoAlarmRed" />
        </div>} */}
    </Div>
  );
};

ProductSearchbar.defaultProps = {
  onChange: () => { },
  value: ''
};

export default ProductSearchbar;
