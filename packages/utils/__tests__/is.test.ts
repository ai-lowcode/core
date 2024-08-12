import { describe, expect, it } from 'vitest'

import { isObject } from '../src'

describe('is', () => {
  it('正常渲染', () => {
    const res = isObject('')
    expect(res).toBe(false)
  })
})
