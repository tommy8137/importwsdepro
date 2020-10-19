import React, { useState, } from 'react';
import { Container, Row, ButtonGroup, Button, } from 'reactstrap';
import ThermalGraphite from './ThermalGraphite';
import HousingMetal from './HousingMetal';


function PartlistConverter(props) {
  const [tab, setTab] = useState('graphite');
  const Component = {
    graphite: ThermalGraphite,
    metal: HousingMetal,
  }[tab];
  return (
    <Container>
      <Row>
        <ButtonGroup>
          <Button outline={tab === 'graphite'} color="info" onClick={e => setTab('graphite')}>Thermal Graphite</Button>
          {/* <Button outline={tab === 'metal'} color="info" onClick={e => setTab('metal')}>Metal</Button> */}
          <Button outline={tab === ''} color="info">預留</Button>
        </ButtonGroup>
      </Row>
      <Row>
        <Component />
      </Row>
    </Container>
  );
}

export default PartlistConverter;
