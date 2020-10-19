import styled from 'styled-components';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

import { tableFontSize } from '~~styles/_variables';


const Div = styled.div`
  display: flex;
  .jump-to-page {
    display: flex;
    align-items: center;
    color: #333333;
    font-size: 0.85rem;
    input {
      max-width: 2.5rem;
      border-radius: 4px;
      border: 1px solid #333333;
      margin-left: 0.4rem;
      background-color: inherit;
      text-align: center;
      &:focus {
        outline: none;
      }
    }
  }

  .verticle-line {
    margin: 0 2rem;
    width: 0;
    border: solid 1px #cccccc;
  }
`;

const PaginationStyle = styled(Pagination)`
  .rc-pagination-item:hover a {
      color: #333333
    }
  &.extend-pagination {
    margin:0;
    padding:0;
    list-style:none;
    .rc-pagination-disabled {
      display: none;
    }
    .rc-pagination-item {
      width: 2rem;
      height: 100%;
      letter-spacing: normal;
      text-align: center;
      color: #555555;
      border: none;
      background-color: inherit;
      font-size: 0.8rem;
      &:hover{
        background: #e6e6e6;
      }
      &-active {
        border: 1px solid #333333;
        background: #333333;
        &:hover{
        background: #333333;
      }
        a {
          color: white;   
        }
      }
    }

    .rc-pagination-prev, .rc-pagination-next {
      width: 2.5rem;
      height: 100%;
      border: 1px solid #333333;
      font-size: 0.8rem;
      color: #333333;
      &:hover{
        background: #e6e6e6;
      }
    }

    li:focus {
      font-size: ${tableFontSize};
      outline: none;
    }

    .rc-pagination-jump-prev, .rc-pagination-jump-next {
      &::after {
        letter-spacing: 0;
        color: inherit;
        font-size: inherit;
      }
    }
  }
`;


export default {
  Div,
  PaginationStyle
};
