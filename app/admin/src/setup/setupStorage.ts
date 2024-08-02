import { webStorage } from '@ai-lowcode/hooks'

export function setupStorage() {
  webStorage.setStorage('config', {
    GLOBAL_URL: 'https://nest-api.buqiyuan.site/api',
  })
}
