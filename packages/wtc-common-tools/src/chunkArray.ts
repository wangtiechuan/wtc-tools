export function chunkArray<T = any>(array?: T[], chunkSize?: number): T[][] {
  if (!array || !array.length || !chunkSize) {
    return [array || []];
  }
  const chunks: T[][] = [];
  let i = 0;

  while (i < array.length) {
    chunks.push(array.slice(i, i + chunkSize));
    i += chunkSize;
  }

  return chunks;
}

// console.log(chunkArray([1,2,3],2))
