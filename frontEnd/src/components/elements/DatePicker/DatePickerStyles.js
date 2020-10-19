import styled from 'styled-components';

const Wrapper = styled.div`
  &.date-picker-wrapper {
  .wi-day-picker {
    background-color: #fff;
    width: 312px;
    height: 333px;
    border-radius: 4px;
    box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.16);
    border: 1px solid #cccccc;
    &:focus {
    outline: none;
    }
    .DayPicker-NavBar {
      .DayPicker-NavButton {
        display: inline-block;
        width: 1rem;
        height: 2rem;
        background-image: none;
        &:before {
          content: '';
          border: solid;
          border-width: 0 1px 1px 0;
          display: inline-block;
          border-color: #333333;
          width: 0.5rem;
          height: 0.5rem;
        }

        &:focus {
          outline: none;
        }

        &--prev {
          margin-right: 2rem;
          &:before {
            transform: translateY(0px) rotate(-135deg);
          }

        }
        &--next {
          &:before {
            transform: translateY(-5px) rotate(45deg);
          }
        }

        &.DayPicker-NavButton--interactionDisabled {
          cursor: not-allowed;
        }
      }
    }

    .DayPicker-Months {
      .DayPicker-Caption {
        > div {
          font-weight: unset;
          font-size: 1rem;
          color: #333333;
        }
      }
    }

    .DayPicker-Day--highlighted {
      background-color: orange;
      color: white;
    }



    .DayPicker:not(.DayPicker--interactionDisabled),
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background-color: #00a99d;
      color: #ffffff;
    }

    .DayPicker-Months, .DayPicker-Month, .DayPicker-wrapper {
      &:focus {
        outline: none;
      }
    }
    .DayPicker-Day--today {
          color: #333;
          background-color: #ffffff;
          font-weight: unset;
          }
    .DayPicker-Body {
      &.DayPicker-Day--disabled {
        background-color: #ffffff;
        }
      .DayPicker-Week {
        .DayPicker-Day {
          border-radius: 0;
          &:focus {
            outline: none;
          }
        }
        .DayPicker-Day--today {
          color: #333;
          background-color: #ffffff;
          font-weight: unset;
          &.DayPicker-Day--disabled {
            color: #DCE0E0;
          }
        }

        .DayPicker-Day--selected:not(.DayPicker-Day--outside) {
          background-color: #00a99d;
          color: #ffffff;
          &.DayPicker-Day--today {
            background-color: #00a99d;
            color: #ffffff;
          }
        }
      }
    }
  }
  }
`;


const YearMonthFormDiv = styled.form`
  &.DayPicker-Caption {
    .DayPicker-Caption-selector-wrapper {
      position: relative;
      display: inline-block;
      margin-right: 0.5rem;
      color: #333;
      padding-right: 16px;
      &:after {
        content: '';
        display: block;
        position: absolute;
        height: 6px;
        width: 6px;
        border-right: 1px solid #333;
        border-bottom: 1px solid #333;
        -webkit-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        transform: rotate(45deg) translate(0,-100%);
        top: 50%;
        right: 6px;
      }
      &--selector {
        border: 0;
        cursor: pointer;
        display: inline-block;
        height: 100%;
        left: 0;
        margin: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 5;
      }

    }
  }
`;

export default {
  Wrapper,
  YearMonthFormDiv
};
