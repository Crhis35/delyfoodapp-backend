import { Inject } from '@nestjs/common';
import { Mutation, Query, Resolver, Args, Info } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { UserPaginationInput, UserPaginationOutput } from './dto/list-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}
  @Query(() => UserPaginationOutput)
  async listUsers(
    @Args('input', { nullable: true }) userPaginationInput: UserPaginationInput,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UserPaginationOutput> {
    return this.usersService.listUsers(userPaginationInput, info);
  }

  @Mutation(() => CreateUserOutput)
  async createUser(
    @Args('input') createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    return this.usersService.createUser(createUserInput);
  }
}
