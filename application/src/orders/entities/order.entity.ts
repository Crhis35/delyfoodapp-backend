import {
  Collection,
  Entity,
  Enum,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import {
  Field,
  Float,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

import { OrderItem } from './order-item.entity';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

export enum OrderStatus {
  Pending = 'Pending',
  Cooking = 'Cooking',
  Cooked = 'Cooked',
  PickedUp = 'PickedUp',
  Delivered = 'Delivered',
}

registerEnumType(OrderStatus, {
  name: 'OrderStatus',
});

@InputType('OrderInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Order extends CoreEntity {
  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  @Field(() => User, { nullable: true })
  customer?: User;

  @ManyToOne(() => User, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  @Field(() => User, { nullable: true })
  driver?: User;

  @ManyToOne(() => Restaurant, {
    onDelete: 'SET NULL',
    nullable: true,
    eager: true,
  })
  @Field(() => Restaurant, { nullable: true })
  restaurant?: Restaurant;

  @Field(() => [OrderItem])
  @ManyToMany(() => OrderItem, 'orders', {
    eager: true,
    owner: true,
  })
  items = new Collection<OrderItem>(this);

  @Field(() => Float, { nullable: true })
  @Property({ type: 'float', nullable: true })
  total?: number;

  @Enum({
    items: () => OrderStatus,
    default: OrderStatus.Pending,
  })
  @Field(() => OrderStatus)
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
