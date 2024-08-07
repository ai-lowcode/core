import { ref } from 'vue'

import ZhCn from '../locale/zh-cn'

import { useLocale } from './index'

let _t = null
const locale = ref(null)

function t(...args) {
  return _t(...args)
}

function globalUseLocale(_locale) {
  locale.value = _locale || ZhCn
  const data = useLocale(locale)
  _t = data.t
  return data
}

globalUseLocale()

export default globalUseLocale

export { t, locale }
