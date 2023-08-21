import EXIF from 'exif-js/exif';
import { dataURItoBlobOrFile } from './dataURItoBlobOrFile';
import { getImageDataURL } from './getImageDataURL';
import { getWURLRevokeObjectURL, getWindowURL } from './getWindowURL';

export interface ZipImgLocalRes {
  base64?: string;
  base64Len?: number;
  base64Percent?: number;
  file: File | Blob;
  fileLen: number;
  fileName: string;
  filePercent?: number;
}

interface ErrorProps {
  error: string;
  data?: any;
}

type RejectFuncProps = (reason: ErrorProps) => void;

type FileInputTypes = File | string;

export interface ZipImgLocalOptions {
  width?: number;
  height?: number;
  quality?: number;
  ingnoreOrientation?: boolean;
  getFileRes?: boolean;
  getBase64Res?: boolean;
}

const ZipImgLocalDefaultOption: ZipImgLocalOptions = {
  width: window.innerWidth,
  height: window.innerHeight,
  quality: 0.7,
  ingnoreOrientation: true,
  getFileRes: true,
  getBase64Res: true,
};

export function createBase64Img(canvas: HTMLCanvasElement, quality?: number) {
  return canvas.toDataURL('image/jpeg', quality);
}

export function changeOrientation(
  img: HTMLImageElement,
  ctx: CanvasRenderingContext2D,
  resize: OrientationResize,
  orientation: any,
) {
  // 调整为正确方向
  switch (orientation) {
    case 3:
      ctx.rotate((180 * Math.PI) / 180);
      ctx.drawImage(
        img,
        -resize.width,
        -resize.height,
        resize.width,
        resize.height,
      );
      break;
    case 6:
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, 0, -resize.width, resize.height, resize.width);
      break;
    case 8:
      ctx.rotate((270 * Math.PI) / 180);
      ctx.drawImage(img, -resize.height, 0, resize.height, resize.width);
      break;

    case 2:
      ctx.translate(resize.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, resize.width, resize.height);
      break;
    case 4:
      ctx.translate(resize.width, 0);
      ctx.scale(-1, 1);
      ctx.rotate((180 * Math.PI) / 180);
      ctx.drawImage(
        img,
        -resize.width,
        -resize.height,
        resize.width,
        resize.height,
      );
      break;
    case 5:
      ctx.translate(resize.width, 0);
      ctx.scale(-1, 1);
      ctx.rotate((90 * Math.PI) / 180);
      ctx.drawImage(img, 0, -resize.width, resize.height, resize.width);
      break;
    case 7:
      ctx.translate(resize.width, 0);
      ctx.scale(-1, 1);
      ctx.rotate((270 * Math.PI) / 180);
      ctx.drawImage(img, -resize.height, 0, resize.height, resize.width);
      break;

    default:
      ctx.drawImage(img, 0, 0, resize.width, resize.height);
  }
}

interface OrientationResize {
  width: number;
  height: number;
}
export function getOrientationResize(
  img: HTMLImageElement,
  opts: ZipImgLocalOptions,
  orientation: any,
): OrientationResize {
  const width = opts.width;
  const height = opts.height;

  const ret: OrientationResize = {
    width: img.width,
    height: img.height,
  };

  if ('5678'.indexOf(orientation) > -1) {
    ret.width = img.height;
    ret.height = img.width;
  }

  // 如果原图小于设定，采用原图
  if (width !== undefined) {
    if (ret.width < width) {
      return ret;
    }
  }
  if (height !== undefined) {
    if (ret.height < height) {
      return ret;
    }
  }

  const scale = ret.width / ret.height;

  if (width && height) {
    if (scale >= width / height) {
      if (ret.width > width) {
        ret.width = width;
        ret.height = Math.ceil(width / scale);
      }
    } else {
      if (ret.height > height) {
        ret.height = height;
        ret.width = Math.ceil(height * scale);
      }
    }
  } else if (width) {
    if (width < ret.width) {
      ret.width = width;
      ret.height = Math.ceil(width / scale);
    }
  } else if (height) {
    if (height < ret.height) {
      ret.width = Math.ceil(height * scale);
      ret.height = height;
    }
  }

  // 在IOS上,超过这个值base64无法生成
  while (ret.width >= 3264 || ret.height >= 2448) {
    ret.width *= 0.8;
    ret.height *= 0.8;
  }

  return ret;
}

