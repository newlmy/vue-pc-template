const Title = 'AI大脑'

const MenuConfig = [
  {
    text: '任务汇总',
    icon: 'ali-icon-renwu',
    link: '/product/list',
    sunData: [
      {
        text: '统计',
        link: '/index'
      }
    ]
  }
]
const RouterConfig = [
  {
    path: '/',
    component: resolve => require(['views/polygon/index'], resolve),
    meta: {
      title: '区块'
    },
    children: []
  },
  {
    path: '/test',
    component: resolve => require(['views/test/index'], resolve),
    meta: {
      title: '大脑入口'
    }
  },
  {
    path: '/polygon/paper',
    component: resolve => require(['views/polygon/paper'], resolve),
    meta: {
      title: '多边形'
    }
  }
]
export {Title, MenuConfig, RouterConfig}
