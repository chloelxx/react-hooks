// 实现一个lazyman
/**
 * lazyMan('name').eat('lunch').sleep(2).eat('dinner')
 * */
function lazyMan(name) {
  console.log('hi ' + name);
  return {
    eat: function (eatType) {
      console.log('eat ' + eatType);
      return {
        sleep: function (time) {
          console.log('sleep ' + time);
          return {
            eat: function (type) {
              console.log('eat ' + type);
            },
          };
        },
      };
    },
  };
}

// lazyMan('name').eat('lunch').sleep(2).eat('dinner');
/** 
 * 追加实现 sleepFirst  
lazyMan('name').sleepFirst(5).eat('breakfast');
输出：sleep 5s
...wait 5s
hi name
eat breakfast
*/
// lazyWoman('name').sleepFirst(5).eat('breakfast');
function lazyWoman(name) {
  console.log('hi' + name);
  return {
    sleepFirst: function () {
      return {
        eat: function () {},
      };
    },
  };
}
// js函数切面编程
Function.prototype.before = function (cb) {
  let context = this;
  return function () {
    cb();
    context();
  };
};
Function.prototype.after = function (cb) {
  let context = this;
  context();
  cb();
  return function () {};
};
function aop() {
  console.log('aop');
}
aop
  .before(function () {
    console.log('before');
  })
  .after(function () {
    console.log('after');
  });
