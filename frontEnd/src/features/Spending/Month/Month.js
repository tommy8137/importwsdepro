import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import styled from 'styled-components';
import Panel from '../Panel';

const MonthDiv = styled.div`
  background-color: #fff;
  margin: 3rem;
  @media (max-width: 1440px) {
    margin: 2rem;
  }
`;
export default class Month extends Component {
  render() {
    return (
      <MonthDiv>
        <Row>
          <Col xs="12">
            <Panel feature="month" />
          </Col>
        </Row>
      </MonthDiv>
    );
  }
}
