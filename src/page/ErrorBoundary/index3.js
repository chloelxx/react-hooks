import { Button } from 'antd';
import React, { useState, createContext, useContext } from 'react';
import { useEffect } from 'react';
/** 简单的error boundary的举例一 */
export default function ErrorBoundaryCase3() {
  function ErrorFallback() {
    return <>FallbackComponent函数渲染</>;
  }
  return (
    <div>
      <ErrorBoundary fallback={<div>fallback-出错啦</div>} onError={() => console.log('出错啦1')}>
        <UserList />
      </ErrorBoundary>
      <hr />
      <ErrorBoundary FallbackComponent={ErrorFallback} onError={() => console.log('出错啦2')}>
        <UserList />
      </ErrorBoundary>
      <hr />

      <ErrorBoundary
        fallbackRender={(fallbackProps) => <div {...fallbackProps}>fallbackRender函数</div>}
        onError={() => console.log('出错啦3')}
      >
        <UserList />
      </ErrorBoundary>
    </div>
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
      <p>fallback属性可以传自己报错的信息,FallbackComponent,fallbackRender</p>
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
  fallback?: FallbackElement; // 一段 ReactElement
  FallbackComponent?: React.ComponentType<FallbackProps>; // Fallback 组件
  fallbackRender?: typeof FallbackRender; // 渲染 fallback 元素的函数
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
    const { fallback, FallbackComponent, fallbackRender } = this.props;
    const { error } = this.state;

    // 多种 fallback 的判断
    if (error !== null) {
      const fallbackProps: FallbackProps = {
        error,
      };
      // 判断 fallback 是否为合法的 Element
      if (React.isValidElement(fallback)) {
        return fallback;
      }
      // 判断 render 是否为函数
      if (typeof fallbackRender === 'function') {
        return fallbackRender(fallbackProps);
      }
      // 判断是否存在 FallbackComponent
      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }

      throw new Error('ErrorBoundary 组件需要传入 fallback, fallbackRender, FallbackComponent 其中一个');
    }

    return this.props.children;
  }
}
