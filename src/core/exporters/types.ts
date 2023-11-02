import { AppData } from '../data/app'

export type Exporter = (appData: AppData) => Promise<File | null>

export function defineExporter(func: Exporter) {
  return func
}
