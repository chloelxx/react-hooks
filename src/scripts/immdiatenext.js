function _LazyMan(name) {
  this.tasks = [];
  var self = this;
  this.sayHi(name);
  setTimeout(function () {
    self.next();
  }, 0); // 在下一个事件循环启动任务
}
/* 事件调度函数 */
_LazyMan.prototype.sayHi = function (name) {
  let that = this;
  this.tasks.push(() => {
    console.log('Hi! This is ' + name + '!');
    that.next();
  });
};
_LazyMan.prototype.next = function () {
  var fn = this.tasks.shift();
  fn && fn();
};
_LazyMan.prototype.eat = function (name) {
  var self = this;
  this.tasks.push(() => {
    console.log('Eat ' + name + '~');
    self.next();
  });
  return this; // 实现链式调用
};
_LazyMan.prototype.sleep = function (time) {
  var self = this;
  this.tasks.push(() => {
    setTimeout(function () {
      console.log('Wake up after ' + time + 's!');
      self.next();
    }, time * 1000);
  });
  return this;
};
_LazyMan.prototype.sleepFirst = function (time) {
  var self = this;
  this.tasks.unshift(() =>
    setTimeout(function () {
      console.log('sleepFirst ' + time + 's!');
      self.next();
    }, time * 1000)
  );
  return this;
};
/* 封装 */
function LazyMan(name) {
  return new _LazyMan(name);
}
LazyMan('Hank').sleepFirst(5).eat('supper').sleep(3).eat('dd');
