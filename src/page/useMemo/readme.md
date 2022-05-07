#### useMemo 和 Memo 的用法

useMemo 是 react hooks 的用法，当依赖改变是重新生产一个函数，依赖不变，这个函数 useMemo 包裹的函数不会发生变化，useMemo 是一种性能优化的手段。
为什么需要用 useMemo 确保依赖没变的时候，不需要重新生成一个函数，是因为 rect 在重新渲染的时候，会重新执行一边组件包括里面的内容，所有如果不用 useMemo 的化相当于每次渲染每次都会生成一个一模一样的函数，占用内存。

React.memo 是 react hoc 高阶组件，使用 React.memo 可用用来包装我们不想重新渲染的组件，除非他的 props 发生改变。
