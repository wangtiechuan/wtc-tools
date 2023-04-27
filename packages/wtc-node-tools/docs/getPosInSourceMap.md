# getPosInSourceMap

## Code

**方法`getPosInSourceMap`DEMO**

```jsx
import { getPosInSourceMap } from '@victor/victor-common-tools';

const filePath = './js/vendors-main.5c3091b5.chunk.js.map';
async function demo() {
  const res = await getPosInSourceMap(filePath, {
    line: 1,
    column: 573229,
  });
  console.log(res);
}

demo();
```
