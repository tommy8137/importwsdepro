import styled from 'styled-components';

export const Tabs = styled.div`
  width: 100%;
  display: flex;
  /* padding: 1rem 3rem 0rem; */
  font-size: 1.35rem;
  color: #404040;
`;

export const Tab = styled.div`
  margin-right: 1.5rem;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  border-bottom: ${({ active }) => (active ? '5px solid #f5c910' : '')};
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
  &:last-child {
    margin-right: 0;
  }
`;


export const TabsContainer = styled.div`
  padding: 1rem 0rem 0rem 2.5rem;
`;

export default {
  TabsContainer,
  Tabs,
  Tab
};

