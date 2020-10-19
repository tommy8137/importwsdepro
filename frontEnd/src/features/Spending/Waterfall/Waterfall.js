import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import styled from 'styled-components';
import Panel from '../Panel';

const WaterfallDiv = styled.div`
  background-color: #fff;
  margin: 3rem;
  @media (max-width: 1440px) {
    margin: 2rem;
  }
`;

export default class Waterfall extends Component {
  render() {
    return (
      <WaterfallDiv>
        <Row>
          <Col xs="12">
            <Panel feature="waterfall" />
          </Col>
        </Row>
      </WaterfallDiv>
    );
  }
}
