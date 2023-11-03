import { render } from 'ejs'
import { AppData } from '../data/app'

export async function renderEJS(content: string, appData: AppData, data?: any) {
  const result = await render(
    content,
    {
      appData,
      ...(data || {})
    },
    {
      client: true,
      async: true
    }
  )
  return result
}
