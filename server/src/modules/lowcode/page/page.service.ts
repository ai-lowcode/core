import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Like, Repository } from 'typeorm'

import { PagerDto } from '~/common/dto/pager.dto'
import { paginate } from '~/helper/paginate'
import { Pagination } from '~/helper/paginate/pagination'

import { PageEntity } from '~/modules/lowcode/page/page.entity'

import { PageDto, PageQueryDto, PageUpdateDto } from './page.dto'

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageEntity)
    private pageRepository: Repository<PageEntity>,
    @InjectEntityManager() private entityManager: EntityManager,
  ) {}

  /**
   * 列举所有页面：除去超级管理员
   */
  async findAll({
    page,
    pageSize,
  }: PagerDto): Promise<Pagination<PageEntity>> {
    return paginate(this.pageRepository, { page, pageSize })
  }

  /**
   * 查询页面列表
   */
  async list({
    page,
    pageSize,
    name,
    slug,
    desc,
  }: PageQueryDto): Promise<Pagination<PageEntity>> {
    const queryBuilder = await this.pageRepository
      .createQueryBuilder('page')
      .where({
        ...(name ? { name: Like(`%${name}%`) } : null),
        ...(slug ? { slug: Like(`%${slug}%`) } : null),
        ...(desc ? { remark: Like(`%${desc}%`) } : null),
      })

    return paginate<PageEntity>(queryBuilder, {
      page,
      pageSize,
    })
  }

  /**
   * 根据页面获取页面信息
   */
  async info(id: number) {
    const info = await this.pageRepository
      .createQueryBuilder('page')
      .where({
        id,
      })
      .getOne()

    return { ...info }
  }

  async delete(id: number): Promise<void> {
    await this.pageRepository.delete(id)
  }

  /**
   * 增加页面
   */
  async create({ ...data }: PageDto): Promise<{ pageId: number }> {
    const page = await this.pageRepository.save({
      ...data,
    })

    return { pageId: page.id }
  }

  /**
   * 更新页面信息
   */
  async update(id, { ...data }: PageUpdateDto): Promise<void> {
    await this.pageRepository.update(id, data)
    await this.entityManager.transaction(async (manager) => {
      const page = await this.pageRepository.findOne({ where: { id } })
      await manager.save(page)
    })
  }
}
