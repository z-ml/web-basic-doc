import {
  defineClientConfig
} from '@vuepress/client'
import pkg from 'view-ui-plus';
const {
  Button
} = pkg;
import 'view-ui-plus/dist/styles/viewuiplus.css'
export default defineClientConfig({
  enhance({
    app,
    router
  }) {
    app.component('Button', Button)
  },
  setup() {},
  rootComponents: [],
})