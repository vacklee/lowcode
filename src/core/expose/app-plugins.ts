import { App } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

export default function appPlugins(app: App) {
  return app.use(ElementPlus, {
    locale: zhCn
  })
}
