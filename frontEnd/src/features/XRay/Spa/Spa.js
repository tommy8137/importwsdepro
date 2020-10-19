import React, { Component, useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as XrayActions from '../XrayActions';
import TableProvider from './components/Tables/TableProvider';


const Container = styled.div`
  display: block;
  width: 100%;
  height: -webkit-fill-available;
  background-color: #e6e6e6;
`;

const TableContrainer = styled.div`
  display: block;
  padding: 1rem 2rem 0 2rem;
  max-width: 1800px;
  width: 100%;
  margin: 0 auto;
`;

const SpaComponent = (props) => {
  const { spaForm, spaForm: { type1, type2, spec } } = props;
  useEffect(() => {
    window.setFakeSpaAction = props.setFakeSpaAction;
    // for debug
    // props.setFakeSpaAction();
    if (type1 && type2) {
      props.postSpaAnalysisAction(spaForm);
    }
    return () => {
      props.resetSpaAction();
    };
  }, []);

  return (
    <Container>
      <TableContrainer>
        <TableProvider />
      </TableContrainer>
    </Container>
  );
};

SpaComponent.defaultProps = {

};

export default connect(
  (state) => {
    return {
      minPriceItem: state.xray.minPriceItem,
      spaForm: state.xray.analysisForm.spaForm,
      spaData: state.xray.spaData,
      searchBy: state.xray.searchBy,
      roleType: state.xray.roleType,
    };
  },
  {
    resetSpaAction: XrayActions.resetSpa,
    postSpaAnalysisAction: XrayActions.postSpaAnalysis,
    setFakeSpaAction: XrayActions.setFakeSpa,
    goToRouter: push
  }
)(SpaComponent);

