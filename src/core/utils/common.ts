import ShortUniqueId from 'short-unique-id'
import ClipBoard from 'clipboard'
import { ElMessage } from 'element-plus'

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
    successMsg: string
    errorMsg: string
  }
) {
  return promise
    .then(() => {
      ElMessage.success(opts.successMsg)
    })
    .catch(err => {
      const msg = opts.errorMsg.replace(/\{e\}/g, err.message)
      ElMessage.error(msg)
    })
}
