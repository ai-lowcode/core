import { Injectable } from '@nestjs/common'

import type { LoginLogService } from '../../system/log/services/login-log.service'
import type { TaskLogService } from '../../system/log/services/task-log.service'

import { Mission } from '../mission.decorator'

/**
 * 管理后台日志清理任务
 */
@Injectable()
@Mission()
export class LogClearJob {
  constructor(
    private loginLogService: LoginLogService,
    private taskLogService: TaskLogService,
  ) {}

  async clearLoginLog(): Promise<void> {
    await this.loginLogService.clearLog()
  }

  async clearTaskLog(): Promise<void> {
    await this.taskLogService.clearLog()
  }
}
