import ShortUniqueId from 'short-unique-id'
import ClipBoard from 'clipboard'
import { ElMessage } from 'element-plus'
import mime from 'mime'
import bytes from 'bytes'
import { camelCase } from 'lodash'

// 生成唯一ID
export function genId() {
  return new ShortUniqueId({ length: 10 }).rnd()
}

// 复制到剪贴板
export function copyText(text: string) {
  return new Promise((resolve, reject) => {
    const el = document.createElement('div')
    const clipboard = new ClipBoard(el, {
      text: () => text
    })

    clipboard.on('success', resolve)
    clipboard.on('error', reject)
    el.click()
  })
}

// Promise提示
export function tipPromise(
  promise: Promise<unknown>,
  opts: {
    successMsg?: string
    errorMsg?: string
  }
) {
  return promise
    .then(() => {
      if (opts.successMsg) {
        ElMessage.success(opts.successMsg)
      }
    })
    .catch(err => {
      if (opts.errorMsg) {
        const msg = opts.errorMsg.replace(/\{e\}/g, err.message)
        ElMessage.error(msg)
      }
      throw err
    })
}

// 深度查询
export function deepFind<D>(
  arr: D[],
  func: (item: D) => boolean,
  getChilds: (item: D) => D[]
): D | undefined {
  for (const item of arr) {
    if (func(item)) {
      return item
    }

    const childs = getChilds(item)
    const childRes = deepFind(childs, func, getChilds)
    if (childRes) {
      return childRes
    }
  }

  return void 0
}

/** 延迟 */
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/** 选择文件 */
export function chooseFile(opts?: {
  limitType?: string[]
  multiple?: boolean
  limitSize?: string
  onTypeError?: () => unknown
  onSizeError?: () => unknown
}): Promise<File[]> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.multiple = opts?.multiple || false
    input.accept = [
      ...new Set(
        opts?.limitType?.map(item => mime.getType(item)).filter(Boolean) || []
      )
    ].join(',')

    const sizeLimit = opts?.limitSize ? bytes(opts.limitSize) : 0

    input.onchange = () => {
      const files = [...(input.files || [])]
      try {
        files.forEach(item => {
          if (
            input.accept &&
            (!item.type || input.accept.indexOf(item.type) < 0)
          ) {
            opts?.onTypeError?.()
            throw new Error('不支持该文件类型')
          }

          if (sizeLimit && item.size > sizeLimit) {
            opts?.onSizeError?.()
            throw new Error('超出大小限制')
          }
        })
      } catch (err) {
        reject(err)
        return
      }

      resolve(files)
    }
    input.click()
  })
}

/** 驼峰化首字母大写 */
export function upperCamelCase(str: string) {
  return camelCase(str).replace(/^./, $ => $.toUpperCase())
}
