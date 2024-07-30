import { ApiProperty } from '@nestjs/swagger'
import type { Relation } from 'typeorm'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { CommonEntity } from '../../common/entity/common.entity'
import { UserEntity } from '../user/user.entity'

@Entity('todo')
export class TodoEntity extends CommonEntity {
  @Column()
  @ApiProperty({ description: 'todo' })
  value: string

  @ApiProperty({ description: 'todo' })
  @Column({ default: false })
  status: boolean

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>
}
