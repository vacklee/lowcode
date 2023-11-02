import { render } from 'ejs'
import { AppData } from '../data/app'

export async function renderEJS(content: string, appData: AppData) {
  const result = await render(
    content,
    {
      appData
    },
    {
      client: true,
      async: true
    }
  )
  return result
}
