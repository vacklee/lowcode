import { createApp, ref } from 'vue'
import ElementPlus from 'element-plus'
import { AppData } from '../data/app'
import AppContainer from '../components/AppContainer.vue'

export type CreateContainerParams = {
  el: HTMLElement
  appData: AppData
}

export default function createContainer(params: CreateContainerParams) {
  const appData = ref(params.appData)
  const app = createApp(AppContainer)

  app.config.globalProperties.appData = appData
  app.use(ElementPlus)

  app.mount(params.el)
}
