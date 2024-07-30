import type {
  ArgumentMetadata,
  PipeTransform,
} from '@nestjs/common'
import {
  Inject,
  Injectable,
} from '@nestjs/common'
import { REQUEST } from '@nestjs/core'

import type { OperatorDto } from '../dto/operator.dto'

@Injectable()
export class UpdaterPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: any) {}
  transform(value: OperatorDto, metadata: ArgumentMetadata) {
    const user = this.request.user as IAuthUser

    value.updateBy = user.uid

    return value
  }
}
