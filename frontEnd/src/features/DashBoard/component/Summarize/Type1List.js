import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Fade } from 'reactstrap';

import { comma } from '~~utils/Math';

const Div = styled(Fade)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0rem 1.2rem 1rem 1.2rem;
  .thead {
    display: flex;
    flex-direction: row;
    font-size: 0.875rem;
    color: #808080;
    width: 100%;
    margin: 0.875rem 0 1.625rem;
    padding: 0 1rem;
    .module {
      width: 42.7%;
    }
    .suggestion {
      width: 32%;
    }
    .current {
      width: calc(100% - 42.7% - 32%);
    }
  }
  .tr {
    width: 100%;
    height: 2.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1rem;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0px;
    color: #333333;
    background-color: transparent;
    transition: 0.3s ease all;
    &:hover {
      transition: 0.3s ease all;
      background-color: #f0f0f0;
      cursor: pointer;
    }
    .td {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      &.module {
        width: 42.7%;
      }
      &.suggestion {
        width: 32%;
      }
      &.current {
        width: calc(100% - 42.7% - 32%);
      }
    }

  }
`;

const List = (props) => {
  const {
    data,
    onClickRow, // 打開modal
  } = props;
  // console.log('module LIST', props);

  return (
    <Div>
      <div className="thead">
        <div className="module">Type I</div>
        <div className="current">Last</div>
        <div className="suggestion">Suggestion</div>
      </div>
      {data.map((item, idx) => (
        <div
          className="tr"
          key={idx}
          onClick={() => onClickRow(item)}
          onKeyUp={() => {}}
        >
          <div className="td module" title={item.module || '-'}>{item.module || '-'}</div>
          <div className="td current" title={item.total_last}>{`$ ${item.total_last == null ? '−' : comma(item.total_last, 5)}`}</div>
          <div className="td suggestion" title={item.suggestion}>{`$ ${item.suggestion == null ? '−' : comma(item.suggestion, 5)}`}</div>
        </div>
        ))}
    </Div>
  );
};

export default List;
