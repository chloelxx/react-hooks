# useRef 详解

在 vuejs 中，数据是响应式的，数据变化会导致页面渲染，但是在 reactjs 数据不是响应式的，reactjs 中数据是要通过 this.setState()去手动改触发数据更新，然后页面才会渲染。react 中的 hook 的那种思想也不过是 setState()的一个缩写版。如果想要不总是手动调用 setXXX()去更新数据，在 react 中如果声明了一个变量
let count =0
然后让 count=2
你再去拿 count 的值还是 0，是因为 react 中的数据并不是响应式数据，所有如果要到达这种想过可以直接利用某一个变量变化之后的值，可以使用 const r=useRef(0)
r.current=2
r。current =2 这种赋值不会导致页面重新渲染，如果你页面中没有调用 setState 这个操作或者变种，页面中看到的 r.current 值还是旧值，但是实际上你拿到的 r.current 的值是最新的，原因是页面没有去渲染，所有页面渲染的 r.current 值然然是旧值
去获取这个 r.current 就可以拿到最新的值

# React.createContext/useContext 详解

创建一个上下文对象。当 React 渲染一个订阅该 Context 对象的组件时，它将从树中它上面最接近的匹配 Provider 读取当前上下文值。仅当组件在树中上方没有匹配的提供者时才使用 defaultValue 参数。这对于隔离测试组件而不包装它们很有帮助。

tips：将 undefined 传递为 Provider 值不会导致使用组件使用 defaultValue。
是创建一个上下文对象，其实就是一个"块级作用域"。在这个"块级作用域"里面，Context 提供的 JS 变量和对象等能贯穿整个上下文对象（块级作用域），里面的组件及里面所有嵌套的组件都能使用 Context 提供的 JS 变量和对象等。
1、首先先要创建一个上下文对象 globalText。然后再创建一个"块级作用域"。在 Provider 的 value 属性中写上要传递的一个 JS 变量或对象。
2、然后在子组件中使用 provider 中提供的变量或者对象，可以通过子组件改变父组件中的值

# Hook 规则

不在循环，条件或嵌套函数中调用 Hook， 确保总是在你的 React 函数的最顶层调用他们。
不在普通的 JavaScript 函数中调用 Hook，在 React 的函数组件或者自定义 Hook 中调用 Hook。

## Hook API

名称 描述
useState 在函数组件中维护自己的状态
useEffect 在函数组件中实现生命周期钩子函数
useContext 用来处理多层级传递数据的方式，减少组件嵌套
useReducer 跟 react-redux 的使用方式一样，算是提供一个 mini 的 Redux 版本
useCallback 获得一个记忆函数，避免在某些情况下重新渲染子组件，用来做性能优化
useMemo 获得一个记忆组件，和 useCallback 非常类似，它适用于返回确定的值
useRef 生成对 DOM 对象的引用，它是一个真正的引用，而不是把值拷过去
useImperativeHandle 透传 ref，用于让父组件获取子组件内的引用
useLayoutEffect 同步执行副作用，在页面完全渲染完成后，操作 DOM

# useState

在类组件中，我们使用 this.state 来保存组件状态，并对其修改触发组件重新渲染。而在函数组件中，由于没有 this 这个黑魔法，可能通过 useState 来帮我们保存组件的状态。

useState()，返回一个 state，以及更新 state 的函数。
useState() 中第一个参数是值或者对象，初始渲染期间，返回的状态 (state) 是传入的第一个参数相同。
如果依赖于先前的 state，在第二个参数中接收先前的 state，并返回一个更新后的值。
import React, { useState } from "react";
function App() {
const [count, setCount] = useState(0); //0 是 count 的默认值
return (

<div className="App">
Count: {count}
<button onClick={() => setCount((preState=>preState+1))}>+</button>
<button onClick={() => setCount(0)}>还原</button>
</div>
);
}
1
2
3
4
5
6
7
8
9
10
11
注意：与类组件中的 setState 方法不同，useState 不会自动合并更新对象。当第一个参数是一个对象时，你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。

import React, { useState } from "react";
function App1(){
const [obj,setObj]=useState({
name:'admin',
age:18
})
return(

<div>
姓名:{obj.name}-年龄:{obj.age}
<button onClick={()=>setObj({...obj,name:obj.name+"用户"})}>只修改姓名</button>
</div>
)
}
1
2
3
4
5
6
7
8
9
10
11
12
13
useEffect
语法：useEffect(fn,Array)

