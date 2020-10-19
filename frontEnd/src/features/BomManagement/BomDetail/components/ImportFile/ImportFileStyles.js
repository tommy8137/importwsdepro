import styled from 'styled-components';

const Step1Div = styled.div`
/* .label{
      font-size: 0.9rem;
      color: rgba(0, 0, 0, 0.4);
    } */
.input-field {
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
    margin-top: 0.76rem;
    position: relative;
    .fileName{
      max-width: 23.5rem;
      margin-bottom: 0.2rem;
      display: block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      height: 1.5rem;
      font-size: 1rem;
    }
    .uploadFile-btn{
      height: 1.6rem;
      border-radius: 1rem;
      font-size: 0.4rem;
      letter-spacing: 1px;
      outline: none;
      border: 1px solid #333333;
      color: #333333;
      position: absolute;
      right: 0rem;
      top: -0.2rem;
      &:hover {
        cursor: pointer;
        color: #333333ad;
        border-color: #333333ad;
  }
    }
    .remove-btn {
      padding: 0 0 0 1rem;
      height: 24px;
      border: none;
      color: #333333;
      font-size: 12px;
      cursor: pointer;
      line-height: 14px;
      transition: .3s ease all;
      position: absolute;
      right: 6rem;
      margin-right: 0.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 5rem;

      &:focus {
        outline: none;
      }
      &:hover {
        color: #333333ad;
        &:active {
          background-color: #1e1e1e;
        }
      }
    }
  }
  /* Alert Modal */
  .alert{
    width: 100%;
    height: 100%;
  }
`;


const Step2Div = styled.div`
display: flex;
align-items: center;
justify-content: center;
>div{
line-height: 3rem;
}
.left{
  margin-right: 2rem;
  >div{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .icon{
    width: 1rem;
    margin-left: 0.5rem
  }
}
.right{
  display: flex;
  flex-direction: column;
  >div{
    display: flex;
    align-items: center;
  }
  .icon{
    width: 0.8rem;
    margin-left: 0.5rem;
  }
  .IcoDiv{
    position: relative;
    &:hover{
      .instruction {
        opacity: 1;
        visibility: visible;
        transform: translate(0,0);
      }
    }
  }
  .instruction{
    background: white;
    box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.16);
    position: absolute;
    left: 2rem;
    top: -3.5rem;
    border-radius: 0.2rem;
    width: 16rem;
    padding: 0.6rem 1rem ;
    opacity: 0;
    visibility: hidden;
    line-height: 1.5rem;
    font-size: 0.8rem;
    transform: translate(-12px, 0);
    transition: 0.3s ease all;
  }
}
`;

/* 錯誤訊息詳細內容 */
const ErrorBox = styled.div`
  padding: 0 0.375rem;
  color: #333333;
  font-size: 1rem;
  .error-title {
    line-height: 1.25rem;
    margin-bottom: unset;
  }
  .error-detail {
    border: 1px solid #d7d7d7;
    height: 11.75rem;
    overflow-y: auto;
    padding: 0.5rem;
    &-item {
      margin-bottom: unset;
    }
  }

`;

const Step3Div = styled.div`
display: flex;
flex-direction: column;
.instru{
  font-size: 0.9rem;
  color: rgba(0,0,0,0.8);
  line-height: 1.5rem;
  margin-bottom: 2rem;
  letter-spacing: 1px;
}
.group{
  display: flex;
  align-items: center;
  justify-content: center;
  .arrow{
  width: 1rem;
  margin: 0 1.5rem;
  }
  .field{
    width: 15rem;
    &--label {
      font-size: 0.5rem;
      opacity: 1;
      color: #939393;
    }
    &--input{
      letter-spacing: 1px;
      border-bottom: 1px solid #333333;
      &.read-only {
        border-bottom: 1px solid #333333;
      }
    }
    .icon{
      padding-bottom: 0.2rem
    }
  }
}
`;

export {
  Step1Div,
  Step2Div,
  Step3Div,
  ErrorBox,
};
