import { createAppComponent } from 'core/data/component'
import { Constants } from './constant'
import { cloneDeep } from 'lodash'
import { genId } from '../utils/common'

// 内置组件
export const resetComponents = {
  // BODY容器
  [Constants.BODY_NODE_ID]: createAppComponent({
    id: Constants.BODY_NODE_ID,
    icon: 't-icon-docs',
    title: Constants.BODY_NODE_ID
  }),

  // 普通容器
  NOMAL_CONTAINER: createAppComponent({
    id: 'NOMAL_CONTAINER',
    icon: 'c-nomal-container',
    title: '普通容器'
  }),

  // 网格布局
  GRID_LAYOUT: createAppComponent(
    {
      id: 'GRID_LAYOUT',
      icon: 'c-grid-container',
      title: '网格布局'
    },
    {
      baseAttrs: {
        rows: 2,
        cols: 3,
        rowGap: '8px',
        colGap: '8px'
      }
    }
  ),

  // 卡片
  CARD: createAppComponent(
    {
      id: 'CARD',
      icon: 'c-card',
      title: '卡片'
    },
    {
      baseAttrs: {
        showHeader: true,
        showContent: true,
        showFooter: false,
        showDivider: true
      }
    }
  ),

  // 轮播容器
  SWIPER_CONTAINER: createAppComponent({
    id: 'SWIPER_CONTAINER',
    icon: 'c-swiper-container',
    title: '轮播容器'
  }),

  // 布局组件
  LAYOUT: createAppComponent({
    id: 'LAYOUT',
    icon: 'c-layout',
    title: '布局组件'
  }),

  // 滚动容器
  SCROLL_CONTAINER: createAppComponent({
    id: 'SCROLL_CONTAINER',
    icon: 'c-scroll-container',
    title: '滚动容器'
  }),

  // 弹窗
  DIALOG: createAppComponent({
    id: 'DIALOG',
    icon: 'c-dialog',
    title: '弹窗'
  }),

  // Tab栏
  TAB_BAR: createAppComponent({
    id: 'TAB_BAR',
    icon: 'c-tabbar',
    title: 'Tab栏'
  }),

  // 菜单导航
  MENU_NAVS: createAppComponent({
    id: 'MENU_NAVS',
    icon: 'c-menu-navs',
    title: '菜单导航'
  }),

  // 宫格导航
  GRID_NAVS: createAppComponent({
    id: 'GRID_NAVS',
    icon: 'c-grid-navs',
    title: '宫格导航'
  }),

  // 顶部导航
  TOP_NAVS: createAppComponent({
    id: 'TOP_NAVS',
    icon: 'c-top-navs',
    title: '顶部导航'
  }),

  // 顶部选项卡
  TOP_TABS: createAppComponent({
    id: 'TOP_TABS',
    icon: 'c-top-tabs',
    title: '顶部选项卡'
  }),

  // 侧边选项卡
  SIDE_TABS: createAppComponent({
    id: 'SIDE_TABS',
    icon: 'c-side-tabs',
    title: '侧边选项卡'
  })
}

// 内置组件ID
export type ResetComponentIds = keyof typeof resetComponents
export type AllComponentIds = ResetComponentIds

/**
 * 组件分组
 */
export type AppComponentGroup = {
  // 分组ID
  id: string
  // 图标
  icon: string
  // 标题
  title: string
  // 组件ID
  components: ResetComponentIds[]
}

// 内置组件分组
export const resetComponentGroups: AppComponentGroup[] = [
  {
    id: 'layout',
    icon: 'material-common',
    title: '布局',
    components: [
      'NOMAL_CONTAINER',
      'GRID_LAYOUT',
      'CARD',
      'SWIPER_CONTAINER',
      'LAYOUT',
      'SCROLL_CONTAINER',
      'DIALOG'
    ]
  },
  {
    id: 'navs',
    icon: 'material-common',
    title: '导航',
    components: [
      'TAB_BAR',
      'MENU_NAVS',
      'GRID_NAVS',
      'TOP_NAVS',
      'TOP_TABS',
      'SIDE_TABS'
    ]
  }
]

// 创建组件实例
export function createComponentInstance(
  id: AllComponentIds,
  instanceId = genId()
) {
  const srcNode = resetComponents[id]

  const comp = cloneDeep(srcNode)
  comp.instanceID = instanceId
  comp.instanceName = comp.basicInfo.title

  if (srcNode.onCreateInstance) {
    srcNode.onCreateInstance(comp)
  }

  return comp
}
