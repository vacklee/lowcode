import { defineAsyncComponent } from 'vue'

const entries = import.meta.glob('./*.vue')

export default function ComponentInstall(app) {
  Object.keys(entries).forEach(key => {
    const [, name] = key.match(/^\.\/(\S+)\.vue$/)
    app.component(name, defineAsyncComponent(entries[key]))
  })
}
