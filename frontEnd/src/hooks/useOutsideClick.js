import { useEffect } from 'react';


/*
使用方式
import useOutsideClick from '~~hooks/useOutsideClick';

function Demo(props) {
  const ref = useRef();
  useOutsideClick(ref, () => {
    console.log('you click outside');
  });

  return (
    <div ref={ref} />
  )
}
*/
const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default useOutsideClick;
