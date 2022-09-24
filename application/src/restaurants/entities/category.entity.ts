import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Restaurant } from './restaurant.entity';
import { CoreEntity } from '../../common/entities/core.entity';

@InputType('CategoryInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Property({ unique: true })
  @Field(() => String)
  @IsString()
  @Length(5)
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @Property({ nullable: true })
  coverImg: string;

  @Field(() => String)
  @IsString()
  @Property({ unique: true })
  slug: string;

  @Field(() => [Restaurant])
  @OneToMany(() => Restaurant, (restaurant) => restaurant.category, {
    nullable: true,
  })
  restaurants = new Collection<Restaurant>(this);
}
