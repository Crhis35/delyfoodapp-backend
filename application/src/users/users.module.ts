import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { OrmModule } from '../orm/orm.module';

@Module({
  imports: [OrmModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
