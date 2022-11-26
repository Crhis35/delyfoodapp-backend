import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import ormConfig from '../../config/mikro-orm.config';
import { Restaurant, User, Dish, Order, OrderItem, Payment } from '../entities';

@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig),
    MikroOrmModule.forFeature({
      entities: [User, Restaurant, Dish, Order, OrderItem, Payment],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
