import { ComponentMenu } from '@/enums'
import { MenuList } from '@/types'

export function createMenu(): MenuList {
  return [
    {
      name: 'basic',
      title: '基础',
      list: [],
    },
    {
      name: 'display',
      title: '展示组件',
      list: [],
    },
    {
      name: 'form',
      title: '表单',
      list: [],
    },
    {
      name: 'business',
      title: '业务组件',
      list: [],
    },

  ]
}

// 侧边栏菜单
export const slideMenu = [
  {
    title: '组件',
    slug: ComponentMenu.COMPONENT,
    icon: 'proicons:component',
  },
  {
    title: '大纲树',
    slug: ComponentMenu.OUTLINE,
    icon: 'tdesign:tree-list',
  },
  {
    title: '接口',
    slug: ComponentMenu.API,
    icon: 'hugeicons:api',
  },
  {
    title: '变量',
    slug: ComponentMenu.VARIABLE,
    icon: 'material-symbols:function',
  },
  {
    title: '源码',
    slug: ComponentMenu.CODE,
    icon: 'mingcute:code-fill',
  },
  {
    title: 'Ai助手',
    slug: ComponentMenu.AICHAT,
    icon: 'hugeicons:ai-chat-02',
  },
]