export function getBase64Img(
  aimFile: HTMLImageElement,
  img: HTMLImageElement,
  opts: ZipImgLocalOptions,
) {
  return new Promise<string>((resolve, reject: RejectFuncProps) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      // @ts-ignore
      EXIF.getData(aimFile, function () {
        const orientation = opts.ingnoreOrientation
          ? 0
          : // @ts-ignore
            EXIF.getTag(this, 'Orientation');

        const resize = getOrientationResize(img, opts, orientation);
        canvas.width = resize.width;
        canvas.height = resize.height;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        changeOrientation(img, ctx, resize, orientation);

        const base64Img = createBase64Img(canvas, opts.quality);
        if (base64Img.length < 10) {
          reject({
            error: '生成base64失败',
            data: base64Img,
          });
          return;
        }

        resolve(base64Img);
      });
    } catch (error: any) {
      reject({
        error: 'getBase64Img catch error',
        data: error,
      });
      // 解决低内存设备闪退？
      throw new Error(error);
    }
  });
}

export class ZipImgAtLocal {
  private file: FileInputTypes;
  private opts: ZipImgLocalOptions = ZipImgLocalDefaultOption;
  private blobUrl?: string;
  constructor(file: FileInputTypes, opts?: ZipImgLocalOptions) {
    this.file = file;

    if (opts) {
      this.opts = { ...this.opts, ...opts };
    }
  }
  async zip() {
    const file = this.file;
    const opts = this.opts;

    const fileIsString = typeof file === 'string';

    let fileIsBase64 = false;
    let fileName = 'fileName';
    let imgSrc = '';

    if (fileIsString) {
      fileIsBase64 = /^data:/.test(file);
      if (fileIsBase64) {
        fileName = `base64_${new Date().getTime()}.jpg`;
      } else {
        fileName = file.split('/').pop() || fileName;
      }

      imgSrc = file;
    } else {
      fileName = file.name;

      const WURL = getWindowURL();
      const dataUrl = await getImageDataURL(file);
      if (WURL) {
        this.blobUrl = dataUrl;
      }
      imgSrc = dataUrl;
    }

    try {
      return await new Promise<ZipImgLocalRes>(
        (resolve, reject: RejectFuncProps) => {
          const img = new Image();

          img.onerror = (error) => {
            this.destoryBlob();
            console.log(error);
            reject({
              error: 'img error',
              data: error,
            });
          };

          img.onload = () => {
            this.destoryBlob();
            const aimFile = typeof file === 'object' ? file : img;
            getBase64Img(aimFile, img, opts)
              .then((base64) => {
                let newFile: File | Blob;
                // 压缩文件太大就采用源文件
                if (
                  typeof file === 'object' &&
                  // @ts-ignore
                  base64.length > file.size
                ) {
                  newFile = file;
                } else {
                  newFile = dataURItoBlobOrFile(
                    base64,
                    opts.getFileRes ? fileName : undefined,
                  );
                }

                const preFileSize: number | undefined =
                  // @ts-ignore
                  typeof file === 'object' ? file.size : undefined;

                const res: ZipImgLocalRes = {
                  file: newFile,
                  fileLen: newFile.size,
                  fileName,
                  filePercent:
                    preFileSize !== undefined
                      ? +(100 - (newFile.size / preFileSize) * 100).toFixed(2)
                      : undefined,
                };

                if (opts.getBase64Res) {
                  res.base64 = base64;
                  res.base64Len = base64.length;
                  res.base64Percent =
                    preFileSize !== undefined
                      ? +(100 - (base64.length / preFileSize) * 100).toFixed(2)
                      : undefined;
                }

                resolve(res);
              })
              .catch((e: ErrorProps) => {
                reject(e);
              });
          };

          // 如果传入的是base64在移动端会报错
          if (!fileIsBase64) {
            img.crossOrigin = '*';
          }

          img.src = imgSrc;
        },
      );
    } finally {
      this.destory();
    }
  }

  destoryBlob() {
    if (this.blobUrl) {
      getWURLRevokeObjectURL()?.(this.blobUrl);
      this.blobUrl = undefined;
    }
  }

  private destory() {
    this.destoryBlob();
    for (let p in this) {
      if (!this.hasOwnProperty(p)) continue;
      // @ts-ignore
      this[p] = null;
    }
  }
}
