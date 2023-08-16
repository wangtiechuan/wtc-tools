import { useCallback, useState } from 'react';

// 会返回一个函数，调用该函数会强制组件重新渲染。
// const toForceUpdate = useToForceUpdate();

const useToForceUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export default useToForceUpdate;
