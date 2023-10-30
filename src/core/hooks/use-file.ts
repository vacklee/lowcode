import { FileBaseInfo } from '../data/file'
import { genId } from '../utils/common'
import { useAppData } from './use-app-data'

export type SearchOptions = {
  keyword?: string
}

export type FileUpload = (file: File) => Promise<FileBaseInfo>

export type SearchNext = (
  limit: number,
  startId: string,
  opts?: SearchOptions
) => Promise<{
  result: FileBaseInfo[]
  nextId: string
}>

/** 图片素材库 */
export function useImageResource() {
  const { appData } = useAppData()

  /** 上传图片 */
  const upload: FileUpload = async file => {
    const fileDescribe: FileBaseInfo = {
      fileId: genId(),
      fileName: file.name,
      filePath: URL.createObjectURL(file)
    }
    appData.value.imageResources.push(fileDescribe)
    return fileDescribe
  }

  /** 分页查询图片 */
  const search = async (page: number, limit: number) => {
    const data = appData.value.imageResources
    const total = data.length
    const skip = (page - 1) * limit
    const result = data.slice(skip, skip + limit)
    return { total, result }
  }

  /** 瀑布流查询 */
  const searchNext: SearchNext = async (limit, startId = '', opts) => {
    let matchDatas = appData.value.imageResources.filter(item => {
      if (opts?.keyword) {
        return (
          item.fileName.toUpperCase().indexOf(opts.keyword.toUpperCase()) > -1
        )
      }
      return true
    })

    if (startId) {
      const startIndex = matchDatas.findIndex(item => item.fileId === startId)
      if (startIndex > -1) {
        matchDatas = matchDatas.slice(startIndex)
      }
    }

    const result = matchDatas.slice(0, limit)
    const nextId = matchDatas[limit]?.fileId

    return {
      result,
      nextId
    }
  }

  return { upload, search, searchNext }
}
