import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styled from 'styled-components';
import Icon from '~~elements/Icon';
import * as R from 'ramda';

const CustomizeErrorMsg = styled.div`
  height: 17px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.17;
  letter-spacing: normal;
  text-align: left;
  color: #ec0c0c;
  margin-top: 6px;
  .icon {
    width: 0.8rem;
    margin-left: 5px;
  }
`;

function ErrorMsg(props) {
  const { name } = props;
  if (!name) return (null);
  return (
    <CustomizeErrorMsg>
      <ErrorMessage name={name}>
        {(msg) => {
          if (R.is(String, msg)) {
            return <CustomizeErrorMsg>{msg}<Icon icon="IcoAlarmRed" /></CustomizeErrorMsg>;
          }
          return (null);
        }}
      </ErrorMessage>
    </CustomizeErrorMsg>
  );
}

ErrorMsg.defaultProps = {
  name: ''
};

export default ErrorMsg;
