import styled from 'styled-components';

const filterHeight = '46px';
const disabledColor = '#ccc';
const fontColor = '#333333';
const FilterBarWrapper = styled.div`
  &.filter-bar-wrapper {
    .filter-bar-box {
      width: fit-content;
      border-radius: 4px;
      border: solid 1px #cccccc;
      display: flex;

      &__filter-icon {
        width: 52px;
        height: ${filterHeight};
        background-color: #333333;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.9rem 0.5rem;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
        &.disabled {
          cursor: not-allowed;
          .filter-bar-box__filter-icon__icon {
            pointer-events: none;
          }
        }
      }


      &__reset-icon {
        width: 4rem;
        height: filterHeight;
        background-color: white;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        &__icon {
          width: 2.2rem;
        }

        &.disabled {
          cursor: not-allowed;
          .filter-bar-box__reset-icon__icon {
            pointer-events: none;
          }
        }
      }
    }
  }
`;


export default FilterBarWrapper;

export { filterHeight, disabledColor, fontColor };
