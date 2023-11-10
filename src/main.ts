import createAppData from './core/data/app'
import createContainer from './core/expose/create-container'
import './styles/base.scss'
import './styles/iconfont/style.css'
import './styles/ticon/style.css'
import 'virtual:svg-icons-register'
import './styles/element/index.scss'
import { getStorage } from './core/features/storage'

createContainer({
  el: document.querySelector('#app')!,
  appData: getStorage('testData') || createAppData()
})
