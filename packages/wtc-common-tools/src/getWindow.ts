import { AnyObject } from './props';

export function getWindow(): Window & typeof globalThis & AnyObject {
  let wd: any;
  try {
    wd = window;
  } catch (e) {
    // @ts-ignore
    wd = global;
  }
  return wd;
}
