import { webStorage } from '@ai-lowcode/hooks'

export function storage() {
  webStorage.setStorage('config', {
    SERVER_URL: import.meta.env.APP_SERVER_URL,
  })
}
