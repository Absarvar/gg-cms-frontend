import Mock from 'mockjs2'
import { builder } from '../util'

const info = options => {
  console.log('options', options)
  const userInfo = {
    id: '4291d7da9005377ec9aec4a71ea837f',
    name: '天野远子',
    username: 'admin',
    password: '',
    avatar: '/avatar2.jpg',
    status: 1,
    telephone: '',
    lastLoginIp: '27.154.74.117',
    lastLoginTime: 1534837621348,
    creatorId: 'admin',
    createTime: 1497160610259,
    merchantCode: 'TLif2btpzg079h15bk',
    deleted: 0,
    roleId: 'admin',
    role: {}
  }
  // role
  const roleObj = {
    id: 'admin',
    name: '管理员',
    describe: '拥有所有权限',
    status: 1,
    creatorId: 'system',
    createTime: 1497160610259,
    deleted: 0,
    permissions: [
      {
        roleId: 'admin',
        permissionId: 'dashboard',
        permissionName: '总览',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'exception',
        permissionName: '异常页面权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'result',
        permissionName: '结果权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'profile',
        permissionName: '详细页权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'table',
        permissionName: '表格权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'import',
            describe: '导入',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'form',
        permissionName: '表单权限',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'order',
        permissionName: '订单管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'permission',
        permissionName: '权限管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'role',
        permissionName: '角色管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'table',
        permissionName: '桌子管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"query","defaultCheck":false,"describe":"查询"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'query',
            describe: '查询',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      },
      {
        roleId: 'admin',
        permissionId: 'user',
        permissionName: '用户管理',
        actions:
          '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
        actionEntitySet: [
          {
            action: 'add',
            describe: '新增',
            defaultCheck: false
          },
          {
            action: 'import',
            describe: '导入',
            defaultCheck: false
          },
          {
            action: 'get',
            describe: '详情',
            defaultCheck: false
          },
          {
            action: 'update',
            describe: '修改',
            defaultCheck: false
          },
          {
            action: 'delete',
            describe: '删除',
            defaultCheck: false
          },
          {
            action: 'export',
            describe: '导出',
            defaultCheck: false
          }
        ],
        actionList: null,
        dataAccess: null
      }
    ]
  }

  roleObj.permissions.push({
    roleId: 'admin',
    permissionId: 'support',
    permissionName: '超级模块',
    actions:
      '[{"action":"add","defaultCheck":false,"describe":"新增"},{"action":"import","defaultCheck":false,"describe":"导入"},{"action":"get","defaultCheck":false,"describe":"详情"},{"action":"update","defaultCheck":false,"describe":"修改"},{"action":"delete","defaultCheck":false,"describe":"删除"},{"action":"export","defaultCheck":false,"describe":"导出"}]',
    actionEntitySet: [
      {
        action: 'add',
        describe: '新增',
        defaultCheck: false
      },
      {
        action: 'import',
        describe: '导入',
        defaultCheck: false
      },
      {
        action: 'get',
        describe: '详情',
        defaultCheck: false
      },
      {
        action: 'update',
        describe: '修改',
        defaultCheck: false
      },
      {
        action: 'delete',
        describe: '删除',
        defaultCheck: false
      },
      {
        action: 'export',
        describe: '导出',
        defaultCheck: false
      }
    ],
    actionList: null,
    dataAccess: null
  })

  userInfo.role = roleObj
  return builder(userInfo)
}

/**
 * 使用 用户登录的 token 获取用户有权限的菜单
 * 返回结构必须按照这个结构体形式处理，或根据
 * /src/router/generator-routers.js  文件的菜单结构处理函数对应即可
 * @param {*} options
 * @returns
 */
