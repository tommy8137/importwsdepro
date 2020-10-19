import styled from 'styled-components';

const FieldWrapper = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem 0 0 0;
  flex: 0 1 50%;
  .field-errors {
    color: red;
    font-size: 0.625rem;
  }
  .content-label {
    order: -1;
    width: 100%;
    margin: 0;
    opacity: 0.5;
    font-size: 0.625rem;
    text-align: left;
    color: #333333;
  }
  .content-value {
    display: inline-block;
    height: 2rem;
    width: 90%;
    border: none;
    border-bottom: 1px solid black;

    /* react-select的樣式 */
    &-selector {
      &__control {
        background: transparent;
        border: none;
        height: inherit;
        min-height: inherit;
        border-radius: none;
        &--is-focused {
          outline:none;
          box-shadow: none;
          border: none;
        }

      }
      &__indicator-separator {
        width: 0;
      }

      &__indicator {
        color: #000;
        &:hover {
          color: #000;
        }
      }
      /* react-select的樣式 end */
    }

    &:focus {
      outline: none;
    }
    &.disabled {
      cursor: not-allowed;
      &+.content-label {
        pointer-events: none;
      }
    }
    &.readonly {
      cursor: not-allowed;
      /* border-bottom: 1px solid #ccc; */
      &+.content-label {
        pointer-events: none;
      }
    }
  }
`;

export default {
  FieldWrapper
};
