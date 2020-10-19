import React, { Component, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { push } from 'connected-react-router';
import _ from 'lodash';
import LppNotworkImage from './lpp_notwork.png';

const LppWrap = styled.div`
  background: url('${LppNotworkImage}') center/auto no-repeat;
  height: 100vh;
`;

const LppComponent = (props) => {
  return (
    <LppWrap className="lpp-wrap" />
  );
};

LppComponent.defaultProps = {

};

export default connect(
  (state) => {
    return {
    };
  },
  {
    goToRouter: push
  }
)(LppComponent);
