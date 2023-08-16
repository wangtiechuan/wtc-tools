import { throttle } from 'lodash-es';
import { useMemo } from 'react';
import useLatest from './useLatest';
import type { ThrottleOptions } from './throttleOptions';
import useUnmount from './useUnmount';

type noop = (...args: any[]) => any;

// 用来处理函数节流的 Hook。

// wait  等待时间，单位为毫秒
// leading  是否在延迟开始前调用函数
// trailing 是否在延迟开始后调用函数

function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000; // 等待时间，单位为毫秒

  const throttled = useMemo(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options,
      ),
    [],
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled, // 触发执行 fn，函数参数将会传递给 fn
    cancel: throttled.cancel, // 取消当前节流
    flush: throttled.flush, // 当前节流立即调用
  };
}

export default useThrottleFn;

// const [value, setValue] = useState(0);
// const { run } = useThrottleFn(
//   () => {
//     setValue(value + 1);
//   },
//   { wait: 500 },
// );
