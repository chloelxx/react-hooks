/**
 * 用js实现一个lazy
 */
// LazyMan('dd').sleep(20).eat('s');
// LazyMan('chloexx').eat('dinner').eat('supper');
function LazyMan(name) {
  return new _LazyMan(name);
}
function _LazyMan(name) {
  this.name = name;
  this.task = [];
  this.timer = null;
  this.say();
  setTimeout(() => {
    this.next();
  }, 0); // 在下一个事件循环启动任务
}

_LazyMan.prototype = {
  constructor: _LazyMan,
  say: function () {
    this.task.push(() => {
      console.log('hi=', this.name);
      this.next();
    });
    return this;
  },
  next: function () {
    console.log('task==', this.task);
    if (this.task.length > 0) {
      let task = this.task.shift();
      task();
    }
    return this;
  },
  sleep: function (time) {
    this.task.push(() => this.promiseSleep('sleep', time));
    return this;
    // this.next();
  },
  promiseSleep: function (type, time) {
    setTimeout(() => {
      console.log(type + '=' + time);
      this.next();
    }, time * 1000);
  },
  sleepFirst: function (time) {
    this.task.unshift(() => this.promiseSleep('sleepFirst', time));
    return this;
  },
  eat: function (eat) {
    this.task.push(() => {
      console.log('eat=', eat);
      this.next();
    });
    return this;
  },
};
LazyMan('hxp').sleep(2).eat('supper');
// LazyMan('chloexx').sleepFirst(2.5).eat('dinner').sleep(5).eat('supper');
