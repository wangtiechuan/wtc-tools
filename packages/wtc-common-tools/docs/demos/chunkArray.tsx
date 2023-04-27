import React from 'react';
import { chunkArray } from '@victor/victor-common-tools';

export default function Demo() {
  const data = chunkArray([1, 2, 3, 4], 3);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
