import { defineProject } from 'vitest/config'

export default defineProject({
  test: {
    coverage: {
      provider: 'istanbul', // or 'v8'
    },
  },
})
