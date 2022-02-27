import { Button } from 'antd';
import React, { useState, createContext, useContext } from 'react';
import { useEffect } from 'react';
/** 简单的error boundary的举例一 */
export default function ErrorBoundaryCase1 () {
  const AA = () => {
    return <p>aa</p>;
  };
  const BB = () => {
    return <p>bb</p>;
  };
  const CC = () => {
    return <p>cc</p>;
  };
  return (
    <>
      <ErrorBoundary>
        <UserList />
      </ErrorBoundary>
      <ErrorBoundary>
        <AA />
      </ErrorBoundary>
      <ErrorBoundary>
        <BB />
      </ErrorBoundary>
      <ErrorBoundary>
        <CC />
      </ErrorBoundary>
    </>
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
      <p>简单的异常边界捕获，直接暴露出错信息</p>
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
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
