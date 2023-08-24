import {
  add,
  div,
  multi,
  round,
  sub,
  toFixed,
  // geometric
} from '@victor/victor-common-tools';
import React from 'react';

export default function Demo() {
  const res1 = round(1.23456);
  const res2 = add(1.23456, 2.34567);
  const res3 = sub(1.23456, 2.34567);
  const res4 = multi(1.23456, 2.34567);
  const res5 = div(1.23456, 2.34567);
  const res6 = toFixed(1.23456, 4);


  const data = {
    res1,
    res2,
    res3,
    res4,
    res5,
    res6,
  };

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
