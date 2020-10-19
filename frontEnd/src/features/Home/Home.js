import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as R from 'ramda';

import Icon from '~~elements/Icon';
import Alert from '~~elements/Alert';
import Button from '~~elements/Button';
import { logout } from '~~features/Auth/AuthActions';
import checkingRbac from '~~hoc/CheckingRbac';

const LandingContainer = styled.div`
  background-color: #e6e6e6;
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;

  .info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 4rem;
    padding: 1.25rem 2.875rem;
    font-size: 14px;
    .username {
      margin-right: 20px;
      margin-left: 10px;
    }
    .icon {
      width: 21px;
      height: 20px;
      &:first-child {
        width: 14px;
        height: 13px
      }
    }
  }
  .container {
    padding-top:calc(64px - 4rem);
    height:calc(100% - 4rem);
    padding-right: ${props => props.gutter}px;
    padding-left:${props => props.gutter}px;
    max-width: 1400px;
    .row {
      height:100%;
      align-items:center;
      justify-content: center;
      margin-left:-${props => props.gutter}px;
      margin-right:-${props => props.gutter}px;
      [class^="col-"]{
        padding:${props => props.gutter}px;
      }
    }
  }
`;

const IconLink = styled(Link)`
  display:block;
  text-decoration:none;

  .icon-wrap {
    overflow: hidden;
    border-radius: 10px;
    border: 2px solid transparent;
    margin-bottom: 2rem;
    transition: 0.3s ease all;
    /* border: 2px solid #eecf4f; */
  }
  &:hover {
    text-decoration:none;
    .icon-wrap {
      border: 2px solid #eecf4f;
      box-shadow: 4px 4px 24px #9a9a9a;
    }
    h2 {
      text-decoration:none;
      opacity:1;
    }
  }
  .icon{
    display: block;
    width:100%;
  }
  h2 {
    font-size: 1.8rem;
    line-height: 1.3;
    text-align: center;
    color: #333333;
    opacity:0.8;
    transition:0.3s ease all;
    white-space:nowrap;
    font-weight:300;
  }
`;

@connect(
  state => ({}),
  { logout }
)
@checkingRbac()

export default class Home extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      alert: false,
    };
  }


  toggleAlert = () => {
    this.setState({
      ...this.state,
      alert: !this.state.alert,
    });
  }

  handleConfirmLogout = (e) => {
    this.toggleAlert();
    this.props.logout();
  }

  render() {
    const { alert } = this.state;
    const { fuzzyCompareRbac } = this.props;
    const canSeeXrayButton = R.path(['View', 'allow', 'xray.me'], this.props.rbac) || R.path(['View', 'allow', 'xray.ee'], this.props.rbac);
    const canSeeCleansheetButton = fuzzyCompareRbac(['Edit', 'allow'], 'cleansheet');
    const canSeeDashboardButton = R.path(['List', 'allow', 'dashboard'], this.props.rbac);
    const canSeeBomManagementButton = R.path(['List', 'allow', 'me_bom_projects'], this.props.rbac) || R.path(['List', 'allow', 'ee_bom_projects'], this.props.rbac);
    return (
      <LandingContainer gutter={30}>
        <Alert isOpen={alert} type="alarm">
          <div className="row">請確認是否要登出？</div>
          <div className="row">
            <Button
              color="transparentInModal"
              border={false}
              onClick={this.handleConfirmLogout}
            >
              確定
            </Button>
            <Button
              color="black"
              onClick={this.toggleAlert}
            >
              取消
            </Button>
          </div>
        </Alert>
        <div className="info">
          <Icon icon="IcoHeadGreen" />
          <span className="username">
            {sessionStorage.getItem('username')}
          </span>
          <Icon icon="BtnLogoutDark" onClick={this.toggleAlert} />
        </div>
        <Container>
          <Row>
            {canSeeXrayButton ?
              (
                <Col xs={12} md={3}>
                  <IconLink to="/s/xRay">
                    <div className="icon-wrap">
                      <Icon icon="BtnXray" />
                    </div>
                    <h2>X-Ray</h2>
                  </IconLink>
                </Col>
              ) : (null)
            }
            {canSeeCleansheetButton ?
              (
                <Col xs={12} md={3}>
                  <IconLink to="/s/cleanSheet/cleanSheet">
                    <div className="icon-wrap">
                      <Icon icon="BtnCostGenerator" />
                    </div>
                    <h2>CLEAN SHEET</h2>
                  </IconLink>
                </Col>) : (null)
            }
            {canSeeDashboardButton ?
              (
                <Col xs={12} md={3}>
                  <IconLink to="/s/board/ProjectView">
                    <div className="icon-wrap">
                      <Icon icon="BtnDashboard" />
                    </div>
                    <h2>Dashboard</h2>
                  </IconLink>
                </Col>) : (null)
            }
            {
              canSeeBomManagementButton ?
                (
                  <Col xs={12} md={3}>
                    <IconLink to="/s/bomManagement">
                      <div className="icon-wrap">
                        <Icon icon="BtnBom" />
                      </div>
                      <h2>BOM Management</h2>
                    </IconLink>
                  </Col>) : (null)
            }
          </Row>
        </Container>
      </LandingContainer>
    );
  }
}
