import { genId } from './common'

/** 运行代码 */
export function runCode<T>(code: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const callbackId = `CALLBACK_${genId()}_${Date.now()}`
    const codeContent = `window.${callbackId}(function () { return ${code} })`
    const file = new File([codeContent], 'run.js', {
      type: 'application/javascript;charset=utf-8'
    })

    const script = document.createElement('script')
    script.src = URL.createObjectURL(file)

    window[callbackId as any] = ((func: any) => {
      script.remove()
      delete window[callbackId as any]
      try {
        resolve(func())
      } catch (err) {
        reject(err)
      }
    }) as any

    document.head.appendChild(script)
  })
}

/** 获取类型 */
export function getTypeOf(val: unknown) {
  if (typeof val?.constructor?.name === 'string') {
    return val.constructor.name.toLowerCase()
  }
  return typeof val
}

/** 获取默认值 */
export function getDefaultValue(val: unknown) {
  switch (getTypeOf(val)) {
    case 'string':
      return ''
    default:
      return void 0
  }
}
