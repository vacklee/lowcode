import axios from 'axios'
import JSZip from 'jszip'
import { minimatch } from 'minimatch'
import { AppData } from '../data/app'
import { createZipHelper } from '../utils/zip-helper'
import { createRenderData } from './data'
import { createEJS } from '../utils/ejs-helper'

const DEFAULT_CONFIG_FILE = '.zip.config.json'

export type ExporterOptions = {
  template: string
  configFile?: string
  outputFileSuffix?: string
}

export type TemplateConfig = {
  pageFileName?: string
  pageFileTemplate?: string
  ignores?: []
}

export function defineExporter(opts: ExporterOptions) {
  return async (appData: AppData) => {
    const { BASE_URL } = import.meta.env
    const configFile = opts.configFile || DEFAULT_CONFIG_FILE

    const templateUrl = `${BASE_URL}templates/${opts.template}.zip`
    const { data: zipBlob } = await axios.get(templateUrl, {
      responseType: 'blob'
    })

    const templateZip = new JSZip()
    const helper = createZipHelper(templateZip)

    await templateZip.loadAsync(zipBlob)
    const templateConfig: TemplateConfig | undefined = helper.exist(configFile)
      ? await helper.readAsJson(configFile)
      : void 0

    const outputZip = new JSZip()
    const renderData = await createRenderData(appData)
    const ejs = createEJS(templateZip, renderData)

    /** 检测是否应该忽略 */
    const checkIsIgnore = (key: string) => {
      if (!templateConfig?.ignores?.length) {
        return false
      }
      return templateConfig.ignores.some(rule => minimatch(key, rule))
    }

    /** 拷贝文件 */
    await Object.keys(templateZip.files).reduce(async (_, key) => {
      await _

      if (checkIsIgnore(key)) {
        return
      }

      const jsZipObj = templateZip.files[key]

      // 目录
      if (jsZipObj.dir) {
        outputZip.folder(key)
        return
      }

      // ejs文件
      if (/\.ejs$/.test(key)) {
        const renderResult = await ejs.renderFile(key)
        const outputFileName = key.replace(/\.ejs$/, '')
        outputZip.file(outputFileName, renderResult)
        return
      }

      // 普通文件
      const blob = await jsZipObj.async('blob')
      outputZip.file(key, blob)
    }, Promise.resolve())

    /** 生成页面 */
    if (templateConfig?.pageFileTemplate && templateConfig.pageFileName) {
      await renderData.$pages.reduce(async (_, page) => {
        await _
        const result = await ejs.renderFile(templateConfig.pageFileTemplate!, {
          page
        })
        const outputName = templateConfig.pageFileName!.replace(
          /\{name\}/g,
          page.outputPath
        )
        outputZip.file(outputName, result)
      }, Promise.resolve())
    }

    console.log({ templateConfig, renderData, outputZip })
    const outputBlob = await outputZip.generateAsync({ type: 'blob' })
    const outputFileName = `${appData.basicInfo.name}${
      opts.outputFileSuffix || ''
    }.zip`
    const outputFile = new File([outputBlob], outputFileName)

    return outputFile
  }
}
