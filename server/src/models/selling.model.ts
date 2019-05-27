import {Entity, model, property, hasMany} from '@loopback/repository';
import { ArticleSell } from './article-sell.model';
import { Article } from './article.model';

@model({settings: {strict: false}})
export class Selling extends Entity {
  @property({
    type: 'number',
    id: true,
    required: false,
  })
  id: number;

  @property({
    type: 'boolean',
    required: false,
    default: false,
  })
  isFinished: boolean;

  @property({
    type: 'date',
    default: new Date()
  })
  createdAt?: string;

  @property({
    type: 'number',
    required: false,
    default: 0
  })
  objective?: number;

  @hasMany(() => ArticleSell, {keyTo: "sellingId"})
  articles?: ArticleSell[];

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Selling>) {
    super(data);
  }
}
