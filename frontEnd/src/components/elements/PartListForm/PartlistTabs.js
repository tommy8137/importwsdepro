import React, { useContext } from 'react';
import { PartlistFormContext } from './';
import { TabsContainer } from './PartlistStyles';

const PartlistTabs = (props) => {
  const [contextValue, dispatch] = useContext(PartlistFormContext);
  const { tree, selectTab } = contextValue;

  const handleSelectTab = (tab) => () => {
    dispatch({ type: 'SET_SELECT_TAB', selectTab: tab.key });
    props.backToTop();
  };

  return tree.length > 1 ?
    (
      <TabsContainer className="tab-container">
        {tree
          .filter(tab => !tab.needCePolicy || (tab.needCePolicy && !props.denyViewSystemCost))
          .map((tab) => (
            <div
              key={tab.key}
              className={`tab ${tab.key === selectTab ? 'active' : ''}`}
              onClick={handleSelectTab(tab)}
              onKeyDown={() => {}}
            >
              {tab.label}
            </div>)
          )
        }
      </TabsContainer>
    ) :
    (null);
};

PartlistTabs.defaultProps = {};

export default PartlistTabs;
