export function insertItemToArr<T = any>(
  arr: T[],
  indexToInsert: number,
  itemToInsert: T,
) {
  return arr.splice(indexToInsert, 0, itemToInsert);
}
