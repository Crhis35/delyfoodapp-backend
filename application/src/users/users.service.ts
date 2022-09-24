import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { GraphQLResolveInfo } from 'graphql';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { UserPaginationInput, UserPaginationOutput } from './dto/list-user.dto';
import fieldsToRelations from 'graphql-fields-to-relations';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<CreateUserOutput> {
    try {
      const user = this.userRepository.create(createUserInput);
      await this.userRepository.persist(user).flush();
      return {
        ok: true,
        item: user,
      };
    } catch (error) {
      return {
        error: error.message,
        ok: false,
      };
    }
  }
  async listUsers(
    { offset, limit }: UserPaginationInput,
    info: GraphQLResolveInfo,
  ): Promise<UserPaginationOutput> {
    try {
      const relationPaths: string[] = fieldsToRelations(info as any).filter(
        (field) => field !== 'items',
      );

      const newRelations = relationPaths.map((word) => {
        const newWord = word.split('.');
        newWord.shift();
        return newWord.join('.');
      });

      const [users, count] = await this.userRepository.findAndCount(
        {},
        {
          limit,
          offset,
          populate: newRelations as any,
        },
      );
      return {
        ok: true,
        items: users,
        totalPages: count,
        currentPage: offset,
      };
    } catch (error) {
      console.error(error);
      return {
        ok: false,
        error: error.message,
      };
    }
  }
}
