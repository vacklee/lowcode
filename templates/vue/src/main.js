import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ComponentInstall from './components/register'
import './styles/base.css'

const app = createApp(App).use(router).use(ComponentInstall)

app.mount('#app')
