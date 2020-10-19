import styled from 'styled-components';

const EEBomTabsWrapper = styled.div`
  &.eebom-tabs-wrapper {
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    margin-left: 3rem;
    margin-right: 3rem;
    flex: auto;

    .tabs-list {
      align-self: flex-end;
      &__tab {
        margin: 0 4rem 0 0;
        padding-bottom: 0.4rem;
        flex: 0 auto;;
        cursor: pointer;
        border-bottom: 4px solid transparent;
        transition: 0.3s ease all;
        &:last-child {
          margin-right: 0px;
        }
        &.active {
          border-bottom: 4px solid #fcc900;
          p {
            opacity: 1;
          }
        }
        p {
          display: block;
          margin: 0;
          font-size: 1.2rem;
          font-weight: normal;
          opacity: 0.6;
          white-space: nowrap;
        }
      }
    }


    /* 右方箭頭切換 */
    .switch-tabs {
      display: flex;
      &__prev, &__next {
        margin: 0;
        cursor: pointer;
        &:after {
          margin: 0;
          display: block;
          width: 0;
          height: 0;
          border-style: solid;
        }

        &.disabled {
          cursor: not-allowed;
        }
      }
      &__next {
        &:after {
          content:'';
          border-width:  9px 0 9px 15.6px;
          border-color: transparent transparent transparent #c5c5c5;
        }
      }
      &__prev {
        margin-right: 0.8rem;
        &:after {
          content:'';
          border-width: 9px 15.6px 9px 0;
          border-color: transparent #c5c5c5 transparent transparent;
        }
      }
    }
}
`;


export {
  EEBomTabsWrapper
};

export default {};

