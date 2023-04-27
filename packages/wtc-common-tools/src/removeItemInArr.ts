export function removeItemInArr<T = any>(arr: T[], indexToRemove: number) {
  return arr.splice(indexToRemove, 1);
}
