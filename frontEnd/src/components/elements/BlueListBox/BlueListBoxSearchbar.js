import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from 'reactstrap';
import Icon, { IconName } from '~~elements/Icon';
import { BlueListBoxRow } from '~~elements/BlueListBox';

const SearchbarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  .inline-btns {
    position: absolute;
    right: 0.6rem;
    top: 50%;
    transform: translate(0, -50%);
    .icon {
      margin-right: 0.4rem;
      &:last-child {
        margin-right: 0rem;
      }
    }
  }
  .input {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 15px;
    letter-spacing: 1px;
    background-color: #ffffff;
    border-radius: 5px ;
    border: 1px solid #cccccc;
    padding-right: 3rem;

    &::placeholder {
      color: rgba(0, 0, 0,0.3);
      font-size: 0.8rem;
    }
    &:focus {
      box-shadow: none;
    }
  }
`;

const BlueListBoxSearchbar = (props) => {
  const { placeholder, value } = props;
  const [isLock, setLock] = useState(false);
  const [term, setTerm] = useState('');

  useEffect(() => {
    setTerm(value);
  }, [value]);

  // const verifyInput = (val) => {
  //   const regex = new RegExp(/^[\u4e00-\u9fa5_a-zA-Z0-9_@.\- ]+$/);
  //   const isvalid = val.match(regex);
  //   return isvalid || !val;
  // };

  const handleKeywordChange = (e) => {
    props.onChange(e.target.value);
  };

  /**
   * 當按下放大鏡
   */
  const handleClickSearch = () => {
    props.onSearch(term);
  };

  /**
   * 按下reset的icon
   */
  const handleReset = () => {
    props.onChange('');
    setTerm('');
  };

  return (
    <BlueListBoxRow>
      <SearchbarContainer>
        <Input
          type="text"
          placeholder={placeholder}
          onChange={e => handleKeywordChange(e)}
          value={term}
        />
        <div className="inline-btns">
          {term &&
            <Icon
              icon={IconName.BtnReset2}
              onClick={handleReset}
              className="btn-delete"
              width="1rem"
            />}
          <Icon
            icon={IconName.IcoSearchBlack}
            disabled={isLock || !term}
            onClick={handleClickSearch}
            width="1.5rem"
          />
        </div>
      </SearchbarContainer>
    </BlueListBoxRow>
  );
};

BlueListBoxSearchbar.defaultProps = {
  onChange: () => { },
  onSearch: () => { },
  placeholder: '',
  value: ''
};

export default BlueListBoxSearchbar;
