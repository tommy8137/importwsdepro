import styled from 'styled-components';

const Wrapper = styled.div`
  &.calculator {
    background-color: #e6e6e6;
    padding: 0 2rem 2rem 2rem;

    .calculator--header {
      display: flex;
      justify-content: space-between;
      height: 6.25rem;
      align-items: center;
      position: sticky;
      top: 62px;
      z-index: 10;
      background-color: #e6e6e6;
      &-total-title {
        color: #333333;
        opacity: 0.3;
      }
      &-total-number {
        color: #333333;
        font-weight: 900;
      }
      &-export-btn {
        background-color: transparent;
      }
      &-export-btn-icon {
        width: 1rem;
        margin-right: 0.5rem;
      }
    }
  }
`;


export default {
  Wrapper
};
