import { useEffect, useState } from 'react';

/*
取得component的寬高

使用方式
import React, { useRef } from 'react';
import useComponentSize from '~~hooks/useComponentSize';
let dataGridWrapperRef = useRef();
let [size, setSize] = useComponentSize(dataGridWrapperRef);

<div ref={dataGridWrapperRef}>

*/
function useBoundingClientRect(ref) {
  const [size, setSize] = useState({ height: 0, width: 0 });
  useEffect(
    () => {
      const cb = () => {
        const boundingClientRect = ref.current
          ? ref.current.getBoundingClientRect()
          : { height: 0, width: 0 };
        setSize(boundingClientRect);
      };
      // const onResize = debouce(() => {
      //   cb();
      // }, 300);

      const onResize = () => {
        cb();
      };

      onResize();
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    },
    [ref]
  );

  return [size, setSize];
}

export default useBoundingClientRect;
