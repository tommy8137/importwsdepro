import styled from 'styled-components';
import { eeBomInfoFontColor } from '~~styles/_variables';


const PCBRowWrap = styled.div`
  display: flex;
  align-items: center;
  border: 6px solid #fff;
  background-color: ${props => props.backgroundColor};
  padding: 0.5rem 0.6rem 0.5rem 0.3rem;
  margin: 1rem;
  .left {
    display: flex;
    align-items: center;
    width: 30%;
    .title {
    color: rgba(0,0,0,0.8);
    font-weight: 600;
    margin: 0rem 1.5rem;
    }
  }
  .right {
    width: 70%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .priceInfo {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 4rem;
      font-size: 0.88rem;
      letter-spacing: 0.5px;
      .priceTitle {
        color: ${eeBomInfoFontColor};
      }
      .price {
        color: rgba(0,0,0,0.8);
        margin-left: 0.6rem;
        font-weight: 600;
      }
    }

    .action-btn-group-section-wrapper {
      /* width: 200px; */
      .button:not(last-child) {
        margin-right: 0.5rem;
      }
    }
  }
`;

export default PCBRowWrap;
