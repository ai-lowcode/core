import { v4 as uuidv4 } from 'uuid'

/**
 * 生成唯一ID
 */
export function uniqueId() {
  return uuidv4()
}
