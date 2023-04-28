// type DebounceFunction = <T extends (...args: any[]) => void>(
//   func: T,
//   delay: number,
// ) => (...args: Parameters<T>) => void;

// export const debounce: DebounceFunction = (func, delay) => {
//   let timeoutId: ReturnType<typeof setTimeout>;

//   return (...args) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// };

// // const handleClick = () => {
// //   console.log('Button clicked');
// // };

// // const debouncedHandleClick = debounce(handleClick, 500);

// // // 在500毫秒内只会执行一次
// // window.addEventListener('click', debouncedHandleClick);

// type ThrottleFunction = <T extends (...args: any[]) => void>(
//   func: T,
//   delay: number,
// ) => (...args: Parameters<T>) => void;

// export const throttle: ThrottleFunction = (func, delay) => {
//   let isThrottled = false;

//   return (...args) => {
//     if (!isThrottled) {
//       isThrottled = true;
//       setTimeout(() => {
//         func(...args);
//         isThrottled = false;
//       }, delay);
//     }
//   };
// };

// // const handleScroll = () => {
// //   console.log('Window scrolled');
// // };

// // const throttledHandleScroll = throttle(handleScroll, 500);

// // // 在500毫秒内最多执行一次
// // window.addEventListener('scroll', throttledHandleScroll);


// // 除了防抖节流之外，前端优化方法还有很多，以下是几种常见的前端优化方法及其 TypeScript 表示方式：

// // 图片懒加载
// // 图片懒加载是一种延迟加载图片的技术，可以加快页面的加载速度，提高用户体验。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// function lazyLoadImage(img: HTMLImageElement): void {
//   const observer = new IntersectionObserver((entries) => {
//     if (entries[0].isIntersecting) {
//       img.src = img.dataset.src!;
//       observer.disconnect();
//     }
//   });
//   observer.observe(img);
// }
// // CDN 加速
// // CDN（Content Delivery Network）是一种将静态资源缓存到离用户最近的服务器上，提高资源加载速度的技术。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// const CDN_URL = 'https://cdn.example.com/';

// function getCdnUrl(url: string): string {
//   return CDN_URL + url;
// }
// // 减少 HTTP 请求
// // 减少 HTTP 请求可以降低网络带宽的占用，加快页面的加载速度。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// const fetchData = async (url: string): Promise<any> => {
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// };

// async function loadPage(): Promise<void> {
//   const data1 = await fetchData('/api/data1');
//   const data2 = await fetchData('/api/data2');
//   // do something with the data
// }
// // 代码分割
// // 代码分割是一种将 JavaScript 代码拆分成多个文件，按需加载的技术，可以提高页面的加载速度。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// const loadModule = async (modulePath: string): Promise<any> => {
//   const module = await import(modulePath);
//   return module.default;
// };

// async function doSomething(): Promise<void> {
//   const module = await loadModule('./module');
//   // do something with the module
// }
// // 缓存
// // 缓存可以避免重复的请求，加快数据的获取速度。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// const cache = new Map();

// async function fetchData(url: string): Promise<any> {
//   if (cache.has(url)) {
//     return cache.get(url);
//   } else {
//     const response = await fetch(url);
//     const data = await response.json();
//     cache.set(url, data);
//     return data;
//   }
// }


// // 是的，除了前面提到的优化方法之外，还有以下几种常见的前端优化方法及其 TypeScript 实现示例：

// // 使用 Web Workers
// // Web Workers 是一种在后台运行 JavaScript 代码的技术，可以将耗时的任务放到后台运行，避免阻塞主线程。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// const worker = new Worker('worker.js');

// worker.postMessage({ data: 'hello' });

// worker.onmessage = (event) => {
//   const result = event.data;
//   // do something with the result
// };
// // 使用缩写和简写属性名
// // 缩写和简写属性名可以减少代码的长度，提高代码的可读性。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// interface User {
//   name: string;
//   age: number;
// }

// // 使用缩写
// function createUser(name: string, age: number): User {
//   return { name, age };
// }

// // 使用简写属性名
// // const name = 'Tom';
// // const age = 20;
// // const user = { name, age };
// // 使用 CSS Sprites
// // CSS Sprites 是一种将多个小图片合成一张大图片，减少 HTTP 请求的技术，可以提高页面的加载速度。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// const spriteUrl = 'https://example.com/sprites.png';
// const spriteWidth = 50;
// const spriteHeight = 50;

// function getSpritePosition(index: number): string {
//   const x = index * spriteWidth;
//   const y = 0;
//   return `${x}px ${y}px`;
// }

// const spriteElement = document.querySelector('.sprite') as HTMLElement;
// spriteElement.style.backgroundImage = `url(${spriteUrl})`;
// spriteElement.style.width = `${spriteWidth}px`;
// spriteElement.style.height = `${spriteHeight}px`;
// spriteElement.style.backgroundPosition = getSpritePosition(0);
// // 使用缓存机制
// // 缓存机制可以避免重复的请求，加快数据的获取速度。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// const cache = new Map();

