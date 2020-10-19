import styled from 'styled-components';

const ContentBox = styled.div`
display: flex;
justify-content: center;
align-items: center;
min-width: 100vw;
min-height: 100vh;
flex-direction: column;
.tabs-panel {
  display: flex;
  justify-content: space-between;
  width: 1088px;
  .tabs {
    display: flex;
    justify-content: flex-start;
    margin: .75rem 0;
    &.hide {
      visibility: hidden;
    }
    .tab {
      height: 44px;
      margin-right: 40px;
      font-size: 20px;
      color: #404040;
      opacity: 0.3;
      cursor: pointer;
      transition: .3s ease all;
    }
    .active {
      opacity: 1;
      border-bottom: 6px solid #f5c910;
      transition: .3s ease all;
    }
  }
  .btn-export {
    background-color: transparent;
    border: 1px solid #333333;
    color: #333;
    height: 40px;
    width: 170px;
    line-height: 39px;
    display: block;
    padding: unset;
    position: relative;
    z-index: 1;
    transition: 0.3s ease all;
    margin: .75rem 0;
    &:hover:not(:disabled) {
      background-color: #f7f7f7;
      transition: 0.3s ease all;
    }
    &.drop {
      background-color: #f7f7f7;
      border-bottom: none;
      border-radius: 4px 4px 0 0;
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
      transition: 0.3s ease all;
    }
    &:focus, &.focus {
      box-shadow: none;
    }
    &:disabled {
      cursor: not-allowed;
      border: 1px solid #ccc;
      color: #ccc;
      .icon {
        height: 14px;
        width: 14px;
        path {
          fill: #ccc;
        }
      }
    }
    .icon {
      height: 14px;
      width: 14px;
    }
    /* 下拉選單 */
    .options {
      border: 1px solid #333333;
      display: flex;
      visibility: hidden;
      flex-direction: column;
      position: absolute;
      z-index: 2;
      left: -1px;
      width: 170px;
      margin-top: -30px;
      opacity: 0;
      transition: 0.3s ease all;
      background-color: #f7f7f7;
      border-top: unset;
      border-radius: 0 0 4px 4px;
      &.active {
        visibility: visible;
        margin-top: unset;
        opacity: 1;
        box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
        transition: 0.3s ease all;
      }
      /* 分隔線   */
      .divider {
        width: 150px;
        height: 1px;
        border: 0.5px solid #333;
        margin: 0 auto;
      }
      /* 每個選項 */
      div {
        :hover {
          background: #fff;
          transition: 0.3s ease all;
          :last-child {
            border-radius: 0 0 4px 4px;
          }
        }
      }
    }
  }
}
.chart {
  width: 1088px;
  /* height: 620px; */
  border-radius: 4px;
  background-color: #f7f7f7;
}
`;

export default ContentBox;
