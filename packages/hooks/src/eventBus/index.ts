import type { Emitter, EventType } from 'mitt'
import mitt from 'mitt'
import { onUnmounted } from 'vue'

const emitter: Emitter<Record<EventType, unknown>> = mitt()

export function useEventBus(eventNames?: string[]): any {
  /**
   * 触发器
   * @param {any} eventName 事件名称
   * @param {*[]} args 参数
   */
  const emit = <T = any>(eventName: any, ...args: T[]) => {
    emitter.emit(eventName, args)
  }

  /**
   * 接收器
   * @param {any} eventName 事件名称
   * @param {any} callback 回调
   */
  const on = (eventName: any, callback: any) => {
    emitter.on(eventName, callback)
  }

  const off = (eventName: any) => {
    emitter.off(eventName)
  }

  // 组件销毁事件
  onUnmounted(() => {
    if (eventNames && eventNames.length) {
      eventNames.forEach(eventName => emitter.off(eventName))
    }
  })

  return {
    emit,
    on,
    off,
  }
}
