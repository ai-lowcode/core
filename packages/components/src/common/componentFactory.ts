import { defineComponent, h } from 'vue'

import BaseComp from './index.vue'

/**
 * 组件构造函数
 * @param CompName 组件名称
 * @param defaultProps 组件默认 props
 */
export function componentFactory(CompName: string, defaultProps = {}) {
  return defineComponent({
    name: CompName,
    inheritAttrs: false,
    props: {
      ...BaseComp.props,
    },
    emits: [...(BaseComp.emits || []) as any], // 继承所有 emits
    setup(props, { attrs, slots, emit }) {
      const createEventHandlers = () => {
        const handlers: Record<string, any> = {}

        // 继承原组件的所有事件
        if (BaseComp.emits) {
          const emits = Array.isArray(BaseComp.emits)
            ? BaseComp.emits
            : Object.keys(BaseComp.emits)

          emits.forEach((event: any) => {
            handlers[`on${event.charAt(0).toUpperCase()}${event.slice(1)}`]
                            = (...args: any[]) => emit(event, ...args)
          })
        }

        // 处理 attrs 中的事件
        Object.keys(attrs).forEach((key) => {
          if (key.startsWith('on')) {
            const event = key.slice(2).toLowerCase()
            handlers[key] = (...args: any[]) => emit(event, ...args)
          }
        })

        return handlers
      }

      return () => h(BaseComp, {
        ...props,
        ...attrs,
        ...defaultProps,
        ...createEventHandlers(),
      } as any, slots)
    },
  })
}
