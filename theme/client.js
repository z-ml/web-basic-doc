import { defineClientConfig } from '@vuepress/client'
import pkg from 'view-ui-plus'
const { Button } = pkg
import 'view-ui-plus/dist/styles/viewuiplus.css'
import Layout from './layouts/Layout.vue'
import { setupSidebarItems } from './hooks/index.js'
export default defineClientConfig({
  layouts: {
    Layout,
  },
  enhance({ app, router }) {
    app.component('Button', Button)
  },
  setup() {
    setupSidebarItems()
  },
  rootComponents: [],
})
