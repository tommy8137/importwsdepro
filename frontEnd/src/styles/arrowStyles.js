import styled from 'styled-components';

// 箭頭朝下
const DownBtn = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  &:after {
    content: '';
    display: inline-block;
    margin: calc((100% - .4rem) / 2 );
    width: .4rem;
    height: .4rem;
    border-top: ${props => (props.isDisabled ? '1px solid #ccc' : '1px solid #333')};
    border-right: ${props => (props.isDisabled ? '1px solid #ccc' : '1px solid #333')};
    -moz-transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
    transform: rotate(135deg);
  }
`;

// 箭頭朝上
const UpBtn = styled.div`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  &:after {
    content: '';
    display: inline-block;
    margin: calc((100% - .4rem) / 2 );
    width: .4rem;
    height: .4rem;
    border-top: ${props => (props.isDisabled ? '1px solid #ccc' : '1px solid #333')};
    border-right: ${props => (props.isDisabled ? '1px solid #ccc' : '1px solid #333')};
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
`;


export {
  DownBtn,
  UpBtn
};

