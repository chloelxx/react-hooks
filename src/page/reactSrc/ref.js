import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

function MessageThread() {
  const [count, setCount] = useState(0);
  const ref = useRef();
  useEffect(() => {
    ref.current = () => {
      setCount(count + 1);
    };
  }, [() => {}]);
  useEffect(() => {
    function tick() {
      // setCount(count + 1);
      ref.current();
    }
    let id = setInterval(tick, 1000);
    return () => clearInterval(id);
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
