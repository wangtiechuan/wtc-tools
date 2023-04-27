import axios from 'axios'; // 导入 axios 用于获取数据
import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-css'; // 导入 Masonry 组件

interface ImageData {
  id: number;
  url: string;
}

interface Props {
  columns: number;
}

export const WaterfallFlow: React.FC<Props> = ({ columns }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 加载初始数据
    fetchImages();
  }, []);

  useEffect(() => {
    // 监听滚动事件
    const gallery = galleryRef.current;
    gallery?.addEventListener('scroll', handleScroll);
    return () => gallery?.removeEventListener('scroll', handleScroll);
  }, [galleryRef]);

  const handleScroll = () => {
    const gallery = galleryRef.current;
    if (gallery) {
      const { scrollTop, clientHeight, scrollHeight } = gallery;
      if (scrollHeight - scrollTop === clientHeight && !loading && hasMore) {
        // 滚动到底部并且还有更多数据，加载下一页
        setPage(page + 1);
      }
    }
  };

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://example.com/api/images?page=${page}`,
      );
      const newImages = response.data.images;
      setImages([...images, ...newImages]);
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const breakpointColumnsObj = {
    default: columns,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div ref={galleryRef} style={{ height: '100%', overflowY: 'scroll' }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.url}
              alt=""
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </Masonry>
      {loading && <div>Loading...</div>}
    </div>
  );
};

// const App: React.FC = () => {
//   return (
//     <div style={{ width: '100vw', height: '100vh' }}>
//       <WaterfallFlow columns={4} />
//     </div>
//   );
// };

// export default App;
