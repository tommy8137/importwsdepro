import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '~~elements/Button';
import Icon from '~~elements/Icon';
import Field from '~~elements/Field';

const Wrapper = styled.div`
  top: -10%;
  left: 0;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  opacity: 0;
  z-index: 9999;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  transition: .3s ease all;
  &.active {
    top: 0;
    opacity: 1;
    visibility: visible;
    transition: .3s ease all;
  }
  .body {
    color: #fff;
    width: 496px;
    min-height: 240px;
    border-radius: 4px;
    box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.38);
    border: solid 1px #1e1e1e;
    background-color: #333;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    padding: 4rem 4.4rem 1.5rem;
    &-icon {
      position: absolute;
      width: 6rem;
      top: -45px;
    }
  }
  .title{
    width: 100%;
    min-height: 60%;
    text-align: center;
    line-height: 2rem;
    font-size: 0.9rem;
    letter-spacing: 0.5px;
  }
  .content{
    margin: 1.5rem 0rem;
    width: 100%;
    .textarea-label {
      font-size: 0.85rem;
      margin: 0;
      color: white;
    }
    .duck-field--label-zone--label{
      color: white;
      opacity: 1;
      font-size: 0.9rem;
      letter-spacing: 0.5px;
    }
  }
  .btns{
      display: flex;
      justify-content: space-around;
      button{
        width: 10rem;
        font-size: 0.9rem;
      }
    }
`;

const VersionRemarkAlert = (props) => {
  const {
    isOpen
  } = props;


  const [remark, setRemark] = useState('');

  useEffect(() => {
  }, []);

  /**
   * 送出remark: 原本是直接丟formik的values
   */
  function handleSubmit() {
    props.onSure({ versionRemark: remark });
  }


  /**
   * remark不可輸入超過300個字
   * @param {} e onChange event
   */
  function handleRemarkChange(e) {
    if (e.target.value.length <= 300) {
      setRemark(e.target.value);
    }
  }

  return (
    <Wrapper className={isOpen ? 'active' : ''}>
      <div className="body e2e_approve_confirm">
        <div className="body-icon">
          <Icon icon="IcoAlarm" size="6rem" />
        </div>
        <div className="title">
          <div>送出核准前您可針對此版本填寫Remark，送出核准後您將無法再修改此版本的內容。</div>
        </div>
        <div className="content">
          <div className="textarea-label">Version Remark ({remark.length}/300)</div>
          <Field.Textarea
            value={remark}
            name="versionRemark"
            onChange={handleRemarkChange}
          />
        </div>
        <div className="btns">
          <Button color="transparentInModal" border={false} onClick={props.toggleAlert}>取消</Button>
          <Button className="e2e_approve_submit" color="black" onClick={handleSubmit}>核准</Button>
        </div>
      </div>
    </Wrapper>
  );
};


const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(VersionRemarkAlert);
