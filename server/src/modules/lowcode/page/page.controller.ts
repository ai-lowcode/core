import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ApiResult } from '~/common/decorators/api-result.decorator'
import { IdParam } from '~/common/decorators/id-param.decorator'
import { ApiSecurityAuth } from '~/common/decorators/swagger.decorator'
import { UpdaterPipe } from '~/common/pipes/updater.pipe'
import { Perm, definePermission } from '~/modules/auth/decorators/permission.decorator'
import { PageEntity } from '~/modules/lowcode/page/page.entity'

import { PageInfo } from '~/modules/lowcode/page/page.model'

import { PageDto, PageQueryDto, PageUpdateDto } from './page.dto'
import { PageService } from './page.service'

export const permissions = definePermission('lowcode:page', {
  LIST: 'list',
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
} as const)

@ApiTags('Lowcode - 页面模块')
@ApiSecurityAuth()
@Controller('pages')
export class PageController {
  constructor(
    private pageService: PageService,
  ) {}

  @Get()
  @ApiOperation({ summary: '获取页面列表' })
  @ApiResult({ type: [PageEntity], isPage: true })
  @Perm(permissions.LIST)
  async list(@Query() dto: PageQueryDto) {
    return this.pageService.list(dto)
  }

  @Get(':id')
  @ApiOperation({ summary: '获取页面信息' })
  @ApiResult({ type: PageInfo })
  @Perm(permissions.READ)
  async info(@IdParam() id: number) {
    return this.pageService.info(id)
  }

  @Post()
  @ApiOperation({ summary: '新增页面' })
  @Perm(permissions.CREATE)
  async create(@Body() dto: PageDto): Promise<void> {
    await this.pageService.create(dto)
  }

  @Put(':id')
  @ApiOperation({ summary: '更新页面' })
  @Perm(permissions.UPDATE)
  async update(@IdParam() id: number, @Body(UpdaterPipe)dto: PageUpdateDto): Promise<void> {
    await this.pageService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除页面' })
  @Perm(permissions.DELETE)
  async delete(@IdParam() id: number): Promise<void> {
    await this.pageService.delete(id)
  }
}