// async function fetchData(url: string): Promise<any> {
//   if (cache.has(url)) {
//     return cache.get(url);
//   } else {
//     const response = await fetch(url);
//     const data = await response.json();
//     cache.set(url, data);
//     return data;
//   }
// }


// // 使用函数式编程
// // 函数式编程可以提高代码的可读性和可维护性，避免副作用，减少 Bug 的出现。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// const data = [1, 2, 3, 4, 5];

// // 使用 map 函数
// const result = data.map((item) => item * 2);

// // 使用 filter 函数
// const filtered = data.filter((item) => item % 2 === 0);

// // 使用 reduce 函数
// const sum = data.reduce((acc, item) => acc + item, 0);



// // wangtiechuanmail@gmail.com
// // 还有吗

// // 还有几种常见的前端优化方法及其 TypeScript 实现示例：

// // 使用 WebAssembly
// // WebAssembly 是一种可以在 Web 浏览器中运行的二进制代码格式，可以提高 JavaScript 的执行速度。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// const wasmUrl = 'https://example.com/my-wasm-module.wasm';

// WebAssembly.instantiateStreaming(fetch(wasmUrl))
//   .then((result) => {
//     const module = result.instance;
//     const result = module.exports.myFunction(1, 2);
//     // do something with the result
//   });
// // 使用图像优化技术
// // 图像优化技术可以减小图像的大小，提高页面的加载速度。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// // 使用压缩工具压缩图片
// import imagemin from 'imagemin';
// import imageminPngquant from 'imagemin-pngquant';
// import imageminMozjpeg from 'imagemin-mozjpeg';

// const input = 'images/*.png';
// const output = 'dist/images';

// (async () => {
//   await imagemin([input], {
//     destination: output,
//     plugins: [
//       imageminPngquant(),
//       imageminMozjpeg()
//     ]
//   });
// })();
// // 使用懒加载技术
// // 懒加载技术可以延迟加载图片和其他资源，减少页面的加载时间。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// // 使用 Intersection Observer API 实现懒加载
// const images = document.querySelectorAll('img.lazy');

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       const img = entry.target as HTMLImageElement;
//       img.src = img.dataset.src;
//       observer.unobserve(img);
//     }
//   });
// });

// images.forEach((img) => {
//   observer.observe(img);
// });

// // 使用 CDN 加速
// // CDN 加速可以提高静态资源的加载速度，减少服务器的压力。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// // 使用 CDN 加载 jQuery
// const script = document.createElement('script');
// script.src = 'https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js';
// document.body.appendChild(script);
// // 使用代码分割和动态导入
// // 代码分割和动态导入可以将代码分成多个文件，只在需要时加载，减少页面的加载时间。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// // 使用 import() 函数动态加载模块
// const button = document.querySelector('#my-button');

// button.addEventListener('click', async () => {
//   const module = await import('./my-module');
//   module.doSomething();
// });
// // 这些都是前端常见的优化方法，可以帮助提高 Web 应用的性能和用户体验。



// // wangtiechuanmail@gmail.com
// // 还有吗

// // 还有一些前端优化方法及其 TypeScript 实现示例：

// // 使用缓存
// // 使用缓存可以减少服务器的负载，提高页面的响应速度。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// // 将数据存储到本地缓存中
// localStorage.setItem('my-data', JSON.stringify(data));

// // 从本地缓存中读取数据
// const data = JSON.parse(localStorage.getItem('my-data') || '');
// // 压缩和混淆代码
// // 压缩和混淆代码可以减小代码的大小，提高页面的加载速度。以下是 TypeScript 实现示例：
// // typescript
// // Copy code
// // 使用 UglifyJS 压缩和混淆代码
// import { minify } from 'uglify-js';

// const code = `function add(a, b) {
//   return a + b;
// }`;

// const result = minify(code);

// console.log(result.code); // 'function add(n,d){return n+d}'
// 使用服务端渲染 (SSR)
// 使用服务端渲染可以减少浏览器的工作量，提高页面的响应速度。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 使用 Next.js 实现服务端渲染
// import { GetServerSideProps } from 'next';

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch(`https://api.example.com/data`);
//   const data = await res.json();

//   return { props: { data } };
// };

// function MyPage({ data }) {
//   return (
//     <div>
//       <h1>My Page</h1>
//       <p>{data}</p>
//     </div>
//   );
// }

// export default MyPage;



// 实现示例：

// 使用 HTTP/2
// HTTP/2 可以减少请求次数和提高请求效率，从而提高页面的加载速度。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 使用 HTTP/2 发送请求
// import https from 'https';

// const options = {
//   hostname: 'example.com',
//   port: 443,
//   path: '/',
//   method: 'GET',
//   protocol: 'https:',
//   headers: {
//     'Accept-Encoding': 'gzip',
//   },
// };

// https.request(options, (res) => {
//   console.log(`statusCode: ${res.statusCode}`);
//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
// }).on('error', (error) => {
//   console.error(error);
// });
// 使用预加载和预连接技术
// 预加载和预连接技术可以提前加载资源，减少页面的加载时间。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 使用 link 元素预加载资源
// const link = document.createElement('link');
// link.rel = 'preload';
// link.as = 'image';
// link.href = 'image.jpg';
// document.head.appendChild(link);

