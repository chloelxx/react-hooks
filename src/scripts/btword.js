/***
 * bt 公司牛客网上的面试笔试题集
 */
// 数组扁平化
// fn(
//   [
//     ['a', 'b'],
//     ['n', 'm'],
//     ['0', '1'],
//   ],
//   []
// );
// 输出如下结果： ['an0', 'am0', 'an1', 'am1', 'bn0', 'bm0', 'bn1', 'bm0']
function fn(arr, initData) {
  arr.reduce((init, cur) => {
    console.log('init==', init);
    return init.concat(Array.isArray(cur) ? fn(cur, init) : cur);
  }, initData);
  //   return initData;
}
console.log(
  'ddd==',
  fn(
    [
      ['a', 'b'],
      ['n', 'm'],
      ['0', '1'],
    ],
    []
  )
);
