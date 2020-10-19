import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Field from '~~elements/Field';
import moment from 'moment';
import Datetime from 'react-datetime';
import Popper from '~~elements/Popper';
import Icon, { IconName } from '~~elements/Icon';

const StyledDatePickerInput = styled.div`
  position: relative;
  width: 100%;
  min-height: 2.5rem;
  margin-bottom: 0.125rem;
  border-bottom: ${({ border }) => (border ? '1px' : '0px')} solid #333;
  border-color: ${({ isInvalid }) => (isInvalid ? 'red' : '')};
  padding: 0.125rem 0rem;
  padding-right: 0.5rem;
  display: flex;
  flex-direction: column;
  transition: ease .3s all;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  :hover {
    transition: ease .3s all;
    border-bottom: ${({ border }) => (border ? '1px' : '0px')} solid ${({ disabled }) => (disabled ? '#4D4D4D' : '#00ac9d')};
    opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
  .content {
    width: 100%;
    height: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    position: absolute;
    padding: 0 0.5rem 0 0;
    font-size: 1rem;
    bottom: 0;
    margin-bottom: 0.2rem;
    .placeholder {
      color: #C0C0C0;
    }
    .ellipsis-box {
      flex: 0 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .arrow,
    .reset{
      flex: 0 auto;
    }
    .arrow { }
    .reset {
      margin: 0 0.2rem;
    }
  }
`;

const StyledDatePicker = styled(Datetime)`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none;
  margin-top: 0.5rem;
  border: 1px solid #4c4c4c;
  .form-control {
    display: none;
  }
  .rdtPicker {
    position: relative;
    padding: 0px;
    margin: 0;
    width: 100%;
    td {
      height: 2.5rem;
      width: 2.5rem;
      &.rdtActive {
        background: rgb(0, 169, 144);
      }
      &.rdtToday::before {
        border-bottom: 7px solid rgb(0, 169, 144);
      }
    }
  }
`;


const DatePicker = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataTime, setDateTimte] = useState('');
  const {
    onChange = () => { },
    styledType,
    dateFormat = 'YYYY-MM-DD',
    timeFormat = false,
    defaultValue = null,
    value = null,
    placeholder = '',
    disabled = false,
    className,
    isValidDate,
    isInvalid,
    ...restProps
  } = props;

  const format = `${dateFormat} ${timeFormat || ''}`;

  useEffect(() => {
    const formatValue = moment(value).format(format);
    const newValue = value === null ? '' : formatValue;
    setDateTimte(newValue);
  }, [JSON.stringify(value)]);


  function handleChange(momentObj) {
    if (!disabled) {
      setIsOpen(false);
      const newValue = moment(momentObj).format(format);
      onChange(newValue);
    }
  }

  function handleReset() {
    if (!disabled) {
      onChange(null);
    }
  }

  const inputValue = dataTime ? String(dataTime).toString() : '';
  const showReset = inputValue && !disabled;
  const showArrow = !disabled;
  const showPlaceholder = !inputValue;

  return (
    <Popper
      width="auto"
      toggleOpen={() => setIsOpen(!isOpen)}
      onClose={() => setIsOpen(false)}
      isOpen={isOpen}
      disabled={disabled}
      target={p => {
        const { innerRef, onClick } = p;

        return (
          <StyledDatePickerInput
            innerRef={innerRef}
            onClick={onClick}
            border
            disabled={disabled}
            isInvalid={isInvalid}
          >
            <div className="content">
              {showPlaceholder && <div className="ellipsis-box placeholder">Choose Date</div>}
              {/* 選擇的值 */}
              <div className="ellipsis-box">{inputValue}</div>
              {showReset &&
                <div className="reset">
                  <Icon
                    icon="BtnReset2"
                    onClick={handleReset}
                    size="1.2rem"
                  />
                </div>
              }
              {
                showArrow &&
                <div className="arrow">
                  {isOpen
                    ? <Icon icon={IconName.IconArrowUpBlack} size="0.85rem" />
                    : <Icon icon={IconName.IconArrowDownBlack} size="0.85rem" />}
                </div>
              }
            </div>
          </StyledDatePickerInput>
        );
      }}
    >
      <StyledDatePicker
        {...restProps}
        open
        onChange={handleChange}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        inputProps={{ placeholder, disabled }}
        disabled={disabled}
        isValidDate={isValidDate}
        // defaultValue={defaultDateValue}
        value={dataTime}
      />
    </Popper>
  );
};

export default DatePicker;
