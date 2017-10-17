const Title = '通用后台系统'

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

const Main = resolve => require(['components/Main'], resolve)
const Login = resolve => require(['views/login'], resolve)
const Index = {
  path: 'index',
  component: resolve => require(['views/index'], resolve)
}
const Product = {
  path: 'product',
  component: resolve => require(['views/product/index'], resolve),
  children: [
    {
      path: 'list',
      component: resolve => require(['views/product/list'], resolve),
      meta: {
        title: '产品列表'
      }
    },
    {
      path: 'detail',
      component: resolve => require(['views/product/detail'], resolve),
      meta: {
        title: '产品底层'
      }
    }
  ]
}
const Demo = {
  path: 'demo',
  component: resolve => require(['views/demo/index'], resolve),
  children: [
    {
      path: 'dialog',
      component: resolve => require(['views/demo/dialog'], resolve),
      meta: {
        title: '弹出层示例'
      }
    },
    {
      path: 'form',
      component: resolve => require(['views/demo/form'], resolve),
      meta: {
        title: '表单'
      }
    },
    {
      path: 'cool',
      component: resolve => require(['views/demo/cool'], resolve),
      meta: {
        title: '效果'
      }
    }
  ]
}
const RouterConfig = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      title: ''
    },
    children: [].concat([], Product, Demo, Index),
    redirect: '/product/list'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  }
]
export {Title, MenuConfig, RouterConfig}
