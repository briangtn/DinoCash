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
import {Selling, ArticleSell} from '../models';
import {SellingRepository} from '../repositories';

export class SellingController {
  constructor(
    @repository(SellingRepository)
    public sellingRepository : SellingRepository,
  ) {}

  @post('/sellings', {
    responses: {
      '200': {
        description: 'Selling model instance',
        content: {'application/json': {schema: {'x-ts-type': Selling}}},
      },
    },
  })
  async create(@requestBody() selling: Selling): Promise<Selling> {
    return await this.sellingRepository.create(selling);
  }

  @get('/sellings/count', {
    responses: {
      '200': {
        description: 'Selling model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Selling)) where?: Where,
  ): Promise<Count> {
    return await this.sellingRepository.count(where);
  }

  @get('/sellings', {
    responses: {
      '200': {
        description: 'Array of Selling model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Selling}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Selling)) filter?: Filter,
  ): Promise<Selling[]> {
    return await this.sellingRepository.find(filter);
  }

  @patch('/sellings', {
    responses: {
      '200': {
        description: 'Selling PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() selling: Selling,
    @param.query.object('where', getWhereSchemaFor(Selling)) where?: Where,
  ): Promise<Count> {
    return await this.sellingRepository.updateAll(selling, where);
  }

  @get('/sellings/{id}', {
    responses: {
      '200': {
        description: 'Selling model instance',
        content: {'application/json': {schema: {'x-ts-type': Selling}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Selling> {
    return await this.sellingRepository.findById(id);
  }

  @patch('/sellings/{id}', {
    responses: {
      '204': {
        description: 'Selling PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() selling: Selling,
  ): Promise<void> {
    await this.sellingRepository.updateById(id, selling);
  }

  @put('/sellings/{id}', {
    responses: {
      '204': {
        description: 'Selling PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() selling: Selling,
  ): Promise<void> {
    await this.sellingRepository.replaceById(id, selling);
  }

  @del('/sellings/{id}', {
    responses: {
      '204': {
        description: 'Selling DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.sellingRepository.deleteById(id);
  }

  @get('/sellings/{id}/articles', {
    responses: {
      '200': {
        description: 'Array of Selling model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': ArticleSell}},
          },
        },
      },
    },
  })
  async findOpened(@param.path.number('id') id: number, @param.query.object('filter', getFilterSchemaFor(ArticleSell)) filter?: Filter): Promise<ArticleSell[]> {
    return await this.sellingRepository.articles(id).find(filter);
  }
}
