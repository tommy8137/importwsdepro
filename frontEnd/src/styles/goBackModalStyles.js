import styled from 'styled-components';

const ArrowIcon = styled.i`
  border: solid;
  border-width: 0 5px 5px 0;
  display: inline-block;
  padding: 0.6rem;
  border-color: #333;
  transform: rotate(135deg);
`;

const headerHeight = '3.875rem';
const GoBackModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: #f0f0f0;

  .go-back-modal-header {
    height: ${headerHeight};
    background-color: #ffffff;
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    z-index: 999;
  }


  .go-back-modal-main {
    padding-top: ${headerHeight};
    overflow-y: auto;
    width: 100%;
    height: calc(100vh - ${headerHeight});
    min-height: -webkit-fill-available;

  }

  .go-back-modal-backZone {
    /* position: absolute; */
    cursor: pointer;
    height: 100%;
    max-width: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
  }

  .go-back-modal-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex: 1;
    a {
      color: #404040;
    }
  }
`;


export {
  ArrowIcon,
  GoBackModalWrapper
};
