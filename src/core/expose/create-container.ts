import { createApp, ref } from 'vue'
import { AppData } from '../data/app'
import AppContainer from '../components/AppContainer.vue'
import appPlugins from './app-plugins'

export type CreateContainerParams = {
  el: HTMLElement
  appData: AppData
}

export default function createContainer(params: CreateContainerParams) {
  const appData = ref(params.appData)
  const app = createApp(AppContainer)

  app.config.globalProperties.appData = appData
  app.use(appPlugins)

  app.mount(params.el)
}
