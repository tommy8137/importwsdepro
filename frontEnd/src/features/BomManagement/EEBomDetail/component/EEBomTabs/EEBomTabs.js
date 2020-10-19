import React from 'react';
import PropTypes from 'prop-types';
import { useContextValue } from '~~hooks/useContextProvider';
import { EEBomTabsWrapper } from './EEBomTabsStyles';


function EEBomTabs(props) {
  const { highlightIndex, tabsList } = props;
  let tabsCount = tabsList.length;
  const [contextValue, dispatch] = useContextValue();

  function handleHighlight(action) {
    // 清空資料
    props.EEBomDetailReset();
    // 切換tab
    switch (action) {
      case 'prev':
        if (highlightIndex > 0) {
          dispatch({ type: 'DECREMENT_HIGHLIGHT' });
        }
        break;
      case 'next':
        if (highlightIndex < tabsCount - 1) {
          dispatch({ type: 'INCREMENT_HIGHLIGHT' });
        }
        break;
      default:
        break;
    }
  }

  function updateHighlight(index) {
    // 有切換tab就清空資料
    if (highlightIndex !== index) {
      // 清空資料
      props.EEBomDetailReset();
    }
    // 切換tab
    dispatch({ type: 'UPDATE_HIGHLIGHT', highlightIndex: index });
  }

  return (
    <EEBomTabsWrapper className="eebom-tabs-wrapper">
      <div className="tabs-list">
        {tabsList.map((item, index) => {
          return (
            <label
              key={index}
              className={highlightIndex === index ? 'tabs-list__tab active' : 'tabs-list__tab'}
              onClick={() => updateHighlight(index)}
            >
              <p>{item.name}</p>
            </label>
          );
        })
        }
      </div>
      <div className="switch-tabs">
        <label
          className={highlightIndex === 0 ? 'switch-tabs__prev disabled' : 'switch-tabs__prev'}
          onClick={() => handleHighlight('prev')}
        />
        <label
          className={highlightIndex === tabsCount - 1 ? 'switch-tabs__next disabled' : 'switch-tabs__next'}
          onClick={() => handleHighlight('next')}
        />
      </div>
    </EEBomTabsWrapper>
  );
}


EEBomTabs.propTypes = {
  // tabs 的list
  tabsList: PropTypes.arrayOf(
    PropTypes.shape({
    }).isRequired,
  ).isRequired,
};

export default EEBomTabs;
