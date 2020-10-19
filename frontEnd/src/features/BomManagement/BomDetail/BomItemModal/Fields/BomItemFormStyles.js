import styled from 'styled-components';

const Wrapper = styled.div`
  /* 跟Form有關 */
  &.form-root {
    display: flex;
    flex-wrap: wrap;
  }
  .field-root {
    margin: 1rem;
    &--1 {
      /* width: calc((100% - 2rem)/3); */
      width: calc((100% / 3 * 1) - 2rem);
    }
    &--2 {
      /* width: calc((100% - 2rem)/3*2); */
      width: calc((100% / 3 * 2) - 2rem);
    }
    &--3 {
      /* width: calc((100% - 2rem)/3*3); */
      width: calc((100% / 3 * 3) - 2rem);
    }
    &--1splash2 {
      width: calc((100% / 3 * 1 / 2) - 2rem);
    }
    &--3splash4 {
      width: calc((100% / 3 * 3 / 4) - 2rem);
    }
  }
`;

export default Wrapper;
