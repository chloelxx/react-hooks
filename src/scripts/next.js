/**
 *  LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper

以此类推。
**/
// function LazyMan(name) {
//   var args;
//   function anymonse() {
//     console.log('eat' + args);
//   }
//   this.eat = function (arg) {
//     args = arg;
//     this.eat = function (t) {
//       console.log('hi' + name);
//       console.log('eat ' + arg);
//       console.log('eat ' + t);
//     };
//     return this;
//   };
//   this.sleep = function (time) {
//     console.log('hi' + name);
//     setTimeout(() => {
//       console.log('wait ' + time);
//       anymonse();
//     }, time * 100);
//     return this;
//   };
//   this.sleepFirst = function (f) {
//     setTimeout(() => {
//       console.log('Wake up after ' + f);
//       console.log('hi ' + name);
//       anymonse();
//     }, f * 100);
//     return this;
//   };
//   return this;
// }
// LazyMan('dd').sleep(20).eat('s');
// LazyMan('chloexx').eat('dinner').eat('supper');

// 借鉴人家的思想写的lazyman
function LazyManTest(name) {
  return new _lazyMan(name);
}
class _lazyMan {
  constructor(name) {
    this.taskQuene = [];
    this.say(); // this.say()方法不能放在这里调用，因为会影响后面的this.timer的只，首先运行this.say(),
    // 这个时候代码还没有执行this.timer=undefined,say方法执行this.next()的时候this.timer指向了一个定时器（this.timer有值），这个时候say方法执行完，执行下一步代码，this.timer=null,这个时候上一次的this.timer值被清空了，所以clearTimeout并没有清楚上一次有值的timer
    this.timer = null;
    this.name = name;
    this.clearTime = null;
    // this.say();
    // return this;
  }
  say() {
    this.taskQuene.push(async () => {
      console.log('hi=', this.name);
    });
    return this.next();
  }
  next() {
    // let item = this.taskQuene;
    // console.log('task==', this.taskQuene);
    // while (item.length > 0) {
    //   let task = this.taskQuene.shift();
    //   await task();
    // }
    // return this;
    console.log('timer==', this.timer);
    clearTimeout(this.timer); // 利用了函数截流的思想，把之前准备执行任务队列取消掉，执行最后一致结尾的代码的任务队列
    this.timer = setTimeout(async () => {
      let item = this.taskQuene;
      console.log('task==', JSON.stringify(this.taskQuene));
      while (item.length > 0) {
        let task = item.shift();
        await task();
      }
    });
    console.log('timer 222==', this.timer);
    return this;
  }
  sleepFirst(time) {
    this.taskQuene.unshift(async () => this.sleepAsync('sleepFirst', time));
    return this.next();
  }
  eat(type) {
    this.taskQuene.push(async () => {
      console.log('eat==', type);
    });
    return this.next();
  }
  sleep(time) {
    this.taskQuene.push(async () => this.sleepAsync('after waker', time));
    return this.next();
  }
  sleepAsync(type, time) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log(type + ' ' + time);
        res();
      }, time * 100);
    });
  }
}
// LazyManTest('Hank').sleepFirst(100).eat('supper');
// LazyManTest('dd').sleep(50).eat('s');

class _LazyMan {
  constructor(name) {
    this.taskQueue = [];
    // this.sayHi();
    this.name = name;
    this.timer = null;
    this.sayHi();
  }
  // 每次调用时清楚timer，上一次设置的执行taskQueue就不会运行。
  // 重新设置timer,会在下一次调用完后进入执行。
  // 当所有调用结束后，就会顺利执行taskQueue队列里的事件
  next() {
    clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      // 执行taskQueue队列里的事件
      for (let i = 0; i < this.taskQueue.length; i++) {
        await this.taskQueue[i]();
      }
    });
    return this;
  }
  sayHi() {
    this.taskQueue.push(() => {
      console.log('Hi! This is ' + this.name);
    });
    return this.next();
  }
  eat(str) {
    this.taskQueue.push(() => {
      console.log('Eat ' + str);
    });
    return this.next();
  }
  beforSleep(time) {
    // unshift插入到事件的第一个
    this.taskQueue.unshift(() => this.sleepPromise(time));
    return this.next();
  }
  sleep(time) {
    this.taskQueue.push(() => this.sleepPromise(time));
    return this.next();
  }
  // sleep的Promise对象，用于给async/await来阻塞后续代码执行
  sleepPromise(time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('wake up after ' + time);
        resolve();
      }, time * 1000);
    });
  }
}

function LazyMan(name) {
  return new _LazyMan(name);
}
// LazyMan('Herry').beforSleep(5).eat('dinner').sleep(10).eat('check');

// console.log('ttttt');

LazyManTest('Herry').sleepFirst(5).eat('dinner').sleep(10).eat('check');
