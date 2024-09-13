import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity } from 'typeorm'

import { CompleteEntity } from '~/common/entity/common.entity'

@Entity({ name: 'lowcode_page' })
export class PageEntity extends CompleteEntity {
  @Column({ length: 50, unique: true })
  @ApiProperty({ description: '页面名' })
  name: string

  @Column({ unique: true, comment: '页面标识' })
  @ApiProperty({ description: '页面标识' })
  slug: string

  @Column({ nullable: true })
  @ApiProperty({ description: '页面描述' })
  desc: string

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: '页面内容' })
  content: string
}
