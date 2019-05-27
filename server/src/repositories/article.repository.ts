import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Article, ArticleSell} from '../models';
import {PgDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { ArticleSellRepository } from './article-sell.repository';

export class ArticleRepository extends DefaultCrudRepository<
  Article,
  typeof Article.prototype.id
> {

  constructor(
    @inject('datasources.pgDS') dataSource: PgDsDataSource,
  ) {
    super(Article, dataSource);
  }
}
