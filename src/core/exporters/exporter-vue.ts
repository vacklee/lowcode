import JSZip from 'jszip'
import axios from 'axios'
import { defineExporter } from './types'
import { renderEJS } from './render'

export const ExporterVue = defineExporter(async appData => {
  const templateZipFile = await axios.get(
    `${import.meta.env.BASE_URL}templates/vue.zip`,
    {
      responseType: 'blob'
    }
  )

  const zip = new JSZip()
  await zip.loadAsync(templateZipFile.data)

  const outputZip = new JSZip()

  await Object.keys(zip.files).reduce(async (_, fileKey) => {
    await _
    const fileInfo = zip.files[fileKey]
    if (fileInfo.dir) {
      outputZip.folder(fileKey)
      return
    }

    if (/\.ejs$/.test(fileKey)) {
      const content = await fileInfo.async('text')
      const renderContent = await renderEJS(content, appData)
      outputZip.file(fileKey.replace(/\.ejs$/, ''), renderContent)
      return
    }

    const blob = await fileInfo.async('blob')
    outputZip.file(fileKey, blob)
  }, Promise.resolve())

  const outputBlob = await outputZip.generateAsync({ type: 'blob' })
  const outputFileName = `${appData.basicInfo.name}_vue源码.zip`
  const outputFile = new File([outputBlob], outputFileName)

  return outputFile
})
