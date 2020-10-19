import styled from 'styled-components';
import * as Mixins from '~~styles/_mixins';

const borderColor = '#ccc';
const SubmitCardDiv = styled.div`
  &.submit--card {
    border: 1px solid ${borderColor};
    border-radius: 0.2rem;
    padding: 0.4rem 0.6rem;
    @media (max-width: 1440px) {
      padding: 0.2rem 0.4rem;
    }
  .submit--card {
    &--radio-group {
    display: flex;
    align-items: center;
    margin: 1.2rem 0.5rem;
    @media (max-width: 1440px) {
      margin: 0.8rem 0.3rem;
      label {
        margin-bottom: 0;
      }
    }
      &--radio {
        &:not(:last-child) {
          margin-right: 3rem;
          @media (max-width: 1440px) {
            margin-right: 0.7rem;
          }
        }
      }
    }

    &--horizontal-seperatate-line {
      ${() => Mixins.horizontalSeperatateLine('#ccc', '95%')};
    }

    &--submit-zone {
      margin: 1.5rem 1rem 1rem 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width: 1440px) {
        margin: 0.5rem 0.5rem 0.5rem 0;
      }
    }
  }
`;

export {
  SubmitCardDiv
};

export default {};
