import styled from 'styled-components';
import { eeBomTabBgColor, eeBomInfoFontColor } from '~~styles/_variables';


const Div = styled.div`
.tab-buttons {
  margin-top: 0.75rem;
  padding-left: 3.5rem;
  button {
    width: auto;
    height: 1.875rem;
    border-radius: 0.9375rem;
    border: solid 1px #333333;
    padding: 0 1rem;
    color: #333;
    background-color: transparent;
    margin-left: 1.25rem;
    font-size: 1rem;
    outline: unset;
    transition: .3s ease all;
    :hover {
      background-color: #333;
      color: #FFF;
      cursor: pointer;
      transition: .3s ease all;
    }
  }
  .active {
    background-color: #333;
    color: #FFF;
    cursor: initial;
  }
}
.functions {
  margin: 0rem 1.25rem;
}
.pcb {
  padding: 0rem 3.5rem;
  display: flex;
  justify-content: space-between;
  height: 50px;
  background-color: ${eeBomTabBgColor};
  font-family: Roboto;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 50px;
  letter-spacing: normal;
  color: #333333;
  .title {
    font-size: 12px;
    color: ${eeBomInfoFontColor};
    span {
      color: #333333;
      font-size: 18px;
      margin-left: 10px;
    }
  }
}
`;

export default Div;
