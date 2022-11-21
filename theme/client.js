import { defineClientConfig } from '@vuepress/client'
import pkg from 'view-ui-plus'
const { Button } = pkg
import 'view-ui-plus/dist/styles/viewuiplus.css'
import rightMenu from './components/rightMenu.vue'
import Layout from './layouts/Layout.vue'
export default defineClientConfig({
  layouts: {
    Layout,
  },
  enhance({ app, router }) {
    app.component('Button', Button)
    app.component('rightMenu', rightMenu)
  },
  setup() {},
  rootComponents: [],
})
