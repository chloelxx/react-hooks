import { Button } from 'antd';
import React, { useState, createContext, useContext } from 'react';
import { useEffect } from 'react';
/** 简单的error boundary的举例一 */
export default function ErrorBoundaryCase4() {
  const onError = () => console.log('出错啦');
  const onReset = () => {
    console.log('已重置');
  };
  // fallback 组件的渲染函数
  const renderFallback = (props: FallbackProps) => {
    console.log('renderFallback props===', props);
    return (
      <div>
        出错啦，你可以<button onClick={props.resetErrorBoundary}>重置</button>
      </div>
    );
  };

  return (
    <div>
      <ErrorBoundary fallbackRender={renderFallback} onReset={onReset} onError={onError}>
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
    <Button
      onClick={() => {
        setCount(count + 1);
      }}
    >
      {count}
    </Button>
  );
}
// 出错后显示的元素类型
type FallbackElement = React.ReactElement<unknown, string | React.FC | typeof React.Component> | null;
// 出错显示组件的 props
export interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void; // fallback 组件里将该函数绑定到“重置”按钮
}

// 本组件 ErrorBoundary 的 props
interface ErrorBoundaryProps {
  fallback?: FallbackElement; // 一段 ReactElement
  FallbackComponent?: React.ComponentType<FallbackProps>; // Fallback 组件
  fallbackRender?: typeof FallbackRender; // 渲染 fallback 元素的函数
  onError?: (error: Error, info: string) => void;
  onReset?: () => void;
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
  reset = () => {
    console.log('initialState===', initialState, this.state);
    this.setState(initialState);
  };

  // 执行自定义重置逻辑，并重置组件状态
  resetErrorBoundary = () => {
    console.log('props==', this.props);
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.reset();
  };

  render() {
    const { fallback, FallbackComponent, fallbackRender } = this.props;
    const { error } = this.state;

    if (error !== null) {
      const fallbackProps: FallbackProps = {
        error,
        resetErrorBoundary: this.resetErrorBoundary, // 将 resetErrorBoundary 传入 fallback
      };

      if (React.isValidElement(fallback)) {
        return fallback;
      }
      if (typeof fallbackRender === 'function') {
        return fallbackRender(fallbackProps);
      }
      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }

      throw new Error('ErrorBoundary 组件需要传入 fallback, fallbackRender, FallbackComponent 其中一个');
    }

    return this.props.children;
  }
}
