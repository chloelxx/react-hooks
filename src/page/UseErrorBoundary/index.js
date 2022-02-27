import { Button } from 'antd';
import React, { useState, createContext, useContext } from 'react';
import { useEffect } from 'react';
import useErrorBoundary from 'use-error-boundary';
/** 简单的error boundary的举例一 */
export default function UseErrorBoundaryCase() {
  const { ErrorBoundary, didCatch, error, renderError } = useErrorBoundary();
  return (
    <>
      {/* {didCatch ? (
        <p>An error has been caught: {error.message}</p>
      ) : (
        <ErrorBoundary>
          <UserList />
        </ErrorBoundary>
      )} */}

      <ErrorBoundary render={() => <UserList />} renderError={({ error }) => <MyErrorComponent error={error} />} />
    </>
  );
}
function MyErrorComponent(props) {
  console.log('props==', props.error);
  return (
    <>
      <p>报错，报错信息：{props.error.message}</p>
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
      <p>useErrorBoundary组件捕获异常，防止页面崩溃</p>
      <Button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </Button>
      <Child></Child>
    </>
  );
}
function Child() {
  const [btn, setBtn] = useState(0);
  useEffect(() => {
    if (btn > 5) {
      throw new Error('count的值超出边界');
    }
  }, [btn]);
  return (
    <>
      <p>useErrorBoundary组件捕获异常，防止页面崩溃</p>
      <Button
        onClick={() => {
          setBtn(btn + 1);
        }}
      >
        {btn}
      </Button>
    </>
  );
}
