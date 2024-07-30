import type { KeyHandler } from 'hotkeys-js'
import hotkeys from 'hotkeys-js'
import { onMounted, onUnmounted } from 'vue'

/**
 * 绑定热键
 * @param keys
 * @param callback
 */
function useHotKey(keys: string, callback: KeyHandler) {
  onMounted(() => {
    hotkeys(keys, callback)
  })
  onUnmounted(() => {
    hotkeys.unbind(keys, callback)
  })
}

export default useHotKey
