import { getBlobConstructor } from './getBlobConstructor';

export function dataURItoBlobOrFile(
  dataURI: string,
  filename?: string,
): Blob | File {
  const arr = dataURI.split(',');
  let byteString: string;
  if (arr[0].indexOf('base64') >= 0) {
    byteString = atob(arr[1]);
  } else {
    byteString = unescape(arr[1]);
  }

  const mimeString = arr[0].split(':')[1].split(';')[0];

  let n = byteString.length;
  const ia = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  if (filename) {
    return new File([ia], filename, { type: mimeString });
  }

  const BlobFunc = getBlobConstructor();

  return new BlobFunc([ia.buffer], {
    type: mimeString,
  });
}
