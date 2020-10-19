import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import {
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { checkAuth } from '~~utils/Auth';
import * as AuthActions from './AuthActions';
import LoginForm from './LoginForm';


const LoginContainer = styled.div`
  position:absolute;
  width:100%;
  height:100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e6e6e6;
`;

@connect(
  state => ({
    isLoggedin: state.auth.isLoggedin,
    errorMsg: state.auth.errorMsg,
  }),
  dispatch => ({
    actions: bindActionCreators(AuthActions, dispatch)
  }),
)

class Login extends Component {
  state = {
    redirectToReferrer: false,
  };

  componentWillMount() {
    if (checkAuth()) {
      console.log('有jwt');
      this.setState({ redirectToReferrer: true });
    } else {
      console.log('沒有jwt');
    }
  }

  login = (value, fromPath) => {
    this.props.actions.login(value, fromPath);
  }

  render() {
    // console.log('Login Container props >>>', this.props);
    console.log('isLoggedin', this.props.isLoggedin);
    // 檢查是否是從別頁過來的，沒有就填'/'，驗證成功要導回去
    const { fromPath } = this.props.location.state || { fromPath: { pathname: '/' } };
    // if (this.props.isLoggedin) {
    if (checkAuth()) {
      return (
        <Redirect to={fromPath} />
      );
    }


    return (
      <LoginContainer>
        <LoginForm
          login={value => this.login(value, fromPath)}
          errorMsg={this.props.errorMsg}
          initializeLoginErrorMsg={this.props.actions.initializeLoginErrorMsg}
        />
      </LoginContainer>
    );
  }
}


// props驗證
Login.WrappedComponent.propTypes = {
  isLoggedin: PropTypes.bool.isRequired,
  location: PropTypes.shape().isRequired,
  actions: PropTypes.shape({
    login: PropTypes.func.isRequired,
    initializeLoginErrorMsg: PropTypes.func.isRequired
  }).isRequired
};

export default Login;
