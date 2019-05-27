import {Entity, model, property, belongsTo} from '@loopback/repository';
import { Selling } from './selling.model';
import { Article } from './article.model';

@model({settings: {strict: false}})
export class ArticleSell extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @belongsTo(() => Selling, {keyTo: "id"})
  sellingId: number;

  @property({
    type: 'number',
    required: true
  })
  price: number;

  @property({
    type: 'number',
    default: 0,
  })
  payementMethod?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<ArticleSell>) {
    super(data);
  }
}
