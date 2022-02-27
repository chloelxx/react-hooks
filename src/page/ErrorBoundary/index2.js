import { Button } from 'antd';
import React, { useState, createContext, useContext } from 'react';
import { useEffect } from 'react';
/** 简单的error boundary的举例一 */
export default function ErrorBoundaryCase1() {
  return (
    <ErrorBoundary fallback={<div>fallback传入的信息-出错啦</div>} onError={() => console.log('出错啦')}>
      <UserList />
    </ErrorBoundary>
  );
}
function UserList() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count > 5) {
      throw new Error('count的值超出边界');
    }
  }, [count]);
  return (
    <>
      <p>fallback属性可以传自己报错的信息</p>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </Button>
    </>
  );
}
// 出错后显示的元素类型
type FallbackElement = React.ReactElement<unknown, string | React.FC | typeof React.Component> | null;

// 出错显示组件的 props
export interface FallbackProps {
  error: Error;
}

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryProps {
  fallback?: FallbackElement;
  onError?: (error: Error, info: string) => void;
}

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryState {
  error: Error | null; // 将 hasError 的 boolean 改为 Error 类型，提供更丰富的报错信息
}

// 初始状态
const initialState: ErrorBoundaryState = {
  error: null,
};

class ErrorBoundary extends React.Component<React.PropsWithChildren<ErrorBoundaryProps>, ErrorBoundaryState> {
  state = initialState;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack);
    }
  }

  render() {
    const { fallback } = this.props;
    const { error } = this.state;

    if (error !== null) {
      if (React.isValidElement(fallback)) {
        return fallback;
      }

      throw new Error('ErrorBoundary 组件需要传入 fallback');
    }

    return this.props.children;
  }
}
