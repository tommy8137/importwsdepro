import React from 'react';
import ModuleDiv from './ModuleDivStyle';
import ModuleCollapse from './ModuleCollapse';

function ByModule(props) {
  const { infos } = props;
  let height = document.documentElement.clientHeight - 280;
  return (
    <ModuleDiv height={height}>
      {
        Object.keys(infos).map((moduleName, x) => {
          const { info, partsCount, partNumberCount, shouldCost, totalCost, totalLowestCost, total2ndHighestCost } = infos[moduleName];
          return (
            <ModuleCollapse
              key={x}
              moduleName={moduleName}
              partsCount={partsCount}
              partNumberCount={partNumberCount}
              shouldCost={shouldCost}
              totalCost={totalCost}
              totalLowestCost={totalLowestCost}
              total2ndHighestCost={total2ndHighestCost}
              info={info}
              height={height}
            />
          );
})
      }
    </ModuleDiv>
  );
}

export default ByModule;
