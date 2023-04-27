import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt?: string;
  thumbnail?: string;
  errorSrc?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt = '',
  thumbnail,
  errorSrc,
}) => {
  const [imageSrc, setImageSrc] = useState(thumbnail || '');
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [showImage, setShowImage] = useState(false);

  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (imageRef) {
      observer = new IntersectionObserver(
        (entries) => {
          const firstEntry = entries[0];
          if (firstEntry.isIntersecting) {
            setShowImage(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(imageRef);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [imageRef]);

  useEffect(() => {
    if (showImage && imageSrc !== src) {
      const imageLoader = new Image();
      imageLoader.src = src;
      imageLoader.onload = () => {
        setImageSrc(src);
        setImageRef(null);
      };
      imageLoader.onerror = () => {
        setImageSrc(errorSrc || '');
        setImageRef(null);
      };
    }
  }, [showImage, imageSrc, src, errorSrc]);

  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
    height: '100%',
  };

  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: showImage ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
    objectFit: 'cover',
  };

  const thumbnailStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'blur(10px)',
  };

  return (
    <div ref={imageWrapperRef} style={wrapperStyle}>
      <img src={imageSrc} alt={alt} style={imageStyle} ref={setImageRef} />
      {thumbnail && <img src={thumbnail} alt={alt} style={thumbnailStyle} />}
    </div>
  );
};
