import { defineExporter } from './exporter'

export type ZipTemplateConfig = {
  pageFileName: string
  pageFileTemplate: string
  ignores: string[]
}

export const ExporterVue = defineExporter({
  template: 'vue',
  outputFileSuffix: '_vue源码'
})
