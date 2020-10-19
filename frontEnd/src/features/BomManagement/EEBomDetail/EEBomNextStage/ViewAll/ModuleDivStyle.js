import styled from 'styled-components';
import { eeBomTabBgColor, eeBomInfoFontColor } from '~~styles/_variables';


const ModuleDiv = styled.div`
height: ${props => (props.height ? `${props.height}px` : '200px')};
overflow: auto;
.list {
  margin-bottom: 10px;
  .costs {
    &:hover {
      box-shadow: 0 3px 5px 0 #c0c0c0;
    }
    background: ${eeBomTabBgColor};
    padding: 0 50px;
    height: 50px;
    position:sticky;
    top: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    z-index: 99; /* 因為react-data-grid的z-index是99，會蓋過title bar */
    .module {
      line-height: 50px;
      width: 30%;
    }
    .cost {
      display: flex;
      flex: auto;
      flex-direction: row;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
      line-height: 50px;
      color: #333333;
      .caculate {
        flex: 1.5;
        margin-left: 10px;
        font-size: 14px;
        font-weight: normal;
        color: ${eeBomInfoFontColor};
        &:nth-of-type(1) {
          flex: 1;
        }
        &:first {
          margin-left: none;
        }
        .num {
          margin-left: 10px;
          font-size: 18px;
          font-weight: 500;
          line-height: 50px;
          color: #333333;
        }
      }
      .arrowbox {
        border-radius: 50%;
        height: 2rem;
        width: 2rem;
        margin-left: 22px;
        position: relative;
        .arrow {
          position: absolute;
          right: 0px;
          width: 10px;
          height: 10px;
          margin-top: 30%;
          display: block;
          border-left: 1px solid #333333;
          border-bottom: 1px solid #333333;
          transform: rotate(135deg);
          transition: .3s ease all;
        }
        .active {
          transform: rotate(315deg);
          transition: .3s ease all;
        }
      }
    }
  }
  .table {
    visibility: hidden;
    display: none;
    opacity: 0;
    position: relative;
    transition: .3s ease-in-out all;
  }
  .active {
    visibility: visible;
    display: block;
    opacity: 1;
    transition: .3s ease-in-out all;
  }
}
`;

export default ModuleDiv;
