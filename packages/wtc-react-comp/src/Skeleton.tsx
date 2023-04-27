import React, { ReactElement, ReactNode } from 'react';

export interface SkeletonProps {
  loading?: boolean;
  children: ReactNode;
}

export function Skeleton({
  loading = false,
  children,
}: SkeletonProps): ReactElement {
  let _children = children;
  if (loading) {
    const skeletonStyle = {
      backgroundColor: '#f2f2f2',
      borderRadius: '4px',
      height: '20px',
      margin: '8px 0',
      width: '100%',
    };

    _children = React.Children.map(children, (child) => (
      <div style={skeletonStyle}>{child}</div>
    ));
  }

  return <div>{_children}</div>;
}

// function MyComponent({ loading }: { loading: boolean }) {
//   return (
//     <Skeleton loading={loading}>
//       <h2>标题</h2>
//       <p>内容1</p>
//       <p>内容2</p>
//     </Skeleton>
//   );
// }

// export default MyComponent;
