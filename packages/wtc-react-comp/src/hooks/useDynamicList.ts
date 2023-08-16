import { useCallback, useRef, useState } from 'react';

// 一个帮助你管理动态列表状态，并能生成唯一 key 的 Hook。
const useDynamicList = <T>(initialList: T[] = []) => {
  const counterRef = useRef(-1);

  const keyList = useRef<number[]>([]);

  const setKey = useCallback((index: number) => {
    counterRef.current += 1;
    keyList.current.splice(index, 0, counterRef.current);
  }, []);

  const [list, setList] = useState(() => {
    initialList.forEach((_, index) => {
      setKey(index);
    });
    return initialList;
  });

  const resetList = useCallback((newList: T[]) => {
    keyList.current = [];
    setList(() => {
      newList.forEach((_, index) => {
        setKey(index);
      });
      return newList;
    });
  }, []);

  const insert = useCallback((index: number, item: T) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 0, item);
      setKey(index);
      return temp;
    });
  }, []);

  const getKey = useCallback((index: number) => keyList.current[index], []);

  const getIndex = useCallback(
    (key: number) => keyList.current.findIndex((ele) => ele === key),
    [],
  );

  const merge = useCallback((index: number, items: T[]) => {
    setList((l) => {
      const temp = [...l];
      items.forEach((_, i) => {
        setKey(index + i);
      });
      temp.splice(index, 0, ...items);
      return temp;
    });
  }, []);

  const replace = useCallback((index: number, item: T) => {
    setList((l) => {
      const temp = [...l];
      temp[index] = item;
      return temp;
    });
  }, []);

  const remove = useCallback((index: number) => {
    setList((l) => {
      const temp = [...l];
      temp.splice(index, 1);

      // remove keys if necessary
      try {
        keyList.current.splice(index, 1);
      } catch (e) {
        console.error(e);
      }
      return temp;
    });
  }, []);

  const move = useCallback((oldIndex: number, newIndex: number) => {
    if (oldIndex === newIndex) {
      return;
    }
    setList((l) => {
      const newList = [...l];
      const temp = newList.filter((_, index: number) => index !== oldIndex);
      temp.splice(newIndex, 0, newList[oldIndex]);

      // move keys if necessary
      try {
        const keyTemp = keyList.current.filter((_, index: number) => index !== oldIndex);
        keyTemp.splice(newIndex, 0, keyList.current[oldIndex]);
        keyList.current = keyTemp;
      } catch (e) {
        console.error(e);
      }

      return temp;
    });
  }, []);

  const push = useCallback((item: T) => {
    setList((l) => {
      setKey(l.length);
      return l.concat([item]);
    });
  }, []);

  const pop = useCallback(() => {
    // remove keys if necessary
    try {
      keyList.current = keyList.current.slice(0, keyList.current.length - 1);
    } catch (e) {
      console.error(e);
    }

    setList((l) => l.slice(0, l.length - 1));
  }, []);

  const unshift = useCallback((item: T) => {
    setList((l) => {
      setKey(0);
      return [item].concat(l);
    });
  }, []);

  const shift = useCallback(() => {
    // remove keys if necessary
    try {
      keyList.current = keyList.current.slice(1, keyList.current.length);
    } catch (e) {
      console.error(e);
    }
    setList((l) => l.slice(1, l.length));
  }, []);

  const sortList = useCallback(
    (result: T[]) =>
      result
        .map((item, index) => ({ key: index, item })) // add index into obj
        .sort((a, b) => getIndex(a.key) - getIndex(b.key)) // sort based on the index of table
        .filter((item) => !!item.item) // remove undefined(s)
        .map((item) => item.item), // retrive the data
    [],
  );

  return {
    list, // 当前的列表
    insert, // 在指定位置插入元素
    merge, // 在指定位置插入多个元素
    replace, // 替换指定元素
    remove, // 删除指定元素
    getKey, // 获得某个元素的 uuid    
    getIndex, // 获得某个 key 的 index
    move, // 移动元素
    push, // 在列表末尾添加元素
    pop, // 移除末尾元素
    unshift, // 在列表起始位置添加元素
    shift, // 移除起始位置元素
    sortList, // 校准排序
    resetList,//  重新设置 list 的值    
  };
};

export default useDynamicList;

// const { list, remove, getKey, insert, replace } = useDynamicList(['David', 'Jack']);