// // 使用 link 元素预连接资源
// const link = document.createElement('link');
// link.rel = 'preconnect';
// link.href = 'https://example.com';
// document.head.appendChild(link);
// 使用 Web Workers
// Web Workers 可以在后台线程中运行 JavaScript，从而减少页面的卡顿和阻塞。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 创建 Web Worker
// const worker = new Worker('worker.js');

// // 在 Web Worker 中执行任务
// worker.postMessage('hello');

// worker.onmessage = (event) => {
//   console.log(event.data);
// };

// // worker.js 文件
// onmessage = (event) => {
//   const data = event.data;
//   // do something with the data
//   postMessage('world');
// };
// 使用响应式图片
// 响应式图片可以根据不同设备的屏幕尺寸加载不同大小的图片，提高页面的加载速度和用户体验。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 使用 srcset 属性定义响应式图片
// <img src="image.jpg"
//      srcset="image-small.jpg 300w,
//              image-medium.jpg 600w,
//              image-large.jpg 1200w"
//      sizes="(max-width: 600px) 100vw,
//             50vw">
// 这些优化方法可以帮助提高 Web 应用的性能和用户体验，建议在开发 Web 应用时进行适当的优化。


// 使用懒加载
// 懒加载可以延迟加载某些内容，提高页面的加载速度。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 使用 Intersection Observer API 实现懒加载
// const images = document.querySelectorAll('img[data-src]');

// const options = {
//   rootMargin: '0px',
//   threshold: 0.1,
// };

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       const img = entry.target;
//       img.src = img.dataset.src;
//       observer.unobserve(img);
//     }
//   });
// }, options);

// images.forEach((img) => {
//   observer.observe(img);
// });
// 使用 CDN
// 使用 CDN 可以减少服务器的负载，提高页面的加载速度。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 使用 CDN 加载资源
// const script = document.createElement('script');
// script.src = 'https://example.com/script.js';
// document.head.appendChild(script);
// 使用虚拟列表
// 虚拟列表可以减少 DOM 元素的数量，提高页面的渲染速度和滚动的流畅性。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 使用 react-window 实现虚拟列表
// import { FixedSizeList } from 'react-window';

// function MyList({ data }) {
//   return (
//     <FixedSizeList height={400} width={300} itemCount={data.length} itemSize={50}>
//       {({ index, style }) => (
//         <div style={style}>
//           {data[index]}
//         </div>
//       )}
//     </FixedSizeList>
//   );
// }
// 使用缓存机制
// 使用缓存机制可以减少网络请求，提高页面的加载速度。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 使用 Service Worker 缓存资源
// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         if (response) {
//           return response;
//         }

//         return fetch(event.request);
//       })
//   );
// });


// 使用 Web Worker
// Web Worker 可以在后台线程中处理复杂的计算任务，避免阻塞主线程，提高页面的响应速度。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 创建 Web Worker
// const worker = new Worker('worker.js');

// // 发送消息给 Web Worker
// worker.postMessage({ type: 'calculate', data: [1, 2, 3] });

// // 接收 Web Worker 的消息
// worker.addEventListener('message', (event) => {
//   console.log(event.data);
// });

// // 在 Web Worker 中处理消息
// self.addEventListener('message', (event) => {
//   if (event.data.type === 'calculate') {
//     const result = event.data.data.reduce((a, b) => a + b, 0);
//     self.postMessage(result);
//   }
// });
// 使用图片压缩
// 使用图片压缩可以减小图片的大小，提高页面的加载速度。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 使用 tinypng API 压缩图片
// const apiKey = 'your_api_key';
// const url = `https://api.tinify.com/shrink`;
// const file = await fetch('https://example.com/image.jpg').then((res) => res.blob());

// const formData = new FormData();
// formData.append('file', file);

// const response = await fetch(url, {
//   method: 'POST',
//   headers: {
//     'Authorization': `Basic ${btoa(`api:${apiKey}`)}`,
//   },
//   body: formData,
// });

// const result = await response.json();
// console.log(result.output.url);
// 使用动画优化
// 使用动画可以使页面更生动有趣，但过多的动画会影响页面的性能。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 使用 requestAnimationFrame 实现动画
// let startTime = null;

// function step(timestamp) {
//   if (!startTime) {
//     startTime = timestamp;
//   }

//   const elapsedTime = timestamp - startTime;

//   // 在这里更新动画的状态

//   if (elapsedTime < 1000) {
//     requestAnimationFrame(step);
//   }
// }

// requestAnimationFrame(step);
// 避免使用 eval
// eval 可以执行任意的 JavaScript 代码，但会导致安全性问题和性能问题。以下是 TypeScript 实现示例：
// typescript
// Copy code
// // 避免使用 eval
// const code = 'console.log("Hello, world!")';

// // 不要使用 eval
// eval(code);

// // 使用 Function 构造函数代替 eval
// const func = new Function(code);
// func();



// const visibilitychange = () => {
//     if (document.visibilityState === 'hidden') {
//     } else if (document.visibilityState === 'visible') {
//       updateTitle();
//     }
//   };
//   document.addEventListener('visibilitychange', visibilitychange, false);