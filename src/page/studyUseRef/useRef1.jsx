import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from 'antd';
export default function App(props) {
  const [count, setCount] = useState(0);
  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);

  const couterRef = useRef();

  useEffect(() => {
    document.title = `The value is ${count}`;
    window.xxx = couterRef;
    console.log(couterRef);
  }, [count]);

  return (
    <>
      <Button
        type="pirmary"
        ref={couterRef}
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Count: {count}, double: {doubleCount}
      </Button>
      <MessageThread />
    </>
  );
}
function MessageThread() {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    console.log('test111');
    ref.current = () => {
      console.log('test111 count==', count);
      setCount(count + 1);
    };
  });
  useEffect(() => {
    function tick() {
      // setCount(count + 1); // 下面这两种方式是回导致不同的想过，下面的ref是可以达到每秒一次刷新，setCount是不可以。他只会刷新一次。
      ref.current();
    }
    let id = setInterval(tick, 1000);
    console.log('id==', id);
    // return () => clearInterval(id);
  }, [1000]);

  return (
    <h1>
      {count}
      <div
        onClick={() => {
          setCount(-199);
        }}
      >
        refresh
      </div>
    </h1>
  );
}
