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
    </>
  );
}
