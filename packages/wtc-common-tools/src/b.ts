// import FFT from 'fft.js';

// // 提取特征
// function extractFeatures(data: number[]): number[] {
//   const fft = new FFT();
//   const complexArray = fft.createComplexArray(data.length);

//   // 执行实数傅里叶变换
//   fft.realTransform(complexArray, data);

//   // 计算特征向量
//   const featureVector = [];
//   for (let i = 0; i < data.length / 2; i++) {
//     const re = complexArray[i];
//     const im = complexArray[i + data.length / 2];
//     const magnitude = Math.sqrt(re * re + im * im);
//     featureVector.push(magnitude);
//   }

//   return featureVector;
// }

// // 比较两个数组的特征
// function compareArrays(
//   arr1: number[],
//   arr2: number[],
//   threshold: number,
// ): boolean {
//   if (arr1.length !== arr2.length) {
//     return false;
//   }

//   let distance = 0;
//   for (let i = 0; i < arr1.length; i++) {
//     const diff = arr1[i] - arr2[i];
//     distance += diff * diff;
//   }

//   return Math.sqrt(distance) < threshold;
// }

// // 示例使用
// const data1 = [1, 2, 3, 4, 5, 6, 7, 8];
// const data2 = [1, 2, 2, 4, 5, 6, 7, 8];

// const feature1 = extractFeatures(data1);
// const feature2 = extractFeatures(data2);

// const isSimilar = compareArrays(feature1, feature2, 0.1);
// console.log(isSimilar);
