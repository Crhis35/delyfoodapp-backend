import { PrimaryKey, Property, SerializedPrimaryKey } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class CoreEntity {
  @PrimaryKey()
  _id!: ObjectId;

  @SerializedPrimaryKey()
  @Field()
  id!: string;

  @Property()
  @Field(() => Date)
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  @Field(() => Date)
  updatedAt = new Date();

  constructor(body = {}) {
    Object.assign(this, body);
  }
}
