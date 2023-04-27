import fs from 'fs';
import SourceMap from 'source-map';

const { SourceMapConsumer } = SourceMap;

export function getPosInSourceMap(
  filePath: string,
  posError = {
    line: 1,
    column: 1,
  },
) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      const rawSourceMap = JSON.parse(data);

      SourceMapConsumer.with(rawSourceMap, null, (consumer) => {
        const pos = consumer.originalPositionFor(posError);
        resolve(pos);
      });
    });
  });
}
