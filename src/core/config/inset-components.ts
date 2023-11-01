import { Component } from 'vue'
import { AllComponentIds } from './components'
import { Constants } from './constant'
import CardNodeVue from '../components/AppNodeRender/Insets/CardNode.vue'
import GridLayoutNodeVue from '../components/AppNodeRender/Insets/GridLayoutNode.vue'
import GridLayoutRowNodeVue from 'core/components/AppNodeRender/Insets/GridLayoutRowNode.vue'
import GridLayoutColNodeVue from 'core/components/AppNodeRender/Insets/GridLayoutColNode.vue'
import NomalContainerNodeVue from '../components/AppNodeRender/Insets/NomalContainerNode.vue'

/**
 * 内置组件
 */
export const insetComponents: Record<AllComponentIds, Component> = {
  [Constants.BODY_NODE_ID]: {},

  // 卡片
  CARD: CardNodeVue,

  DIALOG: {},

  // 网格布局
  GRID_LAYOUT: GridLayoutNodeVue,

  // 网格布局 - 行
  GRID_LAYOUT_ROW: GridLayoutRowNodeVue,

  // 网格布局 - 列
  GRID_LAYOUT_COL: GridLayoutColNodeVue,

  GRID_NAVS: {},
  LAYOUT: {},
  MENU_NAVS: {},

  // 普通容器
  NOMAL_CONTAINER: NomalContainerNodeVue,

  SCROLL_CONTAINER: {},
  SIDE_TABS: {},
  SWIPER_CONTAINER: {},
  TAB_BAR: {},
  TOP_NAVS: {},
  TOP_TABS: {}
}
