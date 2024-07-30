import { Module, forwardRef } from '@nestjs/common'

import { AuthModule } from '../../auth/auth.module'

import { SseModule } from '../../sse/sse.module'

import { UserModule } from '../../user/user.module'

import { OnlineController } from './online.controller'
import { OnlineService } from './online.service'

const providers = [OnlineService]

@Module({
  imports: [
    UserModule,
    AuthModule,
    forwardRef(() => SseModule),
  ],
  controllers: [OnlineController],
  providers,
  exports: [...providers],
})
export class OnlineModule {}
