import { useCallback, useEffect, useRef } from 'react';
import useMemoizedFn from './useMemoizedFn';

const useInterval = (fn: () => void, delay?: number, options: { immediate?: boolean } = {}) => {
  const timerCallback = useMemoizedFn(fn);
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const clear = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!(typeof delay === 'number') || delay < 0) {
      return;
    }
    if (options.immediate) {
      timerCallback();
    }
    timerRef.current = setInterval(timerCallback, delay);
    return clear;
  }, [delay, options.immediate]);

  return clear;
};

export default useInterval;