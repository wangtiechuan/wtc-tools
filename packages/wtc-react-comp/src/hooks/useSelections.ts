import { useMemo, useState } from 'react';
import useMemoizedFn from './useMemoizedFn';

// 常见联动 Checkbox 逻辑封装，支持多选，单选，全选逻辑，还提供了是否选择，是否全选，是否半选的状态。
export default function useSelections<T>(items: T[], defaultSelected: T[] = []) {
  const [selected, setSelected] = useState<T[]>(defaultSelected);

  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const isSelected = (item: T) => selectedSet.has(item);

  const select = (item: T) => {
    selectedSet.add(item);
    return setSelected(Array.from(selectedSet));
  };

  const unSelect = (item: T) => {
    selectedSet.delete(item);
    return setSelected(Array.from(selectedSet));
  };

  const toggle = (item: T) => {
    if (isSelected(item)) {
      unSelect(item);
    } else {
      select(item);
    }
  };

  const selectAll = () => {
    items.forEach((o) => {
      selectedSet.add(o);
    });
    setSelected(Array.from(selectedSet));
  };

  const unSelectAll = () => {
    items.forEach((o) => {
      selectedSet.delete(o);
    });
    setSelected(Array.from(selectedSet));
  };

  const noneSelected = useMemo(() => items.every((o) => !selectedSet.has(o)), [items, selectedSet]);

  const allSelected = useMemo(
    () => items.every((o) => selectedSet.has(o)) && !noneSelected,
    [items, selectedSet, noneSelected],
  );

  const partiallySelected = useMemo(
    () => !noneSelected && !allSelected,
    [noneSelected, allSelected],
  );

  const toggleAll = () => (allSelected ? unSelectAll() : selectAll());

  return {
    selected, // 已经选择的元素
    noneSelected, // 是否一个都没有选择
    allSelected, // 是否全选
    partiallySelected, // 是否半选
    setSelected, // 选择多个元素。多次执行时，后面的返回值会覆盖前面的，因此如果希望合并多次操作的结果，需要手动处理
    isSelected, // 是否被选择
    select: useMemoizedFn(select), // 选择单个元素
    unSelect: useMemoizedFn(unSelect), // 取消选择单个元素
    toggle: useMemoizedFn(toggle), // 反选单个元素
    selectAll: useMemoizedFn(selectAll), // 选择全部元素
    unSelectAll: useMemoizedFn(unSelectAll), // 取消选择全部元素
    toggleAll: useMemoizedFn(toggleAll), // 反选全部元素
  } as const;
}


// const [hideOdd, setHideOdd] = useState(false);
// const list = useMemo(() => {
//   if (hideOdd) {
//     return [2, 4, 6, 8];
//   }
//   return [1, 2, 3, 4, 5, 6, 7, 8];
// }, [hideOdd]);

// const { selected, allSelected, isSelected, toggle, toggleAll, partiallySelected } = useSelections(
//   list,
//   [1],
// );