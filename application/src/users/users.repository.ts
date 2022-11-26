import { User } from './entities/user.entity';
import { AbstractRepository } from '../common/abstract.repository';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  protected readonly logger = new Logger(UserRepository.name);

  constructor(
    @InjectRepository(User)
    readonly userRepository: EntityRepository<User>,
  ) {
    super(userRepository);
  }
}
