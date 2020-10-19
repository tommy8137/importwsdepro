import styled from 'styled-components';

const formGutter = '1rem';

export const FormContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const TabsContainer = styled.div`
  z-index: 2;
  position: sticky;
  top: 0;
  flex: 0 auto;
  background-color: #ffffff;
  display: flex;
  padding: 0 0rem 1rem 2rem;
  .tab {
    cursor: pointer;
    flex: 0 auto;
    padding: 0px 1rem;
    font-size: 1.2rem;
    border-bottom: 6px solid transparent;
    transition: 0.3s ease all;
    &.active {
      border-bottom: 6px solid #fcc903;
    }
  }
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 100%;
  overflow: hidden;
  overflow-y: auto;
  padding: 0 1rem ;
  min-width: auto;
`;

const GRID_WIDTH_ROOT = 100 / 3;

export const FieldSpace = styled.div`
  visibility: hidden;
  height: 0;
  flex: ${({ grids }) => {
    const width = grids * GRID_WIDTH_ROOT;
    const flex = `0 ${width}%`;
    return flex;
  }};
  max-width: ${({ grids }) => {
    const width = grids * GRID_WIDTH_ROOT;
    const maxWidth = `${width}%`;
    return maxWidth;
  }};
  min-width: auto;
`;

export const FieldStyle = styled.div`
  position: relative;
  padding: ${formGutter};
  padding-bottom: ${({ noPadding }) => (noPadding ? 0 : '')};
  * {
    &:disabled{
      border-color: #c3c3c3;
      color: rgba(0,0,0,0.5);
    }
  }
  flex: ${({ grids }) => {
    const width = grids * GRID_WIDTH_ROOT;
    const flex = `0 ${width}%`;
    return flex;
  }};
  max-width: ${({ grids }) => {
    const width = grids * GRID_WIDTH_ROOT;
    const maxWidth = `${width}%`;
    return maxWidth;
  }};
  display: ${({ grids }) => (grids === 0 ? 'none' : 'block')};
  min-width: auto;
  
  .debug-span {
    position: relative;
    color: red;
    top: 0;
    font-size: 0.6rem;
    font-weight: bolder;
    word-break: break-all;
  }
  .error-message {
    color: #f00;
    font-size: 0.7rem;
    font-weight: 200;
    position: absolute;
    line-height: 1;
    top: 100%;
    margin-top: 0.15rem;
    left: 0;
  }
  .field-component {
    position: relative;
    height: 100%;
    width: 100%;
  }
`;

export const FieldsGroup = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 -${formGutter};
  align-items: flex-end;
  .composite-label {
    color: #7d7d7d;
    font-size: 0.8rem;
  }
`;

export default {
  FormContainer,
  TabsContainer,
  FieldsContainer,
  FieldsGroup
};
