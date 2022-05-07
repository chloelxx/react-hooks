export const menu = [
  {
    title: 'reactApi',
    path: '/study',
    children: [
      { title: 'main', path: '/study/main', id: 'main', value: 'main' },
      { title: 'useref', path: '/study/useref', id: 'useref', value: 'useref' },
      { title: 'useref2', path: '/study/use/useref2', id: 'useref2', value: 'useref2' },
    ],
  },
  {
    title: 'errorBoundary',
    path: '',
    children: [
      { title: '用例1', path: '/study/errorbounary', id: 'errorbounary1', value: 'errorbounary1' },
      { title: '用例2', path: '/study/errorbounary2', id: 'errorbounary2', value: 'errorbounary2' },
      { title: '用例3', path: '/study/errorbounary3', id: 'errorbounary3', value: 'errorbounary3' },
      { title: '用例4', path: '/study/errorbounary4', id: 'errorbounary4', value: 'errorbounary1' },
      { title: '用例5', path: '/study/errorbounary5', id: 'errorbounary5', value: 'errorbounary5' },
      { title: 'useErrorBoundary用例', path: '/study/useerrorbounary', id: 'useerrorbounary', value: 'errorbounary6' },
    ],
  },
];
