import commonStyle from 'core/styles/common.module.scss'
import { h } from 'vue'

// 高亮文本
export function heightlight(text: string) {
  return h(
    'span',
    {
      class: commonStyle.heightlight
    },
    text
  )
}
