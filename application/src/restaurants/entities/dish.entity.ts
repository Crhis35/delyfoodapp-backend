import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, Length } from 'class-validator';
import { Restaurant } from './restaurant.entity';
import { CoreEntity } from '../../common/entities/core.entity';

@InputType('DishChoicesInputType', { isAbstract: true })
@ObjectType()
export class DishChoices {
  @Field()
  name: string;

  @Field(() => Number, { nullable: true })
  extra?: number;
}

@InputType('DishOptionsInputType', { isAbstract: true })
@ObjectType()
export class DishOptions {
  @Field()
  name: string;

  @Field(() => [DishChoices], { nullable: true })
  choices?: DishChoices[];

  @Field(() => Number, { nullable: true })
  extra?: number;
}

@InputType('DishInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Dish extends CoreEntity {
  @Property()
  @Field(() => String)
  @IsString()
  @Length(5)
  name: string;

  @Property({ type: 'float' })
  @Field(() => Number)
  @IsNumber()
  price: number;

  @Property({ nullable: true })
  @Field(() => String, { nullable: true })
  @IsString()
  photo: string;

  @Property()
  @Field(() => String)
  @IsString()
  @Length(5, 140)
  description: string;

  @Field(() => Restaurant)
  @ManyToOne(() => Restaurant, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Field(() => [DishOptions], { nullable: true })
  @Property({ type: 'json', nullable: true })
  options?: DishOptions[];
}
