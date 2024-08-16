import { MenuList } from '@/designer'

export default function createMenu(): MenuList {
  return [
    {
      name: 'main',
      title: '基础',
      list: [],
    },
    {
      name: 'subform',
      title: '表单',
      list: [],
    },
    {
      name: 'aide',
      title: '辅助',
      list: [],
    },
    {
      name: 'layout',
      title: '布局',
      list: [],
    },
  ]
}
