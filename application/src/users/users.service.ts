import { Injectable } from '@nestjs/common';
import { GraphQLResolveInfo } from 'graphql';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { UserPaginationInput, UserPaginationOutput } from './dto/list-user.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  async createUser(
    createUserInput: CreateUserInput,
  ): Promise<CreateUserOutput> {
    try {
      const user = await this.usersRepository.create(createUserInput);
      return {
        ok: true,
        item: user,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
  async listUsers(
    userPaginationInput: UserPaginationInput,
    info: GraphQLResolveInfo,
  ): Promise<UserPaginationOutput> {
    try {
      const users = await this.usersRepository.find({
        info,
        options: userPaginationInput,
      });

      return {
        ok: true,
        items: users,
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
