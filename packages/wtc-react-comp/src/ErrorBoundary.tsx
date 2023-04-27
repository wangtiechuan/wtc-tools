import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    // 更新 state 以展示备用 UI
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 在这里可以将错误日志发送到服务器
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.error) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// function MyComponent(): JSX.Element {
//   const [count, setCount] = useState(0);
//   if (count === 5) {
//     throw new Error('Oops! Something went wrong.');
//   }
//   return (
//     <div>
//       <button onClick={() => setCount(count + 1)}>Increase Count</button>
//       <p>{count}</p>
//     </div>
//   );
// }

// function App(): JSX.Element {
//   return (
//     <ErrorBoundary fallback={<p>Something went wrong!</p>}>
//       <MyComponent />
//     </ErrorBoundary>
//   );
// }
