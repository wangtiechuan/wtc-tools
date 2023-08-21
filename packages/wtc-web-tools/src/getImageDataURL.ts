import { getWindowURL } from './getWindowURL';

// 图片转 url
export function getImageDataURL(image: File) {
  return new Promise<string>((resolve) => {
    const WURL = getWindowURL();

    if (WURL) {
      resolve(WURL.createObjectURL(image));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function (e) {
      // @ts-ignore
      resolve(e.target.result);
    };
  });
}
