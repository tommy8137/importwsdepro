import styled from 'styled-components';

const Wrapper = styled.div`
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
`;


export default Wrapper;
