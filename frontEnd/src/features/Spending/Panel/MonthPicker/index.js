import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import moment from 'moment';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

import {
  DatePickerDiv,
  DateStartIcon,
  ArrowIcon
} from './MonthPickerStyles';

export default class MonthPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStartDatePicker: false,
      showEndDatePicker: false,
      startViewDate: moment().startOf('month').subtract(1, 'day'),
      endViewDate: moment().startOf('month').subtract(1, 'day'),
    };
  }

  onChangeStartDate = (date) => {
    this.props.onDatesChange({
      startDate: moment(date),
      endDate: this.props.endDate
    });
    this.toggleStartDatePicker();
  }

  onChangeEndDate = (date) => {
    this.props.onDatesChange({
      startDate: this.props.startDate,
      endDate: moment(date)
    });
    this.toggleEndDatePicker();
  }

  onChangeEndViewDate = () => {
    this.setState({
      endViewDate: moment()
    });
  }

  onChangeStartViewDate = () => {
    this.setState({
      startViewDate: moment()
    });
  }

  toggleStartDatePicker = () => {
    this.setState((prevState) => {
      return {
        showStartDatePicker: !prevState.showStartDatePicker
      };
    });
  }

  toggleEndDatePicker = () => {
    this.setState((prevState) => {
      return {
        showEndDatePicker: !prevState.showEndDatePicker
      };
    });
  }

  startDateValid = (current, selectedDate) => {
    if (this.props.endDate) {
      return current.isSameOrAfter(this.props.minDate, 'day') &&
      current.isSameOrBefore(this.props.endDate, 'day');
    }
    return current.isSameOrAfter(this.props.minDate, 'day') &&
      current.isSameOrBefore(this.props.maxDate, 'day');
  }


  endDateValid = (current, selectedDate) => {
    if (this.props.startDate) {
      return current.isSameOrAfter(this.props.startDate) &&
      current.isSameOrBefore(this.props.maxDate);
    }
    return current.isSameOrAfter(this.props.minDate) &&
      current.isSameOrBefore(this.props.maxDate);
  }


  render() {
    return (
      <div>
        <DatePickerDiv className="date-picker-div">
          <div className="start-date-col">
            <Dropdown
              isOpen={this.state.showStartDatePicker}
              toggle={this.toggleStartDatePicker}
            >
              <DropdownToggle caret>
                <div>
                  <div className="tit">
                    <DateStartIcon className="icon" icon="IcoCalendarFrom" />
                    <div className="icon-txt">FROM</div>
                  </div>
                  <p className="date">
                    {this.props.startDate instanceof moment ?
                      moment(this.props.startDate).format('YYYY.MMM') : '--'}
                  </p>
                </div>
                <ArrowIcon isUp={this.state.showStartDatePicker} />
              </DropdownToggle>
              <DropdownMenu>
                <div className="start-month-picker" xs="6">
                  <Datetime
                    value={this.props.startDate}
                    dateFormat="YYYY-MM"
                    timeFormat={false}
                    open={true}
                    input={false}
                    className="month-picker month-picker--start"
                    onViewModeChange={this.handleViewModeChange}
                    onChange={this.onChangeStartDate}
                    isValidDate={this.startDateValid}
                    viewDate={this.state.startViewDate}
                  />
                  {/* <div className="today" onKeyUp={() => {}} onClick={this.onChangeStartViewDate}>Today</div> */}

                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="end-date-col">
            <Dropdown
              isOpen={this.state.showEndDatePicker}
              toggle={this.toggleEndDatePicker}
            >
              <DropdownToggle caret>
                <div>
                  <div className="tit">
                    <DateStartIcon className="icon" icon="IcoCalendarTo" />
                    <div className="icon-txt">TO</div>
                  </div>
                  <div className="date">
                    {this.props.endDate instanceof moment ?
                      moment(this.props.endDate).format('YYYY.MMM') : '--'}
                  </div>
                </div>
                <ArrowIcon isUp={this.state.showEndDatePicker} />
              </DropdownToggle>
              <DropdownMenu>
                <div className="end-month-picker">
                  <Datetime
                    value={this.props.endDate}
                    dateFormat="YYYY-MM"
                    timeFormat={false}
                    open={true}
                    input={false}
                    className="month-picker month-picker--end"
                    onChange={this.onChangeEndDate}
                    isValidDate={this.endDateValid}
                    viewDate={this.state.endViewDate}
                  />
                  {/* <div className="today" onKeyUp={() => {}} onClick={this.onChangeEndViewDate}>Today</div> */}
                </div>
              </DropdownMenu>
            </Dropdown>
          </div>
        </DatePickerDiv>
      </div>
    );
  }
}
