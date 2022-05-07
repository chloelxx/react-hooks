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
}

_LazyMan.prototype = {
  constructor: _LazyMan,
  say: function () {
    this.task.push(() => {
      console.log('hi=', this.name);
    });
    return this.next();
  },
  next: function () {
    console.log('timer==', this.timer);
    clearTimeout(this.timer);
    this.timer = setTimeout(async () => {
      while (this.task.length > 0) {
        let t = this.task.shift();
        await t();
      }
    });
    return this;
  },
  sleep: function (time) {
    this.task.push(() => this.promiseSleep('sleep', time));
    return this.next();
  },
  promiseSleep: function (type, time) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log(type + '=' + time);
        res();
      }, time * 1000);
    });
  },
  sleepFirst: function (time) {
    this.task.unshift(() => this.promiseSleep('sleepFirst', time));
    return this.next();
  },
  eat: function (eat) {
    this.task.push(() => {
      console.log('eat=', eat);
    });
    return this.next();
  },
};
// LazyMan('hxp').sleep(2).eat('supper');
LazyMan('chloexx').sleepFirst(5).eat('dinner').sleep(10).eat('supper');