const userNav = options => {
  const nav = [
    // dashboard
    {
      name: 'dashboard',
      parentId: 0,
      id: 1,
      meta: {
        icon: 'dashboard',
        title: '总览',
        show: true
      },
      component: 'RouteView',
      redirect: '/dashboard/workplace'
    },
    {
      name: 'workplace',
      parentId: 1,
      id: 7,
      meta: {
        title: '工作台',
        show: true
      },
      component: 'Workplace'
    },
    // {
    //   name: 'monitor',
    //   path: 'https://www.baidu.com/',
    //   parentId: 1,
    //   id: 3,
    //   meta: {
    //     title: '监控页（外部）',
    //     target: '_blank',
    //     show: true
    //   }
    // },
    {
      name: 'Analysis',
      parentId: 1,
      id: 2,
      meta: {
        title: '分析页',
        show: true
      },
      component: 'Analysis',
      path: '/dashboard/analysis'
    },

    // form
    {
      name: 'form',
      parentId: 0,
      id: 10,
      meta: {
        icon: 'form',
        title: '表单页'
      },
      redirect: '/form/base-form',
      component: 'RouteView'
    },
    {
      name: 'basic-form',
      parentId: 10,
      id: 6,
      meta: {
        title: '基础表单'
      },
      component: 'BasicForm'
    },
    {
      name: 'step-form',
      parentId: 10,
      id: 5,
      meta: {
        title: '分步表单'
      },
      component: 'StepForm'
    },
    {
      name: 'advanced-form',
      parentId: 10,
      id: 4,
      meta: {
        title: '高级表单'
      },
      component: 'AdvanceForm'
    },

    // list
    {
      name: 'list',
      parentId: 0,
      id: 10010,
      meta: {
        icon: 'table',
        title: '列表页',
        show: true
      },
      redirect: '/list/table-list',
      component: 'RouteView'
    },
    {
      name: 'table-list',
      parentId: 10010,
      id: 10011,
      path: '/list/table-list/:pageNo([1-9]\\d*)?',
      meta: {
        title: '查询表格',
        show: true
      },
      component: 'TableList'
    },
    {
      name: 'basic-list',
      parentId: 10010,
      id: 10012,
      meta: {
        title: '标准列表',
        show: true
      },
      component: 'StandardList'
    },
    {
      name: 'card',
      parentId: 10010,
      id: 10013,
      meta: {
        title: '卡片列表',
        show: true
      },
      component: 'CardList'
    },
    {
      name: 'search',
      parentId: 10010,
      id: 10014,
      meta: {
        title: '搜索列表',
        show: true
      },
      redirect: '/list/search/article',
      component: 'SearchLayout'
    },
    {
      name: 'article',
      parentId: 10014,
      id: 10015,
      meta: {
        title: '搜索列表（文章）',
        show: true
      },
      component: 'SearchArticles'
    },
    {
      name: 'project',
      parentId: 10014,
      id: 10016,
      meta: {
        title: '搜索列表（项目）',
        show: true
      },
      component: 'SearchProjects'
    },
    {
      name: 'application',
      parentId: 10014,
      id: 10017,
      meta: {
        title: '搜索列表（应用）',
        show: true
      },
      component: 'SearchApplications'
    },

    // profile
    {
      name: 'profile',
      parentId: 0,
      id: 10018,
      meta: {
        title: '详情页',
        icon: 'profile',
        show: true
      },
      redirect: '/profile/basic',
      component: 'RouteView'
    },
    {
      name: 'basic',
      parentId: 10018,
      id: 10019,
      meta: {
        title: '基础详情页',
        show: true
      },
      component: 'ProfileBasic'
    },
    {
      name: 'advanced',
      parentId: 10018,
      id: 10020,
      meta: {
        title: '高级详情页',
        show: true
      },
      component: 'ProfileAdvanced'
    },

    // result
    {
      name: 'result',
      parentId: 0,
      id: 10021,
      meta: {
        title: '结果页',
        icon: 'check-circle-o',
        show: true
      },
      redirect: '/result/success',
      component: 'PageView'
    },
    {
      name: 'success',
      parentId: 10021,
      id: 10022,
      meta: {
        title: '成功',
        hiddenHeaderContent: true,
        show: true
      },
      component: 'ResultSuccess'
    },
    {
      name: 'fail',
      parentId: 10021,
      id: 10023,
      meta: {
        title: '失败',
        hiddenHeaderContent: true,
        show: true
      },
      component: 'ResultFail'
    },

    // Exception
    {
      name: 'exception',
      parentId: 0,
      id: 10024,
      meta: {
        title: '异常页',
        icon: 'warning',
        show: true
      },
      redirect: '/exception/403',
      component: 'RouteView'
    },
    {
      name: '403',
      parentId: 10024,
      id: 10025,
      meta: {
        title: '403',
        show: true
      },
      component: 'Exception403'
    },
    {
      name: '404',
      parentId: 10024,
      id: 10026,
      meta: {
        title: '404',
        show: true
      },
      component: 'Exception404'
    },
    {
      name: '500',
      parentId: 10024,
      id: 10027,
      meta: {
        title: '500',
        show: true
      },
      component: 'Exception500'
    },

    // account
    {
      name: 'account',
      parentId: 0,
      id: 10028,
      meta: {
        title: '个人页',
        icon: 'user',
        show: true
      },
      redirect: '/account/center',
      component: 'RouteView'
    },
    {
      name: 'center',
      parentId: 10028,
      id: 10029,
      meta: {
        title: '个人中心',
        show: true
      },
      component: 'AccountCenter'
    },
    // 特殊三级菜单
    {
      name: 'settings',
      parentId: 10028,
      id: 10030,
      meta: {
        title: '个人设置',
        hideHeader: true,
        hideChildren: true,
        show: true
      },
      redirect: '/account/settings/basic',
      component: 'AccountSettings'
    },
    {
      name: 'BasicSettings',
      path: '/account/settings/basic',
      parentId: 10030,
      id: 10031,
      meta: {
        title: '基本设置',
        show: false
      },
      component: 'BasicSetting'
    },
    {
      name: 'SecuritySettings',
      path: '/account/settings/security',
      parentId: 10030,
      id: 10032,
      meta: {
        title: '安全设置',
        show: false
      },
      component: 'SecuritySettings'
    },
    {
      name: 'CustomSettings',
      path: '/account/settings/custom',
      parentId: 10030,
      id: 10033,
      meta: {
        title: '个性化设置',
        show: false
      },
      component: 'CustomSettings'
    },
    {
      name: 'BindingSettings',
      path: '/account/settings/binding',
      parentId: 10030,
      id: 10034,
      meta: {
        title: '账户绑定',
        show: false
      },
      component: 'BindingSettings'
    },
    {
      name: 'NotificationSettings',
      path: '/account/settings/notification',
      parentId: 10030,
      id: 10034,
      meta: {
        title: '新消息通知',
        show: false
      },
      component: 'NotificationSettings'
    },
    {
      name: 'basic-article',
      parentId: 0,
      id: 10035,
      meta: {
        title: '分销凭证',
        show: true
      },
      component: 'StandardArticle'
    },
    // {
    //   name: 'article-index',
    //   parentId: 0,
    //   id: 10036,
    //   meta: {
    //     title: '文章主页',
    //     show: true
    //   },
    //   component: 'ArticleIndex'
    // },
    // {
    //   name: 'article-list',
    //   parentId: 0,
    //   id: 10036,
    //   meta: {
    //     title: '文章列表',
    //     show: true
    //   },
    //   component: 'ArticleList'
    // },

    // {
    //   name: 'member-manage',
    //   parentId: 0,
    //   id: 20001,
    //   meta: {
    //     title: '会员管理',
    //     show: true
    //   },
    //   component: 'RouteView' // 菜单
    // },
    // {
    //   name: 'member-list',
    //   parentId: 20001,
    //   id: 20010,
    //   meta: {
    //     title: '会员列表',
    //     show: true
    //   },
    //   component: 'MemberList'
    // },

    // {
    //   name: 'goods-manage',
    //   parentId: 0,
    //   id: 20002,
    //   meta: {
    //     title: '商品管理',
    //     show: true
    //   },
    //   component: 'RouteView' // 菜单
    // },
    // {
    //   name: 'goods-list',
    //   parentId: 20002,
    //   id: 20020,
    //   meta: {
    //     title: '商品列表',
    //     show: true
    //   },
    //   component: 'GoodsList'
    // },

    // {
    //   name: 'stream-manage',
    //   parentId: 0,
    //   id: 20008,
    //   meta: {
    //     title: '流向管理',
    //     show: true
    //   },
    //   component: 'RouteView' // 菜单
    // },
    // {
    //   name: 'stream-list',
    //   parentId: 20008,
    //   id: 20080,
    //   meta: {
    //     title: '流向列表',
    //     show: true
    //   },
    //   component: 'StreamList'
    // },

    // {
    //   name: 'preorder-manage',
    //   parentId: 0,
    //   id: 20004,
    //   meta: {
    //     title: '预定订单管理',
    //     show: true
    //   },
    //   component: 'RouteView' // 菜单
    // },
    // {
    //   name: 'preorder-list',
    //   parentId: 20004,
    //   id: 20040,
    //   meta: {
    //     title: '预定订单列表',
    //     show: true
    //   },
    //   component: 'PreorderList'
    // },

    // {
    //   name: 'product-manage',
    //   parentId: 0,
    //   id: 20005,
    //   meta: {
    //     title: '产品管理',
    //     show: true
    //   },
    //   component: 'RouteView' // 菜单
    // },
    // {
    //   name: 'product-list',
    //   parentId: 20005,
    //   id: 20050,
    //   meta: {
    //     title: '产品列表',
    //     show: true
    //   },
    //   component: 'ProductList'
    // },

    // {
    //   name: 'purchase-manage',
    //   parentId: 0,
    //   id: 30001,
    //   meta: {
    //     title: '采购制单管理',
    //     show: true
    //   },
    //   component: 'RouteView' // 菜单
    // },
    // {
    //   name: 'purchase-list',
    //   parentId: 30001,
    //   id: 30010,
    //   meta: {
    //     title: '采购制单列表',
    //     show: true
    //   },
    //   component: 'PurchaseList'
    // },

    // {
    //   name: 'sampleTest-manage',
    //   parentId: 0,
    //   id: 20006,
    //   meta: {
    //     title: '抽样检测管理',
    //     show: true
    //   },
    //   component: 'RouteView' // 菜单
    // },
    // {
    //   name: 'sampleTest-list',
    //   parentId: 20006,
    //   id: 20060,
    //   meta: {
    //     title: '抽样检测列表',
    //     show: true
    //   },
    //   component: 'SampleTestList'
    // },

    // {
    //   name: 'flow-manage',
    //   parentId: 0,
    //   id: 30006,
    //   meta: {
    //     title: '流向统计管理',
    //     show: true
    //   },
    //   component: 'RouteView' // 菜单
    // },
    // {
    //   name: 'flow-list',
    //   parentId: 30006,
    //   id: 30060,
    //   meta: {
    //     title: '流向统计列表',
    //     show: true
    //   },
    //   component: 'FlowList'
    // },

    // {
    //   name: 'order-manage',
    //   parentId: 0,
    //   id: 30001,
    //   meta: {
    //     title: '用户订单管理',
    //     show: true
    //   },
    //   component: 'RouteView' // 菜单
    // },
    // {
    //   name: 'order-list',
    //   parentId: 30001,
    //   id: 30010,
    //   meta: {
    //     title: '用户订单列表',
    //     show: true
    //   },
    //   component: 'OrderList'
    // },

    {
      name: 'goods-manage',
      parentId: 0,
      id: 20000,
      meta: {
        title: '交易中心管理',
        show: true
      },
      component: 'RouteView' // 菜单
    },

    {
      name: 'goods-list',
      parentId: 20000,
      id: 20011,
      meta: {
        title: '商品管理',
        show: true
      },
      component: 'GoodsList'
    },
    {
      name: 'coldStore-list',
      parentId: 20000,
      id: 20021,
      meta: {
        title: '冷库管理',
        show: true
      },
      component: 'ColdStoreList'
    },

    {
      name: 'comSource-manage',
      parentId: 20000,
      id: 20030,
      meta: {
        title: '信息管理',
        show: true
      },
      component: 'RouteView' // 菜单
    },
    {
      name: 'announcement-list',
      parentId: 20030,
      id: 20031,
      meta: {
        title: '公告发布',
        show: true
      },
      component: 'AnnouncementList'
    },
    {
      name: 'priceSource-list',
      parentId: 20030,
      id: 20032,
      meta: {
        title: '源头自提价',
        show: true
      },
      component: 'PriceSourceList'
    },
    {
      name: 'priceGG-list',
      parentId: 20030,
      id: 20033,
      meta: {
        title: '供广参考价',
        show: true
      },
      component: 'PriceGGList'
    },
    {
      name: 'comSource-list',
      parentId: 20030,
      id: 20034,
      meta: {
        title: '源头企业列表',
        show: true
      },
      component: 'ComSourceList'
    },
    {
      name: 'comClient-list',
      parentId: 20030,
      id: 20035,
      meta: {
        title: '客户企业列表',
        show: true
      },
      component: 'ComClientList'
    },
    {
      name: 'agreement-list',
      parentId: 20030,
      id: 20036,
      meta: {
        title: '服务协议列表',
        show: true
      },
      component: 'AgreementList'
    },

    {
      name: 'sales-manage',
      parentId: 20000,
      id: 20040,
      meta: {
        title: '销售管理',
        show: true
      },
      component: 'RouteView' // 菜单
    },

    {
      name: 'preorder-list',
      parentId: 20040,
      id: 20041,
      meta: {
        title: '预定信息列表',
        show: true
      },
      component: 'PreorderList'
    },
    {
      name: 'enterApply-list?status=0',
      parentId: 20040,
      id: 20042,
      meta: {
        title: '入场申报列表',
        show: true
      },
      component: 'EnterApplyList'
    },

    {
      name: 'purchaseOrder-list',
      parentId: 20040,
      id: 20043,
      meta: {
        title: '采购制单列表',
        show: true
      },
      component: 'PurchaseOrderList'
    },

    {
      name: 'ground-manage',
      parentId: 20000,
      id: 20050,
      meta: {
        title: '现场管理',
        show: true
      },
      component: 'RouteView' // 菜单
    },
    {
      name: 'enterRecheck-list',
      // path: '/goods-manage/sales-manage/enterApply-list/:status=1',
      parentId: 20050,
      id: 20051,
      meta: {
        title: '理货入库',
        show: true
      },
      component: 'PrepareInstockList'
    },
    {
      name: 'productInstock',
      // path: '/goods-manage/sales-manage/enterApply-list/:status=1',
      parentId: 20050,
      id: 20059,
      meta: {
        title: '入库页面',
        show: false
      },
      component: 'ProductInstock'
    },
    {
      name: 'pdProduct-list',
      parentId: 20050,
      id: 20052,
      meta: {
        title: '入库记录',
        show: true
      },
      component: 'PdProductList'
    },
    {
      name: 'outStock-list',
      parentId: 20050,
      id: 20054,
      meta: {
        title: '出库记录',
        show: true
      },
      component: 'OutStockList'
    },
    {
      name: 'sourceTrack-list',
      parentId: 20050,
      id: 20055,
      meta: {
        title: '商品溯源列表',
        show: true
      },
      component: 'SourceTrackList'
    },
    {
      name: 'saleOrder-list',
      parentId: 20050,
      id: 20056,
      meta: {
        title: '送货单列表',
        show: true
      },
      component: 'SaleOrderList'
    },

    {
      name: 'anitest-manage',
      parentId: 0,
      id: 30000,
      meta: {
        title: '动检中心',
        show: true
      },
      component: 'RouteView' // 菜单
    },

    {
      name: 'apply-manage',
      parentId: 30000,
      id: 30010,
      meta: {
        title: '申报管理',
        show: true
      },
      component: 'RouteView' // 菜单
    },
    {
      name: 'farm-list',
      parentId: 30010,
      id: 30011,
      meta: {
        title: '养殖场列表',
        show: true
      },
      component: 'FarmList'
    },
    {
      name: 'slaughterHouse-list',
      parentId: 30010,
      id: 30012,
      meta: {
        title: '屠宰场列表',
        show: true
      },
      component: 'SlaughterHouseList'
    },
    {
      name: 'test-list',
      parentId: 30000,
      id: 30020,
      meta: {
        title: '检验管理',
        show: true
      },
      component: 'RouteView' // 菜单
    },
    {
      name: 'sampleTest-list',
      parentId: 30020,
      id: 30021,
      meta: {
        title: '抽样检测列表',
        show: true
      },
      component: 'SampleTestList'
    },
    {
      name: 'harmlessfy-list',
      parentId: 30020,
      id: 30022,
      meta: {
        title: '无害化列表',
        show: true
      },
      component: 'HarmlessfyList'
    },
      {
        name: 'sellTicket-manage',
        parentId: 30000,
        id: 30030,
        meta: {
          title: '出票管理',
          show: true
        },
        component: 'RouteView' // 菜单
      },

    {
      name: 'sellTicket-list',
      parentId: 30030,
      id: 30031,
      meta: {
        title: '出票列表',
        show: true
      },
      component: 'SellTicketList'
    },

      {
        name: 'enterApply2-manage',
        parentId: 30000,
        id: 30040,
        meta: {
          title: '入场管理',
          show: true
        },
        component: 'RouteView' // 菜单
      },
    {
      name: 'enterReg-list?status=1&statusok=0',
      parentId: 30040,
      id: 30041,
      meta: {
        title: '入场登记',
        show: true
      },
      component: 'EnterRegList'
    },
    {
      name: 'enterRecheck-list?status=1&statusok=1',
      // path: '/goods-manage/sales-manage/enterApply-list/:status=1',
      query: { 'status': 1 },
      mdl: { 'status': 1, 'statusok': '1' },
      model: { 'status': 1, 'statusok': '1' },
      parentId: 30040,
      id: 30042,
      meta: {
        title: '地磅复秤',
        show: true
      },
      component: 'EnterRecheckList'
    },

      {
        name: 'flowDirection-manage',
        parentId: 30000,
        id: 30050,
        meta: {
          title: '流向地址管理',
          show: true
        },
        component: 'RouteView' // 菜单
      },
    {
      name: 'flowDirection-list',
      parentId: 30050,
      id: 30051,
      meta: {
        title: '流向地址列表',
        show: true
      },
      component: 'FlowDirectionList'
    }

    // {
    //   name: 'saleOrderDetail-list',
    //   parentId: 0,
    //   id: 60009,
    //   meta: {
    //     title: '订单明细列表',
    //     show: true
    //   },
    //   component: 'SaleOrderDetailList'
    // }

  ]
  const json = builder(nav)
  console.log('json', json)
  return json
}

Mock.mock(/\/api\/user\/info/, 'get', info)
Mock.mock(/\/api\/user\/nav/, 'get', userNav)
