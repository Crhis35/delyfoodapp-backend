import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import { User, Restaurant, Order, OrderItem, Payment } from '../src/entities';

// host= port=5432 dbname={your_database} user=delyfoodapp password={your_password} sslmode=require
const ormConfig: Options = {
  type: 'postgresql',
  entities: [User, Restaurant, Order, OrderItem, Payment],
  dbName: 'rg-backend-delyfoodapp-postgresql-db',
  highlighter: new SqlHighlighter(),
  debug: true,
  clientUrl: process.env.DB_URL || '',
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
};

export default ormConfig;
