import { useEffect, useRef } from 'react';

// 获取当前组件是否已经卸载的 Hook。
const useUnmountedRef = () => {
  const unmountedRef = useRef(false);
  useEffect(() => {
    unmountedRef.current = false;
    return () => {
      unmountedRef.current = true;
    };
  }, []);
  return unmountedRef;
};

export default useUnmountedRef;


// const unmountedRef = useUnmountedRef();
// useEffect(() => {
//   setTimeout(() => {
//     if (!unmountedRef.current) {
//       message.info('component is alive');
//     }
//   }, 3000);
// }, []);