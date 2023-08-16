import { useEffect, useState } from 'react';
import useThrottleFn from './useThrottleFn';
import type { ThrottleOptions } from './throttleOptions';

// 用来处理节流值的 Hook。

// wait  等待时间，单位为毫秒
// leading  是否在延迟开始前调用函数
// trailing 是否在延迟开始后调用函数

function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, options);

  useEffect(() => {
    run();
  }, [value]);

  return throttled;
}

export default useThrottle;

// const [value, setValue] = useState<string>();
// const throttledValue = useThrottle(value, { wait: 500 });
