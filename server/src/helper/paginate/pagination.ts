import type { ObjectLiteral } from 'typeorm'

import type { IPaginationMeta } from './interface'

export class Pagination<
  PaginationObject,
  T extends ObjectLiteral = IPaginationMeta,
> {
  constructor(
    public readonly items: PaginationObject[],

    public readonly meta: T,
  ) {}
}
