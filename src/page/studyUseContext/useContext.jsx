import React, { useState, createContext, useContext } from 'react';
import { Button } from 'antd';
console.log('Button', Button);
const globalText = createContext(null);
const App = () => {
  const [n, setN] = useState(0);
  const [m, setM] = useState(0);
  return (
    /* 被globalText.Provider包裹的就相当于一个块级作用域 */
    <globalText.Provider value={{ n, setN, m, setM }}>
      <div className="wrapper">
        <div>n:{n}</div>
        <div>m:{m}</div>
        <ChildA />
        <ChildB />
      </div>
    </globalText.Provider>
  );
};
const ChildA = () => {
  /* 解构赋值：对象匹配 */
  const { n, setN } = useContext(globalText);
  return (
    <div>
      {n}
      <Button
        onClick={() => {
          setN(n + 1);
        }}
      >
        ChildA:n+1
      </Button>
    </div>
  );
};
const ChildB = () => {
  const { m, setM } = useContext(globalText);
  return (
    <div>
      {m}
      <Button
        onClick={() => {
          setM(m + 1);
        }}
      >
        ChildB:m+1
      </Button>
    </div>
  );
};
export default function StudyUseContext() {
  return <App />;
}
