import JSZip from 'jszip'
import axios from 'axios'
import { defineExporter } from './types'
import { renderEJS } from './render'
import { minimatch } from 'minimatch'
import { generatNode } from '../utils/teleport'
import { createBodyNode } from '../hooks/use-page-node'
import { camelCase } from 'lodash'

const _upCamelCase = (str: string) =>
  camelCase(str).replace(/^./, re => re.toUpperCase())

export type ZipTemplateConfig = {
  pageFileName: string
  pageFileTemplate: string
  ignores: string[]
}

export const ExporterVue = defineExporter(async appData => {
  const templateZipFile = await axios.get(
    `${import.meta.env.BASE_URL}templates/vue.zip`,
    {
      responseType: 'blob'
    }
  )

  const zip = new JSZip()
  await zip.loadAsync(templateZipFile.data)

  /** 前置工作 */
  const configs: ZipTemplateConfig = JSON.parse(
    await zip.file('.zip.config.json')!.async('text')
  )

  const outputZip = new JSZip()
  const renderData = {
    $pages: appData.pages.map(page => {
      const pageName = _upCamelCase(page.id)
      const groupName = _upCamelCase(page.groupdId)

      return {
        $: page,
        pageId: page.id,
        pageName,
        groupId: page.groupdId,
        groupName,
        node: generatNode(createBodyNode(page))!,
        outputPath: groupName
          ? `${groupName}/${pageName}/${pageName}`
          : `${pageName}/${pageName}`
      }
    })
  }

  /** 直接复制 */
  await Object.keys(zip.files).reduce(async (_, fileKey) => {
    await _
    if (configs.ignores.some(rule => minimatch(fileKey, rule))) {
      return
    }

    const fileInfo = zip.files[fileKey]
    if (fileInfo.dir) {
      outputZip.folder(fileKey)
      return
    }

    if (/\.ejs$/.test(fileKey)) {
      const content = await fileInfo.async('text')
      const renderContent = await renderEJS(content, appData, renderData)
      outputZip.file(fileKey.replace(/\.ejs$/, ''), renderContent)
      return
    }

    const blob = await fileInfo.async('blob')
    outputZip.file(fileKey, blob)
  }, Promise.resolve())

  /** 生成页面 */
  const pageTemplateContent = await zip
    .file(configs.pageFileTemplate)!
    .async('text')

  await renderData.$pages.reduce(async (_, page) => {
    await _
    const result = await renderEJS(pageTemplateContent, appData, {
      ...renderData,
      ...page
    })

    const outputFileKey = configs.pageFileName.replace(
      /\{name\}/g,
      page.outputPath
    )

    outputZip.file(outputFileKey, result)
    console.log({ result, page })
  }, Promise.resolve())

  const outputBlob = await outputZip.generateAsync({ type: 'blob' })
  const outputFileName = `${appData.basicInfo.name}_vue源码.zip`
  const outputFile = new File([outputBlob], outputFileName)

  console.log({ outputZip, outputFile })

  return outputFile
  // return null
})
