import styled from 'styled-components';


export const TreeContainer = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 15rem;
  border: 1px solid rgb(128, 128, 128);
  .keyword-bar {
    padding: 0.5rem;
    border-bottom: 1px solid #aaa;
    >input {
      display: inline-block;
      width: 100%;
      height: 2rem;
      font-size: 1rem;
      background-color: #ffffff;
      border-radius: 5px;
      border: 1px solid #cccccc;
      margin-bottom: 0.3rem;
      padding: 0.15rem 0.25rem;
      &:focus {
        box-shadow: none;
        border: 1px solid #00A99D;
      }
    }
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  min-width: 15rem;
  .select-box {
    width: 100%;
    display: flex;
    min-height: 2.5rem;
    margin-bottom: 0.125rem;
    border-bottom: 1px solid ${({ disabled, isInvalid }) => {
    if (disabled) {
      return '#c3c3c3';
    } else if (isInvalid) {
      return 'red';
    }
    return '#333333';
  }};
    padding: 0.05rem 0.5rem 0.125rem 0rem;
    position: relative;
    align-items: center;
    cursor: ${({ disabled }) => (disabled ? '' : 'pointer')};;
    .box-text {
      width: calc(100% - 1rem);
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .icon {
      position: absolute;
      top: 50%;
      right: 0.5rem;
      transform: translate(0, -50%);
    }
  }
`;

export const LeafContainer = styled.div`
  display: block;
  margin-bottom: 0.12rem;
  padding: 0.125rem 0.5rem;
  >.icon {
    margin-right: 0.5rem;
  }
  >.tree-child {
    display: block;
    padding-left: 2.2rem;
    padding-top: 0.15rem;
  }
  .leaf-arrow {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
  }
`;
