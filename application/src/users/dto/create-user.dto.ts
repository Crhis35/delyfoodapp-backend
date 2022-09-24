import { InputType, PickType, ObjectType, Field } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dto/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends PickType(User, [
  'email',
  'name',
  'lastName',
  'role',
]) {}

@ObjectType()
export class CreateUserOutput extends CoreOutput {
  @Field(() => User, { nullable: true })
  item?: User;
}
