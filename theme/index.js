import { getDirname, path } from '@vuepress/utils'
import { defaultTheme } from '@vuepress/theme-default'

const __dirname = getDirname(import.meta.url)

export const zmlTheme = (options) => {
  // 返回一个主题对象
  return {
    name: 'vuepress-theme-zml',

    // 主题的客户端配置文件的路径
    clientConfigFile: path.resolve(__dirname, 'client.js'),

    // 使用插件
    plugins: [
      // ...
    ],

    // 其他的插件 API 也都可用
    // 继承默认主题
    extends: defaultTheme(options),
  }
}

