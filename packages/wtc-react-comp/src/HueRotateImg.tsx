import React, { useMemo } from 'react';

export interface HueRotateImgProps
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  filterRotate?: number | string;
  backUpImgSrc: string;
}

export function HueRotateImg(props: HueRotateImgProps) {
  const { style, filterRotate, src, backUpImgSrc, ...otherProps } = props;
  const st = useMemo(() => {
    if (!filterRotate || !src) {
      return style;
    }
    return style || filterRotate
      ? {
          filter: `hue-rotate(${filterRotate}deg)`,
          ...style,
        }
      : undefined;
  }, [style, filterRotate, src]);

  const realSrc = useMemo(() => {
    return src || backUpImgSrc;
  }, [src, backUpImgSrc]);

  return (
    <img
      crossOrigin="anonymous"
      alt=""
      style={st}
      src={realSrc}
      {...otherProps}
    />
  );
}
