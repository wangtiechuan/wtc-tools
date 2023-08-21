const blobTemp: { val?: BlobTempProps } = { val: undefined };
type BlobTempProps = typeof Blob;
export function getBlobConstructor(): BlobTempProps {
  if (blobTemp.val) {
    // @ts-ignore
    return blobTemp.val;
  }
  let supportBlob = false;
  try {
    new Blob();
    supportBlob = true;
  } catch (e) {
    console.log(e);
  }

  let realBlob: BlobTempProps;
  if (supportBlob) {
    realBlob = Blob;
  } else {
    // @ts-ignore
    realBlob = function (parts, opts) {
      const TempBlob =
        // @ts-ignore
        window.BlobBuilder ||
        // @ts-ignore

        window.WebKitBlobBuilder ||
        // @ts-ignore

        window.MSBlobBuilder ||
        // @ts-ignore

        window.MozBlobBuilder;
      // @ts-ignore
      const bb = new TempBlob();
      parts.forEach((p: any) => {
        bb.append(p);
      });
      return bb.getBlob(opts ? opts.type : undefined);
    };
  }

  // @ts-ignore
  blobTemp.val = realBlob;
  return realBlob;
}
