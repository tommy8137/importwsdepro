import styled from 'styled-components';

const Wrapper = styled.div`
  &.base-chart-modal {
    display: ${p => (p.show ? 'block' : 'none')};
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    background-color: #e6e6e6;
    z-index: 1000;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;


const CloseBtn = styled.button`
  &.close-button {
    border: none;
    margin: 1rem;
    padding: 0;
    outline: none;
    cursor: pointer;
    width: auto;
    background: #e9e9e9;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: scale(${p => p.scale});
    position: absolute;
    right: 0;

    .cross {
      position: relative;
      width: 3rem;
      height: 3rem;
      transform: rotateZ(45deg);
      overflow: hidden;
      pointer-events: none;
    }

    .cross-line {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #333333;

      &--x {
        /* width: 24px; */
        width: 50%;
        height: 0.2rem;
      }

      &--y {
        width: 0.2rem;
        height: 50%;
      }
    }
  }
`;

export { Wrapper, CloseBtn };

export default {};
