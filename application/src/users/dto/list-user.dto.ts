import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  PaginationOutput,
  PaginationInput,
} from '../../common/dto/pagination.dto';
import { User } from '../entities/user.entity';

@InputType()
export class UserPaginationInput extends PaginationInput {}

@ObjectType()
export class UserPaginationOutput extends PaginationOutput {
  @Field(() => [User], { nullable: true })
  items?: User[];
}
