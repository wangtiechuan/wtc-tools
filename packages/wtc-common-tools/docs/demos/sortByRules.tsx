import { sortByRules, SortRule } from '@victor/victor-common-tools';
import React from 'react';

export default function Demo() {
  interface Item {
    priority1: number;
    priority2: string;
    priority3: boolean;
  }

  const items: Item[] = [
    { priority1: 2, priority2: 'c', priority3: true },
    { priority1: 1, priority2: 'b', priority3: false },
    { priority1: 1, priority2: 'a', priority3: true },
    { priority1: 2, priority2: 'b', priority3: false },
  ];

  const rules: SortRule<Item>[] = [
    { property: 'priority1', ascending: true },
    { property: 'priority2', ascending: true },
    { property: 'priority3', ascending: false },
  ];

  const sortedItems = sortByRules(items, rules);
  return <pre>{JSON.stringify(sortedItems, null, 2)}</pre>;
}
