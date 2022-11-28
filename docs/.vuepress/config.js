import { defineUserConfig } from 'vuepress'
import { customTheme } from '../../theme'
export default defineUserConfig({
  lang: 'zh-CN',
  title: '前端框架文档',
  description: '即插即用的框架',
  port: 8889,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '..//logo.png',
      },
    ],
  ],
  theme: customTheme(),
})
