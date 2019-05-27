import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';
import * as config from './pg-ds.datasource.json';

export class PgDsDataSource extends juggler.DataSource {
  static dataSourceName = 'pgDS';

  constructor(
    @inject('datasources.config.pgDS', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
