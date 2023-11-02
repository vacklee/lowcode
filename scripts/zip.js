import fs from 'node:fs'
import { resolve, relative } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import JSZip from 'jszip'
import { minimatch } from 'minimatch'

const _ = process.argv[2]
const templateFolder = fileURLToPath(new URL('../templates', import.meta.url))
const outputFolder = fileURLToPath(
  new URL('../public/templates', import.meta.url)
)
const items = fs.readdirSync(templateFolder)

const entries = _ ? _.split(',').filter(i => items.includes(i)) : items
entries.reduce(async (_, entry) => {
  await _
  await zipItem(entry)
}, Promise.resolve())

async function zipItem(item) {
  const rootPath = resolve(templateFolder, item)
  const rootIgnoreFile = resolve(rootPath, '.gitignore')
  const ignoreRules = { not: [], normal: [] }
  if (rootIgnoreFile) {
    const ignoreContent = fs.readFileSync(rootIgnoreFile, 'utf-8')
    ignoreContent.split(/\n+/).forEach(item => {
      if (!item) return
      if (/^#/.test(item)) return
      if (/^!/.test(item)) {
        ignoreRules.not.push(item)
      } else {
        ignoreRules.normal.push(item)
      }
    })
  }

  const checkIsIgnore = item => {
    if (ignoreRules.not.some(rule => minimatch(item, rule) === false)) {
      return false
    }
    return ignoreRules.normal.some(rule => minimatch(item, rule))
  }

  /** @param {JSZip} zip */
  const _ = (zip, root) => {
    const entries = fs.readdirSync(root)
    entries.forEach(entry => {
      const entryPath = resolve(root, entry)
      const relativeEntry = relative(rootPath, entryPath)
      const isIgnore = checkIsIgnore(relativeEntry)

      if (isIgnore) {
        return
      }

      const entryStat = fs.statSync(entryPath)
      if (entryStat.isFile()) {
        zip.file(entry, fs.readFileSync(entryPath))
      } else if (entryStat.isDirectory()) {
        _(zip.folder(entry), entryPath)
      }
    })
    return zip
  }

  const zip = _(new JSZip(), resolve(templateFolder, item))
  const buffer = await zip.generateAsync({ type: 'nodebuffer' })
  const output = resolve(outputFolder, `${item}.zip`)
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true })
  }

  fs.writeFileSync(output, buffer)
}
