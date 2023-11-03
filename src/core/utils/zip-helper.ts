import JSZip from 'jszip'

export function createZipHelper(zip: JSZip) {
  /** 文件或目录是否存在 */
  const exist = (key: string) => !!zip.files[key]

  /** 读取JSON文件 */
  const readAsJson = async (key: string) => {
    const jsZipObj = zip.files[key]
    const text = await jsZipObj.async('text')
    try {
      return JSON.parse(text)
    } catch (err) {
      return {}
    }
  }

  return {
    exist,
    readAsJson
  }
}
