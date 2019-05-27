import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {Article, ArticleSell} from '../models';
import {PgDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import { ArticleSellRepository } from './article-sell.repository';

export class ArticleRepository extends DefaultCrudRepository<
  Article,
  typeof Article.prototype.id
> {
  public readonly articleSells: HasManyRepositoryFactory<
    ArticleSell,
    typeof Article.prototype.id
  >;

  constructor(
    @inject('datasources.pgDS') dataSource: PgDsDataSource,
    @repository.getter('ArticleSellRepository') getArticleSellRepository: Getter<ArticleSellRepository>
  ) {
    super(Article, dataSource);
    this.articleSells = this.createHasManyRepositoryFactoryFor('articleSells', getArticleSellRepository);
  }
}
