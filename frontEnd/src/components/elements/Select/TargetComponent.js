import React, { useState, useEffect } from 'react';
import Target from './Target';

function TargetComponent(props) {
  const { target = '' } = props;
  switch (target) {
    case 'box':
      return (<Target.Box {...props} />);
    case 'field':
      return (<Target.Field {...props} />);
    case 'button':
      return (<Target.Button {...props} />);
    case 'none':
    default:
      return (null);
  }
}

export default TargetComponent;
