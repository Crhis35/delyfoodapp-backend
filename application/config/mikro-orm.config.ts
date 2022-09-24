import { Options } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { User, Restaurant, Order, OrderItem, Payment } from '../src/entities';

const ormConfig: Options = {
  type: 'mongo',
  entities: [User, Restaurant, Order, OrderItem, Payment],
  dbName: 'delyfoodapp',
  highlighter: new MongoHighlighter(),
  debug: true,
  clientUrl: process.env.COSMOSDB_CONNECTION_STR,
  ensureIndexes: true,
};

export default ormConfig;
