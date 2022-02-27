import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Button } from 'antd';
export default function UseRef2(props) {
  const childMethodRef = useRef();
  const handleChildFun = () => {
    childMethodRef.current.childFun('test');
  };
  const fun2 = () => {
    childMethodRef.current.fun2();
  };
  return (
    <div>
      我是父组件:
      <p>利用useRef和forwardRef两种api结合，让父组件可以调用子组件中的方法或者属性</p>
      <Button onClick={() => handleChildFun()}>Click1</Button>
      <br />
      <Button onClick={() => fun2()}>Click2</Button>
      <br />
      <Child test={'ok'} ref={childMethodRef} />
    </div>
  );
}
const cb = (props, ref) => {
  const [info, setInfo] = useState('');
  // 可以让父组件调用子组件的方法
  useImperativeHandle(ref, () => ({
    childFun(info) {
      console.log(info);
      setInfo(info);
    },
    fun2() {
      console.log('fun2');
    },
  }));
  return <div>我是子组件{info}</div>;
};
export const Child = forwardRef(cb);
