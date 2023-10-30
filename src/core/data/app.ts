import { getCanvasConfigs } from 'core/config/canvas'
import { AppPlatform } from 'core/config/enum'
import { AppComponent } from './component'
import { InsetStyle } from '../config/styles'
import { FileBaseInfo } from './file'

export { AppPlatform }

// 画布属性
export type CanvasAttrs = {
  // 配置名称
  name: string
  // 宽
  width: number
  // 高
  height: number
  // 缩放
  scale: number
}

// 数据
export type AppState = {
  // 首页
  indexPage: string
  // 当前选择的页面
  currentPage: string
  // 当前预览平台
  platform: AppPlatform
  // 当前画布属性
  canvasAttrs: CanvasAttrs
  // 当前选中的节点ID
  currentSelectNodeId: string
  // 左侧菜单是否可见
  showLeftPanel: boolean
  // 右侧菜单是否可见
  showRightPanel: boolean
  // 当前右侧面板选中
  rightPanelTab: 'components' | 'settings'
  // 常用颜色
  commonUseColors: string[]
}

// 分组
export type Group = {
  // 分组ID
  id: string
  // 分组名称
  title: string
}

// 页面
export type AppPage = {
  // 页面ID
  id: string
  // 分组ID
  groupdId: string
  // 页面标题
  title: string
  // 页面节点树
  nodeTree: AppComponent[]
  // 根节点样式
  bodyVisualCss: Partial<InsetStyle>
}

// 应用基础信息
export type AppBasicInfo = {
  // 应用名称
  name: string
  // 应用图标
  iconURL: string
  // 应用favicon图标
  faviconURL: string
  // 应用描述
  description: string
}

// 应用数据
export type AppData = {
  // 应用基础信息
  basicInfo: AppBasicInfo
  // 页面分组
  pageGroups: Group[]
  // 页面
  pages: AppPage[]
  // 数据
  state: AppState
  // 图片素材
  imageResources: FileBaseInfo[]
}

/** 创建页面 */
export function createAppPage(
  id: string,
  title: string,
  opts?: Partial<AppPage>
) {
  const page: AppPage = {
    id,
    title,
    groupdId: '',
    nodeTree: [],
    bodyVisualCss: {},
    ...(opts || {})
  }
  return page
}

export default function createAppData(): AppData {
  return {
    basicInfo: {
      name: '未命名应用',
      iconURL: '',
      faviconURL: '',
      description: ''
    },
    pageGroups: [],
    pages: [createAppPage('page-1', '测试')],
    imageResources: [],
    state: {
      indexPage: '',
      currentPage: 'page-1',
      platform: AppPlatform.H5,
      canvasAttrs: {
        name: getCanvasConfigs(AppPlatform.H5)[0]?.name || '',
        width: 0,
        height: 0,
        scale: 1
      },
      currentSelectNodeId: '',
      showLeftPanel: true,
      showRightPanel: true,
      rightPanelTab: 'components',
      commonUseColors: []
    }
  }
}
