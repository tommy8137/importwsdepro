import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Modal from '~~elements/Modal';
import Datetime from 'react-datetime';
import _get from 'lodash/get';

import Button from '~~elements/Button';

const StyledDatePicker = styled(Datetime)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .rdtPicker {
    width: 18.75rem;
    top: 3rem;
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

  &.filterBar-styled{
    width: 100%;
    height: 100%;
    .form-control {
      border: none;
      letter-spacing: 1px;
      width: 100%;
      height: 90%;
    }
  }
`;
function ScheduleModal(props) {
  const { isOpen, onSave, onCancel, defaultValue, } = props;
  const [date, setDate] = useState(defaultValue);

  useEffect(() => {
    setDate(defaultValue);
  }, [defaultValue]);

  const valid = current => current.isAfter(moment());
  const handleClickCancel = (e) => {
    onCancel();
  };

  const handleClickSave = (e) => {
    onSave(date);
  };

  return (
    <Modal.Modal
      isOpen={isOpen}
      widthType="small"
    >
      <Modal.ModalHeader>
          Schedule New Release
      </Modal.ModalHeader>
      <Modal.ModalBody>
        <StyledDatePicker
          value={moment(date)}
          input={false}
          open={true}
          isValidDate={valid}
          dateFormat="YYYY/MM/DD"
          timeFormat={false}
          onChange={data => setDate(moment(data).format('YYYY/MM/DD'))}
        />
      </Modal.ModalBody>
      <Modal.ModalFooter>
        <Button color="white" onClick={handleClickCancel}>Cancel</Button>
        <Button color="black" onClick={handleClickSave}>Save</Button>
      </Modal.ModalFooter>
    </Modal.Modal>
  );
}


export default ScheduleModal;
