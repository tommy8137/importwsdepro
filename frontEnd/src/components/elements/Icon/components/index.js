import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import styled from 'styled-components';

import libs from '~~elements/Icon/components/libs';
import Icon from '~~elements/Icon/';

import 'bootstrap/dist/css/bootstrap.css';

const IconContainer = styled.div`
  padding:12px;
  .row {
    justify-content: center;
    align-items: flex-start;
    [class^="col-*"] {
      padding: 6px;
    }
  }
  .icon-content {
    padding: 24px 0;
    p {
      display: block;
      font-weight:bolder;
      display:block;
      text-align:center;
      font-size: 0.4em;
    }
    .icon-wrap {
      width: ${props => props.width}px;
      display: block;
      height: 100%;
      border: 1px solid #607d8b;
      transition: 0.12s ease all;
      margin-bottom: 12px;
      &:hover{
        background-color:#607d8b;
        box-shadow: 1px 2px 3px #aaa;
        p{
          color:white;
        }
      }
      .icon{
        display: block;
        margin: 0 auto;
        width: 100%;
      }
      p{
        font-weight:bolder;
        display:block;
        text-align:center;
      }
    }
  }

  .icon-filter {
    display: flex;
    align-content: center;
    padding: 12px;
    p {
      margin: 0;
    }
    .form-control {
      width: 100%;

    }
  }
`;

export default class IconLibs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      type: '',
      width: '120'
    };
  }
  onSelectChange = (e) => {
    this.setState({
      ...this.state,
      type: e.target.value
    });
  }
  onInputChange = (e) => {
    this.setState({
      ...this.state,
      search: e.target.value
    });
  }
  onWidthChange = (e) => {
    this.setState({
      ...this.state,
      width: e.target.value
    });
  }
  render() {
    const { type } = this.state;
    const filterLibs = libs
      .filter(iconName => {
        return iconName.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1;
      });
    return (
      <Container>
        <IconContainer width={this.state.width}>
          <Row className="icon-filter">
            <Col>
              <p>icon名稱</p>
              <Input
                type="text"
                onChange={this.onInputChange}
                placeholder="搜尋Icon..."
                value={this.state.search}
              />
            </Col>
            <Col>
              <p>icon大小寬度</p>
              <Input
                type="number"
                onChange={this.onWidthChange}
                placeholder="Icon width"
                value={this.state.width}
              />
            </Col>
            <Col>
              <p>icon狀態</p>
              <Input
                type="select"
                onChange={this.onSelectChange}
                value={this.state.type}
              >
                <option value="">選擇狀態</option>
                <option value="normal">normal</option>
                <option value="hover">hover</option>
                <option value="press">press</option>
                <option value="disable">disable</option>
                <option value="select">select</option>
                <option value="half">half</option>
              </Input>
            </Col>
          </Row>
          <div className="icon-content">
            <p>搜尋結果:{filterLibs.length}</p>
            <Row className="justify-content-center">
              {
                filterLibs.length ?
                  filterLibs
                    .map((iconName, i) => (
                      <Col xs="auto" key={i}>
                        <div className="icon-wrap">
                          <p>{iconName}</p>
                          <Icon type={type} icon={iconName} />
                        </div>
                      </Col>
                    )) :
                  <p>Icon Not Found</p>
              }
            </Row>
          </div>
        </IconContainer>
      </Container>
    );
  }
}
