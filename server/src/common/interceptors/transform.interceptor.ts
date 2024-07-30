import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common'
import {
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import type { Reflector } from '@nestjs/core'
import type { FastifyRequest } from 'fastify'
import qs from 'qs'
import type { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { BYPASS_KEY } from '../decorators/bypass.decorator'
import { ResOp } from '../model/response.model'

/**
 * 统一处理接口请求与响应结果，如果不需要则添加 @Bypass 装饰器
 */
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const bypass = this.reflector.get<boolean>(
      BYPASS_KEY,
      context.getHandler(),
    )

    if (bypass)
      return next.handle()

    const http = context.switchToHttp()
    const request = http.getRequest<FastifyRequest>()

    // 处理 query 参数，将数组参数转换为数组,如：?a[]=1&a[]=2 => { a: [1, 2] }
    request.query = qs.parse(request.url.split('?').at(1))

    return next.handle().pipe(
      map((data) => {
        // if (typeof data === 'undefined') {
        //   context.switchToHttp().getResponse().status(HttpStatus.NO_CONTENT);
        //   return data;
        // }

        return new ResOp(HttpStatus.OK, data ?? null)
      }),
    )
  }
}
