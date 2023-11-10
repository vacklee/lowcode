import { createApp, ref, watch, toRaw } from 'vue'
import { AppData } from '../data/app'
import AppContainer from '../components/AppContainer.vue'
import appPlugins from './app-plugins'
import { debounce } from 'lodash'
import { setStorage } from '../features/storage'

export type CreateContainerParams = {
  el: HTMLElement
  appData: AppData
}

export default function createContainer(params: CreateContainerParams) {
  const appData = ref(params.appData)
  const app = createApp(AppContainer)

  app.config.globalProperties.appData = appData
  app.use(appPlugins)

  watch(
    appData,
    debounce(() => {
      setStorage('testData', toRaw(appData.value))
    }, 500),
    { deep: true }
  )

  app.mount(params.el)
}
