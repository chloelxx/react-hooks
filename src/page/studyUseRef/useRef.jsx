import React, { useRef, useState } from 'react';
import { Button } from 'antd';
console.log('Button', Button);
export default function StudyUseRef() {
  const n = useRef(0);
  let a = 0;
  const [up, setUpdate] = useState()[1]; /* 我们只需要setX的函数即可 */
  console.log(up);
  const log = () => {
    setTimeout(() => {
      console.log('n:', n.current);
    }, 3000);
  };
  return (
    <div>
      n:{n.current}
      <p>a={a}</p>
      <Button type="primary" onClick={log}>
        log
        <br />
        {up}
      </Button>
      <hr />
      <Button
        type="primary"
        onClick={() => {
          n.current += 1;
          a = a + 1;
          /* 只要useState中的值发生变化，就会重新触发页面渲染 */
          setUpdate(+new Date());
        }}
      >
        n+1
      </Button>
    </div>
  );
}
