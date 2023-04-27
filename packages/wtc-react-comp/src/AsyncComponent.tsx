import React, { Component, lazy, ReactNode, Suspense } from 'react';

export interface AsyncComponentProps {
  loader: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: ReactNode;
}

interface State {
  Component: React.ComponentType<any> | null;
}

export class AsyncComponent extends Component<AsyncComponentProps, State> {
  constructor(props: AsyncComponentProps) {
    super(props);
    this.state = { Component: null };
  }

  async componentDidMount(): Promise<void> {
    const { default: Component } = await this.props.loader();
    this.setState({ Component });
  }

  render(): ReactNode {
    const { Component } = this.state;
    const { fallback } = this.props;

    if (Component) {
      // @ts-ignore
      const LazyComponent = lazy(() => Promise.resolve(Component));
      return (
        <Suspense fallback={fallback}>
          <LazyComponent {...this.props} />
        </Suspense>
      );
    }

    return fallback || null;
  }
}

// const MyComponent = () => {
//   return <div>Hello World!</div>;
// };

// function App(): JSX.Element {
//   return (
//     <div>
//       <AsyncComponent loader={() => import('./MyComponent')}>
//         <p>Loading...</p>
//       </AsyncComponent>
//       <AsyncComponent loader={() => Promise.resolve({ default: MyComponent })}>
//         <p>Loading...</p>
//       </AsyncComponent>
//     </div>
//   );
// }
