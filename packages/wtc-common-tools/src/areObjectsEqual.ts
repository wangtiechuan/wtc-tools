export function areObjectsEqual(obj1: any, obj2: any): boolean {
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (const key of obj1Keys) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!obj2.hasOwnProperty(key)) {
      return false;
    }

    if (typeof value1 === 'object' && typeof value2 === 'object') {
      if (!areObjectsEqual(value1, value2)) {
        return false;
      }
    } else {
      if (value1 !== value2) {
        return false;
      }
    }
  }

  return true;
}
