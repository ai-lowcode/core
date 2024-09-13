import { ApiProperty } from '@nestjs/swagger'

import { PageEntity } from './page.entity'

export class PageInfo extends PageEntity {
  @ApiProperty({ type: [Number] })
  menuIds: number[]
}
