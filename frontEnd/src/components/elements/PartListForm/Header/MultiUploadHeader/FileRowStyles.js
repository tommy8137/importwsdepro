import styled from 'styled-components';

const Div = styled.div`
  height: 2.6875rem;
  border-bottom: 1px solid #333333;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* 顯示文字的部份 */
  .file-box {
    position: relative;
    &-text {
      overflow:hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: calc(100% / 3 - 1rem);
      max-width: 40%;
    }
    &-size {
      width: calc(100% / 3 - 1rem);
    }


    /* 按鈕的部份 */
    &-function {
      width: calc(100% / 3 - 1rem);
      position: relative;
      height: 1.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .delete-btn {
        width: 5rem;
        height: inherit;
        border: none;
        color: #333333;
        font-size: 12px;
        cursor: pointer;
        border-radius: 1rem;
        line-height: 14px;
        transition: .3s ease all;
        text-align: right;
        display: flex;
        justify-content: space-around;
        align-items: center;

        &:focus {
          outline: none;
        }
        &:hover {
          color: #555;
          &:active {
            color: #333;
          }
        }
      }
      .btn-image {
        width: 1.25rem;
        cursor: pointer;
      }
    }
  }
  &.file-box:nth-of-type(1) {
    border-top: 2px solid #333;
  }

`;


export default Div;
