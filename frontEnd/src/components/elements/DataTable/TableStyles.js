import styled from 'styled-components';
import { tableFontSize } from '~~styles/_variables';


const TableWrapper = styled.div`
  width: 95%;
  margin: auto;
  font-size: ${tableFontSize};

  .table {
    display: flex;
    flex-direction: column;
    // border: 1px solid black;

    &-tr {
      display: flex;
    }

    &-th, &-td {
      word-break: break-all;
      flex: 100 0 auto;
      width: 6.25rem;
      padding: 0.2rem;
      /* border: 1px solid red; */
    }

    &-td {
      min-height: 2.7rem;
      line-height: 2.5rem;
    }

    &-thead {
      opacity: 0.5;
      text-align: left;
      color: #333333;

    }

    &-tbody {
      background-color: #f7f7f7;
      .table-tr {
        position: relative;
        &:hover {
          background-color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
`;

export default {
  TableWrapper,
};
