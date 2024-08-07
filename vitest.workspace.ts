import { defineWorkspace } from 'vitest/config'

// defineWorkspace 会提供一个很好的类型提示开发体验
export default defineWorkspace([
  'packages/*/vitest.config.{e2e,unit}.ts',
  {
    test: {
      include: ['__tests__/**/*.{browser}.test.{ts,js}'],
      // 在使用内联配置的时候，建议定义一个名称
      name: 'happy-dom',
      environment: 'happy-dom',
    },
  },
  {
    test: {
      include: ['__tests__/**/*.{node}.test.{ts,js}'],
      name: 'node',
      environment: 'node',
    },
  },
])
