import type { Dispatch, SetStateAction } from 'react';
import { useState, useRef, useCallback } from 'react';

type GetStateAction<S> = () => S;

function useStateCanGetLatest<S>(
  initialState: S | (() => S),
): [S, Dispatch<SetStateAction<S>>, GetStateAction<S>];
function useStateCanGetLatest<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>,
  GetStateAction<S | undefined>,
];

// 给 `React.useState` 增加了一个 getter 方法，以获取当前最新值。
function useStateCanGetLatest<S>(initialState?: S) {
  const [state, setState] = useState(initialState);
  const stateRef = useRef(state);
  stateRef.current = state;

  const getState = useCallback(() => stateRef.current, []);

  return [state, setState, getState];
}

export default useStateCanGetLatest;


// const [count, setCount, getCount] = useGetState<number>(0);

// useEffect(() => {
//   const interval = setInterval(() => {
//     console.log('interval count', getCount());
//   }, 3000);

//   return () => {
//     clearInterval(interval);
//   };
// }, []);