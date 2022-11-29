export const sidebar = {
  '/guide/': [
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
        '/guide/request/',
      ],
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
        '/guide/RABC/',
        '/guide/auth/',
        '/guide/utils/',
      ],
    },
    {
      text: '其他问题',
      children: ['/guide/FAQ/'],
    },
  ],
  '/component-document/': [
    {
      text: '文档',
      children: [
        '/component-document/introduction/',
        '/component-document/catalogue/',
      ],
    },
  ],
}
