import { AppData } from '../data/app'
import { ExporterVue } from '../exporters/exporter-vue'
import { Exporter } from '../exporters/types'

export enum ExportType {
  VUE = 'VUE',
  REACT = 'REACT',
  WX_MINI = 'WX_MINI',
  UNIAPP = 'UNIAPP'
}

export type ExportOption = {
  id: ExportType
  title: string
  exporter?: Exporter
  default?: boolean
}

export const exportOptions: ExportOption[] = [
  {
    id: ExportType.VUE,
    title: 'Vue源码（H5/PC）',
    exporter: ExporterVue,
    default: true
  }
  // ,{
  //   id: ExportType.REACT,
  //   title: 'React源码（H5/PC）'
  // },
  // {
  //   id: ExportType.WX_MINI,
  //   title: '微信小程序源码'
  // },
  // {
  //   id: ExportType.UNIAPP,
  //   title: 'Uniapp源码（H5/小程序）'
  // }
]

export async function exports(
  configs: Array<{ type: ExportType }>,
  appData: AppData
) {
  await configs.reduce(async (_, config) => {
    await _
    await exportItem(config.type, appData)
  }, Promise.resolve())
}

export async function exportItem(type: ExportType, appData: AppData) {
  const typeOption = exportOptions.find(item => item.id === type)
  const exporter = typeOption?.exporter

  if (!exporter) {
    return
  }

  await exporter(appData)
}
