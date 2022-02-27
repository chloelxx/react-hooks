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
      <UserWithErrorBoundary />
    </div>
  );
}
const User = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (count > 5) {
      throw new Error('count的值超出边界');
    }
  }, [count]);
  return (
    <div>
      <p>withErrorBoundary封装-输出一个高阶函数</p>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </Button>
    </div>
  );
};
const UserWithErrorBoundary = withErrorBoundary(User, {
  onError: () => console.log('出错啦'),
  onReset: () => console.log('已重置'),
  fallback: <div>fallback传入的信息-出错啦</div>,
});
// 出错后显示的元素类型
type FallbackElement = React.ReactElement<unknown, string | React.FC | typeof React.Component> | null;
// 检查 resetKeys 是否有变化
const changedArray = (a: Array<unknown> = [], b: Array<unknown> = []) => {
  return a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]));
};
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
  resetKeys?: Array<unknown>;
  onResetKeysChange?: (prevResetKey: Array<unknown> | undefined, resetKeys: Array<unknown> | undefined) => vo;
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
  // 是否已经由于 error 而引发的 render/update
  updatedWithError = false;

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo.componentStack);
    }
  }
  componentDidUpdate(prevProps: Readonly<React.PropsWithChildren<ErrorBoundaryProps>>) {
    const { error } = this.state;
    const { resetKeys, onResetKeysChange } = this.props;

    // 已经存在错误，并且是第一次由于 error 而引发的 render/update，那么设置 flag=true，不会重置
    if (error !== null && !this.updatedWithError) {
      this.updatedWithError = true;
      return;
    }

    // 已经存在错误，并且是普通的组件 render，则检查 resetKeys 是否有改动，改了就重置
    if (error !== null && changedArray(prevProps.resetKeys, resetKeys)) {
      if (onResetKeysChange) {
        onResetKeysChange(prevProps.resetKeys, resetKeys);
      }

      this.reset();
    }
  }

  reset = () => {
    this.updatedWithError = false;
    this.setState(initialState);
  };

  resetErrorBoundary = () => {
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

/**
 * with 写法
 * @param Component 业务组件
 * @param errorBoundaryProps error boundary 的 props
 */
function withErrorBoundary<P>(
  Component: React.ComponentType<P>,
  errorBoundaryProps: ErrorBoundaryProps
): React.ComponentType<P> {
  const Wrapped: React.ComponentType<P> = (props) => {
    return (
      <ErrorBoundary {...errorBoundaryProps}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };

  // DevTools 显示的组件名
  const name = Component.displayName || Component.name || 'Unknown';
  Wrapped.displayName = `withErrorBoundary(${name})`;

  return Wrapped;
}
