import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  providers: [UsersService, UsersResolver, UserRepository],
})
export class UsersModule {}
