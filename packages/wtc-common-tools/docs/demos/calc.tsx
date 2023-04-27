import {
  add,
  divide,
  getDecimalDigits,
  mean,
  mod,
  multiply,
  subtract,
  sum,
} from '@victor/victor-common-tools';
import React from 'react';

export default function Demo() {
  const res1 = getDecimalDigits(1.23456);
  const res2 = add(1.23456, 2.34567);
  const res3 = subtract(1.23456, 2.34567);
  const res4 = multiply(1.23456, 2.34567);
  const res5 = divide(1.23456, 2.34567);
  const res6 = sum([1.23456, 2.34567]);
  const res7 = mean([1.23456, 2.34567]);
  const res8 = mod(1.23456, 2.34567);

  const data = {
    res1,
    res2,
    res3,
    res4,
    res5,
    res6,
    res7,
    res8,
  };

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
