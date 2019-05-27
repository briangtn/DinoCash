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
import {Article} from '../models';
import {ArticleRepository} from '../repositories';

export class ArticleController {
  constructor(
    @repository(ArticleRepository)
    public articleRepository : ArticleRepository,
  ) {}

  @post('/articles', {
    responses: {
      '200': {
        description: 'Article model instance',
        content: {'application/json': {schema: {'x-ts-type': Article}}},
      },
    },
  })
  async create(@requestBody() article: Article): Promise<Article> {
    return await this.articleRepository.create(article);
  }

  @get('/articles/count', {
    responses: {
      '200': {
        description: 'Article model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Article)) where?: Where,
  ): Promise<Count> {
    return await this.articleRepository.count(where);
  }

  @get('/articles', {
    responses: {
      '200': {
        description: 'Array of Article model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Article}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Article)) filter?: Filter,
  ): Promise<Article[]> {
    return await this.articleRepository.find(filter);
  }

  @patch('/articles', {
    responses: {
      '200': {
        description: 'Article PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() article: Article,
    @param.query.object('where', getWhereSchemaFor(Article)) where?: Where,
  ): Promise<Count> {
    return await this.articleRepository.updateAll(article, where);
  }

  @get('/articles/{id}', {
    responses: {
      '200': {
        description: 'Article model instance',
        content: {'application/json': {schema: {'x-ts-type': Article}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Article> {
    return await this.articleRepository.findById(id);
  }

  @patch('/articles/{id}', {
    responses: {
      '204': {
        description: 'Article PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() article: Article,
  ): Promise<void> {
    await this.articleRepository.updateById(id, article);
  }

  @put('/articles/{id}', {
    responses: {
      '204': {
        description: 'Article PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() article: Article,
  ): Promise<void> {
    await this.articleRepository.replaceById(id, article);
  }

  @del('/articles/{id}', {
    responses: {
      '204': {
        description: 'Article DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.articleRepository.deleteById(id);
  }
}
