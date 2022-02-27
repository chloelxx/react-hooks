/***
 * 实现一个函数队列，让加进去的函数按顺序执行*/
var stack = [];
function fn1() {
  console.log('第1个调用');
  nextfunction();
  return this;
}
function fn2() {
  setTimeout(() => {
    console.log('第2个调用');
    nextfunction();
  }, 0);
  return this;
}
function fn3() {
  console.log('第3个调用');
  nextfunction();
  return this;
}
function nextfunction() {
  if (stack.length > 0) {
    let s = stack.shift();
    s();
  }
  return this;
}

stack.push(
  fn1,
  fn2,
  fn3,
  () => {
    setTimeout(() => {
      console.log(5);
      nextfunction();
    });
  },
  () => {
    console.log(6);
  }
);
// nextfunction();
// fn1().fn2().fn3().nextfunction();
// setTimeout(() => {
//   console.log('第1个调用');
//   setTimeout(() => {
//     console.log('第2个调用');
//   });
// }, 0);
// setTimeout(() => {
//   console.log('第3个调用');
//   setTimeout(() => {
//     console.log('第4个调用');
//   });
// }, 0);
// 1,3,2,4
for (let i = 0; i < 10; i++) {
  //   setTimeout(function () {
  //     console.log('1');
  //   }, 0);
  //   setImmediate(function () {
  //     console.log('2');
  //   });
  setImmediate(function () {
    setTimeout(function () {
      console.log('===1');
    }, 0);

    setImmediate(function () {
      console.log('===2');
    });
  });
}
// setImmediate(function () {
//   setTimeout(function () {
//     console.log('===1');
//   }, 0);

//   setImmediate(function () {
//     console.log('===2');
//   });
// });
