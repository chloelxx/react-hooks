import React, { useState, useEffect, useRef, useMemo } from 'react';
const reactMemoCounts = React.memo(({ memoizedValue }) => {
  console.log('reactMemo执行');
  return (
    <div className="mt-3">
      <p className="dark:text-white max-w-md">
        I'll only re-render when you click <span className="font-bold text-indigo-400">Force render.</span>
      </p>
      <p className="dark:text-white">
        I've now rendered: <span className="text-green-400">{memoizedValue} time(s)</span>{' '}
      </p>
    </div>
  );
});
export default function ParentComponent() {
  const [times, setTimes] = useState(0);
  const useMemoRef = useRef(0);
  console.log('ParentComponent 执行');
  const incrementUseMemoRef = () => {
    console.log('函数memo函数执行', useMemoRef.current);
    return useMemoRef.current++;
  };
  const memoizedValue = useMemo(() => incrementUseMemoRef(), [times]); // 上面这一个React.memo会生效，下面那个写法会导致React.memo失效，因为memoizedValue返回的是一个新的对象函数,React.memo的props发生改变。因为memoizedValue是在不同对象中定义的。react每重新执行一次，就是相当于重新new 了一个对象。
  // const memoizedValue = incrementUseMemoRef();
  return (
    <div className="flex flex-col justify-center items-center border-2 rounded-md mt-5 dark:border-yellow-200 max-w-lg m-auto pb-10 bg-gray-900">
      <div className="mt-4 text-center">
        <button className="bg-indigo-200 py-2 px-10 rounded-md" onClick={() => setTimes(times + 1)}>
          Force render
        </button>
        <UseMemoCounts memoizedValue={memoizedValue} />
        <ReactMemoCounts memoizedValue={memoizedValue} times={times} />
      </div>
    </div>
  );
}
const ReactMemoCounts = React.memo(({ memoizedValue, times }) => {
  console.log('reactMemo执行');
  return (
    <div className="mt-3">
      <p className="dark:text-white max-w-md">
        I'll only re-render when you click <span className="font-bold text-indigo-400">Force render.</span>
      </p>
      <p className="dark:text-white">
        I've now rendered: <span className="text-green-400">{memoizedValue} time(s)</span>{' '}
      </p>
    </div>
  );
});

const UseMemoCounts = ({ memoizedValue }) => {
  console.log('非react memo执行');
  return (
    <div className="mt-3">
      <p className="dark:text-white max-w-md">
        I'll only re-render when you click <span className="font-bold text-indigo-400">Force render.</span>
      </p>
      <p className="dark:text-white">
        I've now rendered: <span className="text-green-400">{memoizedValue} time(s)</span>{' '}
      </p>
    </div>
  );
};
