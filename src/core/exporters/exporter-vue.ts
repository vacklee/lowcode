import { defineExporter } from './types'

export const ExporterVue = defineExporter(async appData => {
  console.log('ExporterVue', { appData })
  return null
})
