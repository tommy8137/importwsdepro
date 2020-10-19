import styled from 'styled-components';
import { eeBomTabBgColor } from '~~styles/_variables';

const TableGridWrapper = styled.div`
margin: 0 1rem 1rem;
background-color: ${eeBomTabBgColor};
.tabel-grid-helper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;

  .filter-container {
    display: flex;
    &__title {
      align-self: center;
    }

  }
  .action-btn-group {
    display: flex;
    align-items: center;
    &.hide {
      display: none;
    }
  }


  .filter {
    display: flex;
    align-items: center;

    .exp-filter {
      span {
        display: block;
      }
      label {
        margin: 0 auto;
        display: block;
      }
      margin-left: 1rem;
    }
  }

}
`;


export default TableGridWrapper;
