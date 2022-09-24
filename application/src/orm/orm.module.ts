import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import ormConfig from '../../config/mikro-orm.config';
import { User } from '../entities';

@Module({
  imports: [
    MikroOrmModule.forRoot(ormConfig),
    MikroOrmModule.forFeature({
      entities: [User],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
