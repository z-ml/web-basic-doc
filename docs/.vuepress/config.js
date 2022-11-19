import {
  defineUserConfig,
  defaultTheme
} from 'vuepress'

import {
  navbar,
  sidebar,
  plugins
} from './configs'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '前端框架文档',
  description: '即插即用的框架',
  port: 8889,
  head: [
    ['link', {
      rel: 'icon',
      href: '..//logo.png'
    }]
  ],
  markdown: {
    lineNumbers: true, // 显示代码块的行号
    extractHeaders: ['h2', 'h3', 'h4', 'h5', 'h6'], // 提取标题到侧边栏的级别，默认['h2', 'h3']
  },
  plugins: plugins,
  theme: defaultTheme({
    navbar,
    sidebar,
    sidebarDepth: 1,
  }),

})