第一个参数传递函数，可以用来做一些副作用比如异步请求，修改外部参数等行为。
第二个参数是个数组，数组中的值发生变化才会触发 useEffect 第一个参数中的函数。
如果第二个参数是个空数组的话，默认会在页面加载后执行一次。
如果第一个参数有返回值，会在组件销毁或者调用函数前调用。
可以使用 useEffect 模拟 componentDidMount、 componentDidMount 和 componentWillUnmount 钩子函数。
import React, { useState, useEffect } from "react";
function App(){
const [count, setCount] = useState(0);
useEffect(()=>{
//只要 count 有变化，就会执行这里
},[count])
useEffect(()=>{
//如果在下面没有参数的话，页面加载后执行，执行一次
return()=>{
//页面退出的时候执行
}
},[])
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
useContext
用来处理多层级传递数据的方式，使用 useContext 可以解决 Consumer 多状态嵌套的问题

import React, { useContext } from "react";

const colorContext = React.createContext("gray");
function Bar() {
const color = useContext(colorContext);
return <div>{color}</div>;
}
function Foo() {
return <Bar />;
}
function App() {
return (
<colorContext.Provider value={"red"}>
<Foo />
</colorContext.Provider>
);
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
useReducer
useReducer 这个 Hooks 在使用上几乎跟 React-Redux 一模一样，唯一缺少的就是无法使用 redux 提供的中间件，算是提供一个 mini 的 Redux 版本。

import React, { useReducer } from "react";
const initialState = {
count: 0
};
function reducer(state, action) {
switch (action.type) {
case "increment":
return { count: state.count + action.payload };
case "decrement":
return { count: state.count - action.payload };
default:
throw new Error();
}
}
function App() {
const [state, dispatch] = useReducer(reducer, initialState);
return (
<>
Count: {state.count}
<button onClick={() => dispatch({ type: "increment", payload: 5 })}> +
</button>
<button onClick={() => dispatch({ type: "decrement", payload: 5 })}> -
</button>
</>
);
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
useCallback
通过 useCallback 获得一个记忆后的函数，避免函数组件在每次渲染的时候如果有传递函数的话，重新渲染子组件。用来做性能优化。

import React, { useCallback } from "react";
function App() {
const memoizedHandleClick = useCallback(() => {
console.log('Click happened')
}, []); // 空数组代表无论什么情况下该函数都不会发生改变
return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
1
2
3
4
5
6
7
useMemo
记忆组件，和 useCallback 类似，不同的是：useCallback 不会执行第一个参数函数，而是将它返回给你，而 useMemo 会执行第一个函数并且将函数执行结果返回给你。所以在前面的例子中，可以返回 handleClick 来达到存储函数的目的。

所以 useCallback 常用记忆事件函数，生成记忆后的事件函数并传递给子组件使用。而 useMemo 更适合经过函数计算得到一个确定的值，比如记忆组件。

import React, { useMemo } from "react";
function App() {
const memoizedHandleClick = useMemo(() => () => {
console.log('Click happened')
}, []); // 空数组代表无论什么情况下该函数都不会发生改变
return <SomeComponent onClick={memoizedHandleClick}>Click Me</SomeComponent>;
}
1
2
3
4
5
6
7
useRef
跟 createRef 类似，都可以用来生成对 DOM 对象的引用。不同点在于，它是一个真正的引用，而不是把值拷过去。

import React, { useState, useRef } from "react";
function App() {
let [name, setName] = useState("Nate");
let nameRef = useRef();
const submitButton = () => {
setName(nameRef.current.value);
};
return (

<div className="App">
<p>{name}</p>

      <div>
        <input ref={nameRef} type="text" />
        <button type="button" onClick={submitButton}>
          Submit
        </button>
      </div>
    </div>

);
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
useImperativeHandle
透传 ref，用于让父组件获取子组件内的引用。

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";
function ChildInputComponent(props, ref) {
const inputRef = useRef(null);
useImperativeHandle(ref, () => inputRef.current);
return (

<div>
<input type="text" name="child input" ref={inputRef} placeholder="我聚焦了"/>
<input type="text" name="child input1" placeholder="我没有聚焦"/>
</div>
)
}
const ChildInput = forwardRef(ChildInputComponent);
function App() {
const inputRef = useRef(null);
useEffect(() => {
inputRef.current.focus();
}, []);
return (
<div>
<ChildInput ref={inputRef} />
</div>
);
}

useLayoutEffect
大部分情况下，使用 useEffect 就可以帮我们处理组件的副作用，但是如果想要同步调用一些副作用，比如对 DOM 的操作，就需要使用 useLayoutEffect，useLayoutEffect 中的副作用会在 DOM 更新之后同步执行。

import React, { useState, useEffect, useLayoutEffect } from "react";
function App() {
const [width, setWidth] = useState(0);
useLayoutEffect(() => {
const title = document.querySelector("#title");
const titleWidth = title.getBoundingClientRect().width;
console.log("useLayoutEffect");
if (width !== titleWidth) {
setWidth(titleWidth);
}
});
useEffect(() => {
console.log("useEffect");
});
return (

<div>
<h1 id="title">hello</h1>
<h2>{width}</h2>
</div>
);
}
