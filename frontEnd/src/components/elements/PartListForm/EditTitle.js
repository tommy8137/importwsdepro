import React, { Component, useState, useEffect, useRef, useContext, createContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import Button from '~~elements/Button';
import Icon from '~~elements/Icon';

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translate(20%, 0);
  }
  to {
    opacity: 1;
    transform: translate(0%, 0);
  }
`;


const EditTitleContainer = styled.div`
  position: relative;
  display: flex;
  padding: 6px 0;
  margin-bottom: 12px;
  border-bottom: 2px solid #333;
  .field {
    display: flex;
    flex: 0 100%;
    align-items: center;

    input {
      border: none;
      display: block;
      width: 100%;
      transition: 0.3s ease all;
    }
    p,
    .edit-btn {
      flex: 0 auto;
    }
    p {
      margin: 0;
    }
    .edit-btn {
      padding: 0;
      width: 2rem;
      height: 2rem;
      display: block;
      background-color: transparent;
      border: none;
      cursor: pointer;
      &:focus {
        outline: 0;
      }
    }
  }
  .inline-btn {
    white-space: nowrap;
    flex: 0 auto;
    animation: ${fadeInRight} 0.3s 0s ease 1 both;
    .btn {
      padding: 4px 12px;
      height: auto;
      width: auto;
      border-radius: 1rem;
      box-shadow: none;
      margin-right: 6px;
      line-height: 1;
      &.btn-green {
        background-color: #009588;
        color: white;
        border: 1px solid transparent;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const EditTitle = (props) => {
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(props.value);
  }, [props.value]);

  const handleChange = e => {
    setTitle(e.target.value);
  };

  const handleSave = () => {
    if (typeof (props.onChange) === 'function') {
      props.onChange();
    }
    setEdit(false);
  };

  const handleCancel = () => {
    setEdit(false);
    setTitle(props.value);
  };

  return (
    <EditTitleContainer className="edit-title-container">
      {
        edit ?
          (
            <React.Fragment>
              <div className="field">
                <input value={title} onChange={handleChange} />
              </div>
              <div className="inline-btn">
                <Button color="white" border onClick={handleCancel}>Cancel</Button>
                <Button className="btn-green" color="white" border="false" onClick={handleSave}>Save</Button>
              </div>
            </React.Fragment>
          ) :
          (
            <React.Fragment>
              <div className="field">
                <p>{title}</p>
                <button className="edit-btn" onClick={() => setEdit(true)}>
                  <Icon icon="BtnEditBomGray" />
                </button>
              </div>
            </React.Fragment>
          )
      }
    </EditTitleContainer>
  );
};

export default connect(
  (state) => {
    return {};
  },
  {
    // approveBomAction: BomDetailActions.approveBomAction
  }
)(EditTitle);

