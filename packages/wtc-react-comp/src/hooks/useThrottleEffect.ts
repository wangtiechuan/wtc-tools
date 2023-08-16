import { useEffect, useState } from 'react';
import type { DependencyList, EffectCallback } from 'react';
import type { ThrottleOptions } from './throttleOptions';
import useThrottleFn from './useThrottleFn';
import useUpdateEffect from './useUpdateEffect';

// 为 `useEffect` 增加节流的能力。

// wait  等待时间，单位为毫秒
// leading  是否在延迟开始前调用函数
// trailing 是否在延迟开始后调用函数

function useThrottleEffect(
  effect: EffectCallback,
  deps?: DependencyList,
  options?: ThrottleOptions,
) {
  const [flag, setFlag] = useState({});

  const { run } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUpdateEffect(effect, [flag]);
}

export default useThrottleEffect;

// const [value, setValue] = useState('hello');
// const [records, setRecords] = useState<string[]>([]);
// useThrottleEffect(
//   () => {
//     setRecords((val) => [...val, value]);
//   },
//   [value],
//   {
//     wait: 1000,
//   },
// );
