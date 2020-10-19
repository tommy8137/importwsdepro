import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import _set from 'lodash/set';
import _omit from 'lodash/omit';
import { Input, Alert, Container, Row, Col, } from 'reactstrap';
import Button, { BTN_COLOR } from '~~elements/Button';
import LoginButton from './LoginButton';
import EeBom from './EeBom';
import PartlistConverter from './PartlistConverter';
import PartlistExportKey from './PartlistExportKey';
import FindProject from './FindProject';

const ComponentWrapper = styled(Row)`
  background: #FFFFFF;
  margin-top: 2rem;
  padding: 2rem;
`;

const Component = (tab) => {
  return {
    eebom: <EeBom />,
    partlistConverter: <PartlistConverter />,
    PartlistExportKey: <PartlistExportKey />,
    FindProject: <FindProject />
  }[tab];
};
function SecretTools() {
  const [tab, setTab] = useState('PartlistExportKey');
  const [token, setToken] = useState('');

  return (
    <Container>
      <Row>
        <Col>
          <Alert color="danger">免責說明：此功能目前僅供在 開發環境(development) 時使用，在正式環境使用後果需自行負責，感謝！</Alert>
        </Col>
      </Row>
      {/* 按鈕當Tab用 */}
      <Row>
        <Col sm={{ size: 10 }}>
          <Button color={BTN_COLOR.WHITE} inverse={tab === 'eebom'} onClick={e => setTab('eebom')}>EEBOM</Button>
          <Button color={BTN_COLOR.WHITE} inverse={tab === 'partlistConverter'} onClick={e => setTab('partlistConverter')}>Partlist格式轉換</Button>
          <Button color={BTN_COLOR.WHITE} inverse={tab === 'PartlistExportKey'} onClick={e => setTab('PartlistExportKey')}>PartlistExport</Button>
          <Button color={BTN_COLOR.WHITE} inverse={tab === 'FindProject'} onClick={e => setTab('FindProject')}>Find Project</Button>
        </Col>
        <Col sm={{ size: 2 }}>
          <LoginButton onClick={setToken} />
        </Col>
      </Row>
      {/* 各功能 */}
      <ComponentWrapper>
        <Col key={token}>
          {Component(tab)}
        </Col>
      </ComponentWrapper>
    </Container>
  );
}

export default SecretTools;
