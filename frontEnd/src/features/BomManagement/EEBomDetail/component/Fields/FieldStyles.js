import * as Mixins from '~~styles/_mixins';

const baseFieldStyles = `
  .duck-field {
    &--label-zone {
      display: flex;
      flex-direcion: row;
      &--label {
        ${Mixins.formLabel};
      }
      &--requiredMark {
        color: red;
        margin-left: 0.5rem;
        font-size: 0.5rem;
      }
    }
  }
`;

const baseReactSelect = `
/* react-select 的style */
.duck-field--select {
  &:focus {
    outline: none;
  }

  &__value-container {
    height: 2rem;
    padding: 0px;
    &:focus {
      outline: none;
    }
  }
  &__single-value {
    font-size: 0.9rem;
    font-weight: 200;
    letter-spacing: 1px;
    bottom: 0.2rem;
    overflow: visible;
    &:focus {
      outline: none;
    }
  }
  &__placeholder {
    display: none;
  }
  &__indicator {
    padding: 5px;
    color: #333333;
    // display: none;
    &:focus {
      outline: none;
    // display: none;
    }
    &:hover {
      color: #333333;
    }
  }
  &__control {
    // width: 15rem;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #333333;
    background: transparent;
    &:focus {
      outline: none;
    }
    &:hover {
      border-color: #00a99d;
    }
  }

  &__indicator-separator {
    display: none;
  }
}
/* react-select 的style end */
`;

export default baseFieldStyles;
export {
  baseReactSelect
};
