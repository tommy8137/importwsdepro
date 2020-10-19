import styled from 'styled-components';

const Div = styled.div`
  &.calculator-item {

    display: flex;
    flex-direction: column;
    height: 100%;

    padding: 1.5rem 0;
    /* border-radius: 4px; */
    /* overflow: hidden; */
    .calculator-item-header {
      border-radius: 4px 4px 0 0;
      display: flex;
      align-items: center;
      width: inherit;
      height: 34px;
      background-color: #cccccc;
      /* background-color: #7c90a9; */

      &--tabs {
        flex: 1;
        height: inherit;
        display: flex;
        align-items: center;

        &-tab {
          flex: 1;
          max-width: 70px;
          cursor: pointer;
          height: inherit;
          border-radius: 4px 4px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          &:before {
            content : "";
            position: absolute;
            width: 1px;
            height: 55%;
            opacity: 0.3;
            background-color: #333333;
            right: 0;
          }

          &-close-btn {
            display: none;
          }
          &.active {
            background-color: #ffffff;
            box-shadow: 0px 0 0px 1px #fff;
            &:before {
              content : "";
              width: 0px;
            }
            &:hover {
              .calculator-item-header--tabs-tab-close-btn {
                display: block;
                width: 2rem;
                @media (max-width: 1440px) {
                  width: 1.5rem;
                }
              }
              .calculator-item-header--tabs-tab-label {
                display: none;
              }
            }
          }
          &:nth-of-type(1).active {
            box-shadow: 1px 0 0px 1px #fff;
          }
          &:nth-of-type(10).active {
            box-shadow: -1px 0 0px 1px #fff;
          }

          &-label {
            display: inline-block;
            margin: 0 0.3rem;
          }
        }
      }
    }

    .calculator-item-content {
      flex: 1;
      width: inherit;
      /* min-height: 230px; */
      background-color: #ffffff;
      padding: 1rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      /* 內容往上對齊 */
      align-content: flex-start;
    }

    .calculator-item-footer {
      width: inherit;
      height: 30px;
      line-height: 30px;
      background-color: #7c90a9;;
      text-align: center;
      color: #fff;
      border-radius: 0 0 4px 4px;
      .title {
        font-weight: bold;
      }
    }
  }
`;


const PlusIcon = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.5rem;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: #888;
    border-radius: 50%;
  }

  /* 橫的 */
  &::after {
    content: " ";
    position: absolute;
    background-color: #fff;
    width: 60%;
    height: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /* 直的 */
  &::before {
    content: " ";
    position: absolute;
    background-color: #fff;
    width: 2px;
    height: 60%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;


const CalculatorItemFooterDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
`;

export default {
  Div, PlusIcon, CalculatorItemFooterDiv
};
