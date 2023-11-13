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
