import {DefaultCrudRepository, BelongsToAccessor, repository} from '@loopback/repository';
import {ArticleSell, Selling, Article} from '../models';
import {PgDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { SellingRepository } from './selling.repository';
import { ArticleRepository } from './article.repository';

export class ArticleSellRepository extends DefaultCrudRepository<
  ArticleSell,
  typeof ArticleSell.prototype.id
> {
  public readonly selling: BelongsToAccessor<
    Selling,
    typeof ArticleSell.prototype.id
  >;
  constructor(
    @inject('datasources.pgDS') dataSource: PgDsDataSource,
    @repository.getter('SellingRepository') sellingRepositoryGetter: Getter<SellingRepository>,
  ) {
    super(ArticleSell, dataSource);
    this.selling = this.createBelongsToAccessorFor('selling', sellingRepositoryGetter);
  }
}
