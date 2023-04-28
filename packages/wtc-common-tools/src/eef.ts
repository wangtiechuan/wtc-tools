// function sortArrayByDiff<T>(arr: T[]): T[] {
//     const diffs: [number, T, T][] = [];
    
//     arr.sort((a, b) => (a as any) - (b as any));
    
//     for (let i = 1; i < arr.length; i++) {
//       const diff = Math.abs((arr[i] as any) - (arr[i-1] as any));
//       diffs.push([diff, arr[i-1], arr[i]]);
//     }
    
//     diffs.sort((a, b) => {
//       if (a[0] === b[0]) {
//         return (a[1] as any) - (b[1] as any);
//       } else {
//         return b[0] - a[0];
//       }
//     });
    
//     const sortedArr = [diffs[0][1], diffs[0][2]];
    
//     for (let i = 1; i < diffs.length; i++) {
//       sortedArr.push(diffs[i][1]);
//       sortedArr.push(diffs[i][2]);
//     }
    
//     return sortedArr;
//   }
  