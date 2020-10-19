import styled from 'styled-components';

const PanelDiv = styled.div`
  &.spending--panel {
    padding: 1rem;
    height: 83vh;
    display: flex;
    @media (max-width: 1440px) {
      height: 80vh;
    }
    .flex-3 {
      /* width: 60%; */
      width: 76%;
      @media (max-width: 1280px) {
        /* background: palevioletred; */
      }
    }
    .flex-2 {
      /* min-width: 400px; */
      width: 40%;
      &.spending--panel--select {
        /* margin: 1.2rem 0; */
        overflow: auto;
      }
    }

    .mb1  {
      margin-bottom: 1rem;
      @media (max-width: 1440px) {
        margin-bottom: 0.5rem;
      }
    }
  }
`;


export { PanelDiv };

export default {};
