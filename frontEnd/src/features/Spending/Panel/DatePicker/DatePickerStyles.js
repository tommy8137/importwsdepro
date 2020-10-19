import styled from 'styled-components';

import Icon from '~~elements/Icon';

const borderColor = '#ccc';
const DatePickerDiv = styled.div`

  &.date-picker-div {
    position: relative;
    border: 1px solid ${borderColor};
    border-radius: 0.2rem;
    height: 4rem;
    z-index: 3;
    display: flex;
    /* border: 1px solid orange; */
    width: 100%;

    &.disabled {
      pointer-events: none;
      opacity: 0.6;
    }

  .start-date-col, .end-date-col {
    width: 100%;
    position: relative;
  }
  .start-date-col {
    &:after {
      content: '';
      background-color: #cccccc;
      width: 1px;
      height: 70%;
      top: 15%;
      right: 0;
      position: absolute;
    }
  }
  .end-date-picker {
    position: absolute;
    top: 6px;
    right: -2px;
  }
  .start-date-picker {
    position: absolute;
    top: 6px;
    left: -2px;
  }

  .tit {
    >.icon,
    >.icon-txt {
      display: inline-block;
      vertical-align: middle;
      font-size: 0.76rem;
      color: #9e9e9e;
    }
    >.icon {
      margin-right: 4px;
    }
  }
  .date {
    margin-top: 4px;
    display: block;
    font-size: 1rem;
    color: #9e9e9e;
    margin: 0;
  }

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
      border: none;
      text-align: left;
    }
    .dropdown-menu {
      width: 100%;
      box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
      top: -2px !important;
      margin: 0;
      padding: 0;
      border-radius: 0;
      border: none;
    }

    .btn-secondary:focus, .btn-secondary.focus {
      box-shadow: none;
    }
  }
  /* reactstrap END 樣式修改 */

}

`;


const DateStartIcon = styled(Icon)`
  width: 1rem;
`;

const ArrowIcon = styled.div`
  content: '';
  display: block;
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  top: 50%;
  right: 6px;
  border-left: 1px solid #333333;
  border-bottom: 1px solid #333333;
  transform-origin: left bottom;
  /* transform: translate(-50%,-50%) rotate(-45deg); */
  transition: 0.3s ease all;
  transform: ${props => (props.isUp ? 'translate(-50%,-100%) rotate(-225deg)' : 'translate(-50%,-50%) rotate(-45deg)')};
`;

export default {};

export {
  DatePickerDiv,
  DateStartIcon,
  ArrowIcon
};

