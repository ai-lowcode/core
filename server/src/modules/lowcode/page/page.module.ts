import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { SseService } from '~/modules/sse/sse.service'

import { PageController } from './page.controller'
import { PageEntity } from './page.entity'
import { PageService } from './page.service'

const providers = [PageService, SseService]

@Module({
  imports: [
    TypeOrmModule.forFeature([PageEntity]),
  ],
  controllers: [PageController],
  providers: [...providers],
  exports: [TypeOrmModule, ...providers],
})
export class PageModule {}
