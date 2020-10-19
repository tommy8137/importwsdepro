import styled from 'styled-components';

const TypeSelectorDiv = styled.div`
  &.type-selector {
    height: 4rem;
    /* reactstrap 樣式修改 */
    .dropdown {
      width: 100%;
      height: inherit;
      .dropdown-toggle::after {
        content: none;
      }
      .dropdown-toggle.btn {
        width: 100%;
        height: inherit;
        background-color: #fff;
        border-color: #cccccc;
        padding: 0.2rem 0.4rem;
      }
      .dropdown-menu {
        width: 100%;
        box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
        top: -2px !important;
        margin: 0;
        padding: 0;
        border-radius: 0;
      }

      .btn-secondary:focus, .btn-secondary.focus {
        box-shadow: none;
      }
    }

    .type-selector--header {
      height: 100%;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &--left-zone {
        /* border: 1px solid red; */
        width: 84%;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-between;

        /* &.hovered {
          width: 80%;
        } */
      }
      &--right-zone {
        width: 15%;
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: flex-end;

        &--fix {
          display: flex;
          height: 100%;
          align-items: center;
        }
      }
      &--name {
        opacity: 0.5;
        color: #333333;
      }
      &--selected-options {
        color: #333333;
        flex: 2;
        display: flex;
        &--list {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 92.5%;
        }
        &--tooltip {
          position: absolute;
          top: 67px;
          z-index: 1001;
          white-space: normal;
          border-radius: 0.5rem;
          width: 40%;
          height: 150px;
          overflow-y: auto;
          box-shadow: 0 10px 25px 0 rgba(0,0,0,0.16);
          background-color: #ffffff;
          padding: 0.5rem;
          word-break: break-all;
        }
      }
    }

    .type-selector--select-helper {
      &.hide {
        display: none;
      }
      padding: 0.4rem;
      align-items: center;
      display: flex;
      justify-content: space-around;
      color: #333333;
      background-color: #f2f2f2;
      &--select-all {
        margin-right: 1rem;
        span {
          margin-left: 0.2rem;
        }
      }
      &--search {
        border: 0.2rem;
        border-radius: 0.25rem;
        display: flex;
        background-color: #e6e6e6;
        align-items: center;
        width: 80%;

        &--input {
          background-color: #e6e6e6;
          border: none;
          width: 100%;
          height: 2.5rem;
          &:focus {
            outline: none;
          }
        }
        &--icon {
          width: 1.8rem;
          margin: 0 0.5rem;
        }
      }
    }

    .type-selector--select-options {
      height: 20rem;
      overflow-y: auto;

      @media (max-width: 1440px) {
        height: 12rem;
      }
      &--item {
        margin: 0.5rem;
      }
    }

    .btn-delete {
      display: block;
      cursor: pointer;
      width: 2.3rem;
      color: #808080;

      &.hidden {
        display: none
      }

      &--search {
        width: 1.3rem;
        margin-right: 0.5rem;
      }
    }
  }
`;

const CloseBtn = styled.button`
  &.close-button {
    border: none;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    outline: none;
    cursor: pointer;
    /* width: auto; */
    background: #e9e9e9;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(${p => p.scale});
    width: 100%;
    height: auto;
    &:before{
      content: "";
      display: block;
      /* initial ratio of 1:1*/
      padding-top: 100%;
    }
    /* width: 3rem;
    height: 3rem;
    @media (max-width: 1366px) {
      width: 2rem;
      height: 2rem;
    }
    @media (max-width: 1280px) {
      width: 1.6rem;
      height: 1.6rem;
    } */

  .cross {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotateZ(45deg);
    overflow: hidden;
    pointer-events: none;
  }

  .cross-line {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #939393;

    &--x {
      /* width: 24px; */
      width: 50%;
      height: 0.2rem;
    }

    &--y {
      width: 0.2rem;
      height: 50%;
    }
  }

  }
`;

const ArrowIcon = styled.i`
  border: solid;
  /* border-width: 0 0.15rem 0.15rem 0; */
  border-width: 0 1px 1px 0;
  display: inline-block;
  /* padding: 0.25rem; */
  border-color: #333333;
  transition: 0.3s ease all;
  transform: ${props => (props.down ? 'translateY(-3px) rotate(45deg)' : 'translateY(0px) rotate(-135deg)')};
  width: 0.5rem;
  height: 0.5rem;
  margin: 0.8rem;
  @media (max-width: 1366px) {
    margin: 0.5rem;
  }
  @media (max-width: 1280px) {
    margin: 0.4rem;
  }
`;


const VerticalLine = styled.div`
  width: 0;
  height: 60%;
  border: 0;
  border-left: solid 1px #ccc;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
`;


export {
  TypeSelectorDiv,
  CloseBtn,
  ArrowIcon,
  VerticalLine
};
