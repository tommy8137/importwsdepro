import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'reactstrap';

import Icon from '~~elements/Icon';
import Button from '~~elements/Button';
import * as Mixins from '~~styles/_mixins';

const Div = styled.div`
  .field--label {
    ${Mixins.formLabel};
  }
  button {
    width: 8rem;
    display: flex;
    justify-content: center;
    flex: 1;
    .field--icon {
      width: 1rem;
      margin-right: 0.4rem;
    }
  }

`;

const UploadField = ({
  field, // { name, value, onChange, onBlur }
  // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => {
  return (
    <Div className="field">
      <label className="field--label" htmlFor={props.name}>
        {props.labelTitle}
      </label>
      <div className="field--file">
        <Row>
          <Col md={6}>
            <Button border={true} color="white" onClick={props.onDownload}>
              <Icon icon="IcoDownload" className="field--icon download" />
              <div>Download</div>
            </Button>
          </Col>
          <Col md={6}>
            <Button border={true} color="white" onClick={props.onUpload}>
              <Icon icon="IcoUpload" className="field--icon upload" />
              <div>Update</div>
            </Button>
          </Col>
        </Row>
      </div>
    </Div>
  );
};


export default UploadField;
