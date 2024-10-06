import { MenuList } from '@/types'

export default function createMenu(): MenuList {
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
