import React, { useRef, useState, useEffect, forwardRef } from 'react';
import { Button } from 'antd';
/** useRef的用法详解：
 * 1、useRef可以用来保持引用
 * 2、useRef和forward结合可以用来父组件访问子组件中的函数或者数据
 * 3、useRef变化不会主动使页面渲染，因为他不会触发页面渲染机制
 * */
export default function StudyUseRef() {
  const n = useRef(0);
  const textInput = useRef(null);

  let a = 0;
  const [up, setUpdate] = useState(0); /* 我们只需要setX的函数即可 */
  console.log(up);
  console.log('子组件的DOM====0', textInput);
  const log = () => {
    setTimeout(() => {
      console.log('n:', n.current);
    }, 3000);
    textInput.current.focus();
    console.log('子组件的DOM', textInput);
  };
  useEffect(() => {
    n.current += 1;
    console.log('current==', n.current);
  });
  return (
    <div>
      {/* <input type="text" ref={textInput} /> */}
      <Child ref={textInput} />
      <p>n.current:{n.current}</p>
      <p>a={a}</p>
      <p>up={up}</p>
      <Button type="primary" onClick={log}>
        log
      </Button>
      <hr />
      <Button
        type="primary"
        onClick={() => {
          n.current += 1;
          a = a + 1;
          /* 只要useState中的值发生变化，就会重新触发页面渲染 */
          setUpdate(up + 1);
        }}
      >
        n+1
      </Button>
    </div>
  );
}
const Child = forwardRef((props, ref) => {
  //** 看我 **
  return <input type="text" ref={ref} />; //** 看我挂到对应的dom上 **
});
