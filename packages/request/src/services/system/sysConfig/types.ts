import { CommonType } from '../../types.ts'

export interface SysConfigType extends CommonType {
  config: string
  type: number
  userId: string
}
