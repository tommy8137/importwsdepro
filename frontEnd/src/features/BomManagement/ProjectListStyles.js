import styled from 'styled-components';

const Div = styled.div`
  padding: 1rem 0.55rem 0 2rem;
  /* 搜尋列及新增鈕 */
  .upper-area {
    width: 100%;
    padding: 1rem 0rem;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    /* filter & search */
    .upper-left {
      display: flex;
      flex-direction: row;
    }
    /* switch */
    .upper-right {
      font-size: 0.875rem;
      align-items: flex-end;
      display: flex;
      flex-direction: column;
      p {
        margin: 0;
        color: #808080;
      }
    }
    /* create button */
    .btn-create {
      width: 8.375rem;
      height: 2rem;
      font-size: 0.875rem;
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .icon {
        width: 1.2rem;
      }
    }
  }
  .text {
    margin-left: 1rem;
  }

  .pagination {
    margin: 1rem 0rem 0rem;
    display: flex;
    justify-content: center;
  }
  /*download space rate*/
  .btn-space-rate {
      font-size: 0.875rem;
      align-items: flex-end;
      display: flex;
      flex-direction: row;
    }
  .round-btn--icon {
    width: 0.9rem;
    margin-right: 0.4rem;
  }
`;

export default Div;
