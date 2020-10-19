import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Icon, { IconName } from '~~elements/Icon';

const FormContainer = styled.div`
  background: linear-gradient(161deg, #2f3843, #1d1d1d);
  width: 500px;
  border-radius: 4px;
  border: solid 1px #1e1e1e;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.38);
  display: flex;
  flex-direction: column;
  align-items: center;

  .Logo{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 40px 0px 20px 0px;

    p {
      letter-spacing: 2px;
      color: rgba(255,255,255,0.9);
      font-size: 18px;
      font-weight: 100;
    }

    .icon {
      /* width: 72px; */
      margin: 0px 0px 15px 0px;
    }
  }

  .Form{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      width: 12px;
      margin-right: 10px;
      margin-left: 5px;
    }

    .field {
      outline: none;
      border:none;
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.5);
      margin: 10px 0px 10px 0px;
      background: none;
      padding: 10px 8px;
      letter-spacing: 3px;
      width: 350px;
      color: rgba(255, 255, 255, 1);
      font-size: 10px;

      ::placeholder {
        font-size: 8px;
        padding: 10px 8px;
        color: rgba(255, 255, 255,0.3);
      }

      &:hover{
        border-bottom: 0.5px solid rgba(0, 169, 144, 1);
      }
    }

    .ErrorMsg {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 1rem 0rem;

      span {
        white-space: pre-line;
        text-align:center;
        color: rgba(255, 255, 255, 1);
        font-weight: 200;
        font-size: 10px;
        letter-spacing: 2px;
        line-height: 1.5rem;
        display: block;
        padding: 0rem 2rem;
      }
    }

    button{
      cursor: pointer;
      background: none;
      border: 1px solid rgba(255, 255, 255, 0.8);
      border-radius: 5px;
      font-size: 15px;
      color: rgba(255,255,255,1);
      letter-spacing: 2px;
      padding: 15px 160px;
      margin-bottom: 40px;
      &:hover{
        background: rgba(255, 255, 255, 1);
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
`;

export default class LoginForm extends Component {
  render() {
    // console.log('props of AuthForm >>', this.props);
    return (
      <div>
        <Formik
          validationSchema={Yup.object().shape({
            username: Yup
              .string()
              .required('請輸入工號'),
            password: Yup
              .string()
              .max(30)
              .required('請輸入密碼'),
            })}
          initialValues={{
              username: '',
              password: '',
            }}
          onSubmit={(values, action) => {
              setTimeout(() => {
                action.setSubmitting(false);
              }, 3000);
              // console.log('values', values);
              this.props.login(values);
            }}
          render={({ values, errors, touched, isSubmitting }) => (
            <FormContainer>
              <div className="Logo">
                <Icon icon={IconName.IcoLogoLogin} size="72px" />
                <p>E-PROCUREMENT</p>
              </div>
              <Form
                className="Form"
                autoComplete="off"
              >
                <div>
                  <Icon icon={IconName.IcoHeadGreen} />
                  <Field
                    type="text"
                    name="username"
                    className="field"
                    placeholder="工號"
                    onBlur={this.props.initializeLoginErrorMsg}
                  />
                </div>
                <div>
                  <Icon icon={IconName.IcoKey} />
                  <Field
                    type="password"
                    name="password"
                    className="field"
                    placeholder="密碼"
                    onBlur={this.props.initializeLoginErrorMsg}
                  />
                </div>
                <div className="ErrorMsg">
                  {touched.username && errors.username && <span>{errors.username}<Icon icon="IcoAlarmRed" /></span>}
                  {touched.password && errors.password && <span>{errors.password}<Icon icon="IcoAlarmRed" /></span>}
                  {this.props.errorMsg && <span>{this.props.errorMsg}<Icon icon="IcoAlarmRed" /></span>}
                </div>
                <div>
                  <button type="submit" disabled={isSubmitting} id="loginSubmit">登入</button>
                </div>
              </Form >
            </FormContainer>
            )}
        />
      </div>
    );
  }
}


// LoginForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired,
//   initializeLoginMsg: PropTypes.func.isRequired,
//   LoginMsg: PropTypes.string.isRequired,
// };


// LoginForm.defaultProps = {
//   error: null,
//   handleSubmit: PropTypes.func.isRequired,
//   pristine: PropTypes.bool.isRequired,
//   reset: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   submitting: PropTypes.bool.isRequired
// };
