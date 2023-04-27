// 图片转 url
export function getImageDataURL(image: File) {
  return new Promise((resolve) => {
    if (URL.createObjectURL) {
      resolve(URL.createObjectURL(image));
      return;
    }

    if (window.webkitURL) {
      resolve(window.webkitURL.createObjectURL(image));
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
