import styled from 'styled-components';
import VARIABLES from '~~styles/_variables';

export const COL_PADDING = '0.8rem 1.2rem';

export const InlineBtns = styled.div`
  display: flex;
  align-items: center;
  flex: 0 auto;
  >p {
    margin: 0;
  }
  >.select-container {
    width: 15rem;
  }

  >.select-container,
  >div {
    margin-right: 1rem;
    &:last-child {
      margin-right: 0rem;
    }
  }


  >.info-container {
    position: relative;
    .info {
      position: absolute;
      top: -40%;
      left: 120%;
      width: 17rem;
      background: #ffffff;
      border: 1px solid #D7D7D7;
      padding: 0.5rem;
      opacity: 0.9;
      z-index: 2;
      border-radius: .2rem;
      p {
        font-size: 0.75rem;
        height: 1rem;
        line-height: 1rem;
        margin-bottom: 0;
      }
    }
  }

  >p,
  >.button,
  >.icon {
    margin-right: 0.5rem;
    &:last-child {
      margin-right: 0rem;
    }
  }
`;

export const InnerContainer = styled.div`
  padding: ${props => (props.isSubContainer ? '0rem' : '1rem')};
  display: block;
  width: 100%;

  .inner-content {
    margin: 0 auto;
    max-width: 1366px;
    width:100%;
    display: block;
    background-color: white;
    .content-header {
      padding: ${COL_PADDING};
      justify-content: space-between;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ebebeb;
      .title {
        display: flex;
        font-size: 1.2rem;
        font-weight: bolder;
        align-items: flex-end;
        .description{
          margin: 0 1rem;
          font-size: 1rem;
          opacity: 0.7;
          letter-spacing: 0.5px;
        }
      }
    }
    .content-box {
      flex: 0 100%;
      border: 1px solid #c0c0c0;
    }
    .content-col {
      flex: 0 100%;
      min-width: 0;
      display: flex;
      justify-content: space-between;
      padding: ${props => (props.isSubContainer ? '0rem' : '0.5rem')};
    }
    .content-row {
      justify-content: space-between;
      display: flex;
      align-items: center;
      padding: ${COL_PADDING};
    }

    .multi-table-row {
      justify-content: space-between;
      display: flex;
      align-items: flex-start;
    }

    .multi-table-col {
      flex: 0 50%;
      min-width: 0;
      justify-content: space-between;
      display: flex;
      align-items: center;
      &:last-child {
        border-left: 1px solid #ebebeb;
      }
    }
  }
`;

export const SearchCol = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .searchbar {
    width: 60%;
  }
  .filter {
    width: 35%;
  }
`;


// 這一坨是給main page們用的
export const MainBackRow = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;
  .navlink {
    color: ${VARIABLES.MAIN};
    transition: ease .3s all;
    width: 5rem;
    &:hover {
      text-decoration: none;
      color: ${VARIABLES.HOVER_BLACK};
      transition: ease .3s all;
    }
    span {
      font-size: ${VARIABLES.FONT_SIZE_BIG};
      margin-left: 0.5rem;
    }
  }
`;

export const MainTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 65%;
  >.select-container {
    width: 15rem;
  }
`;
