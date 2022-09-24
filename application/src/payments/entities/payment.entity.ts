import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from '../../users/entities/user.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity {
  @Field(() => Int)
  @Property()
  transactionId: number;

  @Field(() => User)
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  user: User;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  restaurant: Restaurant;
}
