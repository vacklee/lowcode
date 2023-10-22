import { App } from 'vue'
import ElementPlus from 'element-plus'

export default function appPlugins(app: App) {
  return app.use(ElementPlus)
}
