import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

// import MomentLocaleUtils from 'react-day-picker/moment';
// import 'moment/locale/zh-tw';

import styles from './DatePickerStyles';

const WEEKDAYS_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const YearMonthForm = ({ date, localeUtils, onChange, monthInfo }) => {
  // console.log('>>>>>>>>>>>>', date);
  const { fromMonth, toMonth } = monthInfo;
  // 如果沒有限定日期，就直接顯示
  if (!fromMonth || !toMonth) {
    return (
      <div className="DayPicker-Caption">{moment(date).format('MMMM YYYY')}</div>
    );
  }

  const months = localeUtils.getMonths();
  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }
  let availableMonth = [];
  // 如果fromMonth 和 toMonth 年份一樣，可以選的月份就是這兩者之間
  if (fromMonth.getFullYear() === toMonth.getFullYear()) {
    for (let i = fromMonth.getMonth(); i <= toMonth.getMonth(); i += 1) {
      availableMonth.push(months[i]);
    }
  } else if (fromMonth.getFullYear() === date.getFullYear()) {
    // 如果date的年份和fromMonth的年份一樣，那就以fromMonth可以選的月份為主
    for (let i = fromMonth.getMonth(); i < 12; i += 1) {
      availableMonth.push(months[i]);
    }
  } else if (toMonth.getFullYear() === date.getFullYear()) {
    // 如果date的年份和toMonth的年份一樣 就以toMonth可以選的月份為主
    for (let i = 0; i <= toMonth.getMonth(); i += 1) {
      availableMonth.push(months[i]);
    }
  } else {
    availableMonth = months;
  }

  return (
    <styles.YearMonthFormDiv className="DayPicker-Caption">
      <span className="DayPicker-Caption-selector-wrapper">
        {moment(date).format('MMMM')}
        <select
          className="DayPicker-Caption-selector-wrapper--selector"
          name="month"
          onChange={onChange}
          value={date.getMonth()}
        >
          {availableMonth.map((month, i) => (
            <option key={month} value={months.indexOf(month)}>
              {month}
            </option>
          ))}
        </select>
      </span>
      <span className="DayPicker-Caption-selector-wrapper">
        {moment(date).format('YYYY')}
        <select
          className="DayPicker-Caption-selector-wrapper--selector"
          name="year"
          onChange={onChange}
          value={date.getFullYear()}
        >
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </span>
    </styles.YearMonthFormDiv>
  );
};


// http://react-day-picker.js.org/examples/elements-year-navigation/
// @enhance
class DatePicker extends Component {
  static propTypes = {
    // 選了日期後的callback
    onDayClick: PropTypes.func,
    // 選擇的日期
    selectedDate: PropTypes.instanceOf(Date),
    // 不能選的日期
    disabledDays: PropTypes.shape({}),
  }

  static defaultProps = {
    onDayClick: () => { },
    selectedDate: null,
    disabledDays: {}
  }

  handleYearMonthChange = (e) => {
    const { year, month } = e.target.form;
    // console.log('改變了喔!', year.value, month.value);
    const { fromMonth, toMonth } = this.renderMonthInfo();
    let currentMonth = new Date(year.value, month.value);
    let fromMonthValue = new Date(fromMonth.getFullYear(), fromMonth.getMonth());
    let toMonthValue = new Date(toMonth.getFullYear(), toMonth.getMonth());

    if (moment(currentMonth).isBefore(moment(fromMonthValue))) {
      // console.log('選出一個比最小日期還小的年月', currentMonth, fromMonthValue);
      currentMonth = fromMonthValue;
    }

    if (moment(currentMonth).isAfter(moment(toMonthValue))) {
      // console.log('選出一個比最小日期還大的年月', currentMonth, toMonthValue);
      currentMonth = toMonthValue;
    }

    this.props.onChaneYearMonthForm(currentMonth);
  }

  renderMonthInfo = () => {
    if (Object.keys(this.props.disabledDays).length <= 0) {
      return {};
    }
    const maxDate = this.props.disabledDays.after;
    const minDate = this.props.disabledDays.before;
    return {
      fromMonth: moment(minDate).startOf('month').toDate(),
      toMonth: moment(maxDate).startOf('month').toDate(),
    };
  }
  render() {
    const monthInfo = this.renderMonthInfo();
    return (
      <styles.Wrapper className="date-picker-wrapper">
        <DayPicker
          // localeUtils={MomentLocaleUtils}
          // locale="zh-tw"
          className="wi-day-picker"
          weekdaysShort={WEEKDAYS_SHORT}
          disabledDays={this.props.disabledDays}
          selectedDays={this.props.selectedDate}
          onDayClick={this.props.onDayClick}
          month={this.props.yearMonth}
          {...monthInfo}
          captionElement={({ date, localeUtils, locale }) => (
            <YearMonthForm
              date={date}
              localeUtils={localeUtils}
              onChange={this.handleYearMonthChange}
              monthInfo={monthInfo}
              locale={locale}
            />
          )}
        />
      </styles.Wrapper>

    );
  }
}

export default DatePicker;
