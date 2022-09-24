import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Dish, DishOptions } from '../../restaurants/entities/dish.entity';
import { Order } from './order.entity';
import { CoreEntity } from '../../common/entities/core.entity';

@InputType('OrderItemOptionInputType', { isAbstract: true })
@ObjectType()
export class OrderItemOption {
  @Field()
  name: string;

  @Field(() => String, { nullable: true })
  choice?: string;
}

@InputType('OrderItemInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class OrderItem extends CoreEntity {
  @Field(() => Dish)
  @ManyToOne(() => Dish, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  dish: Dish;

  @Field(() => [DishOptions], { nullable: true })
  @Property({ type: DishOptions, nullable: true })
  options?: DishOptions[];

  @Field(() => [DishOptions], { nullable: true })
  @ManyToMany(() => Order, (order) => order.items)
  orders = new Collection<Order>(this);
}
