import { useCallback, useState } from 'react';

export type SetState<S extends Record<string, any>> = <K extends keyof S>(
  state: Pick<S, K> | null | ((prevState: Readonly<S>) => Pick<S, K> | S | null),
) => void;

// 管理 object 类型 state 的 Hooks，用法与 class 组件的 `this.setState` 基本一致。
const useStateCanMerge = <S extends Record<string, any>>(
  initialState: S | (() => S),
): [S, SetState<S>] => {
  const [state, setState] = useState<S>(initialState);

  const setMergeState = useCallback((patch, merge?: boolean) => {
    setState((prevState) => {
      const newState = typeof patch === 'function' ? patch(prevState) : patch;
      if (!merge) {
        return newState;
      }
      return newState ? { ...prevState, ...newState } : prevState;
    });
  }, []);

  return [state, setMergeState];
};

export default useStateCanMerge;
