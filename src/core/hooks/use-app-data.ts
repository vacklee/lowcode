import { computed, getCurrentInstance } from 'vue'
import { AppData } from '../data/app'

export default function useAppData() {
  const instance = getCurrentInstance()
  return computed<AppData>(
    () => instance?.appContext.app.config.globalProperties.appData
  )
}
