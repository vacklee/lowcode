import ejs from 'ejs'
import JSZip from 'jszip'
import { genId } from './common'

export function createEJS<D = any>(zip: JSZip, renderData: D) {
  const _renderCache: Record<string, Promise<string> | undefined> = {}

  const renderFile = async <D = any>(key: string, additionData?: D) => {
    if (_renderCache[key]) {
      return _renderCache[key] as Promise<string>
    }

    _renderCache[key] = (async () => {
      const file = zip.files[key]
      const content = await file.async('text')

      const includeTask: Record<string, Promise<string>> = {}
      const $include = (key: string, data?: any) => {
        const tag = `"----- ${key}:${genId()}:${Date.now()} -----"`
        includeTask[tag] = renderFile(key, data)
        return tag
      }

      let renderResult = await ejs.render(
        content,
        {
          $include,
          ...(renderData || {}),
          ...(additionData || {})
        },
        { async: true }
      )

      await Object.keys(includeTask).reduce(async (_, tag) => {
        await _
        const tagContent = await includeTask[tag]
        renderResult = renderResult.replace(tag, tagContent)
      }, Promise.resolve())

      return renderResult
    })()

    return _renderCache[key] as Promise<string>
  }

  return {
    renderFile
  }
}
