import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {ArticleSell, Article} from '../models';
import {ArticleSellRepository, ArticleRepository} from '../repositories';

export class ArticleSellController {
  constructor(
    @repository(ArticleSellRepository)
    public articleSellRepository : ArticleSellRepository,
    @repository(ArticleRepository)
    public articleRepository: ArticleRepository
  ) {}

  @post('/article-sells', {
    responses: {
      '200': {
        description: 'ArticleSell model instance',
        content: {'application/json': {schema: {'x-ts-type': ArticleSell}}},
      },
    },
  })
  async create(@requestBody() articleSell: ArticleSell): Promise<ArticleSell> {
    return await this.articleSellRepository.create(articleSell);
  }

  @get('/article-sells/count', {
    responses: {
      '200': {
        description: 'ArticleSell model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(ArticleSell)) where?: Where,
  ): Promise<Count> {
    return await this.articleSellRepository.count(where);
  }

  @get('/article-sells', {
    responses: {
      '200': {
        description: 'Array of ArticleSell model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ArticleSell}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(ArticleSell)) filter?: Filter,
  ): Promise<ArticleSell[]> {
    return await this.articleSellRepository.find(filter);
  }

  @patch('/article-sells', {
    responses: {
      '200': {
        description: 'ArticleSell PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() articleSell: ArticleSell,
    @param.query.object('where', getWhereSchemaFor(ArticleSell)) where?: Where,
  ): Promise<Count> {
    return await this.articleSellRepository.updateAll(articleSell, where);
  }

  @get('/article-sells/{id}', {
    responses: {
      '200': {
        description: 'ArticleSell model instance',
        content: {'application/json': {schema: {'x-ts-type': ArticleSell}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<ArticleSell> {
    return await this.articleSellRepository.findById(id);
  }

  @patch('/article-sells/{id}', {
    responses: {
      '204': {
        description: 'ArticleSell PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() articleSell: ArticleSell,
  ): Promise<void> {
    await this.articleSellRepository.updateById(id, articleSell);
  }

  @put('/article-sells/{id}', {
    responses: {
      '204': {
        description: 'ArticleSell PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() articleSell: ArticleSell,
  ): Promise<void> {
    await this.articleSellRepository.replaceById(id, articleSell);
  }

  @del('/article-sells/{id}', {
    responses: {
      '204': {
        description: 'ArticleSell DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.articleSellRepository.deleteById(id);
  }

  @post('/article-sells/order', {
    responses: {
      '200': {
        description: 'ArticleSell model instance',
        content: {'application/json': {schema: {type: 'array', items: {'x-ts-type': ArticleSell}}}},
      },
    },
  })
  async addOrder(@requestBody() order: ArticleSell[]): Promise<ArticleSell[]> {
    return await this.articleSellRepository.createAll(order);
  }

  @get('/article-sells/getGains')
  async getGains(@param.query.object('filter', getFilterSchemaFor(ArticleSell)) filter?: Filter): Promise<number> {

    const sells = await this.articleSellRepository.find(filter);
    let total: number = 0;
    for (let i = 0; i < sells.length; i++) {
      let sell: ArticleSell = sells[i];
      
      total += sell.price;
    }

    return await total;
  }
}
