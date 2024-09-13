import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger'
import {
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator'

import { OperatorDto } from '~/common/dto/operator.dto'
import { PagerDto } from '~/common/dto/pager.dto'
import { IsUnique } from '~/shared/database/constraints/unique.constraint'

import { PageEntity } from './page.entity'

export class PageDto extends OperatorDto {
  @ApiProperty({ description: '页面名称' })
  @IsString()
  @MinLength(2, { message: '页面名称长度不能小于2' })
  name: string

  @IsUnique({ entity: PageEntity })
  @ApiProperty({ description: '页面标识' })
  @IsString()
  @Matches(/^[a-z0-9]+$/i, { message: '页面值只能包含字母和数字' })
  @MinLength(2, { message: '页面值长度不能小于2' })
  slug: string

  @ApiProperty({ description: '页面描述' })
  @IsString()
  @IsOptional()
  desc?: string

  @ApiProperty({ description: '页面内容' })
  @IsString()
  @IsOptional()
  content?: string
}

export class PageUpdateDto extends PartialType(PageDto) {}

export class PageQueryDto extends IntersectionType(PagerDto<PageDto>, PartialType(PageDto)) {
  @ApiProperty({ description: '页面名称', required: false })
  @IsString()
  name?: string

  @ApiProperty({ description: '页面值', required: false })
  @IsString()
  slug: string
}
