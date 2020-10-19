import React, { useState } from 'react';
import { comma } from '~~utils/Math';
import ByModuleTableModal from './ByModuleTableModal';

function ModuleCollapse(props) {
  const [toggle, setToggle] = useState(false);
  const { moduleName, partsCount, partNumberCount, shouldCost, totalCost, totalLowestCost, total2ndHighestCost } = props;

  const handleToggleModule = (e) => {
    setToggle(!toggle);
  };

  const renderCostInfo = () => {
    return (
      <div className="cost">
        <div className="caculate">
          Parts Count <span className="num">{partsCount}</span>
        </div>
        <div className="caculate">
          Parts Number Count <span className="num">{partNumberCount}</span>
        </div>
        <div className="caculate">
          Suggestion Cost <span className="num">USD${comma(shouldCost || 0)}</span>
        </div>
        <div className="caculate">
          Total Price(Lowest) <span className="num">USD${comma(totalLowestCost || 0)}</span>
        </div>
      </div>
    );
  };
  const renderCostInfoInside = () => {
    return (
      <div className="cost">
        <div className="caculate">
          Parts Count <span className="num">{partsCount}</span>
        </div>
        <div className="caculate">
          Parts Number Count <span className="num">{partNumberCount}</span>
        </div>
        <div className="caculate">
          Suggestion Cost <span className="num">USD${comma(shouldCost || 0)}</span>
        </div>
        <div className="caculate">
          Total Price(Lowest) <span className="num">USD${comma(totalLowestCost || 0)}</span>
        </div>
        <div className="caculate">
          Total Price(MLCC 2nd Highest) <span className="num">USD${comma(total2ndHighestCost || 0)}</span>
        </div>
        <div className="caculate">
          Total Price(Highest) <span className="num">USD${comma(totalCost || 0)}</span>
        </div>
      </div>
    );
  };


  return (
    <div className="list">
      <div className="costs" onClick={handleToggleModule} onKeyPress={null}>
        <div className="module">{moduleName}</div>
        {renderCostInfo()}
      </div>
      {
        toggle ? <ByModuleTableModal
          isOpen={toggle}
          toggleModal={handleToggleModule}
          header={moduleName}
          renderCostInfo={renderCostInfoInside}
          info={props.info}
          height={props.height}
        /> : <div />
      }
    </div>
  );
}

export default ModuleCollapse;
