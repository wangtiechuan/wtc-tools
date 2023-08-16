import { useCallback, useEffect, useRef } from 'react';
import useMemoizedFn from './useMemoizedFn';

// 一个可以处理 setTimeout 计时器函数的 Hook。
const useTimeout = (fn: () => void, delay?: number) => {
  const timerCallback = useMemoizedFn(fn);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!(typeof delay === 'number') || delay < 0) {
      return;
    }
    timerRef.current = setTimeout(timerCallback, delay);
    return clear;
  }, [delay]);

  return clear;
};

export default useTimeout;
