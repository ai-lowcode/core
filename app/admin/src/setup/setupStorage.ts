import { webStorage } from '@ai-lowcode/hooks'

export function setupStorage() {
  webStorage.setStorage('config', {
    SERVER_URL: import.meta.env.APP_SERVER_URL,
  })
}
