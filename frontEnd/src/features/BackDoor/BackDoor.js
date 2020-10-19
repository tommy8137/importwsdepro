import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Icon from '~~elements/Icon';
import * as BackDoorActions from './BackDoorActions';


const Div = styled.div`
  background: linear-gradient(161deg, #2f3843, #1d1d1d);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled(Form)`
  background: linear-gradient(155deg, #29384a, #29293c);
  width: 40%;
  border-radius: 4px;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.38);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  position: relative;
  z-index: 10;
  .logo{
    letter-spacing: 0.5rem;
    color: rgba(255,255,255,0.1);
    font-size: 4rem;
    font-weight: 600;
    position: absolute;
    top: -5.5rem;
  }
  .field {
    margin: 2.5rem 0rem 1rem;
    width: 50%;
    display: flex;
    align-items: center;
    &--input{
      width: 100%;
      outline: none;
      border:none;
      border-bottom: 0.5px solid rgba(255, 255, 255, 0.8);
      background: none;
      letter-spacing: 3px;
      color: rgba(255, 255, 255, 1);
      font-size: 0.8rem;
      padding: 0.3rem;
      ::placeholder {
        font-size: 0.8rem;
        padding: 0.3rem;
        color: rgba(255, 255, 255,0.3);
        /* text-align: center; */
      }
      &:hover{
        border-bottom: 0.5px solid rgba(90, 208, 214, 0.8);;
      }
    }
    .icon{
      width: 0.8rem;
      margin-right: 0.8rem;
    }
  }
  .errMsg{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 1.5rem 0rem ;
    span {
      white-space: pre-line;
      text-align:center;
      color: rgba(255, 255, 255, 1);
      font-size: 0.5rem;
      letter-spacing: 2px;
      line-height: 2rem;
      display: block;
      padding: 0rem 2rem;
    }
    .icon{
      width: 0.8rem;
      margin-left: 0.3rem;
      padding-bottom: 0.1rem;
    }
  }
  .confirm-btn{
    cursor: pointer;
    background: none;
    border: 1px solid rgba(255, 255, 255, 0.8);
    border-radius: 5px;
    color: rgba(255,255,255,0.8);
    letter-spacing: 2px;
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    &:hover{
      background: rgba(255, 255, 255, 1);
      color: rgba(0, 0, 0, 0.8);
    }
    &:focus{
      outline: none;
    }
  }
`;


function BackDoor(props) {
  // console.log('backdoor', props);
  const [errorMsg, setMsg] = useState(null);
  const { loginBackDoor } = props;
  return (
    <Div>
      <Formik
        initialValues={{
          emplid: '',
          password: '',
          // password: 'Widoor123',
        }}
        validationSchema={Yup.object().shape({
          emplid: Yup
            .string()
            .required('請輸入工號'),
          password: Yup
            .string()
            .required('請輸入密碼'),
          })}
        onSubmit={(values, action) => {
          // console.log('[onSubmit]>>>', values);
          const { password } = values;
          if (password === 'Widoor123') {
           loginBackDoor(values.emplid);
          } else {
            console.log('wrong');
            setMsg('密碼錯誤');
          }
        }}
      >
        {
          ({ values, errors, touched }) => {
          // console.log('表單的錯誤', errors);
          return (
            <Input
              autoComplete="off"
            >
              <div className="logo">
                BACK DOOR
              </div>
              <div className="field">
                <Icon icon="IcoHeadGreen" />
                <Field
                  className="field--input"
                  type="text"
                  name="emplid"
                  placeholder="Employee ID"
                />
              </div>
              <div className="field">
                <Icon icon="IcoKey" />
                <Field
                  className="field--input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onFocus={() => setMsg(null)}
                />
              </div>
              <div className="errMsg">
                {errorMsg && <span>{errorMsg}<Icon icon="IcoAlarmRed" /></span>}
                {touched.emplid && errors.emplid && <span>{errors.emplid}<Icon icon="IcoAlarmRed" /></span>}
                {touched.password && errors.password && <span>{errors.password}<Icon icon="IcoAlarmRed" /></span>}
              </div>
              <button
                className="confirm-btn"
                type="submit"
                id="loginSubmit"
              >Confirm
              </button>
            </Input>
          );
        }}
      </Formik>
    </Div>
  );
}

export default connect(
  (state) => {
    return {
    };
  },
  {
    loginBackDoor: BackDoorActions.loginBackDoor
  }
)(BackDoor);
