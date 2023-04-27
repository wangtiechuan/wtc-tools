import { templateRender } from '@victor/victor-common-tools';
import React from 'react';

export default function Demo() {
  const demObj = { id: 1 };
  const str = 'http://a.com?id={{id}}';
  return <pre>{templateRender(str, demObj)}</pre>;
}
