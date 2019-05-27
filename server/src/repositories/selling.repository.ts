import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Selling, ArticleSell} from '../models';
import {PgDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { ArticleSellRepository } from './article-sell.repository';

export class SellingRepository extends DefaultCrudRepository<
  Selling,
  typeof Selling.prototype.id
> {
  public readonly articles: HasManyRepositoryFactory<
    ArticleSell,
    typeof Selling.prototype.id
  >;

  constructor(
    @inject('datasources.pgDS') dataSource: PgDsDataSource,
    @repository.getter('ArticleSellRepository') getArticleSellRepository: Getter<ArticleSellRepository>
  ) {
    super(Selling, dataSource);
    this.articles = this.createHasManyRepositoryFactoryFor('articles', getArticleSellRepository);
  }
}
