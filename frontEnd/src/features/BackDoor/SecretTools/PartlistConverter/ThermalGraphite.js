import React, { Fragment, useState } from 'react';
import { Input, Alert, Container, Row, Col, ButtonGroup, Button, } from 'reactstrap';

const propTypes = {

};

function ThermalGraphite(props) {
  const [left, setleft] = useState('');
  const [right, setright] = useState('');
  const [data, setData] = useState('');
  const [invalid, setInvalid] = useState(false);

  const getPricePart = (pricedata) => {
    const keycount = Object.keys(pricedata).length;
    let result = {};
    const {
      graphiteLength: partssizelength,
      graphiteWidth: partssizewidth,
      graphitePics,
      graphiteLayer: graphiteLayer1,
      graphiteLayerThickness: graphiteLayerThickness1,
      graphiteLayerPrice: graphiteLayerPrice1,
      glueDouble: glueDouble1,
      glueDoublePrice: glueDoublePrice1,
      petSingle,
      petSinglePrice,
      workProcessing,
      workProcessingPrice,
      totalThickness,
      id,
      activate_date: date,
    } = pricedata[Object.keys(pricedata)[0]];

    if (keycount === 1) {
      result = {
        Graphite: {
          partssizelength,
          partssizewidth,

          petSingle,
          petSinglePrice,
          workProcessing,
          workProcessingPrice,
          totalThickness,

          isEnabled1: graphitePics > 0,
          graphiteLayer1,
          graphiteLayerThickness1,
          glueDouble1,
          graphiteLayerPrice1,
          glueDoublePrice1,

          id,
          activate_date: date,

          isEnabled2: graphitePics > 1,
          graphiteLayer2: (graphitePics > 1 ? graphiteLayer1 : null),
          graphiteLayerThickness2: (graphitePics > 1 ? graphiteLayerThickness1 : null),
          glueDouble2: (graphitePics > 1 ? glueDouble1 : null),
          graphiteLayerPrice2: (graphitePics > 1 ? graphiteLayerPrice1 : 0),
          glueDoublePrice2: (graphitePics > 1 ? glueDoublePrice1 : 0),
        }
      };
    } else {
      setInvalid('這筆有add another或沒有建資料');
    }

    return result;
  };

  const getFormPart = (formdata) => {
    const count = formdata.Graphite.length;
    const {
      graphiteLength: partssizelength,
      graphiteWidth: partssizewidth,
      graphitePics,
      graphiteLayer: graphiteLayer1,
      graphiteLayerThickness: graphiteLayerThickness1,
      graphiteLayerPrice: graphiteLayerPrice1,
      glueDouble: glueDouble1,
      glueDoublePrice: glueDoublePrice1,
      petSingle,
      petSinglePrice,
      workProcessing,
      workProcessingPrice,
      totalThickness,
      id,
      activate_date: date,
    } = formdata.Graphite[0];

    let result = {};
    if (count === 1) {
      result = {
        'thermal-graphite': {
          Graphite: {
            partssizelength,
            partssizewidth,
            petSingle,
            petSinglePrice,
            workProcessing,
            workProcessingPrice,
            totalThickness,
            graphite1: {
              isEnabled1: graphitePics > 0,
              graphiteLayer1,
              graphiteLayerThickness1,
              glueDouble1,
              graphiteLayerPrice1,
              glueDoublePrice1,
              id,
              activate_date: date,
            },
            graphite2: {
              isEnabled2: graphitePics > 1,
              graphiteLayer2: (graphitePics > 1 ? graphiteLayer1 : null),
              graphiteLayerThickness2: (graphitePics > 1 ? graphiteLayerThickness1 : null),
              glueDouble2: (graphitePics > 1 ? glueDouble1 : null),
              graphiteLayerPrice2: (graphitePics > 1 ? graphiteLayerPrice1 : 0),
              glueDoublePrice2: (graphitePics > 1 ? glueDoublePrice1 : 0),
            }
          }
        }
      };
    } else {
      console.log('這筆有add another或沒有建資料');
      setInvalid('這筆有add another或沒有建資料');
    }

    return result;
  };

  const handleClick = (e) => {
    try {
      /*
        1. Price.thermalgraphite 下的object
          - 只有一個property "Graphite"，需拿掉後面的uuid
          - graphiteLength -> partssizelength，graphiteWidth -> partssizewidth
          - 判斷 graphitePics，如果有2的話就要把值也帶入2，如果是1的話 2的要帶null
          - graphiteLengthBorder 和 graphiteWidthBorder 要移除
        2. formData.thermal-graphite.Graphite 不是array 要改成object
      */
      const result = {
        ...data,
        Price: {
          ...data.Price,
          thermalgraphite: getPricePart(data.Price.thermalgraphite),
        },
        formData: {
          ...getFormPart(data.formData['thermal-graphite']),
        }
      };

      setright(JSON.stringify(result));
    } catch (error) {
      setInvalid('輸入的資料格式有誤');
    }
  };
  const handleChange = (e) => {
    try {
      const { index } = e.currentTarget.dataset;
      const { value } = e.target;
      setInvalid(false);
      if (index === 'left') {
        setleft(value);
        setData(JSON.parse(value));
      }
    } catch (error) {
      setInvalid(true);
      console.error(error);
    }
  };
  const handleReset = (e) => {
    setleft('');
    setright('');
    setInvalid(false);
    setData('');
  };

  return (
    <Col>
      <Row>
        <Col><h5>Graphite v20191218 to v20191225</h5></Col>
        <Col>
          <Button disabled={invalid} onClick={handleClick}>轉換</Button>
          <Button onClick={handleReset}>Reset</Button>
          {invalid && <span>{invalid}</span>}
        </Col>
      </Row>
      <Row>
        <Container>
          <Row>
            <Col>
              <Input
                type="textarea"
                value={left}
                rows={20}
                name="text"
                data-index="left"
                invalid={invalid}
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Input
                type="textarea"
                value={right}
                rows={20}
                name="text"
                data-index="right"
                onChange={handleChange}
              />
            </Col>
          </Row>
        </Container>
      </Row>
    </Col>
  );
}


export default ThermalGraphite;
