export const navbar = [
  {
    text: '指南',
    children: [
      {
        text: '介绍',
        link: '/guide/introduction/',
      },
      {
        text: '开始',
        link: '/guide/start/',
      },
      {
        text: '目录结构',
        link: '/guide/catalogue/',
      },
      {
        text: '项目配置',
        link: '/guide/config/',
      },
      {
        text: '路由和菜单',
        link: '/guide/routerMenu/',
      },
      {
        text: 'git 相关',
        link: '/guide/git/',
      },
      {
        text: 'http请求',
        link: '/guide/request/',
      },
      {
        text: '进阶',
        children: [
          {
            text: '图标',
            link: '/guide/icon/',
          },
          {
            text: '换肤',
            link: '/guide/theme/',
          },
          {
            text: 'RABC权限',
            link: '/guide/RABC/',
          },
          {
            text: '授权（待更新）',
            link: '/guide/auth/',
          },
          {
            text: '函数工具库',
            link: '/guide/utils/',
          },
        ],
      },
      {
        text: '其他',
        children: [
          {
            text: '常见问题',
            link: '/guide/FAQ/',
          },
        ],
      },
    ],
  },
  {
    text: '文档',
    children: [
      {
        text: '介绍',
        link: '/component-document/introduction/',
      },
      {
        text: '目录结构',
        link: '/component-document/catalogue/',
      },
    ],
  },
]
