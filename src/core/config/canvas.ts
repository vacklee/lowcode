import { AppPlatform } from './enum'

/**
 * 画布配置
 */
export type CanvasConfig = {
  // 名称
  name: string
  // 宽度
  width: number
  // 高度
  height: number
  // 平台
  platforms: AppPlatform[]
}

const _c = (
  name: string,
  width: number,
  height: number,
  platforms: AppPlatform[]
) => ({
  name,
  width,
  height,
  platforms
})

/**
 * 画布配置集
 */
export const canvasConfigMap: CanvasConfig[] = [
  _c('iPhone 8', 377, 669, [AppPlatform.H5, AppPlatform.MINI]),
  _c('iPhone 8 Plus', 416, 738, [AppPlatform.H5, AppPlatform.MINI]),
  _c('iPhone X', 377, 814, [AppPlatform.H5, AppPlatform.MINI]),
  _c('iPhone XR', 416, 898, [AppPlatform.H5, AppPlatform.MINI]),
  _c('iPhone XS Max', 416, 898, [AppPlatform.H5, AppPlatform.MINI]),
  _c('HUAWEI Mate 30 Pro', 392, 802, [AppPlatform.H5, AppPlatform.MINI]),
  _c('Nexus 5', 362, 642, [AppPlatform.H5, AppPlatform.MINI]),
  _c('Galaxy S8', 362, 742, [AppPlatform.H5, AppPlatform.MINI])
]

/**
 * 获取平台对应的所有画布配置列表
 */
export function getCanvasConfigs(platform: AppPlatform) {
  return canvasConfigMap.filter(item => item.platforms.includes(platform))
}
