import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import DayPicker from '~~elements/DatePicker';
import moment from 'moment';
import { compose, setPropTypes, withStateHandlers, withHandlers } from 'recompose';

import {
  DatePickerDiv,
  DateStartIcon,
  ArrowIcon
} from './DatePickerStyles';


const enhance = compose(
  setPropTypes({
    defaultStartDate: PropTypes.instanceOf(Date),
    defaultEndDate: PropTypes.instanceOf(Date),
    defaultDisabledDays: PropTypes.shape({}),
    onDatesChange: PropTypes.func,
    disabled: PropTypes.bool,
  }),
  withStateHandlers(
    (props) => {
      let { startYearMonth } = moment().startOf('month').toDate();
      if (props.defaultStartDate instanceof Date) {
        startYearMonth = moment(props.defaultStartDate).startOf('month').toDate();
      }
      let { endYearMonth } = moment().startOf('month').toDate();
      if (props.defaultEndDate instanceof Date) {
        endYearMonth = moment(props.defaultEndDate).startOf('month').toDate();
      }
      return {
        startYearMonth,
        endYearMonth,
        showStartDatePicker: false,
        showEndDatePicker: false,
        selectedStartDate: props.defaultStartDate || null,
        selectedEndDate: props.defaultEndDate || null,
        disabledDays: props.defaultDisabledDays,
        startDisabledDays: props.defaultDisabledDays,
        endDisabledDays: props.defaultDisabledDays,
      };
    },
    {
      toggleStartDatePicker: ({ showStartDatePicker }) => () => {
        return {
          showStartDatePicker: !showStartDatePicker
        };
      },
      toggleEndDatePicker: ({ showEndDatePicker }) => () => {
        return {
          showEndDatePicker: !showEndDatePicker
        };
      },
      onChangeStartDate: (state, props) => (date, option) => {
        if (!option.disabled) {
          props.onDatesChange({
            startDate: date,
            endDate: state.selectedEndDate
          });
          let init = {};
          if (!state.selectedEndDate) {
            init = {
              endYearMonth: moment(date).startOf('month').toDate()
            };
          }
          return {
            selectedStartDate: date,
            startYearMonth: moment(date).startOf('month').toDate(),
            endDisabledDays: {
              after: state.disabledDays.after,
              before: date
            },
            showStartDatePicker: !state.showStartDatePicker,
            ...init
          };
        }
        return {};
      },
      onChangeEndDate: (state, props) => (date, option) => {
        if (!option.disabled) {
          props.onDatesChange({
            startDate: state.selectedStartDate,
            endDate: date
          });
          let init = {};
          if (!state.selectedStartDate) {
            init = {
              startYearMonth: moment(date).startOf('month').toDate()
            };
          }
          console.log('init', init);
          return {
            selectedEndDate: date,
            endYearMonth: moment(date).startOf('month').toDate(),
            startDisabledDays: {
              after: date,
              before: state.disabledDays.before
            },
            showEndDatePicker: !state.showEndDatePicker,
            ...init
          };
        }
        return {
          selectedEndDate: state.selectedEndDate
        };
      },
      handleChaneYearMonthForm: (state, props) => (type, month) => {
        switch (type) {
          case 'start':
            return {
              startYearMonth: month
            };
          case 'end':
            return {
              endYearMonth: month
            };
          default:
            return {};
        }
      }
    }
  ),
);

@enhance
export default class DatePicker extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    // onDatesChange: PropTypes.func,
  }
  static defaultProps = {
    disabled: false
  }

  render() {
    const { disabled } = this.props;
    return (
      <DatePickerDiv
        className={disabled ? 'date-picker-div disabled' : 'date-picker-div'}
      >
        <div className="start-date-col">
          <Dropdown
            isOpen={this.props.showStartDatePicker}
            toggle={this.props.toggleStartDatePicker}
          >
            <DropdownToggle caret>
              <div>
                <div className="tit">
                  <DateStartIcon className="icon" icon="IcoCalendarFrom" />
                  <div className="icon-txt">FROM</div>
                </div>
                <p className="date">
                  {this.props.selectedStartDate instanceof Date ?
                    moment(this.props.selectedStartDate).format('YYYY-MM-DD') : '--'}
                </p>
              </div>
              <ArrowIcon isUp={this.props.showStartDatePicker} />
            </DropdownToggle>
            <DropdownMenu>
              <div className="start-date-picker" xs="6">
                <DayPicker
                  disabledDays={this.props.startDisabledDays}
                  selectedDate={this.props.selectedStartDate}
                  yearMonth={this.props.startYearMonth}
                  onChaneYearMonthForm={(month) => this.props.handleChaneYearMonthForm('start', month)}
                  onDayClick={this.props.onChangeStartDate}
                />
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="end-date-col">
          <Dropdown
            isOpen={this.props.showEndDatePicker}
            toggle={this.props.toggleEndDatePicker}
          >
            <DropdownToggle caret>
              <div>
                <div className="tit">
                  <DateStartIcon className="icon" icon="IcoCalendarTo" />
                  <div className="icon-txt">TO</div>
                </div>
                <div className="date">
                  {this.props.selectedEndDate instanceof Date ?
                    moment(this.props.selectedEndDate).format('YYYY-MM-DD') : '--'}
                </div>
              </div>
              <ArrowIcon isUp={this.props.showEndDatePicker} />
            </DropdownToggle>
            <DropdownMenu>
              <div className="end-date-picker">
                <DayPicker
                  disabledDays={this.props.endDisabledDays}
                  selectedDate={this.props.selectedEndDate}
                  yearMonth={this.props.endYearMonth}
                  onChaneYearMonthForm={(month) => this.props.handleChaneYearMonthForm('end', month)}
                  onDayClick={this.props.onChangeEndDate}
                />
              </div>
            </DropdownMenu>
          </Dropdown>
        </div>
      </DatePickerDiv>
    );
  }
}
