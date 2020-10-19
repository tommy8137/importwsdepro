import styled from 'styled-components';

const DataGridWrapper = styled.div`
  &.data-grid-wrapper {
    /* 取消focus效果 */
    .rdg-selected{
      border: none;
    }
    .react-grid-Grid {
      background-color: #f2f2f2;


      .react-grid-Header {
        color: white;
        background-color: #7c90a9;
        /* height: 2.5rem; */

        .react-grid-HeaderCell {
          background-color: #7c90a9;
          border-right: none;
        }
      }

      .react-grid-Viewport > .react-grid-Canvas {
        background-color: #f2f2f2;
      }

      .react-grid-Cell {
        background-color: #f2f2f2;
        border: none;
      }

      .react-grid-Row.row-selected {
        background-color: #CDD4DD;
      }

      /* checkbox那欄的的右邊要白線 */
      .react-grid-HeaderCell.react-grid-HeaderCell--frozen {
        border-right: 1px solid #fff;
      }
      .react-grid-Cell.react-grid-Cell--frozen.rdg-last--frozen {
        border-right: 1px solid #fff;
        background-color: #f2f2f2;
        box-shadow: none !important;
      }
    }
  }
`;

export default DataGridWrapper;
