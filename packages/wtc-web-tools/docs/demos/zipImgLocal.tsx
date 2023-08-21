import { ZipImgAtLocal } from '@victor/victor-web-tools';
import React, { useState } from 'react';

export default function Demo() {
  const [img, setImg] = useState<any>([]);

  return (
    <div>
      <input
        type="file"
        multiple={true}
        onChange={(e) => {
          // @ts-ignore
          Array.from(e.target.files).forEach((f: any, index) => {
            const aa = new ZipImgAtLocal(f);
            aa.zip().then((res: any) => {
              console.log(res);
              setImg((pre: any) => {
                pre[index] = res.base64;
                return [...pre];
              });
            });
          });
        }}
      />

      {img.map((item: any, idx: number) => {
        return <img src={item} key={idx} />;
      })}
    </div>
  );
}
