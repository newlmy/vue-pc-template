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
  },
  {
    text: '产品',
    icon: 'el-icon-message',
    link: '/product/list',
    sunData: [
      {
        text: '产品列表',
        link: '/product/list'
      },
      {
        text: '产品子选项',
        link: '/product/detail'
      }
    ]
  },
  {
    text: 'Demo',
    icon: 'el-icon-message',
    link: '/demo/dialog',
    sunData: [
      {
        text: '弹出框',
        link: '/demo/dialog'
      },
      {
        text: '表单',
        link: '/demo/form'
      },
      {
        text: '效果',
        link: '/demo/cool'
      }
    ]
  }
]
const RouterConfig = [
  {
    path: '/',
    component: resolve => require(['views/test/index'], resolve),
    meta: {
      title: '大脑入口'
    },
    children: []
  },
  {
    path: '/test',
    meta: {
      title: '工具测试'
    },
    component: resolve => require(['views/test/index1'], resolve)
  }
]
export {Title, MenuConfig, RouterConfig}
