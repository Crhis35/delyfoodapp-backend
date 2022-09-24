import {
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Collection,
} from '@mikro-orm/core';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Category } from './category.entity';
import { User } from '../../users/entities/user.entity';
import { Dish } from './dish.entity';
import { Order } from '../../orders/entities/order.entity';
import { CoreEntity } from '../../common/entities/core.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Property()
  @Field(() => String)
  @IsString()
  @Length(20)
  name: string;

  @Field(() => String)
  @IsString()
  @Property()
  coverImg: string;

  @Property()
  @Field(() => String)
  @IsString()
  address: string;

  @Field(() => Category)
  @ManyToOne(() => Category)
  category: Category;

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @Field(() => [Dish])
  @OneToMany(() => Dish, (dish) => dish.restaurant)
  menu = new Collection<Dish>(this);

  @Field(() => [Order], {
    nullable: true,
  })
  @OneToMany(() => Order, (order) => order.restaurant)
  orders = new Collection<Order>(this);

  @Field(() => Boolean)
  @Property({ default: false, nullable: true })
  isPromoted: boolean;

  @Field(() => Date)
  @Property({ nullable: true })
  promotedUntil: Date;
}
