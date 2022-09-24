import { Collection, Entity, Enum, OneToMany, Property } from '@mikro-orm/core';
import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { Order } from '../../orders/entities/order.entity';
import { Payment } from '../../payments/entities/payment.entity';

export enum UserRole {
  CLIENT = 'CLIENT',
  OWNER = 'OWNER',
  DELIVERY = 'DELIVERY',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Field()
  @Property({ unique: true })
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  @Property()
  name: string;

  @Field()
  @IsString()
  @Property()
  lastName: string;

  @Field(() => UserRole)
  @Enum(() => UserRole)
  @IsEnum(UserRole)
  role: UserRole;

  @Field(() => [Restaurant])
  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner, {
    nullable: true,
  })
  restaurants = new Collection<Restaurant>(this);

  @Field(() => [Order], {
    nullable: true,
  })
  @OneToMany(() => Order, (order) => order.customer)
  orders = new Collection<Order>(this);

  @Field(() => [Payment], {
    nullable: true,
  })
  @OneToMany(() => Payment, (payment) => payment.user)
  payments = new Collection<Payment>(this);

  @Field(() => [Order], { nullable: true })
  @OneToMany(() => Order, (order) => order.driver)
  rides = new Collection<Order>(this);
}
