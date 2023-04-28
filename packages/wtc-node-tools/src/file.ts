import * as fs from 'fs';
import * as os from 'os';

export const appendIntoFile = (filePath: string, data: string) => {
  const realData = `${data}${os.EOL}`;
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, realData, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  }) as Promise<true>;
};

export const writeIntoFile = (filePath: string, data: string) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  }) as Promise<true>;
};

export const readFromFile = (filePath: string) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  }) as Promise<string>;
};

export const deleteFile = (filePath: string) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  }) as Promise<true>;
};
