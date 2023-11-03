import JSZip from 'jszip'
// import { saveAs } from 'file-saver'
import { AppData } from '../data/app'
import { ExporterVue } from '../exporters/exporter-vue'
import { defineExporter } from '../exporters/exporter'

export enum ExportType {
  VUE = 'VUE',
  REACT = 'REACT',
  WX_MINI = 'WX_MINI',
  UNIAPP = 'UNIAPP'
}

export type ExportOption = {
  id: ExportType
  title: string
  exporter?: ReturnType<typeof defineExporter>
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
  const files: File[] = []
  await configs.reduce(async (_, config) => {
    await _
    const file = await exportItem(config.type, appData)
    if (file instanceof File) {
      files.push(file)
    }
  }, Promise.resolve())

  let downloadFile = files[0]
  if (files.length > 1) {
    const zip = new JSZip()
    files.forEach(item => zip.file(item.name, item))
    const blob = await zip.generateAsync({ type: 'blob' })
    downloadFile = new File([blob], `${appData.basicInfo.name}.zip`)
  }

  if (downloadFile) {
    // saveAs(downloadFile)
  }
}

export async function exportItem(type: ExportType, appData: AppData) {
  const typeOption = exportOptions.find(item => item.id === type)
  const exporter = typeOption?.exporter

  if (!exporter) {
    return
  }

  return exporter(appData)
}
