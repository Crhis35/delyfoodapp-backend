import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CoreOutput } from './output.dto';

@InputType()
export class PaginationInput {
  @Field(() => Int, { defaultValue: 0 })
  @Type(() => Number)
  offset = 0;
  @Field(() => Int, { defaultValue: 100 })
  @Type(() => Number)
  limit = 100;
}

@ObjectType()
export class PaginationOutput extends CoreOutput {
  @Field(() => Number, { nullable: true })
  totalPages?: number;

  @Field(() => Number, { nullable: true })
  totalResults?: number;

  @Field(() => Number, { nullable: true })
  currentPage?: number;
}
