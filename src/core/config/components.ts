import { AppComponent, createAppComponent } from 'core/data/component'
import { Constants } from './constant'
import { cloneDeep } from 'lodash'
import { genId } from '../utils/common'
import {
  AutoFromControlsEnum,
  autoFormColumn
} from '../components/AutoForm/types'
import { TextFormat, textFormatOptions, verticalAligns } from './select'

// 内置组件
export const resetComponents = {
  // BODY容器
  [Constants.BODY_NODE_ID]: createAppComponent(
    {
      id: Constants.BODY_NODE_ID,
      icon: 't-icon-docs',
      title: Constants.BODY_NODE_ID
    },
    { deletable: false }
  ),

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
        rows: 1,
        rowGap: '8px',
        colGap: '8px'
      },
      baseAttrsForm: [
        autoFormColumn(
          AutoFromControlsEnum.VDirectBtn,
          'emit:row',
          '添加行',
          '',
          {
            controlProps: {
              topText: '向上添加行',
              bottomText: '向下添加行'
            }
          }
        ),
        autoFormColumn(
          AutoFromControlsEnum.SpacingSelect,
          'colGap',
          '列间距',
          '默认对所有列生效，若某行单独配置了列间距，此属性将被覆盖。'
        ),
        autoFormColumn(AutoFromControlsEnum.SpacingSelect, 'rowGap', '行间距')
      ]
    }
  ),

  // 网格布局 - 行
  GRID_LAYOUT_ROW: createAppComponent(
    {
      id: 'GRID_LAYOUT_ROW',
      icon: '',
      title: '行'
    },
    {
      extends: ['NOMAL_CONTAINER'],
      baseAttrs: {
        cols: 3,
        colGap: Constants.CSS_INHERIT,
        alignItems: Constants.CSS_FLEX_START
      },
      baseAttrsForm: [
        autoFormColumn(
          AutoFromControlsEnum.VDirectBtn,
          'emit:row',
          '添加行',
          '',
          {
            controlProps: {
              topText: '向上添加行',
              bottomText: '向下添加行'
            }
          }
        ),
        autoFormColumn(
          AutoFromControlsEnum.NumberSelect,
          'cols',
          '列数量',
          '',
          {
            controlProps: {
              min: 1,
              max: 12,
              step: 1
            }
          }
        ),
        autoFormColumn(
          AutoFromControlsEnum.SpacingSelect,
          'colGap',
          '列间距',
          '',
          {
            controlProps: {
              parentName: '网格布局'
            }
          }
        ),
        autoFormColumn(
          AutoFromControlsEnum.IconSelect,
          'alignItems',
          '垂直对齐',
          '',
          {
            controlProps: {
              options: verticalAligns
            }
          }
        )
      ]
    }
  ),

  // 网格布局 - 列
  GRID_LAYOUT_COL: createAppComponent(
    {
      id: 'GRID_LAYOUT_COL',
      icon: '',
      title: '列'
    },
    {
      extends: ['NOMAL_CONTAINER'],
      baseAttrs: {
        colWidth: {
          mobile: 'fill',
          pc: 'fill'
        }
      },
      baseAttrsForm: [
        autoFormColumn(
          AutoFromControlsEnum.FourDirectBtn,
          'emit:row-col',
          '行和列'
        ),
        autoFormColumn(AutoFromControlsEnum.CellWidth, 'colWidth', '列宽')
      ]
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
        showFooter: false
      },
      heightAttrs: {
        showDivider: true
      },
      baseAttrsForm: [
        autoFormColumn(
          AutoFromControlsEnum.BoolSwitch,
          'showHeader',
          '显示卡片顶部'
        ),
        autoFormColumn(
          AutoFromControlsEnum.BoolSwitch,
          'showContent',
          '显示卡片内容'
        ),
        autoFormColumn(
          AutoFromControlsEnum.BoolSwitch,
          'showFooter',
          '显示卡片底部'
        )
      ],
      heightAttrsForm: [
        autoFormColumn(
          AutoFromControlsEnum.BoolSwitch,
          'showDivider',
          '显示分割线'
        )
      ]
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
  }),

  // 文本
  TEXT: createAppComponent(
    {
      id: 'TEXT',
      icon: 'c-text',
      title: '文本'
    },
    {
      baseAttrs: {
        content: '文本内容',
        format: TextFormat.CONTENT_DEFAULT
      },
      baseAttrsForm: [
        autoFormColumn(
          AutoFromControlsEnum.TextArea,
          'content',
          '文本内容',
          ''
        ),
        autoFormColumn(
          AutoFromControlsEnum.CommonSelect,
          'format',
          '文本格式',
          '',
          {
            controlProps: {
              options: textFormatOptions
            }
          }
        )
      ]
    }
  )
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
      'CARD'
      // ,'SWIPER_CONTAINER',
      // 'LAYOUT',
      // 'SCROLL_CONTAINER',
      // 'DIALOG'
    ]
  },
  // ,{
  //   id: 'navs',
  //   icon: 'material-common',
  //   title: '导航',
  //   components: [
  //     'TAB_BAR',
  //     'MENU_NAVS',
  //     'GRID_NAVS',
  //     'TOP_NAVS',
  //     'TOP_TABS',
  //     'SIDE_TABS'
  //   ]
  // }
  {
    id: 'display',
    icon: 'material-common',
    title: '展示',
    components: ['TEXT']
  }
]

/** 查询组件 */
export function getComponentById(id: string) {
  if (id in resetComponents) {
    return resetComponents[id as ResetComponentIds]
  }
}

/** 组件继承 */
export function extendsComponent(name: string, target: AppComponent) {
  const source = getComponentById(name)
  if (!source) {
    return target
  }

  const cloneSource = cloneDeep(source)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assign = (obj1: any, obj2: any) => {
    for (const k in obj2) {
      if (!obj1[k]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        obj1[k] = obj2[k]
      }
    }
    return obj1
  }
  const extendJson = (key: keyof AppComponent) => {
    const targetJson = target[key] as Record<string, unknown>
    const sourceJson = cloneSource[key] as Record<string, unknown>
    assign(targetJson, sourceJson)
    delete cloneSource[key]
  }
  const extendArr = (key: keyof AppComponent) => {
    const targetJson = target[key] as Array<unknown>
    const sourceJson = cloneSource[key] as Array<unknown>
    targetJson.push(...sourceJson)
    delete cloneSource[key]
  }

  extendJson('basicInfo')
  extendJson('baseAttrs')
  extendJson('heightAttrs')
  extendArr('baseAttrsForm')
  extendArr('heightAttrsForm')
  extendArr('nodes')

  assign(target, cloneSource)
  return target
}

// 创建组件实例
export function createComponentInstance(
  id: AllComponentIds,
  instanceId = genId()
) {
  const srcNode = getComponentById(id)!
  const comp = cloneDeep(srcNode)
  if (comp.extends.length) {
    comp.extends.forEach(name => extendsComponent(name, comp))
  }

  comp.instanceID = instanceId
  comp.instanceName = comp.basicInfo.title

  if (srcNode.onCreateInstance) {
    srcNode.onCreateInstance(comp)
  }

  return comp
}
