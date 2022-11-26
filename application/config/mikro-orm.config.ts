import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

import {
  User,
  Restaurant,
  Order,
  OrderItem,
  Payment,
  Dish,
} from '../src/entities';

const ormConfig: Options = {
  type: 'postgresql',
  entities: [User, Restaurant, Order, OrderItem, Payment, Dish],
  dbName: 'rg-backend-delyfoodapp-postgresql-db',
  highlighter: new SqlHighlighter(),
  debug: true,
  clientUrl:
    process.env.DB_URL ||
    'postgres://delyfoodapp:Th1sIsAP%40ssw0rd@rg-backend-delyfoodapp-postgresql-server.postgres.database.azure.com:5432/rg-backend-delyfoodapp-postgresql-db',
  driverOptions: {
    connection: { ssl: { rejectUnauthorized: false } },
  },
  seeder: {
    path: './seeders', // path to the folder with seeders
    pathTs: undefined, // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default ormConfig;
