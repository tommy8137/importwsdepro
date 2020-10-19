import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import usePortal from '~~hooks/usePortal';

/*
id是為了要在<body>另外開出<div id={id} />
*/
const Portal = ({ id, children }) => {
  const target = usePortal(id);
  return createPortal(
    children,
    target,
  );
};


export default Portal;
