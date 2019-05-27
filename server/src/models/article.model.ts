import {Entity, model, property, hasMany} from '@loopback/repository';
import { ArticleSell } from './article-sell.model';

@model({settings: {strict: false}})
export class Article extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  image_url?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @hasMany(() => ArticleSell, {keyTo: "articleId"})
  articleSells?: ArticleSell[];

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Article>) {
    super(data);
  }
}
