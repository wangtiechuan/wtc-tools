import { useCallback, useEffect, useRef, useState } from 'react';

export type UpdatedDataFunc<T> = (preState?: T, currentState?: T) => void;

export type UpdateFuncItem<T> = (currentState?: T) => void;

export type SetStateAndUpdated<T> = (
  newtemp: T | ((prevState?: T) => T),
  onUpdate?: UpdatedDataFunc<T>,
) => void;

export function useStateHasCallBack<T = any>(initState?: T): [T | undefined, SetStateAndUpdated<T>] {
  const [temp, setTempData] = useState(initState);
  const updateFuncs = useRef<Map<UpdatedDataFunc<T>, UpdateFuncItem<T>>>(new Map());

  const setStateAndUpdated: SetStateAndUpdated<T> = useCallback((newtemp, onUpdate) => {
    if (!onUpdate) {
      setTempData(newtemp);
      return;
    }
    let preState: any = undefined;
    setTempData((pre) => {
      preState = pre;
      // @ts-ignore
      return typeof newtemp === 'function' ? newtemp(pre) : newtemp;
    });
    if (!updateFuncs.current.has(onUpdate))
      updateFuncs.current.set(onUpdate, (currentState?: T) => {
        onUpdate(preState, currentState);
      });
  }, []);

  useEffect(() => {
    return () => {
      updateFuncs.current.clear();
    };
  }, []);

  useEffect(() => {
    if (updateFuncs.current.size === 0) {
      return;
    }
    Array.from(updateFuncs.current.values()).forEach((func) => {
      func(temp);
    });
  }, [temp]);

  return [temp, setStateAndUpdated];
}
