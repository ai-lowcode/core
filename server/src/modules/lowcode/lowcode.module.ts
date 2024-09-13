import { Module } from '@nestjs/common'

import { RouterModule } from '@nestjs/core'

import { PageModule } from './page/page.module'

const modules = [
  PageModule,
]

@Module({
  imports: [
    ...modules,
    RouterModule.register([
      {
        path: 'lowcode',
        module: LowcodeModule,
        children: [...modules],
      },
    ]),
  ],
  exports: [...modules],
})
export class LowcodeModule {}
