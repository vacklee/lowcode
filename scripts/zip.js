import fs from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import JSZip from 'jszip'

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
  /** @param {JSZip} zip */
  const _ = (zip, root) => {
    const entries = fs.readdirSync(root)
    entries.forEach(entry => {
      const entryPath = resolve(root, entry)
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
